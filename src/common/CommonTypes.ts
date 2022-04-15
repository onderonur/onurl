export type Maybe<T> = T | undefined | null;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      DATABASE_URL: string;
    }
  }
}
