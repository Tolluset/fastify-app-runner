import type { FastifyInstance } from "fastify";
import { PatchFruitBody, PatchFruitParams } from "./fruit.type";
import FruitRepository from "./fruit.repository";

const FruitService = async (fastify: FastifyInstance) => {
  const fruitRepository = await FruitRepository(fastify);

  return {
    findOneBy: async (id: number) =>
      await fruitRepository.findOneBy({ id: id }),

    update: async ({ id, action }: PatchFruitBody & PatchFruitParams) => {
      const variance = action === "increment" ? "+ 1" : "- 1";

      return await fruitRepository.update(id, {
        quantity: () => `quantity ${variance}`,
      });
    },

    findAll: async () => await fruitRepository.find(),
  };
};

export default FruitService;
