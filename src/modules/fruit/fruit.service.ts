import type { FastifyInstance } from "fastify";
import { PutDto } from "./fruit.dto";
import FruitRepository from "./fruit.repository";

const FruitService = async (fastify: FastifyInstance) => {
  const fruitRepository = await FruitRepository(fastify);

  return {
    findOneBy: async (id: number) =>
      await fruitRepository.findOneBy({ id: id }),

    update: async ({ id, type, quantity }: PutDto) =>
      await fruitRepository.update(id, {
        type: type,
        quantity: quantity,
      }),
  };
};

export default FruitService;
