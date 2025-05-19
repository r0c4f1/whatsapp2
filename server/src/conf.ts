import { env, loadEnvFile } from "process";

loadEnvFile(".env");

export const VARIABLES = {
  port: env.PORT,
  uri_client: env.URI_CLIENT,
  host: env.HOST,
  database: env.DATABASE,
  user: env.USERNAME,
  password: env.PASSWORD,
};
