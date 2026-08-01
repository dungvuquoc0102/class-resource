import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Store } from "./redux";

export type AnyStore = Store<any, any>;
export const ReduxContext = createContext<AnyStore | null>(null);

export interface ProviderProps<S, A> {
  store: Store<S, A>;
  children: React.ReactNode;
}

export const Provider = <S, A>({ store, children }: ProviderProps<S, A>) => {
  return (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(ReduxContext);
  return store;
};

export const useSelector = <S, R>(selector?: (state: S) => R) => {
  const store = useStore();
  const [newState, setNewState] = useState(() =>
    selector ? selector(store?.getState() as S) : store?.getState(),
  );

  const newStateRef = useRef(newState);

  useEffect(() => {
    const unsubscribe = store?.subscribe(() => {
      const state = store.getState() as S;
      const selectedState = selector ? selector(state) : state;
      if (newStateRef.current === selectedState) return;
      setNewState(selectedState);
    });

    return () => {
      unsubscribe?.();
    };
  }, [store, selector]);

  return newState;
};

export const useDispatch = () => {
  const store = useStore();
  return store?.dispatch;
};
