import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import BaseProfile from "./BaseProfile";
import ResetWithdrawalPassword from "./ResetWithdrawalPassword"
// import { ProfileAction } from "../../../actions/ProfileAction";
import { AccountService } from "../../../services/AccountService";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Share/Header";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n"
const StyledAppBar = withStyles({
  root: {
    top: "89px",

    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);

class ChangeWithdrawalPassword extends BaseProfile {
  state = {
    selectedTab: 0
  }
  componentDidMount() { }
  handleChangeOldPassword = (e) => {
    this.setState({ ...this.state, oldpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword = (e) => {
    this.setState({ ...this.state, newpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword2 = (e) => {
    this.setState({ ...this.state, newpassword2: e.target.value });
    this.onTextChanged();
  };
  handleChangeTab = (event, newValue) => {
    this.setState({
      ...this.state,
      selectedTab: newValue,

    });
  };
  handleSubmitClicked = (e) => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;
    if (newpassword !== newpassword2) {
      this.props.alert("", i18n.t("common.msgInvalidConfirmPass"))
      // this.props.enqueueSnackbar("确认密码错误", {
      //   key: "error"
      // });
      return;
    }
    this.showLoading(true);
    AccountService.ChangeWithdrawalPassword(oldpassword, newpassword, newpassword2)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.alert("", response.info);
          AppHistory.goBack();
        } else {
          this.props.alert("", response.info);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }

        this.showLoading(false);

      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
    //this.setState({ ...this.state, currentStep: 2 });
  };
  isDisableButton = () => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;

    const isDisableButton = !(oldpassword && newpassword && newpassword2);

    return isDisableButton;
  };
  render() {
    return <>
      <Header onBackClick={this.handleBackClick} title={i18n.t("profile.changeWithdrawalPassword.title")}></Header>
      <StyledAppBar>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={i18n.t("common.update")} value={0} style={{ width: "375px" }} />
          <Tab label={i18n.t("common.reset")} value={1} style={{ width: "375px" }} disabled={!this.props.account.info.check_pass_phone} />
        </Tabs>
      </StyledAppBar>
      {(() => {
        if (this.state.selectedTab === 0) {
          return this.setupContent(
            i18n.t("profile.changeWithdrawalPassword.subTitle"),
            <>
              <Textbox
                type={"password"}
                style={{ margin: "10px auto 20px auto" }}
                value={this.state.oldpassword}
                onChange={this.handleChangeOldPassword}
                placeholder={i18n.t("profile.changeWithdrawalPassword.plsEnterOldPassword")}
                label={i18n.t("common.oldPass")}
              ></Textbox>
              <Textbox
                type={"password"}
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.newpassword}
                onChange={this.handleChangeNewPassword}
                placeholder={i18n.t("common.msgEnterNewPass")}
                label={i18n.t("common.NewPass")}
              ></Textbox>
              <Textbox
                type={"password"}
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.newpassword2}
                onChange={this.handleChangeNewPassword2}
                placeholder={i18n.t("common.msgEnterConfirmPass")}
                label={i18n.t("common.ConfirmPass")}
              ></Textbox>
            </>,
            i18n.t("common.complete")
          );
        } else if (this.state.selectedTab === 1) {
          return <ResetWithdrawalPassword alert={this.props.alert}></ResetWithdrawalPassword>
        }
      })()}

    </>

  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(ChangeWithdrawalPassword)));
