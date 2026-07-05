import { bonds } from "../lib/mock"
import type { Bond } from "../types/bond"

export function useBonds(): Bond[] {
  return bonds
}

export function useBond(id: number): Bond | undefined {
  return bonds.find((bond) => bond.id === id)
}
