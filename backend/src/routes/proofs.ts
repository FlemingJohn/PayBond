import type { FastifyInstance } from "fastify"
import { paymentRequest, nonexistenceRequest, type NonexistenceParams } from "../services/attestation/request"
import { submitAttestationRequest } from "../services/chain/contract"
import { waitForProof } from "../services/attestation/poll"

export async function proofRoutes(app: FastifyInstance) {
  app.post("/proofs/payment", async (request) => {
    const body = request.body as { transactionId: string }
    const encoded = await paymentRequest(body.transactionId)
    const round = await submitAttestationRequest(encoded)
    return waitForProof(round, encoded)
  })

  app.post("/proofs/nonexistence", async (request) => {
    const params = request.body as NonexistenceParams
    const encoded = await nonexistenceRequest(params)
    const round = await submitAttestationRequest(encoded)
    return waitForProof(round, encoded)
  })
}
