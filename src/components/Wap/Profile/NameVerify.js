import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import Textbox from "../Share/Textbox";
import i18n from "../../../utils/i18n";
import BottomNote from "../Share/BottomNote";
import BaseProfile from "./BaseProfile";

import { withSnackbar } from "notistack";
import { accountAction } from "../../../actions/accountAction";
import { RESET_ACCOUNTRESULT } from "../../../constants/actionType";

class NameVerify extends BaseProfile {
  constructor(props) {
    super(props);

    const name = this.props.account.info.member_name;
    const ic = this.props.account.info.member_card_no;
    const isConfigured = ic !== "" && ic !== null;
    this.state = {
      name: name,
      ic: ic,
      isConfigured: isConfigured,
    };
  }

  componentDidMount() {
    //  this.setState({ name: name, ic: ic, isConfigured: isConfigured });
  }
  componentDidUpdate(preProps) {
    if (
      preProps.account.info.member_card_no !==
      this.props.account.info.member_card_no
    ) {
      const ic = this.props.account.info.member_card_no;
      const isConfigured = ic !== "" && ic !== null;
      this.setState({ ...this.state, ic: ic, isConfigured: isConfigured });
    }
    if (
      preProps.account.updateCardResult !==
      this.props.account.updateCardResult &&
      this.props.account.updateCardResult !== null
    ) {
      if (this.props.account.updateCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getIDCardNo();
        AppHistory.replace("/" + i18n.language + "/profile");
      } else {
        this.showLoading(false);
        this.props.alert("", this.props.account.updateCardResult.info);
      }
    }
  }
  handleChangeName = (e) => {
    this.setState({ ...this.state, name: e.target.value });
    this.onTextChanged();
  };
  handleChangeIC = (e) => {
    this.setState({ ...this.state, ic: e.target.value });
    this.onTextChanged();
  };
  handleSubmitClicked = () => {
    const name = this.state.name || "";
    const ic = this.state.ic || "";
    this.showLoading(true);
    this.props.updateMemberCardNo(name);
    this.showLoading(false);
  };

  isDisableButton = () => {
    const name = this.state.name || "";
    const ic = this.state.ic || "";

    // const isDisableButton = !(name && ic);
    const isDisableButton = !(name);
    return isDisableButton;
  };
  render() {
    return this.setupContent(
      i18n.t("profile.nameVerify.title"),
      <>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.name}
          onChange={this.handleChangeName}
          placeholder={i18n.t("profile.nameVerify.title")}
          label={i18n.t("profile.nameVerify.verifyName")}
          disabled={this.state.isConfigured}
          maxLength={10}
        ></Textbox>
        {/* <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.ic}
          onChange={this.handleChangeIC}
          placeholder={i18n.t("profile.nameVerify.msgEnterICNum")}
          label={i18n.t("profile.nameVerify.icNum")}
          disabled={this.state.isConfigured}
          maxLength={30}
        ></Textbox> */}
      </>,
      this.state.isConfigured ? i18n.t("common.configured") : i18n.t("common.complete"),
      (() => {
        if (this.state.isConfigured) {
          return (
            <BottomNote
              text1={i18n.t("profile.nameVerify.toEdit")}
              link={"../chat"}
              text2={i18n.t("common.customerService")}
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
    getAccountProfile: () =>
      dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (number) =>
      dispatch(accountAction.updateMemberCardNo(number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(NameVerify)));
