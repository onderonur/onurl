export type Maybe<T> = T | undefined | null;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      DATABASE_URL: string;
    }
  }
}
