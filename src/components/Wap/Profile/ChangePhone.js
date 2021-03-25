import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import Step from "../Share/Step";
import BaseProfile from "./BaseProfile";
import { AccountService } from "../../../services/AccountService";
import { accountAction } from "../../../actions/accountAction";
import { withSnackbar } from "notistack";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
class ChangePhone extends BaseProfile {
  componentDidMount() {
    this.setState({
      ...this.state,
      phone: this.props.account.info.member_phone,
      code: "",
      currentStep: 1,

      countdownToken: 0
    });
  }

  handleChangePhone = e => {
    this.setState({ ...this.state, phone: e.target.value });
    this.onTextChanged();
  };
  handleChangeCode = e => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1
      });
    }
  };
  handleGetCodeClick = e => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.phone) return this.showErrorMessage(i18n.t("common.msgEnterPhone"));
    this.showLoading(true);
    // let events = "";
    // if (this.state.currentStep === 1) {
    //   events = "check";
    // } else if (this.state.currentStep === 2) {
    //   events = "bind";
    // }
    var result = null;
    if (this.state.currentStep === 1) {
      result = AccountService.GetChangePhoneVerificationCode();

    } else {
      result = AccountService.GetChangeNewPhoneVerificationCode(this.state.phone);
    }
    result
      .then(response => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
        } else {
          this.showInfoMessage(response.info);
        }
        // this.setState({
        //   ...this.state,
        //   countdownToken: response.data
        // });
        // setTimeout(() => {
        //   this.checkCountdownToken();
        // }, 1000);
        this.showLoading(false);
      })
      .catch(err => {
        this.showErrorMessage(err.Message);
      });
  };
  handleVerifyTokenError = err => {
    this.showErrorMessage(err.Message);

    if (
      err.Result.RemainingSec != null &&
      isNaN(err.Result.RemainingSec) === false
    ) {
      this.setState({
        ...this.state,
        countdownToken: err.Result.RemainingSec
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    }

    this.showLoading(false);
  };
  isDisableButton = () => {
    const code = this.state.code;
    const phone = this.state.phone;
    return !(code && phone);
  };
  showErrorMessage = msg => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = msg => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    if (this.state.currentStep === 1) {
      this.showLoading(true);
      AccountService.SubmitChangePhoneCode(this.state.code)
        .then(response => {
          if (response.IsSuccess) {
            this.setState({
              ...this.state,
              phone: "",
              code: "",
              currentStep: 2,

              countdownToken: 0
            });
            this.showInfoMessage(i18n.t("common.msgTokenVerified"));
          } else {
            this.showErrorMessage(response.info);
          }

          this.showLoading(false);
        })
        .catch(err => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    } else {
      this.showLoading(true);
      AccountService.SubmitChangeNewPhone(

        this.state.phone,
        this.state.code
      ).then(response => {
        if (response.IsSuccess) {
          this.props
            .getAccountInfo()
            .then(responseUpdate => {
              if (responseUpdate.IsSuccess) {
                AppHistory.replace("/" + i18n.language + "/profile/phone");
              }
              this.showLoading(false);
            });
        } else {
          this.showErrorMessage(response.info);
          this.showLoading(false);
        }
      });
    }
  };
  render() {
    return this.setupContent(
      i18n.t("profile.changePhone.title"),
      <>
        <Step
          steps={[{ label: i18n.t("profile.changePhone.step1Title") }, { label: i18n.t("profile.changePhone.step2Title") }]}
          currentStep={this.state.currentStep}
        ></Step>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.phone}
          onChange={this.handleChangePhone}
          placeholder={i18n.t("common.msgEnterPhone")}
          disabled={this.state.currentStep === 1}
          label={i18n.t("common.phoneNumber")}
        ></Textbox>
        <TextboxWithButton
          buttonlabel={
            this.state.countdownToken <= 0
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") + "(" + this.state.countdownToken + "s)"
          }
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.code}
          onChange={this.handleChangeCode}
          placeholder={i18n.t("common.msgEnterPhoneCode")}
          label={i18n.t("common.token")}
          onClick={this.handleGetCodeClick}
        ></TextboxWithButton>
      </>,
      this.state.currentStep === 1 ? i18n.t("common.nextStep") : i18n.t("common.submit")
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAccountInfo: () =>
      dispatch(accountAction.getAccountInfo())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(ChangePhone)));
