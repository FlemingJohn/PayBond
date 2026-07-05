import { statusLabels, type DisplayStatus } from "../../lib/status"
import styles from "./StatusTag.module.css"

export function StatusTag({ status }: { status: DisplayStatus }) {
  return (
    <span className={styles.tag} data-status={status}>
      {statusLabels[status]}
    </span>
  )
}
