import { BonusService } from "../services/BonusService";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

import {
  BONUSNEW_BEGIN,
  BONUSNEW_SUCCESS,
  BONUSNEW_FAILURE,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_SUCCESS,
  GETPROMOLIST_FAILURE,
} from "../constants/actionType";

export const bonusAction = {
  getNewBonusList,
  getPromotionList,
};
function getNewBonusList(token) {
  return (dispatch) => {
    dispatch({
      type: BONUSNEW_BEGIN,
      loading: true,
    });
    const result = BonusService.AvailableList(token)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: BONUSNEW_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: BONUSNEW_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: BONUSNEW_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getPromotionList() {
  return (dispatch) => {
    dispatch({
      type: GETPROMOLIST_BEGIN,
      loading: true,
    });
    const result = BonusService.GetActivityList()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETPROMOLIST_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETPROMOLIST_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETPROMOLIST_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
