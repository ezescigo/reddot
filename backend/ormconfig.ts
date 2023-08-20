import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

interface BetterConnectionOptions extends PostgresConnectionOptions {
  readonly seeds?: (Function | string)[];
  readonly factories?: (Function | string)[];
}

const config: BetterConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "reddot",
  migrations: ["./src/migrations/*.js"],
  logging: true,
  synchronize: true,
  entities: ["./src/entities/**/*{.ts,.js}"],
  migrationsRun: false,
  logger: "file",
};

export default config;
