import { GeneralService } from "../services/GeneralService";
import { GETMOBILEPREFIX_SUCCESS, GETSITETOKEN_SUCCESS } from "../constants/actionType";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

export const generalAction = {
  getMobilePrefix,
  getSiteToken
};
function getSiteToken() {
  return (dispatch) => {
    const result = GeneralService.GetSiteToken().then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETSITETOKEN_SUCCESS,
          payload: response.data,
        });

        // AppHistory.push("/");
      }
      return response;
    });

    return result;
  };
}

function getMobilePrefix() {
  return (dispatch) => {
    const result = GeneralService.GetMobilePrefix().then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETMOBILEPREFIX_SUCCESS,
          payload: response.data,
        });

        // AppHistory.push("/");
      }
      return response;
    });

    return result;
  };
}
