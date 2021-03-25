import { GameService } from "../services/GameService";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

import {
  GETHOMEPAGEGAMELIST_BEGIN,
  GETHOMEPAGEGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_FAIL,
  GETGAMEPLATFORMLIST_BEGIN,
  GETGAMEPLATFORMLIST_SUCCESS,
  GETGAMEPLATFORMLIST_FAIL,
  KYGAMELIST_SUCCESS,
} from "../constants/actionType";
export const gameAction = {
  getKYGameList,
  getHomePageGameList,
  getGamePlatformList,
};
function getKYGameList(token) {
  return (dispatch) => {
    const result = GameService.GetKYGameList(token).then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: KYGAMELIST_SUCCESS,
          payload: response,
        });

        // AppHistory.push("/");
      }
      return response;
    });

    return result;
  };
}
function getHomePageGameList() {
  return (dispatch) => {
    dispatch({
      type: GETHOMEPAGEGAMELIST_BEGIN,
      loading: true,
    });
    const result = GameService.GetHomePageGameList()
      .then((response) => {

        if (response.IsSuccess) {
          dispatch({
            type: GETHOMEPAGEGAMELIST_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          console.log(111)
          dispatch({
            type: GETHOMEPAGEGAMELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        console.log(222)
        dispatch({
          type: GETHOMEPAGEGAMELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function getGamePlatformList() {
  return (dispatch) => {
    dispatch({
      type: GETGAMEPLATFORMLIST_BEGIN,
      loading: true,
    });
    const result = GameService.GetGamePlatformByType("")
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETGAMEPLATFORMLIST_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETGAMEPLATFORMLIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETGAMEPLATFORMLIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
