import { Request, Response } from "express";
import { Session } from "express-session";
import Redis from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";

export type sessionUserId = {
  userId: number;
};

export type MyContext = {
  req: Request & { session: SessionWithUser };
  res: Response;
  redisClient: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
};

export type SessionWithUser = Session & { userId: number };
