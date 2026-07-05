import { BondCard } from "../../components/BondCard/BondCard"
import { useBonds } from "../../hooks/useBonds"
import styles from "./Dashboard.module.css"

export function Dashboard() {
  const bonds = useBonds()
  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{bonds.length} total</span>
        <h2 className={styles.title}>Bonds</h2>
      </div>
      <div className={styles.grid}>
        {bonds.map((bond) => (
          <BondCard key={bond.id} bond={bond} />
        ))}
      </div>
    </main>
  )
}
