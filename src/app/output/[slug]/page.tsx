import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCaseStudyBySlug,
  getAdjacentCaseStudies,
  getAllCaseStudies,
} from "@/lib/content";
import styles from "./page.module.css";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        {/* Back link */}
        <Link href="/output" className={styles.backLink}>
          <svg
            className={styles.backArrow}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Output
        </Link>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>{study.title}</h1>
          <div className={styles.meta}>
            <span className={styles.metaText}>{study.author}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>{formatDate(study.date)}</span>
            {study.tags.length > 0 && (
              <>
                <span className={styles.metaDot} />
                <div className={styles.tags}>
                  {study.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Markdown body */}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: study.contentHtml }}
        />

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className={styles.navFooter}>
            {prev && (
              <Link
                href={`/output/${prev.slug}`}
                className={styles.navCard}
              >
                <span className={styles.navLabel}>
                  <svg
                    className={styles.navArrow}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
                <span className={styles.navTitle}>{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/output/${next.slug}`}
                className={`${styles.navCard} ${styles.navCardNext}`}
              >
                <span className={styles.navLabel}>
                  Next
                  <svg
                    className={styles.navArrow}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className={styles.navTitle}>{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
