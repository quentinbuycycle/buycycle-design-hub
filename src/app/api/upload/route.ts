import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildMarkdown(data: {
  title: string;
  author: string;
  date: string;
  team: string;
  tags: string[];
  slug: string;
  problem: string;
  solution: string;
  rationale: string;
  systemLimitations: string;
}): string {
  const tagsArray = JSON.stringify(data.tags);

  return `---
title: "${data.title}"
author: "${data.author}"
date: "${data.date}"
team: "${data.team}"
tags: ${tagsArray}
prototype: "/prototypes/${data.slug}.html"
---

## Problem
${data.problem}

## Solution
${data.solution}

## UX & UI Rationale
${data.rationale}

## System Limitations
${data.systemLimitations}
`;
}

async function commitFileToGitHub(
  path: string,
  content: string,
  commitMessage: string,
  token: string
): Promise<void> {
  const url = `https://api.github.com/repos/quentinbuycycle/buycycle-design-hub/contents/${path}`;

  // Check if the file already exists (to get its SHA for updates)
  let sha: string | undefined;
  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (getRes.ok) {
    const existing = await getRes.json();
    sha = existing.sha;
  }

  const body: Record<string, string> = {
    message: commitMessage,
    content: Buffer.from(content, "utf-8").toString("base64"),
  };
  if (sha) {
    body.sha = sha;
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

    const {
      password,
      title,
      author,
      team,
      tags,
      problem,
      solution,
      rationale,
      systemLimitations,
      prototypeHtml,
    } = body;

    // 1. Auth check: cookie-based (hub login) or password-based (external tools)
    const uploadPassword = process.env.UPLOAD_PASSWORD;
    let authenticated = false;

    if (uploadPassword) {
      // Check cookie auth first
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

      // Fall back to password auth
      if (!authenticated && password === uploadPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (!title || !author || !team || !problem || !solution || !rationale || !prototypeHtml) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    // 2. Generate slug
    const slug = slugify(title);
    if (!slug) {
      return NextResponse.json(
        { error: "Could not generate a valid slug from the title" },
        { status: 400 }
      );
    }

    // 3. Build markdown
    const date = todayISO();
    const markdown = buildMarkdown({
      title,
      author,
      date,
      team,
      tags: tags || [],
      slug,
      problem,
      solution,
      rationale,
      systemLimitations: systemLimitations || "",
    });

    // 4. Commit both files to GitHub
    const commitMessage = `feat: add case study — ${title}`;

    await commitFileToGitHub(
      `content/output/${slug}.md`,
      markdown,
      commitMessage,
      githubToken
    );

    await commitFileToGitHub(
      `content/output/prototypes/${slug}.html`,
      prototypeHtml,
      commitMessage,
      githubToken
    );

    // 5. Return success
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
