import { Options } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from 'path';
import { User } from "./entities/User";

const config = {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: '!(*.d).[tj]s',
  },
  entities: [Post, User],
  dbName: 'lireddot',
  // user: '',
  password: 'saigon3431',
  type: 'postgresql',
  debug: !__prod__
} as Options;

export default config;