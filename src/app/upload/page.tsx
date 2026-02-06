"use client";

import { useState, FormEvent, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; slug: string }
  | { status: "error"; message: string };

const TEAMS = [
  "Product Design",
  "Engineering",
  "Marketing",
  "Operations",
  "Other",
];

const USER_TYPES = ["Buyer", "Seller", "Buyer & Seller"];
const CORE_FLOWS = ["Pre-transactional XP", "Seller XP", "Post-transaction XP"];

export default function UploadPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [team, setTeam] = useState(TEAMS[0]);
  const [userType, setUserType] = useState(USER_TYPES[0]);
  const [coreFlow, setCoreFlow] = useState(CORE_FLOWS[0]);
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [rationale, setRationale] = useState("");
  const [systemLimitations, setSystemLimitations] = useState("");

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.trim()) {
      setAuthenticated(true);
    }
  }

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState({ status: "submitting" });

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setFormState({ status: "error", message: "Please select an HTML file." });
      return;
    }

    let prototypeHtml: string;
    try {
      prototypeHtml = await file.text();
    } catch {
      setFormState({ status: "error", message: "Failed to read the uploaded file." });
      return;
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          title,
          author,
          team,
          tags: [userType, coreFlow],
          problem,
          solution,
          rationale,
          systemStrengths: "",
          systemLimitations,
          prototypeHtml,
          prototypeFilename: file.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setPassword("");
          setFormState({ status: "error", message: "Wrong password. Please re-enter." });
          return;
        }
        setFormState({ status: "error", message: data.error || "Something went wrong." });
        return;
      }

      setFormState({ status: "success", slug: data.slug });
    } catch {
      setFormState({ status: "error", message: "Network error. Please try again." });
    }
  }

  // Password gate
  if (!authenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.gateContainer}>
          <div className={styles.gateCard}>
            <div className={styles.gateIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className={styles.gateTitle}>Upload Case Study</h1>
            <p className={styles.gateText}>
              Enter the upload password to continue.
            </p>
            <form onSubmit={handlePasswordSubmit} className={styles.gateForm}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.input}
                autoFocus
                required
              />
              <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                Enter
              </button>
            </form>
            {formState.status === "error" && (
              <p className={styles.errorMessage}>{formState.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (formState.status === "success") {
    return (
      <div className={styles.page}>
        <div className={styles.gateContainer}>
          <div className={styles.gateCard}>
            <div className={styles.successIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className={styles.gateTitle}>Published!</h1>
            <p className={styles.gateText}>
              Your case study has been committed to the repo and will appear on the hub shortly.
            </p>
            <div className={styles.successActions}>
              <Link href={`/output/${formState.slug}`} className="btn-primary" style={{ width: "100%" }}>
                View Case Study
              </Link>
              <button
                type="button"
                className="btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  setTitle("");
                  setAuthor("");
                  setTeam(TEAMS[0]);
                  setUserType(USER_TYPES[0]);
                  setCoreFlow(CORE_FLOWS[0]);
                  setProblem("");
                  setSolution("");
                  setRationale("");
                  setSystemLimitations("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                  setFormState({ status: "idle" });
                }}
              >
                Upload Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Upload Case Study</h1>
          <p className={styles.subtitle}>
            Publish a new case study and prototype to the Design Hub.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.form}>
          {/* Title */}
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="e.g. Loaded Price Display"
              required
            />
          </div>

          {/* Author */}
          <div className={styles.field}>
            <label htmlFor="author" className={styles.label}>Author name</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={styles.input}
              placeholder="e.g. Jane Smith"
              required
            />
          </div>

          {/* Team */}
          <div className={styles.field}>
            <label htmlFor="team" className={styles.label}>Team</label>
            <select
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={styles.select}
            >
              {TEAMS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* User Type */}
          <div className={styles.field}>
            <label htmlFor="userType" className={styles.label}>User type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className={styles.select}
            >
              {USER_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Core Flow */}
          <div className={styles.field}>
            <label htmlFor="coreFlow" className={styles.label}>Core flow</label>
            <select
              id="coreFlow"
              value={coreFlow}
              onChange={(e) => setCoreFlow(e.target.value)}
              className={styles.select}
            >
              {CORE_FLOWS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Problem */}
          <div className={styles.field}>
            <label htmlFor="problem" className={styles.label}>Problem</label>
            <textarea
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="What problem does this design solve?"
              required
            />
            <p className={styles.helper}>2 concise sentences only</p>
          </div>

          {/* Solution */}
          <div className={styles.field}>
            <label htmlFor="solution" className={styles.label}>Solution</label>
            <textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="How does the design solve it?"
              required
            />
            <p className={styles.helper}>2 concise sentences only</p>
          </div>

          {/* UX & UI Rationale */}
          <div className={styles.field}>
            <label htmlFor="rationale" className={styles.label}>UX &amp; UI Rationale</label>
            <textarea
              id="rationale"
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              className={styles.textarea}
              rows={4}
              placeholder="Why these specific design decisions?"
              required
            />
            <p className={styles.helper}>5 concise bullet points max</p>
          </div>

          {/* System Limitations */}
          <div className={styles.field}>
            <label htmlFor="systemLimitations" className={styles.label}>
              System Limitations
            </label>
            <textarea
              id="systemLimitations"
              value={systemLimitations}
              onChange={(e) => setSystemLimitations(e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="Where did the design system limit the solution?"
              required
            />
            <p className={styles.helper}>Concise bullet points</p>
          </div>

          {/* Prototype file */}
          <div className={styles.field}>
            <label htmlFor="prototype" className={styles.label}>Prototype HTML file</label>
            <input
              id="prototype"
              type="file"
              accept=".html"
              ref={fileInputRef}
              className={styles.fileInput}
              required
            />
          </div>

          {/* Error */}
          {formState.status === "error" && (
            <div className={styles.errorBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{formState.message}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%" }}
            disabled={formState.status === "submitting"}
          >
            {formState.status === "submitting" ? (
              <span className={styles.spinner} />
            ) : null}
            {formState.status === "submitting" ? "Publishing..." : "Publish Case Study"}
          </button>
        </form>
      </div>
    </div>
  );
}
