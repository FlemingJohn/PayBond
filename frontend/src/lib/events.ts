import type { Bond } from "../types/bond"

export type BondEventKind = "created" | "paid" | "reclaimed" | "claimed"

export type BondEvent = {
  id: string
  bondId: number
  kind: BondEventKind
  at: number
  payee: string
}

const labels: Record<BondEventKind, string> = {
  created: "Bond created",
  paid: "Payment detected",
  reclaimed: "Deposit reclaimed",
  claimed: "Deposit claimed"
}

export function eventLabel(kind: BondEventKind): string {
  return labels[kind]
}

export function buildEvents(bonds: Bond[]): BondEvent[] {
  const events: BondEvent[] = []
  for (const bond of bonds) {
    events.push({ id: `${bond.id}-created`, bondId: bond.id, kind: "created", at: bond.createdAt, payee: bond.payee })
    if (bond.paidAt) {
      events.push({ id: `${bond.id}-paid`, bondId: bond.id, kind: "paid", at: bond.paidAt, payee: bond.payee })
    }
    if (bond.settledAt && bond.status === "reclaimed") {
      events.push({ id: `${bond.id}-reclaimed`, bondId: bond.id, kind: "reclaimed", at: bond.settledAt, payee: bond.payee })
    }
    if (bond.settledAt && bond.status === "claimed") {
      events.push({ id: `${bond.id}-claimed`, bondId: bond.id, kind: "claimed", at: bond.settledAt, payee: bond.payee })
    }
  }
  return events.sort((a, b) => b.at - a.at)
}
