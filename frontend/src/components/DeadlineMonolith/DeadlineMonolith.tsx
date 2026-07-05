import { Fragment } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useCountdown } from "../../hooks/useCountdown"
import { padTwo } from "../../lib/format"
import styles from "./DeadlineMonolith.module.css"

type DeadlineMonolithProps = {
  createdAt: number
  deadline: number
}

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" }
] as const

export function DeadlineMonolith({ createdAt, deadline }: DeadlineMonolithProps) {
  const time = useCountdown(deadline)
  const reduce = useReducedMotion()

  const total = Math.max(1, deadline - createdAt)
  const remaining = Math.min(1, Math.max(0, time.remaining / total))

  const values: Record<(typeof units)[number]["key"], number> = {
    days: time.days,
    hours: time.hours,
    minutes: time.minutes,
    seconds: time.seconds
  }

  return (
    <div className={styles.monolith}>
      <span className={styles.caption}>{time.expired ? "Deadline passed" : "Time left to pay"}</span>

      <div className={styles.clock}>
        {units.map((unit, index) => (
          <Fragment key={unit.key}>
            {index > 0 ? <span className={styles.colon}>:</span> : null}
            <div className={styles.unit}>
              <span className={styles.digits}>{padTwo(values[unit.key])}</span>
              <span className={styles.unitLabel}>{unit.label}</span>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ scaleX: remaining }}
          animate={{ scaleX: remaining }}
          transition={{ duration: reduce ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
