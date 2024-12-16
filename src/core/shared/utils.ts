export const APP_TITLE = 'OnURL';

export function wait(seconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}
