"use client";

import styles from "./WorkspaceLayout.module.css";

export function WorkspaceLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <span className={styles.red} />
            <span className={styles.yellow} />
            <span className={styles.green} />
          </div>
          <span className={styles.windowTitle}>Cursor — buycycle-tickets</span>
        </div>
        <div className={styles.editor}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>EXPLORER</div>
            <div className={styles.fileTree}>
              <div className={styles.folder}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z"/>
                </svg>
                <span>buycycle-tickets</span>
              </div>
              <div className={styles.file}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>ticket-template.md</span>
              </div>
              <div className={styles.file}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>design-spec.md</span>
              </div>
            </div>
            <div className={styles.sidebarLabel}>Left: File Explorer</div>
          </div>

          <div className={styles.mainPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.claudeIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <span>Claude Code</span>
            </div>
            <div className={styles.chatContent}>
              <div className={styles.userMessage}>
                Help me write a ticket for adding a filter feature to the search page
              </div>
              <div className={styles.claudeMessage}>
                <div className={styles.messageHeader}>Claude</div>
                I&apos;ll help you create a detailed ticket for the filter feature. Let me structure this according to buycycle&apos;s design system...
              </div>
            </div>
            <div className={styles.panelLabel}>Center: Claude Code Chat</div>
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.panelHeader}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>Preview</span>
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewDoc}>
                <h4># Filter Feature Ticket</h4>
                <p>## Overview</p>
                <p className={styles.previewText}>Add advanced filtering capabilities to the search results page...</p>
              </div>
            </div>
            <div className={styles.panelLabel}>Right: Output Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}
