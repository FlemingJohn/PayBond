import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { SettlementLine } from "../../components/SettlementLine/SettlementLine"
import { Button } from "../../components/Button/Button"
import styles from "./Landing.module.css"

const steps = [
  { name: "Lock", text: "The buyer locks FXRP and receives a payment reference." },
  { name: "Pay", text: "The buyer pays in XRP with that reference before the deadline." },
  { name: "Settle", text: "Paid returns the deposit. Unpaid releases it to the supplier." }
]

export function Landing() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Cross-chain payment guarantees</span>
          <h1 className={styles.title}>Pay on time, or the deposit is theirs.</h1>
          <p className={styles.lead}>
            Lock a deposit in FXRP on Flare against an XRP payment. Pay before the deadline and it
            returns to you. Miss it and the supplier takes it. No middleman decides.
          </p>
          <div className={styles.actions}>
            <Link to="/create">
              <Button>Create a bond</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">View bonds</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.line}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SettlementLine />
        </motion.div>
      </section>

      <section className={styles.steps}>
        {steps.map((step) => (
          <div key={step.name} className={styles.step}>
            <span className={styles.stepName}>{step.name}</span>
            <p>{step.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
