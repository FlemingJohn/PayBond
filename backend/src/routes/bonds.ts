import type { FastifyInstance } from "fastify"
import { readBond } from "../services/chain/contract"
import { paymentDetails } from "../services/xrpl/payment"

export async function bondRoutes(app: FastifyInstance) {
  app.get("/bonds/:id", async (request) => {
    const { id } = request.params as { id: string }
    return readBond(BigInt(id))
  })

  app.post("/bonds/:id/payment", async (request) => {
    const { id } = request.params as { id: string }
    const body = request.body as { destination: string; amountDrops: string }
    const bond = await readBond(BigInt(id))
    return paymentDetails(body.destination, body.amountDrops, bond.reference)
  })
}
