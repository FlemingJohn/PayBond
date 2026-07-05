import { Link } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { bonds } from "../../lib/mock"
import { formatAmount, padTwo } from "../../lib/format"
import styles from "./Landing.module.css"

const steps = [
  { name: "Lock", text: "The buyer locks FXRP and receives a payment reference." },
  { name: "Pay", text: "The buyer pays in XRP with that reference before the deadline." },
  { name: "Settle", text: "Paid returns the deposit. Unpaid releases it to the supplier." }
]

const secured = bonds.reduce((sum, bond) => sum + bond.amount, 0)

export function Landing() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
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
      </section>

      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{formatAmount(secured)}</span>
          <span className={styles.statLabel}>FXRP secured</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{bonds.length}</span>
          <span className={styles.statLabel}>Bonds created</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Disputes</span>
        </div>
      </section>

      <section className={styles.how}>
        <span className={styles.sectionEyebrow}>How it works</span>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={step.name} className={styles.step}>
              <span className={styles.stepNum}>{padTwo(index + 1)}</span>
              <h3 className={styles.stepName}>{step.name}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
