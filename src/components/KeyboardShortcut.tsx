import styles from "./KeyboardShortcut.module.css";

interface KeyboardShortcutProps {
  keys: string[];
  description: string;
}

export function KeyboardShortcut({ keys, description }: KeyboardShortcutProps) {
  return (
    <div className={styles.shortcut}>
      <div className={styles.keys}>
        {keys.map((key, index) => (
          <span key={index}>
            <kbd className={styles.key}>{key}</kbd>
            {index < keys.length - 1 && <span className={styles.plus}>+</span>}
          </span>
        ))}
      </div>
      <span className={styles.description}>{description}</span>
    </div>
  );
}

interface ShortcutGridProps {
  shortcuts: KeyboardShortcutProps[];
}

export function ShortcutGrid({ shortcuts }: ShortcutGridProps) {
  return (
    <div className={styles.grid}>
      {shortcuts.map((shortcut, index) => (
        <KeyboardShortcut key={index} {...shortcut} />
      ))}
    </div>
  );
}
