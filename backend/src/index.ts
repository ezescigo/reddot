import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const main = async () => {
  const conn = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "saigon3431",
    database: "libreddot",
    entities: [Post, User],
    logging: true,
    synchronize: true,
  });

  conn
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

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

  const RedisStore = connectRedis(session);
  const redisClient = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "*",
      // origin:
      //   process.env.CORS_ORIGIN_GRAPHQL_LOCAL &&
      //   process.env.CORS_ORIGIN_FRONTEND_LOCAL
      //     ? [
      //         process.env.CORS_ORIGIN_GRAPHQL_LOCAL,
      //         process.env.CORS_ORIGIN_FRONTEND_LOCAL,
      //       ]
      //     : "http://localhost:3000",
      credentials: true,
    })
  );

  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  redisClient.connect().catch(console.error);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient as any, // to fix type bug in connect-redis.
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "saddsfgdsfs",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redisClient }), // object accesible by our resolvers.
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});

console.log("Loading server...");
