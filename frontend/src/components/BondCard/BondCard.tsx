import { BondSeal } from "../BondSeal/BondSeal"
import { StatusTag } from "../StatusTag/StatusTag"
import { shorten } from "../../lib/format"
import type { Bond } from "../../types/bond"
import styles from "./BondCard.module.css"

export function BondCard({ bond }: { bond: Bond }) {
  return (
    <article className={styles.card}>
      <BondSeal
        reference={bond.reference}
        amount={bond.amount}
        createdAt={bond.createdAt}
        deadline={bond.deadline}
        status={bond.status}
        size={200}
      />
      <div className={styles.meta}>
        <StatusTag status={bond.status} />
        <span className={styles.payee}>{bond.payee}</span>
        <span className={styles.ref}>{shorten(bond.reference, 6)}</span>
      </div>
    </article>
  )
}
