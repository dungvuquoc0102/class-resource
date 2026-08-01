export const createStore = (reducer, preloadedState) => {
  let state =
    preloadedState !== undefined
      ? preloadedState
      : reducer(undefined, { type: "@@INIT" });
  const store = {
    dispatch(action) {
      state = reducer(state, action);
      state.listeners?.forEach((listener) => listener());
    },
    getState() {
      return state;
    },
    subscribe(listener) {
      state.listeners = state.listeners || [];
      state.listeners.push(listener);
      console.log(state.listeners[0]);

      return () => {
        store.dispatch({ type: "REMOVE_LISTENER", payload: listener });
      };
    },
  };
  return store;
};

export const reducer = (state = { count: 0 }, action) => {
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
        listeners: state.listeners.filter(
          (listener) => listener !== action.payload,
        ),
      };
    default:
      return state;
  }
};
