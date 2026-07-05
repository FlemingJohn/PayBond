import { useCountdown } from "../../hooks/useCountdown"
import { formatClock } from "../../lib/format"
import styles from "./Countdown.module.css"

export function Countdown({ deadline }: { deadline: number }) {
  const time = useCountdown(deadline)
  return (
    <span className={styles.clock} data-expired={time.expired}>
      {formatClock(time)}
    </span>
  )
}
