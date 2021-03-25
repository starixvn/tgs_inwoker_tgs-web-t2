import { IPRESTRICT, GETMOBILEPREFIX_SUCCESS, GETSITETOKEN_SUCCESS } from "../constants/actionType";
const initialState = {
  isIPRestrict: false,
  mobilePrefix: [],
};
export function generalReducer(state = initialState, action) {
  switch (action.type) {
    case IPRESTRICT:
      return {
        ...state,
        isIPRestrict: true,
      };
    case GETMOBILEPREFIX_SUCCESS:
      return {
        ...state,
        mobilePrefix: action.payload,
      };
    case GETSITETOKEN_SUCCESS:

      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}
