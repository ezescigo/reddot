import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Request, Response } from 'express'
import { Session } from "express-session"

export type sessionUserId = {
  userId: number 
}

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>,
  req: Request & { session: SessionWithUser },
  res: Response
}

export type SessionWithUser = Session &
  Partial<Session> & { userId?: number };