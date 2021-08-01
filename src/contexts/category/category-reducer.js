export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
