export const initialState = {
  count: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log(action.payload);
      console.log(state);
      console.log(state.count);
      console.log(action.payload ? action.payload : 1);
      console.log(state.count + (action.payload ? action.payload : 1));

      return {
        ...state,
        count: state.count + (action.payload ? action.payload : 1),
      };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};
