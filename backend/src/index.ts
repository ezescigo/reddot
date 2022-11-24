import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

import redis from 'redis';
import session from "express-session";
import connectRedis from 'connect-redis';
import { MyContext } from './types';


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

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.connect().catch(console.error)




  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ 
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__ // cookie only works in https
      },
      secret: "saddsfgdsfs",
      resave: false,
    })
  )
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em.fork(), req, res })  // object accesible by our resolvers.
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {console.error(err)});

console.log("Loading server...")