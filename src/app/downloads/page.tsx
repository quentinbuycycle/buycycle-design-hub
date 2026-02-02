import { VersionCard } from "@/components";
import styles from "./page.module.css";
import Link from "next/link";

// Placeholder versions - replace {{PLACEHOLDERS}} with actual values
const DESIGN_SYSTEM_VERSION = "{{DESIGN_SYSTEM_VERSION}}";
const COMMANDS_VERSION = "{{COMMANDS_VERSION}}";
const DESIGN_SYSTEM_DOWNLOAD_URL = "{{DESIGN_SYSTEM_DOWNLOAD_URL}}";
const COMMANDS_DOWNLOAD_URL = "{{COMMANDS_DOWNLOAD_URL}}";

const designSystemVersions = [
  {
    version: DESIGN_SYSTEM_VERSION,
    date: "January 2025",
    isCurrent: true,
    downloadUrl: DESIGN_SYSTEM_DOWNLOAD_URL,
    summary: "Latest design tokens with updated component specifications.",
    releaseNotes: [
      { type: "added" as const, text: "New color tokens for dark mode variants" },
      { type: "added" as const, text: "Typography scale documentation" },
      { type: "changed" as const, text: "Updated spacing system to 4px base grid" },
      { type: "fixed" as const, text: "Button component hover state inconsistencies" },
    ],
  },
  {
    version: "v2.0.0",
    date: "December 2024",
    isCurrent: false,
    downloadUrl: "#",
    summary: "Major update with new component library structure.",
    releaseNotes: [
      { type: "added" as const, text: "Complete component library documentation" },
      { type: "added" as const, text: "Figma integration tokens" },
      { type: "changed" as const, text: "Restructured file organization" },
      { type: "removed" as const, text: "Deprecated v1 token format" },
    ],
  },
  {
    version: "v1.5.0",
    date: "November 2024",
    isCurrent: false,
    downloadUrl: "#",
    summary: "Enhanced form components and input patterns.",
    releaseNotes: [
      { type: "added" as const, text: "Form validation patterns" },
      { type: "added" as const, text: "Input component variants" },
      { type: "fixed" as const, text: "Select dropdown z-index issues" },
    ],
  },
];

const commandsVersions = [
  {
    version: COMMANDS_VERSION,
    date: "January 2025",
    isCurrent: true,
    downloadUrl: COMMANDS_DOWNLOAD_URL,
    summary: "New commands for ticket writing and spec generation.",
    releaseNotes: [
      { type: "added" as const, text: "/ticket command for structured ticket creation" },
      { type: "added" as const, text: "/spec command for technical specifications" },
      { type: "added" as const, text: "/review command for design reviews" },
      { type: "changed" as const, text: "Improved prompts for better output quality" },
    ],
  },
  {
    version: "v1.1.0",
    date: "December 2024",
    isCurrent: false,
    downloadUrl: "#",
    summary: "Added documentation generation commands.",
    releaseNotes: [
      { type: "added" as const, text: "/docs command for API documentation" },
      { type: "added" as const, text: "/changelog command for release notes" },
      { type: "fixed" as const, text: "Template variable substitution" },
    ],
  },
  {
    version: "v1.0.0",
    date: "November 2024",
    isCurrent: false,
    downloadUrl: "#",
    summary: "Initial release with core commands.",
    releaseNotes: [
      { type: "added" as const, text: "Basic ticket template" },
      { type: "added" as const, text: "Component documentation template" },
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
                <Link href="/" className={styles.link}>
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
