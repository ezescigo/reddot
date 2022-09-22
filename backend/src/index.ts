import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const post = orm.em.create(Post, { createdAt: new Date(), updatedAt: new Date(), title: 'my first post' })
  await orm.em.persistAndFlush(post);
}

main().catch((err) => {console.error(err)});

console.log("hello asd")