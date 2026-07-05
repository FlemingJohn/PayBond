import type { Bond } from "../types/bond"

export type DisplayStatus = "funded" | "paid" | "expired" | "reclaimed" | "claimed"

export function deriveStatus(bond: Bond): DisplayStatus {
  if (bond.status === "reclaimed") return "reclaimed"
  if (bond.status === "claimed") return "claimed"
  if (bond.paidAt) return "paid"
  if (bond.deadline < Date.now()) return "expired"
  return "funded"
}

export const statusLabels: Record<DisplayStatus, string> = {
  funded: "Funded",
  paid: "Paid",
  expired: "Expired",
  reclaimed: "Reclaimed",
  claimed: "Claimed"
}
