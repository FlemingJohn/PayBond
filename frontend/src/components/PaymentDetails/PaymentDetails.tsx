import { CopyField } from "../CopyField/CopyField"
import { Countdown } from "../Countdown/Countdown"
import type { Bond } from "../../types/bond"
import styles from "./PaymentDetails.module.css"

export function PaymentDetails({ bond }: { bond: Bond }) {
  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <span className={styles.title}>Send this XRP payment</span>
        <Countdown deadline={bond.deadline} />
      </div>
      <CopyField label="Destination" value={bond.payeeAddress} />
      <CopyField label="Amount" value={`${bond.amount} XRP`} />
      <CopyField label="Memo reference" value={bond.reference} />
    </div>
  )
}
