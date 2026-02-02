"use client";

import { useState } from "react";
import styles from "./VersionCard.module.css";

interface ReleaseNote {
  type: "added" | "changed" | "fixed" | "removed";
  text: string;
}

interface VersionCardProps {
  version: string;
  date: string;
  isCurrent?: boolean;
  downloadUrl: string;
  releaseNotes: ReleaseNote[];
  summary?: string;
}

export function VersionCard({
  version,
  date,
  isCurrent = false,
  downloadUrl,
  releaseNotes,
  summary,
}: VersionCardProps) {
  const [expanded, setExpanded] = useState(isCurrent);

  const typeLabels = {
    added: { label: "Added", color: "var(--accent-primary)" },
    changed: { label: "Changed", color: "var(--coral)" },
    fixed: { label: "Fixed", color: "#a78bfa" },
    removed: { label: "Removed", color: "#f87171" },
  };

  return (
    <div className={`${styles.card} ${isCurrent ? styles.current : ""}`}>
      <div className={styles.header}>
        <div className={styles.versionInfo}>
          <div className={styles.versionBadge}>
            <span className={styles.version}>{version}</span>
            {isCurrent && <span className={styles.currentBadge}>Current</span>}
          </div>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.expandButton}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Hide" : "Show"} notes</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <a href={downloadUrl} className={styles.downloadButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download</span>
          </a>
        </div>
      </div>

      {summary && (
        <p className={styles.summary}>{summary}</p>
      )}

      {expanded && (
        <div className={styles.releaseNotes}>
          {releaseNotes.map((note, index) => (
            <div key={index} className={styles.note}>
              <span
                className={styles.noteType}
                style={{ color: typeLabels[note.type].color }}
              >
                {typeLabels[note.type].label}
              </span>
              <span className={styles.noteText}>{note.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
