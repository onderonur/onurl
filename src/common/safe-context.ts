import { createContext, useContext } from 'react';

const MISSING_CONTEXT = Symbol('MISSING_CONTEXT');

export function createSafeContext<ContextValue>({
  displayName,
}: {
  displayName: string;
}) {
  const Context = createContext<ContextValue | typeof MISSING_CONTEXT>(
    MISSING_CONTEXT,
  );

  Context.displayName = displayName;

  function useSafeContext() {
    const value = useContext(Context);

    if (value === MISSING_CONTEXT) {
      throw new Error(`${displayName} not found`);
    }

    return value;
  }

  return [Context, useSafeContext] as const;
}
