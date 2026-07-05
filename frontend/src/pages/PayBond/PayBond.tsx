import { SettlementLine } from "../../components/SettlementLine/SettlementLine"
import { PaymentDetails } from "../../components/PaymentDetails/PaymentDetails"
import { formatAmount } from "../../lib/format"
import { bonds } from "../../lib/mock"
import styles from "./PayBond.module.css"

const bond = bonds[0]

export function PayBond() {
  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Pay this bond</span>
        <span className={styles.amount}>
          {formatAmount(bond.amount)} <span className={styles.unit}>FXRP</span>
        </span>
      </div>
      <SettlementLine />
      <div className={styles.panel}>
        <PaymentDetails bond={bond} />
      </div>
    </main>
  )
}
