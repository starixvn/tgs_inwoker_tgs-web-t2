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
  GETVIPINFO_SUCCESS,
  GETVIPINFO_FAILURE,
  UPDATE_INFO,
  GETMESSAGE_SUCCESS,
  GETIDCARDNO_BEGIN,
  GETIDCARDNO_FAILURE,
  GETIDCARDNO_SUCCESS,
  UPDATECARDNO_BEGIN,
  UPDATECARDNO_FAILURE,
  UPDATECARDNO_SUCCESS,
  RESET_ACCOUNTRESULT,
  GETINVITELINK_BEGIN,
  GETINVITELINK_FAILURE,
  GETINVITELINK_SUCCESS,
  GETPROMOTEUSER_SUCCESS,
  GETPROMOTEBILL_SUCCESS,
} from "../constants/actionType";

const initialState = {
  pending: false,
  updateCardResult: null,
  info: {
    avatar: "",
    balance: 0,
    member_card_no: "",
    member_id: 0,
    member_level_id: 1,
    member_name: "",
    member_username: "",
    member_birthday: "",
    member_email: "",
    member_phone: "",
    member_safe_password: "",
    member_address: "",
    member_address_surename: "",
    member_address_phone: "",
    member_question: "",
    member_qq: "",
    member_wechat: "",
    can_withdrawal: "",
    bonus_num: "",
    message_num: "",
    check_pass_account: "",
    check_pass_email: "",
    check_pass_phone: "",
    promote_code: "",
    promote_url: "",
    month_vip: {
      id: 0,
      curr_title: "",
      curr_owned_point: "",
      next_title: "",
      next_point: "",
      require_point: "",
      vip_progress_bar: 0,
    },
    year_vip: {
      id: 0,
      curr_title: "",
      curr_owned_point: "",
      next_title: "",
      next_point: "",
      require_point: "",
      vip_progress_bar: 0,
    },
    token: "",
  },
  vip: {
    member: "",
    next_vip_title: "",
    owned_point: "0",
    next_point: "0",
    require_point: "0",
    vip_progress_bar: 0,
    curr_vip: {
      id: 0,
      title: "",
      upgrade_gift_amount: "0.00",
      upgrade_gift_multiple: "0.00",
      birthday_gift_amount: "0.00",
      birthday_gift_multiple: "0.00",
      topped_gift_amount: "0.00",
      topped_gift_multiple: "0.00",
      deposit_bonus: "0.00",
      deposit_bonus_limit: "0.00",
      deposit_bonus_multiple: "0.00",
      rescue_amount: "0.00",
      rescue_amount_limit: "0.00",
      rescue_amount_multiple: "0.00",
      free_withdrawal_num: 0,
    },
    next_vip: {
      id: 0,
      title: "",
      upgrade_gift_amount: "0.00",
      upgrade_gift_multiple: "0.00",
      birthday_gift_amount: "0.00",
      birthday_gift_multiple: "0.00",
      topped_gift_amount: "0.00",
      topped_gift_multiple: "0.00",
      deposit_bonus: "0.00",
      deposit_bonus_limit: "0.00",
      deposit_bonus_multiple: "0.00",
      rescue_amount: "0.00",
      rescue_amount_limit: "0.00",
      rescue_amount_multiple: "0.00",
      free_withdrawal_num: 0,
    },
  },
  inbox: {
    list: [],
    count: 0,
  },
  promote_user: {
    list: [],
    count: 0,
  },
  promote_bill: {
    list: [],
    count: 0,
  },
  token: null,
  error: null,
  loading: false,
};
function mapToAccountState(state, data) {
  return {
    ...state.info,
    avatar: data.avatar_url_text,
    balance: 0,
    member_last_login: "",
    member_id: 0,
    member_level_id: 0,
    member_name: data.realname,
    member_username: data.username,
    check_pass_phone: data.phone === null ? false : true,
    check_pass_email: data.email === null ? false : true,
    check_pass_account: data.identityauthentication === false ? false : true,
    member_phone: data.phone,
    member_email: data.email,
    member_safe_password: data.issetpaypassword === true ? "set" : "",
    member_qq: data.qq,
    member_wechat: data.wechat,
    message_num: 0,
  };
}
export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        info: { ...state.info, ...action.payload },
      };
    case LOGIN_SUCCESS:

      return {
        ...state,
        token: action.payload.data.token,
        info: {

          token: action.payload.data.token,
        },
        loading: action.loading,
      };

    case CHECKTOKEN_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem("token"),
        info: {
          ...mapToAccountState(state, action.payload.data),
          token: localStorage.getItem("token"),
        },
        loading: action.loading,
      };
    case GETACCOUNT_SUCCESS:
      return {
        ...state,
        token: localStorage.getItem("token"),
        info: {
          ...mapToAccountState(state, action.payload.data),
          token: localStorage.getItem("token"),
        },
        loading: action.loading,
      };
    case GETBALANCE_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          balance: action.payload.data.balance,
          can_withdrawal: action.payload.data.can_withdrawal,
          limit_withdrawal: action.payload.data.limit_withdrawal,
          member_level_id: action.payload.data.member_level_id,
          message_num: action.payload.data.message_num,
        },
        loading: action.loading,
      };
    case GETVIPINFO_SUCCESS:
      return {
        ...state,
        vip: { ...state.vip, ...action.payload.data },
      };
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case GETACCOUNT_FAILURE:
    case GETVIPINFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_BEGIN:
    case LOGOUT_BEGIN:
    case CHECKTOKEN_BEGIN:
    case GETACCOUNT_BEGIN:
      return { ...state, loading: action.loading };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case "UNAUTHORIZE":
      return {
        ...state,
        token: null,
        info: initialState.info,
      };
    case GETMESSAGE_SUCCESS:
      return {
        ...state,
        inbox: {
          list: action.isNew
            ? action.payload.data.list
            : state.inbox.list.concat(action.payload.data.list),
          count: action.payload.data.count,
        },
      };
    case GETIDCARDNO_BEGIN:
      return {
        ...state,
      };
    case GETIDCARDNO_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          check_pass_account:
            action.payload.data.identification === null ? false : true,
          member_card_no: action.payload.data.identification,
        },
      };
    case UPDATECARDNO_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case UPDATECARDNO_SUCCESS:
      return {
        ...state,
        info: { ...state.info, ...action.payload }
      }
    case UPDATECARDNO_FAILURE:
      return {
        ...state,
        updateCardResult: action.payload,
        loading: false,
      };
    case RESET_ACCOUNTRESULT:
      return {
        ...state,
        updateCardResult: null,
        loading: false,
      };
    case GETINVITELINK_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case GETINVITELINK_SUCCESS:
      return {
        ...state,
        loading: false,
        info: {
          ...state.info,
          promote_code: action.payload.data.promote_code,
          promote_url: action.payload.data.download_url,
        },
      };
    case GETINVITELINK_FAILURE:
      return {
        ...state,
        loading: false,
        info: {
          ...state.info,
          promote_code: "",
          promote_url: "",
        },
      };
    case GETPROMOTEUSER_SUCCESS:
      return {
        ...state,
        promote_user: {
          list: action.isNew
            ? action.payload.data.list
            : state.promote_user.list.concat(action.payload.data.list),
          count: action.payload.data.count,
        },
      };
    case GETPROMOTEBILL_SUCCESS:
      return {
        ...state,
        promote_bill: {
          list: action.isNew
            ? action.payload.data.list
            : state.promote_bill.list.concat(action.payload.data.list),
          count: action.payload.data.count,
        },
      };
    default:
      return state;
  }
}
// export const userLoginSuccess = state => state.user;
// export const userLoginPending = state => state.pending;
// export const userLoginError = state => state.error;
