import { motion, useReducedMotion } from "framer-motion"
import styles from "./SettlementLine.module.css"

const markerKeyframes = {
  cx: [95, 560, 560, 860],
  cy: [130, 130, 130, 76],
  opacity: [0, 1, 1, 0]
}

const markerTransition = {
  duration: 5,
  times: [0, 0.45, 0.55, 1],
  repeat: Infinity,
  ease: "easeInOut" as const
}

export function SettlementLine() {
  const reduce = useReducedMotion()

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 1000 260" className={styles.svg} role="img" aria-label="Bond settlement lifecycle">
        <line x1="95" y1="130" x2="560" y2="130" className={styles.rail} />
        {!reduce && <line x1="95" y1="130" x2="560" y2="130" className={styles.flow} />}
        <line x1="560" y1="130" x2="860" y2="76" className={styles.branchUp} />
        <line x1="560" y1="130" x2="860" y2="184" className={styles.branchDown} />
        <line x1="560" y1="102" x2="560" y2="158" className={styles.deadline} />

        {!reduce && (
          <motion.circle
            cx="560"
            cy="130"
            className={styles.pulse}
            initial={{ r: 6, opacity: 0.5 }}
            animate={{ r: [6, 24], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <circle cx="95" cy="130" r="7" className={styles.nodeBone} />
        <circle cx="560" cy="130" r="7" className={styles.nodeEmber} />
        <circle cx="860" cy="76" r="7" className={styles.nodeBone} />
        <circle cx="860" cy="184" r="7" className={styles.nodeEmber} />

        <motion.circle
          r="6"
          className={styles.marker}
          initial={{ cx: 95, cy: 130, opacity: 0 }}
          animate={reduce ? { cx: 860, cy: 76, opacity: 1 } : markerKeyframes}
          transition={reduce ? undefined : markerTransition}
        />

        <text x="95" y="164" className={styles.label}>LOCK</text>
        <text x="95" y="181" className={styles.sub}>FXRP escrowed</text>
        <text x="327" y="110" textAnchor="middle" className={styles.label}>PAY WINDOW</text>
        <text x="560" y="180" textAnchor="middle" className={styles.label}>DEADLINE</text>
        <text x="885" y="73" className={styles.label}>RECLAIMED</text>
        <text x="885" y="90" className={styles.sub}>paid on time</text>
        <text x="885" y="181" className={styles.labelEmber}>CLAIMED</text>
        <text x="885" y="198" className={styles.sub}>default</text>
      </svg>
    </div>
  )
}
