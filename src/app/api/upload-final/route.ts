import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const REPO = "quentinbuycycle/buycycle-design-hub";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function getFileFromGitHub(
  path: string,
  token: string
): Promise<{ content: string; sha: string } | null> {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

async function commitFileToGitHub(
  path: string,
  content: string,
  commitMessage: string,
  token: string,
  sha?: string
): Promise<void> {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;

  // If no sha provided, check if file exists
  let fileSha = sha;
  if (!fileSha) {
    const getRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      fileSha = existing.sha;
    }
  }

  const body: Record<string, string> = {
    message: commitMessage,
    content: Buffer.from(content, "utf-8").toString("base64"),
  };
  if (fileSha) {
    body.sha = fileSha;
  }

  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub API error for ${path}: ${putRes.status} — ${err}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, slug, prototypeHtml, prototypeFilename, type } = body;
    const targetField = type === "review" ? "prototypes" : "finalPrototypes";

    // Auth check
    const uploadPassword = process.env.UPLOAD_PASSWORD;
    let authenticated = false;

    if (uploadPassword) {
      const cookieStore = await cookies();
      const authCookie = cookieStore.get("hub-auth");
      if (authCookie?.value) {
        const expectedToken = crypto
          .createHmac("sha256", uploadPassword)
          .update("buycycle-hub-auth")
          .digest("hex");
        if (authCookie.value === expectedToken) {
          authenticated = true;
        }
      }
      if (!authenticated && password === uploadPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!slug || !prototypeHtml || !prototypeFilename) {
      return NextResponse.json(
        { error: "slug, prototypeHtml, and prototypeFilename are required" },
        { status: 400 }
      );
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing GITHUB_TOKEN" },
        { status: 500 }
      );
    }

    // 1. Fetch the existing markdown from GitHub
    const mdPath = `content/output/${slug}.md`;
    const existing = await getFileFromGitHub(mdPath, githubToken);
    if (!existing) {
      return NextResponse.json(
        { error: `Case study not found: ${slug}` },
        { status: 404 }
      );
    }

    // 2. Generate the prototype filename slug
    const htmlFilename = prototypeFilename.endsWith(".html")
      ? prototypeFilename
      : `${slugify(prototypeFilename)}.html`;
    const protoPath = `/prototypes/${htmlFilename}`;

    // 3. Update the markdown frontmatter to add to the target field
    let updatedMarkdown = existing.content;
    const emptyArrayRegex = new RegExp(`^${targetField}:\\s*\\[]\\s*$`, "m");
    const emptyValueRegex = new RegExp(`^${targetField}:\\s*$`, "m");
    const existingRegex = new RegExp(`^${targetField}:`, "m");
    const appendRegex = new RegExp(
      `^(${targetField}:[\\s\\S]*?)(^---\\s*$)`,
      "m"
    );

    if (emptyArrayRegex.test(updatedMarkdown)) {
      // Empty array — replace with first entry
      updatedMarkdown = updatedMarkdown.replace(
        emptyArrayRegex,
        `${targetField}:\n  - "${protoPath}"`
      );
    } else if (emptyValueRegex.test(updatedMarkdown)) {
      // Key exists with no value
      updatedMarkdown = updatedMarkdown.replace(
        emptyValueRegex,
        `${targetField}:\n  - "${protoPath}"`
      );
    } else if (existingRegex.test(updatedMarkdown)) {
      // Already has entries — append before the closing ---
      updatedMarkdown = updatedMarkdown.replace(
        appendRegex,
        `$1  - "${protoPath}"\n$2`
      );
    } else {
      // Key doesn't exist — add before closing ---
      updatedMarkdown = updatedMarkdown.replace(
        /^(---\s*$)/m,
        `${targetField}:\n  - "${protoPath}"\n$1`
      );
    }

    // 4. Commit both files
    const commitMessage = `feat: add final prototype — ${htmlFilename}`;

    await commitFileToGitHub(
      mdPath,
      updatedMarkdown,
      commitMessage,
      githubToken,
      existing.sha
    );

    await commitFileToGitHub(
      `content/output/prototypes/${htmlFilename}`,
      prototypeHtml,
      commitMessage,
      githubToken
    );

    return NextResponse.json({ success: true, slug, prototype: protoPath });
  } catch (error) {
    console.error("Upload final error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
