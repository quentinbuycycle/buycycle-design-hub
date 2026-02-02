"use client";

import { useState, useEffect } from "react";
import styles from "./ProgressNav.module.css";

interface Section {
  id: string;
  title: string;
  number: number;
}

interface ProgressNavProps {
  sections: Section[];
}

export function ProgressNav({ sections }: ProgressNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate progress
      const totalScrollable = documentHeight - windowHeight;
      const currentProgress = Math.min((scrollPosition / totalScrollable) * 100, 100);
      setProgress(currentProgress);

      // Find active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 3) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ height: `${progress}%` }} />
      </div>
      <div className={styles.sections}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.section} ${activeSection === section.id ? styles.active : ""}`}
            onClick={() => scrollToSection(section.id)}
          >
            <span className={styles.number}>{section.number}</span>
            <span className={styles.title}>{section.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
