import { Link, useParams } from "react-router-dom"
import { useBond } from "../../hooks/useBonds"
import { StatusTag } from "../../components/StatusTag/StatusTag"
import { Countdown } from "../../components/Countdown/Countdown"
import { PaymentDetails } from "../../components/PaymentDetails/PaymentDetails"
import { BondActions } from "../../components/BondActions/BondActions"
import { formatAmount, shorten } from "../../lib/format"
import { deriveStatus } from "../../lib/status"
import styles from "./BondDetail.module.css"

export function BondDetail() {
  const params = useParams()
  const bond = useBond(Number(params.id))

  if (!bond) {
    return (
      <main className={styles.main}>
        <p className={styles.missing}>
          Bond not found. <Link to="/dashboard">Back to bonds</Link>
        </p>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Link to="/dashboard" className={styles.back}>
        Back to bonds
      </Link>

      <div className={styles.head}>
        <div className={styles.title}>
          <span className={styles.amount}>
            {formatAmount(bond.amount)} <span className={styles.unit}>FXRP</span>
          </span>
          <StatusTag status={deriveStatus(bond)} />
        </div>
        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Supplier</span>
            <span className={styles.metaValue}>{bond.payee}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Reference</span>
            <span className={styles.metaMono}>{shorten(bond.reference, 8)}</span>
          </div>
          <p className={styles.binding}>Locked one-time to this bond. A payment cannot be reused or replayed.</p>
          {bond.status === "open" ? (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Time left</span>
              <Countdown deadline={bond.deadline} />
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.body}>
        {bond.status === "open" ? <PaymentDetails bond={bond} /> : null}
        <BondActions bond={bond} />
      </div>
    </main>
  )
}
