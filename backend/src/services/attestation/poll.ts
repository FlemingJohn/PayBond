import { getProof, type ProofResult } from "./proof"

const maxAttempts = 20
const delayMs = 15000

export async function waitForProof(votingRoundId: number, request: `0x${string}`): Promise<ProofResult> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await tryProof(votingRoundId, request)
    if (result) return result
    await sleep(delayMs)
  }
  throw new Error("proof not ready")
}

async function tryProof(votingRoundId: number, request: `0x${string}`): Promise<ProofResult | null> {
  try {
    const result = await getProof(votingRoundId, request)
    return result.proof.length > 0 ? result : null
  } catch {
    return null
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
