import { referencePrototypes } from "@/data/reference-prototypes";
import styles from "./page.module.css";

export default function ReferencePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Reference Prototypes</h1>
          <p className={styles.heroSubtitle}>
            Latest prototypes per product area, curated for handoff.
          </p>
        </div>
      </section>

      <div className={styles.main}>
        <div className={styles.container}>
          {referencePrototypes.map((area) => (
            <section key={area.id} className={styles.areaSection}>
              <h2 className={styles.areaTitle}>{area.title}</h2>

              {area.features.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>No prototypes added yet.</p>
                </div>
              ) : (
                <div className={styles.cardsGrid}>
                  {area.features.map((feature, i) => (
                    <div key={i} className={styles.card}>
                      <h3 className={styles.cardTitle}>{feature.title}</h3>
                      <div className={styles.cardActions}>
                        {feature.web && (
                          <a
                            href={`/reference/prototypes/${feature.web}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                          >
                            Web
                          </a>
                        )}
                        {feature.webDesktop && (
                          <a
                            href={`/reference/prototypes/${feature.webDesktop}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                          >
                            Desktop
                          </a>
                        )}
                        {feature.webMobile && (
                          <a
                            href={`/reference/prototypes/${feature.webMobile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                          >
                            Mobile
                          </a>
                        )}
                        {feature.app && (
                          <a
                            href={`/reference/prototypes/${feature.app}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.actionButton} ${styles.actionButtonApp}`}
                          >
                            App
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
