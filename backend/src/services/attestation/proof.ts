import { config } from "../../config/env"

export type ProofResult = {
  proof: `0x${string}`[]
  response: unknown
}

export async function getProof(votingRoundId: number, request: `0x${string}`): Promise<ProofResult> {
  const url = `${config.daLayerUrl}/api/v1/fdc/proof-by-request-round-raw`
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votingRoundId, requestBytes: request })
  })
  if (!response.ok) throw new Error(`proof fetch failed ${response.status}`)
  return (await response.json()) as ProofResult
}
