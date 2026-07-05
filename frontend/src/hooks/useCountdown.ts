import { useEffect, useState } from "react"

export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  remaining: number
  expired: boolean
}

function compute(deadline: number): TimeLeft {
  const remaining = Math.max(0, deadline - Date.now())
  const total = Math.floor(remaining / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    remaining,
    expired: remaining === 0
  }
}

export function useCountdown(deadline: number): TimeLeft {
  const [time, setTime] = useState(() => compute(deadline))

  useEffect(() => {
    const timer = setInterval(() => setTime(compute(deadline)), 1000)
    return () => clearInterval(timer)
  }, [deadline])

  return time
}
