export const isServer = () => {
  return typeof window === 'undefined';
};
