import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';

import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from 'connect-redis';


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
  const redisClient = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      // origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
      credentials: true,
    })
  );

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.connect().catch(console.error)

  app.use(
    session({
      name: COOKIE_NAME,
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
      saveUninitialized: false,
      secret: "saddsfgdsfs",
      resave: false,
    })
  )
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ em: orm.em.fork(), req, res })  // object accesible by our resolvers.
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {console.error(err)});

console.log("Loading server...")