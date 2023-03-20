import fp from "fastify-plugin";
import controller from "./fruit.controller";
import service from "./fruit.service";
import entity from "./fruit.entity";
import repository from "./fruit.repository";
import type { FastifyInstance } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    fruit: {
      controller: typeof controller;
      service: typeof service;
      repository: typeof repository;
      entity: typeof entity;
    };
  }
}

const Fruit = async (fastify: FastifyInstance) => {
  const Fruit = {
    controller: controller(fastify),
    service: service(fastify),
    repository: repository(fastify),
    entity,
  };

  fastify.decorate("fruit", Fruit);
};

export default fp(Fruit);
