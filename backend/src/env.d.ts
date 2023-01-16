declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN_FRONTEND: string;
    CORS_ORIGIN_PLAYGROUND: string;
  }
}
