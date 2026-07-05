import { useState, type FormEvent } from "react"
import { Button } from "../../components/Button/Button"
import styles from "./CreateBond.module.css"

export function CreateBond() {
  const [payee, setPayee] = useState("")
  const [amount, setAmount] = useState("")
  const [deadline, setDeadline] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>New guarantee</span>
        <h2 className={styles.title}>Create a bond</h2>
        <p className={styles.lead}>Lock FXRP against an XRP payment. Set the supplier, the amount, and the deadline.</p>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <label className={styles.field}>
          <span>Supplier address</span>
          <input value={payee} onChange={(event) => setPayee(event.target.value)} placeholder="rXRPL address" />
        </label>
        <label className={styles.field}>
          <span>Amount FXRP</span>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="250"
            inputMode="decimal"
          />
        </label>
        <label className={styles.field}>
          <span>Deadline</span>
          <input value={deadline} onChange={(event) => setDeadline(event.target.value)} type="datetime-local" />
        </label>
        <Button type="submit">Lock deposit</Button>
      </form>
    </main>
  )
}
