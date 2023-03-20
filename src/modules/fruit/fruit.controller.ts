import type { FastifyInstance } from "fastify";
import { APIPrefix } from "../../constants/api";
import { PutDto } from "./fruit.dto";

import FruitService from "./fruit.service";

export default async function FruitController(fastify: FastifyInstance) {
  const prefix = `${APIPrefix}/fruits`;

  const fruitService = await FruitService(fastify);

  fastify.get<{ Params: { id: number } }>(`${prefix}/:id`, async (req, rep) => {
    const id = req.params.id;
    const fruit = await fruitService.findOneBy(id);

    rep.code(200).send(fruit);
  });

  fastify.put<{ Body: PutDto }>(`${prefix}`, async (req, rep) => {
    const { id, type, quantity } = req.body;
    await fruitService.update({ id, type, quantity });

    rep.code(200);
  });
}
