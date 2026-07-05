import { BondSeal } from "../../components/BondSeal/BondSeal"
import { PaymentDetails } from "../../components/PaymentDetails/PaymentDetails"
import { bonds } from "../../lib/mock"
import styles from "./PayBond.module.css"

const bond = bonds[0]

export function PayBond() {
  return (
    <main className={styles.main}>
      <div className={styles.visual}>
        <BondSeal
          reference={bond.reference}
          amount={bond.amount}
          createdAt={bond.createdAt}
          deadline={bond.deadline}
          status={bond.status}
          size={320}
        />
      </div>
      <PaymentDetails bond={bond} />
    </main>
  )
}
