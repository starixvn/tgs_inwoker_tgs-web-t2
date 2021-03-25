import config from "../config/config";
import { ApiService } from "./ApiService";
import JSEncrypt from "jsencrypt";
export const AccountService = {
  Login,
  LoginWithoutSetToken,
  Logout,
  Register,
  GetMemberInfo,
  CheckGame,
  GetMemberProfile,
  GetVIPInfo,
  UpdateAddress,
  UpdatePassword,
  ChangeWithdrawalPassword,
  UpdateEmail,
  GetEmailVerificationCode,
  AddWithdrawalPassword,
  UpdateWithdrawalPassword,
  UpdateMemberCardNo,
  UpdateMemberName,
  UpdateEmailStep1,
  UpdateEmailStep2,
  UpdatePhone,
  UpdatePhoneStep1,
  UpdatePhoneStep2,
  GetPhoneVerificationCode,
  GetChangeWithdrawalPasswordVerificationCode, GetChangePhoneVerificationCode, SubmitChangePhoneCode, GetChangeNewPhoneVerificationCode, SubmitChangeNewPhone,
  GetSecurityQuestion,
  UpdateSecurityQuestion,
  VerifySecurityQuestion,
  VerifySecurityQuestionByEmail,
  VerifySecurityQuestionByPhone,
  ResetSecurityQuestion,
  GetVerifyCode,
  GetResetPasswordStep1,
  GetResetPasswordSecurityQuestionVerify,
  GetResetPasswordEmailVerify,
  GetResetPasswordPhoneVerify,
  ResetPassword,
  UpdateWechat,
  UpdateQQ,
  SelfControlVerify,
  SelfControlSetTime,
  VerifyWithdrawalPasswordByPhone,
  GetIDCardNo,
  GetInviteLink,
  GetPromoteUser,
  GetPromoteBill, GetForgetPasswordCode, CheckPhoneOrAccount
};

function Login(username, password) {

  const result = ApiService.post(
    "Player/Login",
    {
      "username":username,
      "password": password,
      "platformtype": config.isPC
    }
  );

  result.then((response) => {
    if (response.IsSuccess) {
      localStorage.setItem("token", response.data.token);
    }
  });

  return result;
}
function LoginWithoutSetToken(user_account, user_password) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(config.RSAKey);
  const result = ApiService.post(
    "pc/user/Login",
    {
      user_account,
      user_password: encrypt.encrypt(user_password),
    },
    true
  );

  return result;
}
function Logout() {
  const result = ApiService.del("Player/logout", {});

  result.then((response) => {
    if (response.IsSuccess) {
      localStorage.removeItem("token");
    }
  });

  return result;
}
function Register(
  username,
  pwd,
  confirmpwd,
  invitationcode = ""
) {
  var currency = "CNY";

  const result = ApiService.post("Player/create", {
    username,
    currency,
    pwd,
    confirmpwd,
    invitationcode,
    agent: true,
    testplayer: config.testplayer
  });

  // result.then((response) => {
  //   if (response.IsSuccess) {
  //     localStorage.setItem("token", response.data);
  //   }
  // });
  return result;
}
function GetMemberInfo() {
  const result = ApiService.get("Player/info");

  return result;
}
function CheckGame() {
  const result = ApiService.post("pc/gamePlatform/checkGame", {});

  return result;
}
function GetMemberProfile() {
  return GetMemberInfo();
}

function UpdateAddress(
  token,
  member_address,
  member_address_surename,
  member_address_phone
) {
  const result = ApiService.post(
    "member/address",
    {
      token,
      member_address,
      member_address_surename,
      member_address_phone,
    },
    true
  );

  return result;
}
function UpdateQQ(member_qq) {
  const result = ApiService.put("Player/update", {
    "qq":member_qq,
  });

  return result;
}
function UpdateWechat(member_wechat) {
  const result = ApiService.put("Player/update", {
    "wechat":member_wechat,
  });
  return result;
}
function UpdatePassword(old_password, password) {
  const result = ApiService.put(
    "player/password",
    {
      "oldpwd":old_password,
      "newpwd": password,
    }
  );
  return result;
}
function ChangeWithdrawalPassword(newpwd, validateCode, securityKey) {
  const result = ApiService.patch(
    "pay/password",
    {
     "newpwd": newpwd,
     "validatecode": validateCode,
     "securitykey": securityKey
    },
  );

  return result;
}
function AddWithdrawalPassword(password) {
  const result = ApiService.post(
    "pay/password",
    {
      "password":password,
    }
  );
  return result;
}

function UpdateWithdrawalPassword(password, password_confirm, sms_code) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(config.RSAKey);

  const result = ApiService.put(
    "pc/payPassword/retrieve",
    {
      password: encrypt.encrypt(password),
      password_confirm: encrypt.encrypt(password_confirm),
      sms_code,
    },
    true
  );

  return result;
}
function UpdateEmail(email) {
  const result = ApiService.put("Player/update", {
    "email":email,
  });

  return result;
}
function UpdateEmailStep1(token, code) {
  const result = ApiService.post(
    "member/resetBindEmailStepOne",
    {
      token,
      code,
    },
    true
  );

  return result;
}
function UpdateEmailStep2(token, email, code) {
  const result = ApiService.post(
    "member/resetBindEmailStepTwo",
    {
      token,
      email,
      code,
    },
    true
  );

  return result;
}
function GetEmailVerificationCode(token, email, event) {
  const result = ApiService.post(
    "passport/sendEmsCode",
    {
      email,
      event: event,
      token,
      from: config.from,
    },
    true
  );

  return result;
}

function UpdatePhone(mobile, sms_code) {
  const result = ApiService.put("Player/update", {
    "phone":mobile,
  });

  return result;
}
function UpdatePhoneStep1(token, code) {
  const result = ApiService.post(
    "member/resetBindPhoneStepOne",
    {
      token,

      code,
    },
    true
  );

  return result;
}
function UpdatePhoneStep2(token, phone, code) {
  const result = ApiService.post(
    "member/resetBindPhoneStepTwo",
    {
      token,
      phone,
      code,
    },
    true
  );

  return result;
}
function GetPhoneVerificationCode(token, mobile, event) {
  const result = ApiService.post(
    "pc/sms/bindPhone",
    {
      mobile,
      // event: event,
      // token,
      // from: config.from,
    },
    true
  );

  return result;
}
function GetChangeWithdrawalPasswordVerificationCode() {
  const result = ApiService.post(
    "pay/password/validate-code",
    { },
  );

  return result;
}

function GetChangePhoneVerificationCode() {
  //
  const result = ApiService.post(
    "PlayerPhone",
    {},
  );

  return result;
}

function GetChangeNewPhoneVerificationCode(mobile) {
  const result = ApiService.post(
    "pc/sms/modifyNewPhone",
    {
      mobile
    },
    true
  );

  return result;
}
function SubmitChangeNewPhone(mobile, sms_code) {
  const result = ApiService.put(
    "pc/user/modifyPhone",
    {
      mobile, sms_code
    }
  );

  return result;
}

function SubmitChangePhoneCode(sms_code) {

  const result = ApiService.post(
    "pc/sms/submitOldVerifyCode",
    {
      sms_code
    },
    true
  );

  return result;
}
function UpdateMemberCardNo(identification) {
  const result = ApiService.put("Player/update", {
    "realname":identification,
  });

  return result;
}
function UpdateMemberName(token, name) {
  const result = ApiService.post(
    "member/editSurename",
    {
      name,
      token,
    },
    true
  );

  return result;
}

function GetSecurityQuestion(token) {
  const result = ApiService.post(
    "member/getQuestion",
    {
      token,
    },
    true
  );

  return result;
}
function ResetSecurityQuestion(token, question_id, answer) {
  const result = ApiService.post(
    "member/resetQuestion",
    {
      token,
      question_id,
      answer,
    },
    true
  );

  return result;
}
function UpdateSecurityQuestion(token, question_id, answer) {
  const result = ApiService.post(
    "member/setQuestion",
    {
      token,
      question_id,
      answer,
    },
    true
  );

  return result;
}
function VerifySecurityQuestion(token, answer) {
  const result = ApiService.post(
    "member/resetQuestionByAnswer",
    {
      token,
      answer,
    },
    true
  );

  return result;
}
function VerifySecurityQuestionByEmail(token, code) {
  const result = ApiService.post(
    "member/resetQuestionByEmail",
    {
      token,
      code,
    },
    true
  );

  return result;
}
function VerifySecurityQuestionByPhone(token, code) {
  const result = ApiService.post(
    "member/resetQuestionByPhone",
    {
      token,
      code,
      event: "resetQuestion",
    },
    true
  );

  return result;
}
function VerifyWithdrawalPasswordByPhone(token, code) {
  const result = ApiService.post(
    "pc/sms/retrievePayPassword",
    {
      token,
      code,
      event: "resetWithdrawalPassword",
    },
    true
  );

  return result;
}
function GetVerifyCode() {
  const result = ApiService.get("passport/verify");

  return result;
}

function CheckPhoneOrAccount(phone) {
  const result = ApiService.get("pc/user/checkPhoneOrAccount?user=" + phone);

  return result;


}
function GetForgetPasswordCode(mobile) {
  const result = ApiService.post("pc/sms/retrievePassword", { mobile });

  return result;




}




function GetResetPasswordStep1(account, verify_code, session_id) {
  const result = ApiService.post(
    "passport/resetPasswordStepOne",
    {
      account,
      verify_code,
      session_id,
    },
    true
  );

  return result;
}
function GetResetPasswordSecurityQuestionVerify(forget_token, answer) {
  const result = ApiService.post(
    "passport/resetPasswordByAnswer",
    {
      forget_token,
      answer,
    },
    true
  );

  return result;
}
function GetResetPasswordEmailVerify(forget_token, code) {
  const result = ApiService.post(
    "passport/resetPasswordByEmail",
    {
      forget_token,
      code,
    },
    true
  );

  return result;
}
function GetResetPasswordPhoneVerify(forget_token, code) {
  const result = ApiService.post(
    "passport/resetPasswordByPhone",
    {
      forget_token,
      code,
    },
    true
  );

  return result;
}
function ResetPassword(code, mobile, password, password_confirm) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(config.RSAKey);
  const result = ApiService.put(
    "pc/user/retrievePassword",
    {
      code,
      mobile,
      password: encrypt.encrypt(password),
      password_confirm: encrypt.encrypt(password_confirm),
    },
    true
  );

  return result;
}
function SelfControlVerify(token, code) {
  const result = ApiService.post(
    "member/selfControlOne",
    {
      token,
      code,
    },
    true
  );

  return result;
}
function SelfControlSetTime(token, day) {
  const result = ApiService.post(
    "member/selfControlTwo",
    {
      token,
      day,
    },
    true
  );

  return result;
}
function GetVIPInfo(token) {
  const result = ApiService.get("member/vip?token=" + token);

  return result;
}
function GetIDCardNo() {
  const result = ApiService.get("pc/authentication");

  return result;
}
function GetInviteLink() {
  const result = ApiService.get("pc/user/downloadUrl");

  return result;
}
function GetPromoteUser(page, limit) {
  const result = ApiService.get(
    `pc/user/promoteUser?page=${page}&page_size=${limit}`
  );

  return result;
}
function GetPromoteBill(page, limit) {
  const result = ApiService.get(
    `pc/userPromoteBill?page=${page}&page_size=${limit}`
  );

  return result;
}
