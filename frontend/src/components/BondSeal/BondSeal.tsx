import { useId } from "react"
import { motion } from "framer-motion"
import { useCountdown } from "../../hooks/useCountdown"
import { formatAmount, formatClock } from "../../lib/format"
import type { BondStatus } from "../../types/bond"
import styles from "./BondSeal.module.css"

type BondSealProps = {
  reference: string
  amount: number
  createdAt: number
  deadline: number
  status: BondStatus
  size?: number
}

const view = 300
const center = view / 2
const radius = 118
const rimRadius = 138
const circumference = 2 * Math.PI * radius

const labels: Record<BondStatus, string> = {
  open: "Open",
  reclaimed: "Reclaimed",
  claimed: "Claimed"
}

function rimPath(): string {
  return `M ${center} ${center - rimRadius} A ${rimRadius} ${rimRadius} 0 1 1 ${center - 0.01} ${center - rimRadius}`
}

export function BondSeal({ reference, amount, createdAt, deadline, status, size = 300 }: BondSealProps) {
  const time = useCountdown(deadline)
  const rimId = useId()

  const total = Math.max(1, deadline - createdAt)
  const elapsed = Math.min(1, Math.max(0, (Date.now() - createdAt) / total))
  const fill = status === "open" ? 1 - elapsed : status === "reclaimed" ? 1 : 1
  const offset = circumference * (1 - fill)
  const arcColor = status === "reclaimed" ? "var(--bone)" : "var(--ember)"

  return (
    <div className={styles.seal} style={{ width: size, height: size }} data-status={status}>
      <svg viewBox={`0 0 ${view} ${view}`} className={styles.svg}>
        <defs>
          <path id={rimId} d={rimPath()} />
        </defs>

        <circle cx={center} cy={center} r={radius} className={styles.track} />

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          className={styles.arc}
          stroke={arcColor}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90 ${center} ${center})`}
        />

        <g className={styles.rim}>
          <text>
            <textPath href={`#${rimId}`}>{reference}</textPath>
          </text>
        </g>
      </svg>

      <div className={styles.face}>
        <span className={styles.amount}>{formatAmount(amount)}</span>
        <span className={styles.unit}>FXRP</span>
        {status === "open" ? (
          <span className={styles.clock}>{formatClock(time)}</span>
        ) : (
          <span className={styles.state}>{labels[status]}</span>
        )}
      </div>
    </div>
  )
}
