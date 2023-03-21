import type { FastifyInstance } from "fastify";
import { APIPrefix } from "../../constants/api";
import { PatchFruitBody, PatchFruitParams } from "./fruit.type";

import FruitService from "./fruit.service";

export default async function FruitController(fastify: FastifyInstance) {
  const prefix = `${APIPrefix}/fruits`;

  const fruitService = await FruitService(fastify);

  fastify.get(`${prefix}`, async (req, rep) => {
    const fruits = await fruitService.findAll();

    rep.code(200).send(fruits);
  });

  fastify.get<{ Params: { id: number } }>(`${prefix}/:id`, async (req, rep) => {
    const { id } = req.params;

    const fruit = await fruitService.findOneBy(id);

    rep.code(200).send(fruit);
  });

  fastify.patch<{
    Params: PatchFruitParams;
    Body: PatchFruitBody;
  }>(`${prefix}/:id`, async (req, rep) => {
    const { id } = req.params;
    const { action } = req.body;

    await fruitService.update({ id, action });

    rep.code(200);
  });
}
