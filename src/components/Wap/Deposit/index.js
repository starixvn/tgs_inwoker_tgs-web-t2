import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  walletAction,
  WalletService,
  WALLET_HIDEMESSAGE,
  RESET_WALLETRESULT,
} from "@Inwoker/tgs-api";
import { withRouter } from "react-router-dom";
import Common from "../../../utils/Common";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AppHistory } from "../../../history/History";

import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "react-lazy-load-image-component/src/effects/blur.css";
import UnderConstructionPNG from "../../../assets/images/underconstruction.png";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import { withSnackbar } from "notistack";

import Modal from "@material-ui/core/Dialog";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";
import { Grid } from "@material-ui/core";

import Details from "./Details";
import Manual from "./Manual";

const UnderConstructionWrap = styled.div`
  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
  font-size: 30px;
`;
const Container = styled.div`
  padding-top: 85px;
`;
const BalanceLabel = styled.div`
  float: right;
  margin: 26px 20px 0 0;

  font-size: 30px;
  font-weight: 600;

  text-align: right;
  color: #fde73f;
`;

const StyledAppBar = withStyles({
  root: {
    top: "89px",

    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);

const CustomSelect = withStyles((theme) => ({
  root: {
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
  select: {
    padding: "18.5px 0px",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:disabled": {
      color: "#c3c3c3",
    },
  },
}))(Select);
const CustomText = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    width: "640px",
    height: "78px",
    border: "none",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 30px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(to top, #91030c, #c40511);
  color: #ffffff;
`;

const CustomTextContainer = styled(Grid)`
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 20px auto;
`;
const CustomTextLabel = styled(Grid)`
  font-weight: 600;
  margin: 12px 0 0 3px;
  float: left;
  color: #212e31;
  font-size: 34px;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  text-align: right;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;
  font-size: 34px;
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;

class Deposit extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      selectedPaymentIndex: 0,
      selectedMethodIndex: 0,

      selectedChannelIndex: 0,

      account: "",
      amount: "",

      step: 1,
      upload: "",

      isMaintenance: false,
    };
    this.state = { ...this.initialState };
  }
  bankInfo = null;

  componentDidMount() {
    if (this.props.token != null) {
      this.props.getDepositMethod();
    } else {
      AppHistory.replace("/" + i18n.language + "/");
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];

        this.setState({
          ...this.state,
          step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
          loading: false,
        });
      } else {
        this.props.alert("", this.props.wallet.depositResult.info);
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({ ...this.initialState });
        this.props.alert("", i18n.t("deposit.uploadSuccess"));
      } else {
        this.props.alert("", this.props.wallet.depositUploadResult.info);
        this.setState({ ...this.state, loading: false });
      }
    }
  }
  handleRestartClick = (e) => {
    this.setState({ ...this.initialState });
    this.props.resetDeposit();
  };
  // CancelDeposit(token, id) {
  //   return WalletService.CancelDeposit(token, id);
  // }

  // handleBankClick = (item) => {
  //   this.setState({
  //     ...this.state,
  //     selectedBank: item,
  //     bankOpen: false,
  //   });
  // };

  // handleDepositClick = (e) => {
  //   if (this.state.selectedType.id === 0) {
  //     // manual deposit
  //     //bankId, channelId, amount, username
  //     this.props.doManualDeposit(
  //       this.bankInfo.id,
  //       this.state.selectedChannel.id,
  //       this.state.depositAmount,
  //       this.state.username
  //     );
  //   } else {
  //     this.props.doDeposit(
  //       this.state.depositAmount,
  //       this.state.selectedType.id,
  //       this.state.selectedChannel ? this.state.selectedChannel.id : ""
  //     );
  //   }
  // };

  // handleTunnelChange = (e) => {
  //   var selectedChannel = this.state.selectedType.channel.filter(
  //     (item) => item.id == e.target.value
  //   )[0];

  //   this.setState({
  //     ...this.state,
  //     selectedChannel: selectedChannel,
  //   });
  // };
  handleAmountChange = (e) => {
    this.setState({
      ...this.state,
      amount: e.target.value.replace(/,/g, ""),
    });
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };
  // handleChangeTab = (e, newValue) => {

  //   this.setState({
  //     ...this.state,
  //     selectedType: newValue,
  //     selectedChannel: newValue.channel[0],
  //   });
  // };

  //newly declared function - START

  // handleChangeManualDepositMethod = (value) => {
  //   this.setState({
  //     ...this.state,
  //     methodCode: value,
  //   });
  // };

  // handleChangePaymentOption = (value) => {
  //   this.setState({
  //     ...this.state,
  //     paymentId: value,
  //   });
  // };

  uploadImage = (e) => {
    this.setState({
      ...this.state,
      upload: e.target.files[0],
    });
  };

  handleDepositClick = () => {
    var payment =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];

    if (payment.paymentcode.toUpperCase() === "MANUAL") {
      // handle manual deposit

      this.props.doManualDeposit(
        this.state.name,
        this.state.amount.replace(/,/g, ""),
        channel.id
      );
    } else {
      this.props.doLeePayDeposit(
        this.state.amount.replace(/,/g, ""),
        channel.id
      );
    }
  };

  changeValue = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  handlePaymentChange = (e, value) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedMethodIndex: 0,

        selectedChannelIndex: 0,
        selectedPaymentIndex: value,
      });
    }
  };
  performUploadImage = (file) => {
    this.props.doUploadDepositProof(this.props.wallet.depositResult.data, file);
  };

  //newly declared function - END

  render() {
    // const details = [
    //   {
    //     label: i18n.t("deposit.depositAmount"),
    //     data: "￥" + this.state.manualDepositDetail.amount,
    //   },
    //   {
    //     label: i18n.t("deposit.receiverNumber"),
    //     data: this.state.manualDepositDetail.bankAccount,
    //   },
    //   {
    //     label: i18n.t("deposit.receiverAccount"),
    //     data: this.state.manualDepositDetail.bankAccountName,
    //   },
    //   {
    //     label: i18n.t("deposit.receiverBank"),
    //     data: this.state.manualDepositDetail.bankName,
    //   },
    //   {
    //     label: i18n.t("deposit.depositMethod"),
    //     data: this.state.manualDepositDetail.channelName,
    //   },
    //   {
    //     label: i18n.t("deposit.depositTunnel"),
    //     data: this.state.manualDepositDetail.methodName,
    //   },
    // ];

    const switchView = (view) => {
      switch (view) {
        case 1:
          return (
            <>
              <CustomText>
                <CustomLabel>
                  {i18n.t("deposit.msgPlsSelectPayment")}
                </CustomLabel>
                <CustomFormControl variant="outlined">
                  <CustomSelect
                    native
                    id="customSelect"
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                      color: "#d09f58",
                    }}
                    value={this.state.selectedMethodIndex}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        selectedChannelIndex: 0,
                        selectedMethodIndex: e.target.value,
                      });
                    }}
                  >
                    <option value={""} disabled>
                      {i18n.t("deposit.msgPlsSelectPayment")}
                    </option>
                    {this.props.wallet.depositTypeList.length > 0 &&
                      this.props.wallet.depositTypeList[
                        this.state.selectedPaymentIndex
                      ].method.map((item, index) => {
                        return <option value={index}>{item.methodcode}</option>;
                      })}
                  </CustomSelect>
                </CustomFormControl>
              </CustomText>
              <CustomText>
                <CustomLabel>
                  {i18n.t("deposit.msgPlsSelectMethod")}
                </CustomLabel>
                <CustomFormControl variant="outlined">
                  <CustomSelect
                    native
                    id="customSelect"
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                      color: "#d09f58",
                    }}
                    value={this.state.selectedChannelIndex}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        selectedChannelIndex: e.target.value,
                      });
                    }}
                  >
                    {this.props.wallet.depositTypeList.length > 0 &&
                      this.props.wallet.depositTypeList[
                        this.state.selectedPaymentIndex
                      ].method[this.state.selectedMethodIndex].channel.map(
                        (item, index) => {
                          return (
                            <option value={index}>{item.channelname}</option>
                          );
                        }
                      )}
                  </CustomSelect>
                </CustomFormControl>
              </CustomText>

              {(() => {
                if (
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "MANUAL"
                ) {
                  return (
                    <Textbox
                      style={{ margin: "20px auto 20px auto" }}
                      type={"text"}
                      placeholder={i18n.t("deposit.msgPlsEnterAccount")}
                      label={i18n.t("deposit.msgPlsEnterAccount")}
                      value={this.state.account}
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          account: e.target.value,
                        });
                      }}
                    ></Textbox>
                  );
                }
              })()}
              <Textbox
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.amount}
                onChange={this.handleAmountChange}
                type={"number"}
                placeholder={
                  i18n.t("deposit.msgPleaseEnter") +
                  Common.formatNumberWithThousand(
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.from
                  ) +
                  "-" +
                  Common.formatNumberWithThousand(
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.to
                  ) +
                  i18n.t("deposit.dollor")
                }
                label={i18n.t("deposit.depositAmount")}
              ></Textbox>

              <Button
                style={{ margin: "40px auto 0 auto" }}
                label={
                  this.state.step === 1
                    ? i18n.t("common.nextStep")
                    : this.state.step === 2
                    ? "上传"
                    : ""
                }
                onClick={this.handleDepositClick}
                disabled={
                  (this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].paymentcode.toUpperCase() === "MANUAL" &&
                    this.state.account === "") ||
                  this.state.amount <
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.from ||
                  this.state.amount >
                    this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ].method[this.state.selectedMethodIndex].channel[
                      this.state.selectedChannelIndex
                    ].transferlimit.to
                }
              ></Button>
            </>
          );
        case 2:
        case 3:
          return (
            <Details
              performUploadImage={this.performUploadImage}
              amount={this.state.amount}
              depositResult={this.props.wallet.depositResult}
              methodcode={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].methodcode
              }
              channelname={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].channelname
              }
              handleRestartClick={this.handleRestartClick}
              isManual={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode.toUpperCase() === "MANUAL"
              }
              extended={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].extended
              }
            ></Details>
          );
        // return (
        //   <div style={{ padding: "0px 40px" }}>
        //     {details.map((data, index) => {
        //       return (
        //         <CustomTextContainer container justify="space-between">
        //           <CustomTextLabel>{data.label}</CustomTextLabel>
        //           <CustomInput
        //             type={"text"}
        //             value={data.data}
        //             readOnly={true}
        //           ></CustomInput>
        //         </CustomTextContainer>
        //       );
        //     })}{" "}
        //     <input
        //       type="file"
        //       ref={this.myRef}
        //       accept="image/*"
        //       onChange={this.uploadImage}
        //     ></input>
        //   </div>
        // );
      }
    };
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("deposit.title")}
          rightContent={<BalanceLabel>￥{this.props.balance}</BalanceLabel>}
        ></Header>

        {(() => {
          if (this.props.wallet.depositTypeList.length <= 0) {
            return <></>;
          }
          return (
            <>
              <StyledAppBar>
                <Tabs
                  value={this.state.selectedPaymentIndex}
                  onChange={this.handlePaymentChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {this.props.wallet.depositTypeList.map((item, index) => {
                    return (
                      <Tab key={index} value={index} label={item.paymentcode}>
                        {item.paymentcode}
                      </Tab>
                    );
                  })}
                </Tabs>
              </StyledAppBar>
              {(() => {
                return switchView(this.state.step);
              })()}
            </>
          );
        })()}
        <StyledModalPopup
          onClose={this.props.hideAlert}
          open={this.props.wallet.message !== ""}
        >
          <DialoTitle>{i18n.t("common.info")}</DialoTitle>
          <DialoMessage>{this.props.wallet.message}</DialoMessage>
          <ButtonConfirm onClick={this.props.hideAlert}>
            {i18n.t("common.confirm")}
          </ButtonConfirm>
        </StyledModalPopup>

        <Loading show={this.props.wallet.depositLoading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    account: state.account,
    token: state.account.token,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    doLeePayDeposit: (amount, payment_id) =>
      dispatch(walletAction.doLeePayDeposit(amount, payment_id)),
    doManualDeposit: (amount, account, paymentid) =>
      dispatch(walletAction.doManualDeposit(amount, account, paymentid)),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    hideAlert: () =>
      dispatch({
        type: WALLET_HIDEMESSAGE,
      }),
    resetDeposit: () => {
      return dispatch({
        type: RESET_WALLETRESULT,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Deposit)));
