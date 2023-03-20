import Fastify from "fastify";
import mysql from "./plugins/db";
import { Fruit } from "./modules";
import { SERVER } from "./constants/env";

const fastify = Fastify({
  logger: true,
});

fastify.register(mysql);
fastify.register(Fruit);

const start = async () => {
  try {
    await fastify.listen({ host: SERVER.HOST, port: SERVER.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
