import { useState } from "react"
import { Button } from "../Button/Button"
import type { Bond } from "../../types/bond"
import styles from "./BondActions.module.css"

type Phase = "idle" | "verifying" | "done"
type Action = "reclaim" | "claim"

export function BondActions({ bond }: { bond: Bond }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [action, setAction] = useState<Action | null>(null)

  const expired = bond.deadline < Date.now()

  function run(kind: Action) {
    setAction(kind)
    setPhase("verifying")
    setTimeout(() => setPhase("done"), 2600)
  }

  if (bond.status !== "open") {
    const target = bond.status === "reclaimed" ? "returned to the buyer" : "released to the supplier"
    return (
      <div className={styles.panel}>
        <span className={styles.title}>Settled</span>
        <p className={styles.note}>The deposit was {target}.</p>
      </div>
    )
  }

  if (phase === "done") {
    const result = action === "reclaim" ? "Deposit returned to the buyer." : "Deposit released to the supplier."
    return (
      <div className={styles.panel}>
        <span className={styles.title}>Done</span>
        <p className={styles.note}>{result}</p>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <span className={styles.title}>Settle this bond</span>
      {phase === "verifying" ? (
        <div className={styles.verifying}>
          <span className={styles.dot} />
          <span>Verifying {action === "reclaim" ? "payment" : "non-payment"} proof on Flare</span>
        </div>
      ) : (
        <div className={styles.actions}>
          <div className={styles.action}>
            <Button onClick={() => run("reclaim")}>Reclaim deposit</Button>
            <span className={styles.hint}>Buyer, after paying on time</span>
          </div>
          <div className={styles.action}>
            <Button variant="ghost" onClick={() => run("claim")} disabled={!expired}>
              Claim deposit
            </Button>
            <span className={styles.hint}>{expired ? "Supplier, deadline passed" : "Supplier, after the deadline"}</span>
          </div>
        </div>
      )}
    </div>
  )
}
