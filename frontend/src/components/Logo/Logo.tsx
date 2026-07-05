import styles from "./Logo.module.css"

export function Logo() {
  return (
    <svg viewBox="0 0 24 24" className={styles.logo} role="img" aria-label="PayBond">
      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" className={styles.frame} />
      <line x1="7" y1="12" x2="17" y2="12" className={styles.bar} />
    </svg>
  )
}
