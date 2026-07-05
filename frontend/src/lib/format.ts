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

export function timeAgo(ts: number): string {
  const minutes = Math.floor((Date.now() - ts) / 60000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
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
