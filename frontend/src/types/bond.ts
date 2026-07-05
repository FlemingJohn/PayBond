export type BondStatus = "open" | "reclaimed" | "claimed"

export type Bond = {
  id: number
  reference: string
  amount: number
  payee: string
  payeeAddress: string
  createdAt: number
  deadline: number
  status: BondStatus
  paidAt?: number
  settledAt?: number
}
