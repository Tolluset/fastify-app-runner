import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const SERVER = {
  HOST: env.SERVER_HOST || "0.0.0.0",
  PORT: Number(env.SERVER_PORT) || 8080,
};

const DB = {
  HOST: env.DB_HOST || "localhost",
  PORT: Number(env.DB_PORT) || 3306,
  USERNAME: env.DB_USERNAME || "",
  PASSWORD: env.DB_PASSWORD || "",
  DATABASE: env.DB_DATABASE || "fastify_app_runner",
};

export { SERVER, DB };
