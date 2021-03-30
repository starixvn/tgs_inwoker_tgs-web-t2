import {UiService} from '@yifan1997/tgs-api-mapping';
import {
  GETMARQUEE_SUCCESS,
  GETMARQUEE_BEGIN,
  GETMARQUEE_FAIL,
  GETBANNER_SUCCESS,
  GETBANNER_BEGIN,
  GETBANNER_FAIL,
} from "../constants/actionType";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

export const uiAction = {
  getMarquee,
  // getBanner,
};

function getMarquee() {
  return (dispatch) => {
    dispatch({
      type: GETMARQUEE_BEGIN,
      loading: true,
    });
    const result = UiService.GetMarquee()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETMARQUEE_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETMARQUEE_FAIL,
          loading: false,
        });
      });

    return result;
  };
}
// function getBanner() {
//   return (dispatch) => {
//     dispatch({
//       type: GETBANNER_BEGIN,
//       loading: true,
//     });
//     const result = UiService.GetBanner()
//       .then((response) => {
//         if (response.IsSuccess) {
//           dispatch({
//             type: GETBANNER_SUCCESS,
//             payload: response.data,
//             loading: false,
//           });

//           // AppHistory.push("/");
//         }
//         return response;
//       })
//       .catch((e) => {
//         dispatch({
//           type: GETBANNER_FAIL,
//           loading: false,
//         });
//       });

//     return result;
//   };
// }
