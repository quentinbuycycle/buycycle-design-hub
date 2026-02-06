import { getAllCaseStudiesWithPreview } from "@/lib/content";
import { OutputGallery } from "./OutputGallery";
import styles from "./page.module.css";

export default function OutputPage() {
  const studies = getAllCaseStudiesWithPreview();

  // Derive unique tags from all studies, sorted alphabetically
  const allTags = Array.from(
    new Set(studies.flatMap((s) => s.tags))
  ).sort();

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Output</h1>
          <p className={styles.heroSubtitle}>
            Every case study published by the team using the AI framework.
          </p>
        </div>
      </section>

      {/* Gallery with client-side filtering */}
      <OutputGallery studies={studies} allTags={allTags} />
    </>
  );
}
