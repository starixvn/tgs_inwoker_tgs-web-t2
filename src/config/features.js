const featureList = {
  default: {
    SMSVerification: false,
    EmailVerification: true,
    ICVerification: true,
    QQWeChat: true,
    SportsHideLogo: false,
    PopupAnnouncement: false,
    Withdrawal_HundredDigit: false,
    Deposit_ManualApplePayHideBankAcc: false,
    Deposit_DualPage: false,
    AddCard_BankBranch: true,
    AddCard_DisplayFPS: false,
    MenuItem_Sorting_HK28: false,
    MenuItem_ShootFish: false,
    HomePage_FirstSection6Widget: false,
    GamePage_SpecificBackground: false,
    //missing config

    Wap_SupportCustomBackground: false,
  },
  HKJP: {
    SMSVerification: true,
    EmailVerification: false,
    ICVerification: false,
    SportsHideLogo: true,
    Withdrawal_HundredDigit: true,
    AddCard_BankBranch: false,
    Deposit_DualPage: true,
  },
  HK28: {
    EmailVerification: false,
    ICVerification: false,
    QQWeChat: false,
    PopupAnnouncement: true,
    Deposit_ManualApplePayHideBankAcc: true,
    AddCard_BankBranch: false,
    AddCard_DisplayFPS: true,
    MenuItem_Sorting_HK28: true,
    HomePage_FirstSection6Widget: true,
    GamePage_SpecificBackground: true,

    Wap_SupportCustomBackground: true,
  },
  WLGHK: {
    SportsHideLogo: true,
    AddCard_BankBranch: false,
  },
  "28BET": {
    SMSVerification: true,
    EmailVerification: false,
    AddCard_BankBranch: false,
    AddCard_DisplayFPS: true,
  },
  MESS8: {
    MenuItem_ShootFish: true,
    EmailVerification: false,
  },
};
export default featureList;
