import { buildStats } from "../../lib/stats"
import { formatAmount } from "../../lib/format"
import type { Bond } from "../../types/bond"
import styles from "./Analytics.module.css"

export function Analytics({ bonds }: { bonds: Bond[] }) {
  const stats = buildStats(bonds)
  const items = [
    { value: formatAmount(stats.locked), label: "FXRP locked" },
    { value: String(stats.activeCount), label: "Active bonds" },
    { value: String(stats.total), label: "Total bonds" },
    { value: `${stats.defaultRate}%`, label: "Default rate" }
  ]

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.label} className={styles.stat}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
