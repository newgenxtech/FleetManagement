import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
require("dotenv").config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PGHOST,
  port: 5432,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*.ts"],
  migrations: [],
  subscribers: [],
  url: `postgresql://wewill_owner:zKScdvhqPw65@ep-black-smoke-a54gcc1h.us-east-2.aws.neon.tech/wewill?sslmode=require`,
});
