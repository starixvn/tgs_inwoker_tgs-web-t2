import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import BaseProfile from "./BaseProfile";
import { AccountService } from "@Inwoker/tgs-api";
import { accountAction } from "@Inwoker/tgs-api";
import BottomNote from "../Share/BottomNote";
import { withSnackbar } from "notistack";
import i18n from "../../../utils/i18n";
class Email extends BaseProfile {
  state = {
    countdownToken: 0,
    email: "",
    code: "",
    isConfigured: false,
    isNew: false,
    securityKey: "",
  };
  componentDidMount() {
    var isConfigured = false;
    if (this.props.account.info.check_pass_email) isConfigured = true;
    this.setState({
      ...this.state,
      email: isConfigured ? this.props.account.info.member_email : "",
      code: "",
      isConfigured: isConfigured,
      countdownToken: 0,
      isNew: !this.props.account.info.check_pass_email,
    });
  }
  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };

  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.email) return this.showErrorMessage("请输入您的邮箱地址");
    this.showLoading(true);
    AccountService.VerifyEmail(this.state.email)
      .then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            securityKey: response.data,
            countdownToken: 60,
          });
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          if (response.code === 402) {
            this.showErrorMessage(i18n.t("common.msgInvalidEmail"));
          } else {
            this.showErrorMessage(response.info);
          }
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);

        // if (
        //   err.Result.RemainingSec != null &&
        //   isNaN(err.Result.RemainingSec) === false
        // ) {
        //   this.setState({
        //     ...this.state,
        //     countdownToken: err.Result.RemainingSec
        //   });
        //   setTimeout(() => {
        //     this.checkCountdownToken();
        //   }, 1000);
        // }

        this.showLoading(false);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const email = this.state.email;
    return !(code && email);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    this.showLoading(true);
    AccountService.UpdateEmail(this.state.securityKey, this.state.code)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                code: "",
                securityKey: "",
                isConfigured: true,
                countdownToken: 0,
                isNew: false,
              });
            }
            this.showLoading(false);
          });
        } else {
          if (response.code === 405) {
            this.showErrorMessage(i18n.t("common.msgInvalidPhoneCode"));
          } else {
            this.showErrorMessage(response.info);
          }
          this.showLoading(false);
        }
      })
      .catch((err) => {
        this.showLoading(false);
        this.showErrorMessage(err);
      });
  };

  render() {
    return this.setupContent(
      "邮箱地址",
      <>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.email}
          onChange={this.handleChangeEmail}
          placeholder={"请输入您的邮箱地址"}
          label={"邮箱地址"}
          disabled={this.state.isConfigured}
        ></Textbox>
        {(() => {
          if (!this.state.isConfigured) {
            return (
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
                maxLength={6}
              ></TextboxWithButton>
            );
          }
        })()}
      </>,
      this.state.isConfigured ? "已验证" : "完成",
      (() => {
        if (this.state.isConfigured) {
          return (
            <BottomNote
              text1={"如需修改邮箱地址，请点击"}
              link={"./changeemail"}
              text2={"这里"}
            ></BottomNote>
          );
        }
      })()
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Email)));
