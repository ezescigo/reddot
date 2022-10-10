import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  // connect DDBB
  const orm = await MikroORM.init(mikroOrmConfig);
  // run migrations
  await orm.getMigrator().up();
  // run SQL
  // await RequestContext.createAsync(orm.em, async () => {
  //   // Post
  //   // const post = orm.em.create(Post, { createdAt: new Date(), updatedAt: new Date(), title: 'my first post' })
  //   // await orm.em.persistAndFlush(post);

  //   // Get
  //   // const posts = await orm.em.find(Post, {});
  //   // console.log(posts)
  // });

  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {console.error(err)});

console.log("Loading server...")