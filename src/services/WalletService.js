import config from "../config/config";
import { ApiService } from "./ApiService";
import JSEncrypt from "jsencrypt";
export const WalletService = {
  GetWalletDetails,
  UpdateWalletDetails,
  GetWithdrawalDetails,
  Transfer,
  GetDepositChannel,
  GetDepositBonusScheme,
  GetDepositBank,
  Deposit,
  ManualDeposit,
  ManualDepositQR,
  ManualDepositUpload,
  CancelDeposit,
  CheckDeposit,
  GetBankCardList,
  AddBankCard,
  Withdrawal,
  AddBilling,
  DeleteBankCard,
  WithdrawAll,
  GetQRCode,
  GetBankList,
};
function GetWithdrawalDetails(token) {
  const result = ApiService.post(
    "member/forWithdrawal",
    {
      token: token,
    },
    true
  );

  return result;
}
function GetWalletDetails(token) {
  const result = ApiService.get(
    "pc/userGameWallet/balanceList",
    {
      token: token,
    },
    true
  );

  return result;
}
function UpdateWalletDetails() {
  const result = ApiService.get(
    "pc/userGameWallet/update"
  );

  return result;
}
function GetBankList() {
  const result = ApiService.get("pc/bank", {}, true);

  return result;
}
function Transfer(amount, center_wallet_id, game_platform_id, transform_type) {
  const result = ApiService.post("pc/userTransform", {
    amount,
    center_wallet_id,
    game_platform_id,
    transform_type,
  });

  return result;
}
function WithdrawAll() {
  const result = ApiService.get("pc/userGameWallet/transferToCenterWallet");

  return result;
}
function GetDepositChannel() {
  const result = ApiService.get("pc/userRecharge/methodList");

  return result;
}
function GetDepositBank() {
  const result = ApiService.get("pc/bank/getBankAccount");

  return result;

}
function ManualDeposit(bankId, channelId, amount, username) {

  const result = ApiService.post(
    `pc/bank/submitBankOrder`,
    {
      account_id: bankId,

      amount: amount,
      pay_username: username
    }
  );

  return result;
}
function ManualDepositQR(channelId, amount, username) {

  const result = ApiService.post(
    `pc/qrcode/subQrCodeOrder`,
    {
      pay_type: channelId,
      amount: amount,
      pay_username: username
    }
  );

  return result;
}
function ManualDepositUpload(file, fileType, orderId) {

  const result = ApiService.postFile(
    `api/upload/upload`, file,
    {

      type: fileType,
      orderId: orderId
    }
  );

  return result;
}
function Deposit(amount, payment_id, extend) {
  const result = ApiService.post(
    "pc/userRecharge",
    {
      amount,
      payment_id,
      extend: extend,
    },
    true
  );

  return result;
}
function CancelDeposit(id) {
  const result = ApiService.del(
    "pc/userRecharge/delete",
    {

      id,
    }
  );

  return result;
}
function CheckDeposit(token, id) {
  const result = ApiService.post(
    "member/depositCheck",
    {
      token,
      id,
    },
    true
  );

  return result;
}
function GetDepositBonusScheme(token, amount) {
  const result = ApiService.post(
    "activity/getDepositActs",
    {
      token,
      amount,
    },
    true
  );

  return result;
}
function GetBankCardList() {
  const result = ApiService.get("pc/bankcard", {}, true);

  return result;
}
function AddBankCard(card, name, foreign_id, bank_branch) {
  const result = ApiService.post(
    "pc/bankcard",
    {
      card,
      name,
      foreign_id,
      bank_branch,
    },
    true
  );

  return result;
}
function AddBilling(card_id, amount) {
  const result = ApiService.get(
    `pc/withdraw/bill?amount=${amount}&user_account_id=${card_id}`
  );

  return result;
}
function Withdrawal(amount, password, user_account_id) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(config.RSAKey);
  const result = ApiService.post("pc/withdraw", {
    amount,
    password: encrypt.encrypt(password),
    user_account_id,
  });

  return result;
}
function DeleteBankCard(id) {
  const result = ApiService.del("pc/bankcard", {
    id,
  });

  return result;
}
function GetQRCode(url, cid, oid) {
  const result = ApiService.postExternal(
    url,
    {
      cid,
      oid,
    },
    true
  );

  return result;
}
