import { typesToppingsN } from "../types/types";

const initialState = {
  toppingsN: [],
};

export const toppingsNReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesToppingsN.add:
      return {
        toppingsN: [action.payload],
      };

    case typesToppingsN.addFormik:
      return {
        toppingsN: [action.payload],
      };

    case typesToppingsN.list:
      return {
        toppingsN: [...action.payload],
      };

    case typesToppingsN.edit:
      return {
        ...state,
      };

    case typesToppingsN.delete:
      return {
        toppingsN: state.toppingsN.filter((p) => p.nombre !== action.payload),
      };

    default:
      return state;
  }
};
