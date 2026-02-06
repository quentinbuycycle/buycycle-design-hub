import styles from "./page.module.css";

const workflowSteps = [
  {
    number: 1,
    title: "Create a project folder",
    content: (
      <>
        <p>Create a folder on your computer with a descriptive name.</p>
        <div className={styles.example}>
          <span className={styles.exampleLabel}>Example:</span>
          <code>checkout-shipping-detail-fix</code> or <code>seller-pricing-flow</code>
        </div>
        <p className={styles.note}>This keeps each exploration contained and easy to find later.</p>
      </>
    ),
  },
  {
    number: 2,
    title: "Open it in Cursor",
    content: (
      <>
        <p>
          Open Cursor → <strong>File</strong> → <strong>Open Folder</strong> → Select your new folder.
        </p>
        <p className={styles.subtle}>Everything Claude creates will live here.</p>
      </>
    ),
  },
  {
    number: 3,
    title: "Explore freely with Claude",
    content: (
      <>
        <p>Describe your problem and work with Claude to prototype solutions.</p>
        <div className={styles.warning}>
          <div className={styles.warningIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <strong>Important:</strong> Don&apos;t call the design system yet. Let Claude explore freely without constraints — this is where the best ideas emerge.
          </div>
        </div>
        <div className={styles.promptExample}>
          <span className={styles.promptLabel}>Example prompt:</span>
          <p>&quot;I need to show users a shipping cost breakdown before they commit to buying. The current flow surprises them with fees at the last step. Help me prototype a solution.&quot;</p>
        </div>
      </>
    ),
  },
  {
    number: 4,
    title: "Refine the UX",
    content: (
      <>
        <p>Iterate with Claude until the solution feels right:</p>
        <ul>
          <li>Does it solve the core problem?</li>
          <li>Is the flow intuitive?</li>
          <li>Are edge cases handled?</li>
        </ul>
        <p className={styles.subtle}>Don&apos;t worry about colors, fonts, or spacing yet.</p>
      </>
    ),
  },
  {
    number: 5,
    title: "Apply the design system",
    content: (
      <>
        <p>Once the UX is solid, type the command:</p>
        <div className={styles.command}>
          <code>/buycycle-design-review</code>
        </div>
        <p>Claude will scan your prototype and translate it into buycycle&apos;s design system — correct colors, typography, spacing, and components.</p>
      </>
    ),
  },
  {
    number: 6,
    title: "Refine the details",
    content: (
      <>
        <p>Review Claude&apos;s changes. Ask for adjustments:</p>
        <ul className={styles.adjustmentList}>
          <li>&quot;Make the CTA more prominent&quot;</li>
          <li>&quot;Add more spacing between sections&quot;</li>
          <li>&quot;Use the secondary button style instead&quot;</li>
        </ul>
      </>
    ),
  },
];

const proTips = [
  {
    title: "One problem per folder",
    description: "Keep explorations separate. It's easier to compare approaches and find past work.",
  },
  {
    title: "Save your prompts",
    description: "If you write a great problem description, save it in a README.md in the folder for future reference.",
  },
  {
    title: "Use quick-check for small tweaks",
    description: "Already have a component that just needs a spot-check? Use /buycycle-quick-check instead of a full review.",
  },
];

const commands = [
  {
    command: "/buycycle-design-review",
    description: "Full prototype → design system translation",
  },
  {
    command: "/buycycle-quick-check",
    description: "Fast check on a single component",
  },
  {
    command: "/buycycle-tokens",
    description: "Load colors, typography, spacing while building",
  },
];

export default function HowToUsePage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>How to Use</h1>
          <p className={styles.heroSubtitle}>
            From problem to polished prototype in one session
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <p className={styles.intro}>
            This workflow separates creative exploration from design system compliance.
            First, you solve the problem with full creative freedom. Then, you apply
            buycycle&apos;s design system to make it production-ready.
          </p>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The Workflow</h2>
          <div className={styles.timeline}>
            {workflowSteps.map((step, index) => (
              <div key={step.number} className={styles.timelineItem}>
                <div className={styles.timelineConnector}>
                  <div className={styles.timelineNumber}>{step.number}</div>
                  {index < workflowSteps.length - 1 && (
                    <div className={styles.timelineLine} />
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <div className={styles.stepContent}>{step.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className={styles.tipsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Pro Tips</h2>
          <div className={styles.tipsGrid}>
            {proTips.map((tip, index) => (
              <div key={index} className={styles.tipCard}>
                <div className={styles.tipNumber}>{index + 1}</div>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipDescription}>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Reference Section */}
      <section className={styles.commandsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Quick Reference: Commands</h2>
          <div className={styles.commandsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Command</div>
              <div className={styles.tableHeaderCell}>When to use</div>
            </div>
            {commands.map((cmd) => (
              <div key={cmd.command} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <code className={styles.commandCode}>{cmd.command}</code>
                </div>
                <div className={styles.tableCell}>{cmd.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>buycycle</span>
              </div>
              <p>Internal tooling onboarding</p>
            </div>
            <div className={styles.footerContact}>
              <p>Questions? Reach out to <strong>Quentin</strong></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
