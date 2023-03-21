import type { FastifyInstance } from "fastify";

/**
 *
 * Require for health check in aws app runner
 */
export default async function HealthCheckController(fastify: FastifyInstance) {
  fastify.get("/", async (req, rep) => {
    rep.code(200).send(`health check OK! ${Date().toLocaleString()}`);
  });
}
