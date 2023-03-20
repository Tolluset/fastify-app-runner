import type { FastifyInstance } from "fastify";
import FruitEntity from "./fruit.entity";

const FruitRepository = async (fastify: FastifyInstance) => 
  fastify.orm.getRepository(FruitEntity);

export default FruitRepository;
