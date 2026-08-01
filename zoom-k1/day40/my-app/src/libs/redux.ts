// 1. Định nghĩa kiểu dữ liệu cho listener
export type Listener = () => void;

// 2. Định nghĩa cấu trúc State mặc định
export interface BaseState {
  listeners?: Listener[];
}
// 3. Định nghĩa cấu trúc State cho Counter
export interface CounterState extends BaseState {
  count: number;
}

// 4. Định nghĩa cấu trúc Action
export interface BaseAction<T = string> {
  type: T;
}

// 4. Định nghĩa kiểu dữ liệu cho các action
export type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "REMOVE_LISTENER"; payload: Listener }
  | { type: "@@INIT" };

// 5. Định nghĩa kiểu dữ liệu cho reducer
export type Reducer<S, A> = (state: S | undefined, action: A) => S;

// 6. Định nghĩa kiểu dữ liệu cho store
export interface Store<S, A> {
  dispatch: (action: A) => void;
  getState: () => S;
  subscribe: (listener: Listener) => () => void;
}

export const createStore = <S extends BaseState, A extends BaseAction>(
  reducer: Reducer<S, A>,
  preloadedState?: S,
) => {
  let state =
    preloadedState !== undefined
      ? preloadedState
      : reducer(undefined, { type: "@@INIT" } as A);
  const store = {
    dispatch(action: A) {
      state = reducer(state, action);
      state.listeners?.forEach((listener) => listener());
    },
    getState() {
      return state;
    },
    subscribe(listener: Listener) {
      state.listeners = state.listeners || [];
      state.listeners.push(listener);
      console.log(state.listeners[0]);

      return () => {
        store.dispatch({
          type: "REMOVE_LISTENER",
          payload: listener,
        } as unknown as A);
      };
    },
  };
  return store;
};

export const reducer = (
  state: CounterState = { count: 0 },
  action: CounterAction,
) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "REMOVE_LISTENER":
      return {
        ...state,
        listeners: state.listeners?.filter(
          (listener) => listener !== action.payload,
        ),
      };
    default:
      return state;
  }
};
