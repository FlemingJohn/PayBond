import { BondCard } from "../../components/BondCard/BondCard"
import { Analytics } from "../../components/Analytics/Analytics"
import { ActivityFeed } from "../../components/ActivityFeed/ActivityFeed"
import { useBonds } from "../../hooks/useBonds"
import styles from "./Dashboard.module.css"

export function Dashboard() {
  const bonds = useBonds()

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Overview</span>
        <h2 className={styles.title}>Bonds</h2>
      </div>

      <Analytics bonds={bonds} />

      <section className={styles.section}>
        <span className={styles.sectionTitle}>All bonds</span>
        <div className={styles.grid}>
          {bonds.map((bond) => (
            <BondCard key={bond.id} bond={bond} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionTitle}>Activity</span>
        <ActivityFeed bonds={bonds} />
      </section>
    </main>
  )
}
