"use client";

import { useState } from "react";
import Link from "next/link";
import type { CaseStudyCard } from "@/lib/content";
import styles from "./page.module.css";

interface OutputGalleryProps {
  studies: CaseStudyCard[];
  allTags: string[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function OutputGallery({ studies, allTags }: OutputGalleryProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? studies.filter((s) => s.tags.includes(activeTag))
    : studies;

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {/* Filter pills */}
        {allTags.length > 0 && (
          <div className={styles.filters}>
            <button
              className={`${styles.filterPill} ${activeTag === null ? styles.filterPillActive : ""}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.filterPill} ${activeTag === tag ? styles.filterPillActive : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Cards or empty state */}
        {filtered.length > 0 ? (
          <div className={styles.cardsGrid}>
            {filtered.map((study) => (
              <article key={study.slug} className={styles.card}>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <div className={styles.cardMeta}>
                  <span>{study.author}</span>
                  <span className={styles.cardMetaDot} />
                  <span>{formatDate(study.date)}</span>
                </div>
                {study.tags.length > 0 && (
                  <div className={styles.cardTags}>
                    {study.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {study.preview && (
                  <p className={styles.cardPreview}>{study.preview}</p>
                )}
                <Link
                  href={`/output/${study.slug}`}
                  className={styles.readMore}
                >
                  Read more
                  <svg
                    className={styles.readMoreArrow}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No output published yet</h3>
            <p className={styles.emptyText}>
              Be the first — run the publish command in Claude Code.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
