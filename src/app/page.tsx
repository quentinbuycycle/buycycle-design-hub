import {
  CodeBlock,
  StepCard,
  ShortcutGrid,
  WorkspaceLayout,
  ProgressNav,
  Accordion,
  AccordionGroup,
} from "@/components";
import styles from "./page.module.css";
import Link from "next/link";

const sections = [
  { id: "step-1", title: "Install Claude Code", number: 1 },
  { id: "step-2", title: "Install Cursor", number: 2 },
  { id: "step-3", title: "Add Extension", number: 3 },
  { id: "step-4", title: "Workspace Layout", number: 4 },
  { id: "step-5", title: "Design System", number: 5 },
  { id: "step-6", title: "Commands Setup", number: 6 },
];

const shortcuts = [
  { keys: ["Cmd", "B"], description: "Toggle file explorer" },
  { keys: ["Cmd", "Shift", "P"], description: "Command palette" },
  { keys: ["Cmd", "K", "V"], description: "Preview to side" },
  { keys: ["Cmd", "Shift", "X"], description: "Extensions panel" },
  { keys: ["Cmd", "Shift", "G"], description: "Go to folder in Finder" },
  { keys: ["/"], description: "Show commands in Claude" },
];

export default function SetupPage() {
  return (
    <>
      <ProgressNav sections={sections} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>buycycle internal tooling</span>
          </div>
          <h1 className={styles.heroTitle}>
            Claude Code + Cursor
            <span className={styles.heroTitleAccent}> Setup</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your AI-powered workflow for writing tickets, specs, and documentation
          </p>
          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>~20 minutes</span>
            </div>
            <div className={styles.metaItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>6 steps</span>
            </div>
          </div>
        </div>
        <div className={styles.heroGlow} />
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.stepsGrid}>
            {/* Step 1: Install Claude Code */}
            <StepCard
              number={1}
              title="Install Claude Code"
              description="The CLI that powers your AI workflow"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              }
            >
              <p>Open Terminal and run the installation command:</p>
              <CodeBlock
                code="curl -fsSL https://claude.ai/install.sh | sh"
                language="bash"
              />
              <p>Once installed, verify it&apos;s working:</p>
              <CodeBlock code="claude --version" language="bash" />
              <p>
                Then authenticate by running <code>claude</code> and following the browser login prompt.
                You&apos;ll be redirected to sign in with your Anthropic account.
              </p>
            </StepCard>

            {/* Step 2: Install Cursor */}
            <StepCard
              number={2}
              title="Install Cursor"
              description="The AI-first code editor"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              }
            >
              <p>
                Download Cursor from{" "}
                <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  cursor.com
                </a>
              </p>
              <ul>
                <li>Open the downloaded .dmg file</li>
                <li>Drag Cursor to your Applications folder</li>
                <li>Launch Cursor and complete the initial setup</li>
                <li>
                  <strong>Skip VS Code import</strong> if you don&apos;t use VS Code — it&apos;s not required
                </li>
              </ul>
            </StepCard>

            {/* Step 3: Add Claude Code Extension */}
            <StepCard
              number={3}
              title="Add Claude Code Extension"
              description="Connect Claude to your editor"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              }
            >
              <ol>
                <li>
                  Open the Extensions panel with <code>Cmd + Shift + X</code>
                </li>
                <li>Search for <strong>&quot;Claude Code&quot;</strong> by Anthropic</li>
                <li>Click Install</li>
                <li>
                  Verify it&apos;s working: <code>Cmd + Shift + P</code> → type <strong>&quot;Claude: Open in Editor&quot;</strong>
                </li>
              </ol>
              <p className={styles.tip}>
                <strong>Tip:</strong> If you don&apos;t see the extension, make sure you&apos;re on the latest version of Cursor.
              </p>
            </StepCard>

            {/* Step 4: Workspace Layout */}
            <StepCard
              number={4}
              title="Workspace Layout"
              description="Set up the optimal 3-panel view"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
              }
            >
              <p>For the best workflow, arrange your workspace with three panels:</p>
              <WorkspaceLayout />
              <div className={styles.shortcutsCard}>
                <h4>Key shortcuts for this layout:</h4>
                <ShortcutGrid
                  shortcuts={[
                    { keys: ["Cmd", "B"], description: "Toggle file explorer" },
                    { keys: ["Cmd", "Shift", "P"], description: "Open Claude" },
                    { keys: ["Cmd", "K", "V"], description: "Preview to side" },
                  ]}
                />
              </div>
            </StepCard>

            {/* Step 5: Design System Setup */}
            <StepCard
              number={5}
              title="Design System Setup"
              description="Configure buycycle's design tokens"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              }
            >
              <ol>
                <li>
                  <Link href="/downloads" className={styles.link}>Download the design system</Link> from the Downloads page
                </li>
                <li>
                  Find the <code>.claude</code> folder: <code>Cmd + Shift + G</code> in Finder → type <code>~/.claude</code>
                </li>
                <li>
                  If the folder doesn&apos;t exist, create it using Terminal:
                  <CodeBlock code="mkdir -p ~/.claude && open ~/.claude" language="bash" />
                </li>
                <li>Unzip the downloaded file and copy its contents into <code>~/.claude/</code></li>
              </ol>
              <p className={styles.note}>
                The design system files help Claude understand buycycle&apos;s component library,
                color tokens, and UI patterns.
              </p>
            </StepCard>

            {/* Step 6: Commands Setup */}
            <StepCard
              number={6}
              title="Commands Setup"
              description="Add custom slash commands"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              }
            >
              <ol>
                <li>
                  <Link href="/downloads" className={styles.link}>Download the commands</Link> from the Downloads page
                </li>
                <li>
                  Create the commands folder if it doesn&apos;t exist:
                  <CodeBlock code="mkdir -p ~/.claude/commands" language="bash" />
                </li>
                <li>Unzip and copy the command files into <code>~/.claude/commands/</code></li>
                <li>
                  Verify by typing <code>/</code> in Claude Code chat — you should see custom commands appear
                </li>
              </ol>
              <p className={styles.note}>
                Commands give you quick access to common workflows like writing tickets,
                creating specs, and following buycycle conventions.
              </p>
            </StepCard>
          </div>
        </div>
      </section>

      {/* Quick Reference Section */}
      <section className={styles.referenceSection}>
        <div className={styles.container}>
          <div className={styles.referenceCard}>
            <h2 className={styles.referenceTitle}>Quick Reference</h2>
            <p className={styles.referenceSubtitle}>
              All the keyboard shortcuts you&apos;ll need
            </p>
            <ShortcutGrid shortcuts={shortcuts} />
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className={styles.troubleshootingSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Troubleshooting</h2>
          <p className={styles.sectionSubtitle}>
            Common issues and how to fix them
          </p>
          <AccordionGroup>
            <Accordion title="I can't find the .claude folder">
              <p>
                The <code>.claude</code> folder is hidden by default. You can access it by:
              </p>
              <ul>
                <li>In Finder: Press <code>Cmd + Shift + G</code> and type <code>~/.claude</code></li>
                <li>Or show hidden files: Press <code>Cmd + Shift + .</code> in Finder</li>
                <li>
                  If it doesn&apos;t exist, create it:
                  <CodeBlock code="mkdir -p ~/.claude" language="bash" />
                </li>
              </ul>
            </Accordion>
            <Accordion title="Commands are not showing up when I type /">
              <p>Try these steps:</p>
              <ol>
                <li>Make sure the command files are in <code>~/.claude/commands/</code> (not a subfolder)</li>
                <li>Each command should be a <code>.md</code> file</li>
                <li>Restart Cursor after adding new commands</li>
                <li>Verify Claude Code extension is installed and enabled</li>
              </ol>
            </Accordion>
            <Accordion title="Authentication issues with Claude Code">
              <p>If you&apos;re having trouble authenticating:</p>
              <ol>
                <li>Make sure you have an Anthropic account</li>
                <li>
                  Try running <code>claude logout</code> then <code>claude</code> to re-authenticate
                </li>
                <li>Check your internet connection</li>
                <li>Clear your browser cookies and try the login again</li>
              </ol>
            </Accordion>
            <Accordion title="Claude Code extension not working in Cursor">
              <p>Check these common issues:</p>
              <ul>
                <li>Make sure you&apos;re using the latest version of Cursor</li>
                <li>Try disabling and re-enabling the extension</li>
                <li>Check the Output panel (View → Output) for error messages</li>
                <li>Reinstall the extension from the marketplace</li>
              </ul>
            </Accordion>
          </AccordionGroup>
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
