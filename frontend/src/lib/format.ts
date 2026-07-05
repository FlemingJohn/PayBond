export function shorten(value: string, size = 6): string {
  if (value.length <= size * 2 + 2) return value
  return `${value.slice(0, size + 2)}…${value.slice(-size)}`
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US")
}

export function padTwo(value: number): string {
  return value.toString().padStart(2, "0")
}

type Clock = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

export function formatClock(time: Clock): string {
  if (time.expired) return "expired"
  const hh = padTwo(time.hours)
  const mm = padTwo(time.minutes)
  const ss = padTwo(time.seconds)
  return time.days > 0 ? `${time.days}d ${hh}:${mm}` : `${hh}:${mm}:${ss}`
}
