import { BondCard } from "../../components/BondCard/BondCard"
import { useBonds } from "../../hooks/useBonds"
import styles from "./Dashboard.module.css"

export function Dashboard() {
  const bonds = useBonds()
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Bonds</h2>
      <div className={styles.grid}>
        {bonds.map((bond) => (
          <BondCard key={bond.id} bond={bond} />
        ))}
      </div>
    </main>
  )
}
