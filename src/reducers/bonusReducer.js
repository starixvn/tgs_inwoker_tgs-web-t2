import {
  BONUSNEW_BEGIN,
  BONUSNEW_SUCCESS,
  BONUSNEW_FAILURE,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_SUCCESS,
  GETPROMOLIST_FAILURE,
} from "../constants/actionType";
const initialState = {
  pending: false,
  new: [],
  promoList: [],
  token: null,
  error: null,
};
export function bonusReducer(state = initialState, action) {
  switch (action.type) {
    case BONUSNEW_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };

    case BONUSNEW_SUCCESS:
      return {
        ...state,
        new: action.payload.data,
        loading: action.loading,
      };
    case BONUSNEW_FAILURE:
      return {
        ...state,
        loading: action.loading,
      };
    case GETPROMOLIST_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };
    case GETPROMOLIST_SUCCESS:
      return {
        ...state,
        promoList: action.payload.data,
        loading: action.loading,
      };
    case GETPROMOLIST_FAILURE:
      return {
        ...state,
        promoList: [],
        loading: action.loading,
      };
    default:
      return state;
  }
}
