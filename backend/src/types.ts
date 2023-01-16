import { Request, Response } from "express";
import { Session } from "express-session";
import Redis from "ioredis";

export type sessionUserId = {
  userId: number;
};

export type MyContext = {
  req: Request & { session: SessionWithUser };
  res: Response;
  redisClient: Redis;
};

export type SessionWithUser = Session & { userId: number };
