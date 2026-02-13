"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./SharePrototypes.module.css";

interface SharePrototypesProps {
  slug: string;
  prototypes: string[];
  finalPrototypes: string[];
}

function protoLabel(path: string): string {
  return path
    .replace(/^\/prototypes\//, "")
    .replace(/\.html$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SharePrototypes({
  slug,
  prototypes,
  finalPrototypes,
}: SharePrototypesProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const allPrototypes = [...prototypes, ...finalPrototypes];

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function toggle(proto: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(proto)) next.delete(proto);
      else next.add(proto);
      return next;
    });
    setCopied(false);
  }

  async function handleCopy() {
    if (selected.size === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, prototypes: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const url = `${window.location.origin}/output/${slug}?share=${data.token}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Share error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (allPrototypes.length === 0) return null;

  return (
    <div className={styles.wrapper} ref={popoverRef}>
      <button
        className={styles.trigger}
        onClick={() => {
          setOpen(!open);
          setCopied(false);
        }}
        aria-label="Share prototypes"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share
      </button>

      {open && (
        <div className={styles.popover}>
          <p className={styles.popoverTitle}>Select prototypes to share</p>

          {prototypes.length > 0 && (
            <div className={styles.group}>
              <span className={styles.groupLabel}>To review</span>
              {prototypes.map((proto) => (
                <label key={proto} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selected.has(proto)}
                    onChange={() => toggle(proto)}
                    className={styles.checkbox}
                  />
                  <span className={styles.optionLabel}>{protoLabel(proto)}</span>
                </label>
              ))}
            </div>
          )}

          {finalPrototypes.length > 0 && (
            <div className={styles.group}>
              <span className={styles.groupLabel}>Final</span>
              {finalPrototypes.map((proto) => (
                <label key={proto} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selected.has(proto)}
                    onChange={() => toggle(proto)}
                    className={styles.checkbox}
                  />
                  <span className={styles.optionLabel}>{protoLabel(proto)}</span>
                </label>
              ))}
            </div>
          )}

          <button
            className={styles.copyBtn}
            onClick={handleCopy}
            disabled={selected.size === 0 || loading}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {loading ? "Generating..." : "Copy share link"}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
