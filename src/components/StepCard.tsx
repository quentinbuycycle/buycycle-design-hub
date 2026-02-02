"use client";

import { ReactNode } from "react";
import styles from "./StepCard.module.css";

interface StepCardProps {
  number: number;
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function StepCard({ number, title, description, children, icon }: StepCardProps) {
  return (
    <div className={styles.card} id={`step-${number}`}>
      <div className={styles.header}>
        <div className={styles.numberBadge}>
          {icon || <span>{number}</span>}
        </div>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
