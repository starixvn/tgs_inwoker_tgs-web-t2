import {
  IPRESTRICT,
  GETMOBILEPREFIX_SUCCESS,
  GETSITETOKEN_SUCCESS,
  UNAUTHORIZE,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_SUCCESS,
  GETPROMOLIST_FAILURE,
  JOINPROMO_BEGIN,
  JOINPROMO_SUCCESS,
  JOINPROMO_FAILURE,
} from "@Inwoker/tgs-api";
const initialState = {
  isIPRestrict: false,
  mobilePrefix: [],

  promotionList: { items: [] },
  token: "",
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
    case GETPROMOLIST_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };
    case GETPROMOLIST_SUCCESS:
      return {
        ...state,
        promotionList: action.payload.data,
        loading: action.loading,
      };
    case GETPROMOLIST_FAILURE:
      return {
        ...state,
        promotionList: [],
        loading: action.loading,
      };
    case JOINPROMO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOINPROMO_SUCCESS:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };
    case JOINPROMO_FAILURE:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
}
