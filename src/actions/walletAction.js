import { WalletService } from "../services/WalletService";

import {
  GETDEPOSITCHANNEL_BEGIN,
  GETDEPOSITCHANNEL_SUCCESS,
  GETDEPOSITCHANNEL_FAIL,
  DOTRANSFER_BEGIN,
  DOTRANSFER_SUCCESS,
  DOTRANSFER_FAIL,
  DOWITHDRAWAL_BEGIN,
  DOWITHDRAWAL_SUCCESS,
  DOWITHDRAWAL_FAIL,
  DODEPOSIT_BEGIN,
  DODEPOSIT_SUCCESS,
  DODEPOSIT_FAIL,
  CANCELDEPOSIT_BEGIN,
  CANCELDEPOSIT_SUCCESS,
  CANCELDEPOSIT_FAIL,
  DOMANUALDEPOSIT_BEGIN,
  DOMANUALDEPOSIT_SUCCESS,
  DOMANUALDEPOSIT_FAIL,
  DOMANUALDEPOSITUPLOAD_BEGIN,
  DOMANUALDEPOSITUPLOAD_SUCCESS,
  DOMANUALDEPOSITUPLOAD_FAIL,
  GETBALANCELIST_BEGIN,
  GETBALANCELIST_SUCCESS,
  GETBALANCELIST_FAIL,
  UPDATEBALANCELIST_BEGIN,
  UPDATEBALANCELIST_SUCCESS,
  UPDATEBALANCELIST_FAIL,
  GETBANKCARDLIST_BEGIN,
  GETBANKCARDLIST_SUCCESS,
  GETBANKCARDLIST_FAIL,
  DELETEBANKCARD_BEGIN,
  DELETEBANKCARD_SUCCESS,
  DELETEBANKCARD_FAIL,
  GETBANKLIST_BEGIN,
  GETBANKLIST_SUCCESS,
  GETBANKLIST_FAIL,
  ADDBANKCARD_BEGIN,
  ADDBANKCARD_SUCCESS,
  ADDBANKCARD_FAIL,
  ADDBILLING_BEGIN,
  ADDBILLING_SUCCESS,
  ADDBILLING_FAIL,
  DOWITHDRAWALALL_BEGIN,
  DOWITHDRAWALALL_SUCCESS,
  DOWITHDRAWALALL_FAIL,
} from "../constants/actionType";
// These are the constants to represent each of three recommended actions for a single API fetch or post.

export const walletAction = {
  getDepositChannel,
  doDeposit,
  cancelDeposit,
  doManualDeposit,
  doManualDepositUpload,
  getBalanceList,
  updateBalanceList,
  getBankCardList,
  deleteBankCard,
  getBankList,
  addBankCard,
  addBilling,
  doWithdrawal,
  doTransfer,
  doWithdrawAll,
};
function doWithdrawAll() {
  return (dispatch) => {
    dispatch({
      type: DOWITHDRAWALALL_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawAll()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOWITHDRAWALALL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOWITHDRAWALALL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOWITHDRAWALALL_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doTransfer(
  amount,
  center_wallet_id,
  game_platform_id,
  transform_type
) {
  return (dispatch) => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.Transfer(
      parseFloat(amount),
      center_wallet_id,
      game_platform_id,
      transform_type
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doWithdrawal(amount, password, user_account_id) {
  return (dispatch) => {
    dispatch({
      type: DOWITHDRAWAL_BEGIN,
      loading: true,
    });
    const result = WalletService.Withdrawal(amount, password, user_account_id)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOWITHDRAWAL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOWITHDRAWAL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOWITHDRAWAL_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doDeposit(amount, payment_id, extend) {
  return (dispatch) => {
    dispatch({
      type: DODEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.Deposit(amount, payment_id, extend)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DODEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DODEPOSIT_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function cancelDeposit(id) {
  return (dispatch) => {
    dispatch({
      type: CANCELDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.CancelDeposit(id)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: CANCELDEPOSIT_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: CANCELDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: CANCELDEPOSIT_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doManualDeposit(bankId, channelId, amount, username) {
  console.log(channelId)
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSIT_BEGIN,
      loading: true,
    });
    var result = null;
    if (channelId === 400) {
      // manual deposit by bank in
      result = WalletService.ManualDeposit(bankId, channelId, amount, username)
    } else {
      result = WalletService.ManualDepositQR(channelId, amount, username)
    }

    result.then((response) => {

      if (response.IsSuccess) {
        dispatch({
          type: DOMANUALDEPOSIT_SUCCESS,
          payload: response,
          loading: false,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: DOMANUALDEPOSIT_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    })
      .catch((e) => {
        dispatch({
          type: DOMANUALDEPOSIT_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doManualDepositUpload(file, fileType, orderId) {
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSITUPLOAD_BEGIN,
      loading: true,
    });
    const result = WalletService.ManualDepositUpload(file, fileType, orderId)

    result.then((response) => {

      if (response.IsSuccess) {
        dispatch({
          type: DOMANUALDEPOSITUPLOAD_SUCCESS,
          payload: response,
          loading: false,
        });

        // AppHistory.push("/");
      } else {
        dispatch({
          type: DOMANUALDEPOSITUPLOAD_FAIL,
          payload: response,
          loading: false,
        });
      }
      return response;
    })
      .catch((e) => {
        dispatch({
          type: DOMANUALDEPOSITUPLOAD_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function getDepositChannel() {
  return (dispatch) => {
    dispatch({
      type: GETDEPOSITCHANNEL_BEGIN,
      loading: true,
    });
    const result = WalletService.GetDepositChannel()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETDEPOSITCHANNEL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETDEPOSITCHANNEL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETDEPOSITCHANNEL_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function updateBalanceList() {
  return (dispatch) => {
    dispatch({
      type: UPDATEBALANCELIST_BEGIN,
      loading: true,
    });
    const result = WalletService.UpdateWalletDetails()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATEBALANCELIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: UPDATEBALANCELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: UPDATEBALANCELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getBalanceList(loading = true) {
  return (dispatch) => {
    dispatch({
      type: GETBALANCELIST_BEGIN,
      loading: loading,
    });
    const result = WalletService.GetWalletDetails()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETBALANCELIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBALANCELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBALANCELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getBankCardList() {
  return (dispatch) => {
    dispatch({
      type: GETBANKCARDLIST_BEGIN,
      loading: true,
    });
    const result = WalletService.GetBankCardList()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETBANKCARDLIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBANKCARDLIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBANKCARDLIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function addBankCard(card, name, foreign_id, bank_branch) {
  return (dispatch) => {
    dispatch({
      type: ADDBANKCARD_BEGIN,
      loading: true,
    });
    const result = WalletService.AddBankCard(
      card,
      name,
      foreign_id,
      bank_branch
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: ADDBANKCARD_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: ADDBANKCARD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: ADDBANKCARD_FAIL,
          payload: { IsSuccess: false, info: e.status },
          loading: false,
        });
      });

    return result;
  };
}

function deleteBankCard(id) {
  return (dispatch) => {
    dispatch({
      type: DELETEBANKCARD_BEGIN,
      loading: true,
    });
    const result = WalletService.DeleteBankCard(id)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DELETEBANKCARD_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DELETEBANKCARD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DELETEBANKCARD_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getBankList() {
  return (dispatch) => {
    dispatch({
      type: GETBANKLIST_BEGIN,
      loading: true,
    });
    const result = WalletService.GetBankList()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETBANKLIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBANKLIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBANKLIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function addBilling(card_id, amount) {
  return (dispatch) => {
    dispatch({
      type: ADDBILLING_BEGIN,
      loading: true,
    });
    const result = WalletService.AddBilling(card_id, amount)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: ADDBILLING_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: ADDBILLING_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: ADDBILLING_FAIL,
          payload: { IsSuccess: false, info: e.status },
          loading: false,
        });
      });

    return result;
  };
}
