import { StatusTag } from "../StatusTag/StatusTag"
import { Countdown } from "../Countdown/Countdown"
import { shorten, formatAmount } from "../../lib/format"
import type { Bond } from "../../types/bond"
import styles from "./BondCard.module.css"

export function BondCard({ bond }: { bond: Bond }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <StatusTag status={bond.status} />
        {bond.status === "open" ? <Countdown deadline={bond.deadline} /> : null}
      </div>
      <div className={styles.amount}>
        <span className={styles.value}>{formatAmount(bond.amount)}</span>
        <span className={styles.unit}>FXRP</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.payee}>{bond.payee}</span>
        <span className={styles.ref}>{shorten(bond.reference, 6)}</span>
      </div>
    </article>
  )
}
