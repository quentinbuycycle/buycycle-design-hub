import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";
import styles from "./page.module.css";

export default function HubPage() {
  const allStudies = getAllCaseStudies();
  const latestStudies = allStudies.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>buycycle design team</span>
          </div>
          <h1 className={styles.heroTitle}>
            buycycle
            <span className={styles.heroTitleAccent}> Design Hub</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Where AI-assisted design work ships, gets documented, and makes the
            system smarter.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/output" className="btn-primary">
              Browse Output
            </Link>
            <Link href="/onboarding" className="btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Output */}
      <section className={styles.outputSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest Output</h2>
            <Link href="/output" className={styles.viewAll}>
              View all
              <svg className={styles.viewAllArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {latestStudies.length > 0 ? (
            <div className={styles.cardsGrid}>
              {latestStudies.map((study) => (
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
                  <p className={styles.cardDescription}>
                    {study.description}
                  </p>
                  <Link
                    href={`/output/${study.slug}`}
                    className={styles.readMore}
                  >
                    Read more
                    <svg className={styles.readMoreArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    </>
  );
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
