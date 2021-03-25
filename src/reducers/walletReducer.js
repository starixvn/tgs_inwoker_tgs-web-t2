import {
  GETDEPOSITCHANNEL_BEGIN,
  GETDEPOSITCHANNEL_SUCCESS,
  GETDEPOSITCHANNEL_FAIL,
  DODEPOSIT_BEGIN,
  DODEPOSIT_SUCCESS,
  DODEPOSIT_FAIL,
  LOGOUT_SUCCESS,
  CANCELDEPOSIT_BEGIN,
  CANCELDEPOSIT_SUCCESS,
  CANCELDEPOSIT_FAIL,
  DOMANUALDEPOSIT_BEGIN,
  DOMANUALDEPOSIT_SUCCESS,
  DOMANUALDEPOSIT_FAIL,
  DOMANUALDEPOSITUPLOAD_BEGIN,
  DOMANUALDEPOSITUPLOAD_SUCCESS,
  DOMANUALDEPOSITUPLOAD_FAIL,
  WALLET_HIDEMESSAGE,
  RESET_WALLETRESULT,
  GETBALANCELIST_BEGIN,
  GETBALANCELIST_SUCCESS,
  GETBALANCELIST_FAIL,
  UPDATEBALANCELIST_BEGIN,
  UPDATEBALANCELIST_SUCCESS,
  UPDATEBALANCELIST_FAIL,
  GETBANKCARDLIST_BEGIN,
  GETBANKCARDLIST_SUCCESS,
  GETBANKCARDLIST_FAIL,
  GETBANKLIST_BEGIN,
  GETBANKLIST_SUCCESS,
  GETBANKLIST_FAIL,
  DELETEBANKCARD_BEGIN,
  DELETEBANKCARD_SUCCESS,
  DELETEBANKCARD_FAIL,
  ADDBANKCARD_BEGIN,
  ADDBANKCARD_SUCCESS,
  ADDBANKCARD_FAIL,
  ADDBILLING_BEGIN,
  ADDBILLING_SUCCESS,
  ADDBILLING_FAIL,
  DOWITHDRAWAL_BEGIN,
  DOWITHDRAWAL_SUCCESS,
  DOWITHDRAWAL_FAIL,
  DOTRANSFER_BEGIN,
  DOTRANSFER_SUCCESS,
  DOTRANSFER_FAIL,
  DOWITHDRAWALALL_BEGIN,
  DOWITHDRAWALALL_SUCCESS,
  DOWITHDRAWALALL_FAIL,
} from "../constants/actionType";
import { WalletType } from "../utils/Enum";
const initState = {
  loading: false,
  updateBalanceloading: false,
  transferLoading: false,
  message: "",
  depositTypeList: [],
  depositLoading: false,
  depositResult: null,
  cancelDepositResult: null,
  depositUploadResult: null,
  addBankCardResult: null,
  deleteBankCardResult: null,
  addBillingResult: null,
  withdrawalResult: null,
  transferResult: null,
  withdrawalAllResult: null,
  balanceList: [],
  bankCardList: [],
  bankList: [],
  mainBalance: 0,
  mainSymbol: "",
  mainId: "",
};
function mapDepositType(result) {
  var data = result.data;

  var depositTypeList = [];
  for (var i = 0; i < data.length; i++) {
    var depositType = data[i];
    depositType.id = depositType.id;
    depositType.title = depositType.name;
    depositType.type_class = depositType.jump_type;
    depositType.type_title = depositType.jump_type_text;
    depositType.max = parseFloat(depositType.max_amount_text.replace(/,/g, ""));
    depositType.min = parseFloat(depositType.min_amount_text.replace(/,/g, ""));
    depositType.payment_icon_url = depositType.payment_icon_url;
    depositType.banks = [];
    try {
      var extend = JSON.parse(depositType.extend);
      var extendJsonArr = [];
      for (var key in extend) {
        if (extend.hasOwnProperty(key)) {
          extendJsonArr.push({ id: key, title: extend[key] });
        }
      }
      depositType.channel = extendJsonArr;
    } catch (e) {
      depositType.channel = [];
    }

    depositTypeList.push(depositType);
  }
  // add manual deposit
  var depositType = {};
  depositType.id = 0;
  depositType.title = "人工支付";
  depositType.type_class = 0;
  depositType.type_title = "跳转URL（GET提交）";
  depositType.max = 1000
  depositType.min = 10
  depositType.payment_icon_url = "";
  depositType.banks = [];
  depositType.channel = [{
    id: 400, code: "bank", title: "银行汇款", is_transfer: true, is_qr: false, amount_options: null
  }, {
    id: 401, code: "wechat", title: "微信二维码", is_transfer: false, is_qr: true, amount_options: null

  }, {
    id: 402, code: "alipay", title: "支付宝二维码", is_transfer: false, is_qr: true, amount_options: null
  }, {
    id: 403, code: "yun", title: "云闪付二维码", is_transfer: false, is_qr: true, amount_options: null
  }]

  depositTypeList.push(depositType);


  return depositTypeList;
}
function mapBalanceList(data) {
  var balanceList = [];
  var mainBalance = 0;
  var mainSymbol = "";
  var mainId = "";
  for (var i = 0; i < data.length; i++) {
    if (isNaN(data[i].id)) {
      mainId = data[i].id;
      mainBalance = data[i].balance_text.replace(/,/g, "");
      mainSymbol = data[i].symbol;
    }
    balanceList.push({
      balance: data[i].balance_text.replace(/,/g, ""),
      code: data[i].code,
      en_name: "",
      id: data[i].id,
      last_set_open: 0,
      maintenance: 2,
      max: "0.00",
      min: "0.00",
      money_limit: 0,
      money_limit_status: false,
      name: data[i].game_text,
      old_id: 0,
      parent_id: data[i].game_platform_id,
      pnl_ratio: "0.00",
      purse_type: isNaN(data[i].id)
        ? WalletType.MainWallet
        : WalletType.TransferWallet,
      short_name: "MAIN",
      status: 1,
      timezone: 0,
      type: 0,
      icon_url: data[i].icon_url,
      symbol: data[i].symbol,
    });
  }

  return { balanceList, mainBalance, mainSymbol, mainId };
}

function mapBankCardList(data) {
  var bankCardList = [];

  for (var i = 0; i < data.length; i++) {
    bankCardList.push({
      bank_account: data[i].card,
      bank_name: data[i].bank_text,
      id: data[i].id,
      is_default: 0,
      background_file: data[i].background_file,
      file: data[i].file,
    });
  }

  return { bankCardList };
}
function mapBankList(data) {
  var bankList = [];

  for (var i = 0; i < data.length; i++) {
    bankList.push({
      sort: data[i].sort,
      name: data[i].name,
      id: data[i].id,

      file: data[i].file,
    });
  }

  return { bankList };
}
const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case GETBANKLIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        bankList: [],
      };
    case GETBANKLIST_SUCCESS:
      return {
        ...state,
        ...mapBankList(action.payload),
        loading: false,
      };
    case GETBANKLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        bankList: [],
        loading: false,
      };
    case DELETEBANKCARD_BEGIN:
      return {
        ...state,
        message: "",
        deleteBankCardResult: null,
        loading: true,
      };
    case DELETEBANKCARD_SUCCESS:
    case DELETEBANKCARD_FAIL:
      return {
        ...state,
        deleteBankCardResult: action.payload,
        loading: false,
      };

    case ADDBANKCARD_BEGIN:
      return {
        ...state,
        message: "",
        addBankCardResult: null,
        loading: true,
      };
    case ADDBANKCARD_SUCCESS:
    case ADDBANKCARD_FAIL:
      return {
        ...state,
        addBankCardResult: action.payload,
        loading: false,
      };

    case ADDBILLING_BEGIN:
      return {
        ...state,
        message: "",
        addBillingResult: null,
        loading: true,
      };
    case ADDBILLING_SUCCESS:
    case ADDBILLING_FAIL:
      return {
        ...state,
        addBillingResult: action.payload,
        loading: false,
      };

    case GETBANKCARDLIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case GETBANKCARDLIST_SUCCESS:
      return {
        ...state,
        ...mapBankCardList(action.payload),
        loading: false,
      };
    case GETBANKCARDLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        bankCardList: [],
        loading: false,
      };
    case GETBALANCELIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: action.loading,

      };
    case GETBALANCELIST_SUCCESS:
      return {
        ...state,
        ...mapBalanceList(action.payload),
        loading: action.loading,
      };
    case GETBALANCELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        balanceList: [],
        loading: action.loading,
      };
    case UPDATEBALANCELIST_BEGIN:
      return {
        ...state,
        message: "",
        updateBalanceloading: action.loading,

      };
    case UPDATEBALANCELIST_SUCCESS:
      return {
        ...state,
        ...mapBalanceList(action.payload),
        updateBalanceloading: action.loading,
      };
    case UPDATEBALANCELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        balanceList: [],
        updateBalanceloading: action.loading,
      };
    case GETDEPOSITCHANNEL_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case GETDEPOSITCHANNEL_SUCCESS:
      return {
        ...state,
        depositTypeList: mapDepositType(action.payload),
        loading: false,
      };
    case GETDEPOSITCHANNEL_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case DOWITHDRAWAL_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case DOWITHDRAWAL_SUCCESS:
    case DOWITHDRAWAL_FAIL:
      return {
        ...state,
        withdrawalResult: action.payload,
        loading: false,
      };
    case DOTRANSFER_BEGIN:
      return {
        ...state,
        message: "",
        transferLoading: true,
      };
    case DOTRANSFER_SUCCESS:
    case DOTRANSFER_FAIL:
      return {
        ...state,
        transferResult: action.payload,
        transferLoading: false,
      };

    case DODEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DODEPOSIT_SUCCESS:
    case DODEPOSIT_FAIL:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case CANCELDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case CANCELDEPOSIT_SUCCESS:
    case CANCELDEPOSIT_FAIL:
      return {
        ...state,
        cancelDepositResult: action.payload,
        depositLoading: false,
      };
    case DOMANUALDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOMANUALDEPOSIT_SUCCESS:
    case DOMANUALDEPOSIT_FAIL:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case DOMANUALDEPOSITUPLOAD_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOMANUALDEPOSITUPLOAD_SUCCESS:
    case DOMANUALDEPOSITUPLOAD_FAIL:
      console.log(action.payload)
      return {
        ...state,
        depositUploadResult: action.payload,
        depositLoading: false,
      };
    case DOWITHDRAWALALL_BEGIN:
      return {
        ...state,
        message: "",
        transferLoading: true,
      };
    case DOWITHDRAWALALL_SUCCESS:
    case DOWITHDRAWALALL_FAIL:
      return {
        ...state,
        withdrawalAllResult: action.payload,
        transferLoading: false,
      };

    case WALLET_HIDEMESSAGE:
      return {
        ...state,
        message: "",
      };
    case RESET_WALLETRESULT:
      return {
        ...state,
        depositUploadResult: null,
        depositResult: null,
        cancelDepositResult: null,
        addBankCardResult: null,
        deleteBankCardResult: null,
        addBillingResult: null,
        withdrawalResult: null,
        transferResult: null,
      };
    default:
      return state;
  }
};

export default walletReducer;
