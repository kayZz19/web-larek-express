declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_ADDRESS: string;
      UPLOAD_PATH: string;
      UPLOAD_PATH_TEMP: string;
      ORIGIN_ALLOW: string;
      AUTH_REFRESH_TOKEN_EXPIRY: string;
      AUTH_ACCESS_TOKEN_EXPIRY: string;
    }
  }
}

export {};
