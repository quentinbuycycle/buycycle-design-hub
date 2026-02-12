"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Wrong password.");
        setPassword("");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className={styles.title}>buycycle Design Hub</h1>
          <p className={styles.text}>Enter the team password to continue.</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
              autoFocus
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Enter"}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
