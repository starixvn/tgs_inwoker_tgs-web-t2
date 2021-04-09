import { IPRESTRICT, GETMOBILEPREFIX_SUCCESS, GETSITETOKEN_SUCCESS, UNAUTHORIZE } from "../constants/actionType";
const initialState = {
  isIPRestrict: false,
  mobilePrefix: [],
  token: ""
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
    case UNAUTHORIZE:
      return {
        ...state,
        token: "",
      };
    case GETSITETOKEN_SUCCESS:

      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
}
