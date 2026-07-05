import type { Bond } from "../types/bond"

const day = 86400000
const now = Date.now()

export const bonds: Bond[] = [
  {
    id: 1,
    reference: "0x9c1f4a7e0b3d5286c4f1a90e77b2d3c8f0a15e6b9d2c4487a1e3f6b8c0d2e4f6a",
    amount: 250,
    payee: "Northwind Supply",
    payeeAddress: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
    createdAt: now - day * 2,
    deadline: now + day * 3 + 48600000,
    status: "open"
  },
  {
    id: 2,
    reference: "0x3f80b1c2d9e4a6785c0f2a13e845b7d6c9f0e1a2b3c4d5e6f70819a2b3c4d5e6f",
    amount: 1200,
    payee: "Harbor Logistics",
    payeeAddress: "rHb9CJAWyB4rj91VRWn96DkukG4bwABpp1",
    createdAt: now - day * 9,
    deadline: now - day * 2,
    status: "reclaimed"
  },
  {
    id: 3,
    reference: "0x7a12e5d8c3b4906f1e2d3c4b5a69788f0e1d2c3b4a59687f0e1d2c3b4a596871f",
    amount: 480,
    payee: "Cedar Works",
    payeeAddress: "rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w",
    createdAt: now - day * 12,
    deadline: now - day * 5,
    status: "claimed"
  }
]
