import Fastify from "fastify"
import { config } from "./config/env"
import { bondRoutes } from "./routes/bonds"
import { proofRoutes } from "./routes/proofs"

const app = Fastify({ logger: true })

app.register(bondRoutes)
app.register(proofRoutes)

app.listen({ port: config.port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error)
  process.exit(1)
})
