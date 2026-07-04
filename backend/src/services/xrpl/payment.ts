import { config } from "../../config/env"

export type PaymentDetails = {
  destination: string
  amountDrops: string
  memoHex: string
  explorerUrl: string
}

export function paymentDetails(destination: string, amountDrops: string, reference: `0x${string}`): PaymentDetails {
  return {
    destination,
    amountDrops,
    memoHex: reference.slice(2),
    explorerUrl: `${config.xrplExplorerUrl}/accounts/${destination}`
  }
}
