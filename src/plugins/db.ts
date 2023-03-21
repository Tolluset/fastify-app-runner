import "reflect-metadata";

import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { DataSource } from "typeorm";
import FruitEntity from "../modules/fruit/fruit.entity";
import { DB } from "../constants/env";

declare module "fastify" {
  export interface FastifyInstance {
    orm: DataSource;
  }
}

async function mysql(fastify: FastifyInstance) {
  const mysqlCon = new DataSource({
    type: "mysql",
    host: DB.HOST,
    port: DB.PORT,
    username: DB.USERNAME,
    password: DB.PASSWORD,
    database: DB.DATABASE,
    entities: [FruitEntity],
    synchronize: true,
  });

  await mysqlCon.initialize();
  await mysqlCon.manager.clear(FruitEntity);
  await mysqlCon.manager.insert(FruitEntity, [
    {
      type: "apple",
      quantity: 3,
    },
    {
      type: "banana",
      quantity: 2,
    },
    {
      type: "carrot",
      quantity: 1,
    },
  ]);

  fastify.decorate("orm", mysqlCon);
  fastify.addHook("onClose", async (fastifyInstance, done) => {
    await fastifyInstance.orm.destroy();
    done();
  });

  return Promise.resolve();
}

export default fp(mysql);
