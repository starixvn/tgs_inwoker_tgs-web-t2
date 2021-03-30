import React from "react";
import { connect } from "react-redux";
import { accountAction } from '@yifan1997/tgs-api-mapping';
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import Step from "../Share/Step";
import BaseProfile from "./BaseProfile";
import {AccountService} from  '@yifan1997/tgs-api-mapping';
import { withSnackbar } from "notistack";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
class ChangeEmail extends BaseProfile {
  componentDidMount() {
    this.setState({
      ...this.state,
      email: this.props.account.info.member_email,
      code: "",
      currentStep: 1,
      countdownToken: 0,
      securityKey:"",
    });
  }

  handleChangeEmail = e => {
    this.setState({ ...this.state, email: e.target.value });
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
        countdownToken: this.state.countdownToken - 1,
        btnTokenLabel: this.state.countdownToken - 1
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
        btnTokenLabel: "获取验证码"
      });
    }
  };
  handleGetCodeClick = e => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.email) return this.showErrorMessage("请输入您的邮箱地址");
    this.showLoading(true);
    AccountService.VerifyEmail(
      this.state.email,
    )
      .then(response => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          this.setState({securityKey: response.data,})
        } else {
          this.showErrorMessage(response.info);
        }
        this.setState({
          ...this.state,
          countdownToken: 60
        });
        setTimeout(() => {
          this.checkCountdownToken();
        }, 1000);
        this.showLoading(false);
      })
      .catch(err => {
        this.showErrorMessage(err.Message);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const email = this.state.email;
    return !(code && email);
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
    this.showLoading(true);
    if (this.state.currentStep === 1) {
        AccountService.UpdateEmail(
            this.state.securityKey,
            this.state.code
          )
        .then(() => {
          this.setState({
            ...this.state,
            email: "",
            code: "",
            securityKey: "",
            currentStep: 2,
            countdownToken: 0
          });
          this.showLoading(false);
        })
        .catch(err => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    } else {
        AccountService.UpdateEmail(
            this.state.securityKey,
            this.state.code
          )
        .then(() => {
          this.props
            .getAccountProfile(true)
            .then(responseUpdate => {
              if (responseUpdate.IsSuccess) {
                AppHistory.replace("/" + i18n.language + "/profile/email");
              }
              this.showLoading(false);
            });
        })
        .catch(err => {
          this.showErrorMessage(err);
          this.showLoading(false);
        });
    }
  };
  render() {
    return this.setupContent(
      "修改邮箱",
      <>
        <Step
          steps={[{ label: "验证原邮箱" }, { label: "设定新邮箱" }]}
          currentStep={this.state.currentStep}
        ></Step>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.email}
          onChange={this.handleChangeEmail}
          placeholder={"请输入邮箱地址"}
          disabled={this.state.currentStep === 1}
          label={"邮箱地址"}
        ></Textbox>
        <TextboxWithButton
          buttonlabel={
            this.state.countdownToken <= 0
              ? "发送验证码"
              : "重新发送(" + this.state.countdownToken + "s)"
          }
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.code}
          onChange={this.handleChangeCode}
          placeholder={"请输入邮箱验证码"}
          label={"验证码"}
          onClick={this.handleGetCodeClick}
        ></TextboxWithButton>
      </>,
      this.state.currentStep === 1 ? "下一步" : "提交"
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
    getAccountProfile: token =>
      dispatch(accountAction.getAccountProfile(true))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(ChangeEmail)));
