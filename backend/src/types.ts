import { Request, Response } from "express";
import { Session } from "express-session";
import Redis from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
import { createVoteStatusLoader } from "./utils/createVoteStatusLoader";

export type sessionUserId = {
  userId: number;
};

export type MyContext = {
  req: Request & { session: SessionWithUser };
  res: Response;
  redisClient: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  voteStatusLoader: ReturnType<typeof createVoteStatusLoader>;
};

export type SessionWithUser = Session & { userId: number };
