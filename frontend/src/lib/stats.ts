import type { Bond } from "../types/bond"

export type Stats = {
  locked: number
  activeCount: number
  total: number
  defaultRate: number
}

export function buildStats(bonds: Bond[]): Stats {
  const active = bonds.filter((bond) => bond.status === "open")
  const claimed = bonds.filter((bond) => bond.status === "claimed")
  const settled = bonds.filter((bond) => bond.status === "claimed" || bond.status === "reclaimed")
  return {
    locked: active.reduce((sum, bond) => sum + bond.amount, 0),
    activeCount: active.length,
    total: bonds.length,
    defaultRate: settled.length ? Math.round((claimed.length / settled.length) * 100) : 0
  }
}
