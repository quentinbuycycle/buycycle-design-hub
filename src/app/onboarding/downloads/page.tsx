import { VersionCard } from "@/components";
import styles from "./page.module.css";
import Link from "next/link";

// Version configuration
const DESIGN_SYSTEM_VERSION = "v1.0.0";
const COMMANDS_VERSION = "v1.1.0";
const DESIGN_SYSTEM_DOWNLOAD_URL = "https://github.com/quentinbuycycle/buycycle-design-system/releases/download/v1.0.0/design-system-v1.0.0.zip";
const COMMANDS_DOWNLOAD_URL = "https://github.com/quentinbuycycle/buycycle-design-hub/releases/download/commands-v1.1.0/commands-v1.1.0.zip";

const designSystemVersions = [
  {
    version: DESIGN_SYSTEM_VERSION,
    date: "February 2026",
    isCurrent: true,
    downloadUrl: DESIGN_SYSTEM_DOWNLOAD_URL,
    summary: "Initial release of the buycycle design system for Claude Code.",
    releaseNotes: [
      { type: "added" as const, text: "CLAUDE.md configuration file" },
      { type: "added" as const, text: "Complete component documentation (buttons, inputs, navigation, cards)" },
      { type: "added" as const, text: "Color tokens with semantic naming" },
      { type: "added" as const, text: "Typography scale and spacing system (4px grid)" },
      { type: "added" as const, text: "UX patterns and guidelines" },
    ],
  },
];

const commandsVersions = [
  {
    version: COMMANDS_VERSION,
    date: "February 13, 2026",
    isCurrent: true,
    downloadUrl: COMMANDS_DOWNLOAD_URL,
    summary: "Multi-prototype support for /publish-to-hub plus all existing commands.",
    releaseNotes: [
      { type: "changed" as const, text: "/publish-to-hub now supports uploading multiple HTML prototypes per case study" },
      { type: "added" as const, text: "Includes all existing commands from v1.0" },
    ],
  },
  {
    version: "v1.0.1",
    date: "February 6, 2026",
    isCurrent: false,
    downloadUrl: "",
    supersededBy: "v1.1.0",
    summary: "New publish-to-hub command plus all existing commands from v1.0.",
    releaseNotes: [
      { type: "added" as const, text: "/publish-to-hub command — automatically generates a structured case study from your Claude Code session and uploads it to the Design Hub. No git required." },
      { type: "added" as const, text: "Includes all existing commands from v1.0" },
    ],
  },
  {
    version: "v1.0.0",
    date: "February 2026",
    isCurrent: false,
    downloadUrl: "",
    supersededBy: "v1.0.1",
    summary: "Custom slash commands for ticket writing, specs, and design reviews.",
    releaseNotes: [
      { type: "added" as const, text: "/ticket command for structured ticket creation" },
      { type: "added" as const, text: "/spec command for technical specifications" },
      { type: "added" as const, text: "/review command for design reviews" },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Downloads</h1>
          <p className={styles.heroSubtitle}>
            Design system files and commands for Claude Code
          </p>
        </div>
      </section>

      {/* Design System Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Design System</h2>
              <p className={styles.sectionSubtitle}>
                buycycle&apos;s design tokens, components, and UI patterns
              </p>
            </div>
          </div>

          <div className={styles.versionList}>
            {designSystemVersions.map((version) => (
              <VersionCard key={version.version} {...version} />
            ))}
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Commands</h2>
              <p className={styles.sectionSubtitle}>
                Custom slash commands for common workflows
              </p>
            </div>
          </div>

          <div className={styles.versionList}>
            {commandsVersions.map((version) => (
              <VersionCard key={version.version} {...version} />
            ))}
          </div>
        </div>
      </section>

      {/* Installation Reminder */}
      <section className={styles.reminderSection}>
        <div className={styles.container}>
          <div className={styles.reminderCard}>
            <div className={styles.reminderIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className={styles.reminderContent}>
              <h3>Installation Reminder</h3>
              <p>
                Extract downloaded files and copy to <code>~/.claude/</code>
              </p>
              <p>
                For detailed instructions, see the{" "}
                <Link href="/onboarding" className={styles.link}>
                  Setup Guide
                </Link>
              </p>
            </div>
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
