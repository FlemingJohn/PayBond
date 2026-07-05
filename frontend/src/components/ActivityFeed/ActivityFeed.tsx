import { Link } from "react-router-dom"
import { buildEvents, eventLabel } from "../../lib/events"
import { timeAgo } from "../../lib/format"
import type { Bond } from "../../types/bond"
import styles from "./ActivityFeed.module.css"

export function ActivityFeed({ bonds }: { bonds: Bond[] }) {
  const events = buildEvents(bonds)

  return (
    <div className={styles.feed}>
      {events.map((event) => (
        <Link key={event.id} to={`/bond/${event.bondId}`} className={styles.row} data-kind={event.kind}>
          <span className={styles.dot} />
          <span className={styles.label}>{eventLabel(event.kind)}</span>
          <span className={styles.payee}>{event.payee}</span>
          <span className={styles.time}>{timeAgo(event.at)}</span>
        </Link>
      ))}
    </div>
  )
}
