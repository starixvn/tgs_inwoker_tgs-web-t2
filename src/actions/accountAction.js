import { AccountService } from "../services/AccountService";
import { InboxService } from "../services/InboxService";
import {AccountService as TGSAccountService} from  '@yifan1997/tgs-api-mapping';
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETACCOUNT_SUCCESS,
  GETBALANCE_SUCCESS,
  GETACCOUNT_FAILURE,
  GETACCOUNT_BEGIN,
  CHECKTOKEN_BEGIN,
  CHECKTOKEN_SUCCESS,
  CHECKTOKEN_FAILURE,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHECKGAME_BEGIN,
  CHECKGAME_SUCCESS,
  CHECKGAME_FAIL,
  GETVIPINFO_SUCCESS,
  GETVIPINFO_FAILURE,
  GETMESSAGE_SUCCESS,
  GETPROMOTEUSER_SUCCESS,
  GETPROMOTEBILL_SUCCESS,
  GETIDCARDNO_BEGIN,
  GETIDCARDNO_FAILURE,
  GETIDCARDNO_SUCCESS,
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
  GETINVITELINK_BEGIN,
  GETINVITELINK_FAILURE,
  GETINVITELINK_SUCCESS,
} from "../constants/actionType";

export const accountAction = {
  accountLogin,
  accountLogout,
  getAccountInfo,
  checkGame,
  getAccountProfile,
  getVIPInfo,
  checkTokenIsValid,
  registerAccount,
  getMessageList,
  getIDCardNo,
  updateMemberCardNo,
  getInviteLink,
  getPromoteUserList,
  getPromoteBillList,
};
function getInviteLink() {
  return (dispatch) => {
    dispatch({
      type: GETINVITELINK_BEGIN,
      loading: true,
    });
    const result = AccountService.GetInviteLink()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETINVITELINK_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETINVITELINK_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETINVITELINK_FAILURE,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function updateMemberCardNo(name,number) {
  return (dispatch) => {
    dispatch({
      type: UPDATECARDNO_BEGIN,
      loading: true,
    });
    const result = TGSAccountService.AddRealName(name,number)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATECARDNO_SUCCESS,
            payload: {
              member_name: name,
              check_pass_account: true,
            },
            loading: false,
          });
        } 
        return response;
      })
      .catch((e) => {
        dispatch({
          type: UPDATECARDNO_FAILURE,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function accountLogin(username, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_BEGIN,
      loading: true,
    });
    const response = await TGSAccountService.Login(
      username,
      password,

    );

    if (response.IsSuccess) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
        loading: false,
      });
      // if (config.isPC === 1) {
      //   document
      //     .getElementById("ioBB")
      //     .parentNode.removeChild(document.getElementById("ioBB"));
      // }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response,
        loading: false,
      });
    }
    return response;
  };
}
function accountLogout(token) {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_BEGIN,
      loading: true,
    });
    const response = await TGSAccountService.Logout(token);

    if (response.IsSuccess) {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: response,
        loading: false,
      });
    }
    // if (document.getElementById("ioBB") == null) {
    //   var node = document.createElement("input"); // Create a <li> node
    //   node.id = "ioBB";
    //   node.name = "ioBB";
    //   node.type = "hidden";
    //   // Append the text to <li>
    //   document.getElementsByTagName("body")[0].appendChild(node); // Append <li> to <ul> with id="myList"
    // }

    return response;
  };
}
function checkTokenIsValid() {
  return async (dispatch) => {
    dispatch({
      type: CHECKTOKEN_BEGIN,
      loading: true,
    });
    const response = await TGSAccountService.GetMemberInfo();

    if (response.IsSuccess) {
      dispatch({
        type: CHECKTOKEN_SUCCESS,
        payload: response,
        loading: false,
      });
    } else {
      localStorage.removeItem("token");

      dispatch({
        type: CHECKTOKEN_FAILURE,
        payload: response,
        loading: false,
      });
    }
    return response;
  };
}
function getAccountInfo() {
  return (dispatch) => {
    dispatch({
      type: GETACCOUNT_BEGIN,
      loading: true,
    });
    const result = TGSAccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETACCOUNT_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETACCOUNT_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function checkGame() {
  return (dispatch) => {
    dispatch({
      type: CHECKGAME_BEGIN,
      loading: true,
    });
    const result = AccountService.CheckGame()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: CHECKGAME_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: CHECKGAME_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: CHECKGAME_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getAccountProfile(showVip) {
  return (dispatch) => {
    const result = TGSAccountService.GetMemberInfo()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: showVip === true ? GETACCOUNT_SUCCESS : GETBALANCE_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETACCOUNT_FAILURE,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getVIPInfo(token) {
  return (dispatch) => {
    const result = AccountService.GetVIPInfo(token)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETVIPINFO_SUCCESS,
            payload: response,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETVIPINFO_FAILURE,
            payload: response,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETVIPINFO_FAILURE,
          payload: error,
        });
      });
    return result;
  };
}
function registerAccount(
  username,
  pwd,
  confirmpwd,
  invitationcode = "",

) {
  return async (dispatch) => {
    const result = await TGSAccountService.Register(
      username,
      pwd,
      confirmpwd,
      invitationcode ,
    )
      .then((response) => {
        if (response.IsSuccess) {
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETACCOUNT_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function getMessageList(limit, page) {
  return (dispatch) => {
    var result = InboxService.InboxList(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETMESSAGE_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  };
}
function getPromoteUserList(limit, page) {
  return (dispatch) => {
    var result = AccountService.GetPromoteUser(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEUSER_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  };
}
function getPromoteBillList(limit, page) {
  return (dispatch) => {
    var result = AccountService.GetPromoteBill(page, limit);
    result.then((response) => {
      if (response.IsSuccess) {
        dispatch({
          type: GETPROMOTEBILL_SUCCESS,
          payload: response,
          isNew: page === 0,
        });
      }
    });
    return result;
  };
}
function getIDCardNo() {
  return (dispatch) => {
    dispatch({
      type: GETIDCARDNO_BEGIN,
      loading: true,
    });
    var result = AccountService.GetIDCardNo();
    result
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETIDCARDNO_SUCCESS,
            payload: response,
            loading: true,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETIDCARDNO_FAILURE,
            payload: response,
            loading: false,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GETIDCARDNO_FAILURE,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
