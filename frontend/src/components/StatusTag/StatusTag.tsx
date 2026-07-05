import type { BondStatus } from "../../types/bond"
import styles from "./StatusTag.module.css"

const labels: Record<BondStatus, string> = {
  open: "Open",
  reclaimed: "Reclaimed",
  claimed: "Claimed"
}

export function StatusTag({ status }: { status: BondStatus }) {
  return (
    <span className={styles.tag} data-status={status}>
      {labels[status]}
    </span>
  )
}
