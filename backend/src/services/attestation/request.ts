import { stringToHex, zeroHash } from "viem"
import { config } from "../../config/env"

export type NonexistenceParams = {
  minimalBlockNumber: string
  deadlineBlockNumber: string
  deadlineTimestamp: string
  destinationAddressHash: `0x${string}`
  amount: string
  reference: `0x${string}`
}

type Prepared = {
  status: string
  abiEncodedRequest: `0x${string}`
}

async function prepareRequest(chain: string, type: string, source: string, requestBody: unknown): Promise<`0x${string}`> {
  const url = `${config.verifierUrl}/verifier/${chain}/${type}/prepareRequest`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": config.verifierApiKey
    },
    body: JSON.stringify({
      attestationType: stringToHex(type, { size: 32 }),
      sourceId: stringToHex(source, { size: 32 }),
      requestBody
    })
  })
  if (!response.ok) throw new Error(`prepare request failed ${response.status}`)
  const data = (await response.json()) as Prepared
  return data.abiEncodedRequest
}

export function paymentRequest(transactionId: string) {
  return prepareRequest("xrp", "Payment", "testXRP", {
    transactionId,
    inUtxo: "0",
    utxo: "0"
  })
}

export function nonexistenceRequest(params: NonexistenceParams) {
  return prepareRequest("xrp", "ReferencedPaymentNonexistence", "testXRP", {
    minimalBlockNumber: params.minimalBlockNumber,
    deadlineBlockNumber: params.deadlineBlockNumber,
    deadlineTimestamp: params.deadlineTimestamp,
    destinationAddressHash: params.destinationAddressHash,
    amount: params.amount,
    standardPaymentReference: params.reference,
    checkSourceAddresses: false,
    sourceAddressesRoot: zeroHash
  })
}
