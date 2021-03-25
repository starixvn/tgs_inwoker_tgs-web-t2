import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-lazy-load-image-component/src/effects/blur.css";
import { WalletService } from "../../../services/WalletService";
import { withSnackbar } from "notistack";

import Button from "../../Wap/Share/Button";
import { AppHistory } from "../../../history/History";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
const Container = styled.div``;
const ContentBg = styled.div`
  background:  #fff;
  width: 100%;

  padding: 60px 60px 30px 60px;
`;
const BalanceLabel = styled.div`
  font-size: 30px;

  color: #979797;
`;
const DepositAmount = styled.div`
  font-size: 80px;
  font-weight: bold;

  color: #404040;
`;
const SplitLine = styled.div`
  height: 2px;
  background-color: #f1f1f1;
  margin: 50px 0;
`;
const LeftLabel = styled.div`
  font-size: 24px;
  color: #979797;
  float: left;
`;
const RightLabel = styled.div`
  font-size: 24px;
  color: #333333;
  float: right;
  font-weight: bold;
`;
const SplitBoth = styled.div`
  clear: both;
  margin: 30px 0;
`;

const StyledModalPopup = withStyles(theme => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block"
  }
}))(Modal);
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
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
class Details extends Component {
  state = {
    expired_time: 0,
    loading: false,
    openPopup: false
  };
  componentDidMount() {
    if (this.props.order == null) {
      AppHistory.replace("/" + i18n.language + "/deposit");
    } else {
      this.setState({
        ...this.state,
        openPopup: true
      });
      console.log(this.props)

    }
  }
  // setCountdownTimer = () => {
  //   setTimeout(() => {
  //     if (this.state.expired_time > 0) {
  //       this.fireTimeout();
  //     }
  //   }, 1000);
  // };
  // fireTimeout = () => {
  //   this.setState({ ...this.state, expired_time: this.state.expired_time - 1 });
  //   this.setCountdownTimer();
  // };
  handleDepositConfirmClick = e => {
    AppHistory.replace("/" + i18n.language + "/transfer");
    // this.setState({ ...this.state, loading: true });
    // WalletService.CheckDeposit(this.props.token, this.props.order.id).then(
    //   response => {
    //     if (response.code === 0) {
    //       this.props.alert("", response.msg);
    //       this.setState({
    //         ...this.state,
    //         loading: false
    //       });
    //     } else if (response.code === 1) {
    //       this.setState({
    //         ...this.state,
    //         step: 1,
    //         order: {},
    //         loading: false
    //       });
    //       this.props.alert("", response.msg);
    //     } else {
    //       this.props.alert("", response.msg);
    //     }
    //     // if (response.IsSuccess) {
    //     //   this.setState({
    //     //     ...this.state,
    //     //     step: 1,
    //     //     order: {},
    //     //     loading: false
    //     //   });
    //     //   this.props.enqueueSnackbar(response.msg, {
    //     //     variant: "success"
    //     //   });
    //     // } else {
    //     // }
    //   }
    // );
  };

  handleDepositCancelClick = e => {
    AppHistory.replace("/" + i18n.language + "/deposit");
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false
    });
    window.open(this.props.order.depositResult.data.url, "_blank")
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false
    });
  };
  handleBackClick = () => {
    AppHistory.goBack();
  }
  render() {
    if (this.props.order == null) {
      return <></>;
    }
    const jsonResult = JSON.parse(this.props.order.depositResult.data.params);
    return (
      <Container>
        <Header onBackClick={this.handleBackClick} title={i18n.t("deposit.title")}></Header>
        <ContentBg>
          <BalanceLabel>{i18n.t("deposit.depositAmount")}：</BalanceLabel>
          <DepositAmount>¥ {this.props.order.depositResult.data.amount}</DepositAmount>
          <SplitLine></SplitLine>
          <LeftLabel>{i18n.t("deposit.orderNumber")}</LeftLabel>
          <RightLabel>{jsonResult.order_id}</RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositMethod")}</LeftLabel>
          <RightLabel>{this.props.order.depositResult.data.payment_method}</RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositTunnel")}</LeftLabel>
          <RightLabel>{this.props.order.selectedChannel.title}</RightLabel>
          <SplitBoth></SplitBoth>

        </ContentBg>
        <Button
          style={{ margin: "20px auto" }}
          labelStyle={{ color: "#fff" }}
          label={i18n.t("common.cancel")}
          onClick={this.handleDepositCancelClick}
        ></Button>
        <Button
          style={{ margin: "20px auto" }}
          labelStyle={{ color: "#fff" }}
          label={i18n.t("common.complete")}
          onClick={this.handleDepositConfirmClick}
        ></Button>
        <StyledModalPopup
          onClose={this.handleClosePopup}
          open={this.state.openPopup}
        >
          <DialoMessage>{i18n.t("deposit.msgDialog")}</DialoMessage>
          <ButtonConfirm
            onClick={this.handleOpenPopupUrl}
            style={{ float: "left" }}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
          <ButtonConfirm
            onClick={this.handleClosePopup}
            style={{ float: "right" }}
          >
            {i18n.t("common.cancel")}
          </ButtonConfirm>
        </StyledModalPopup>
        <Loading show={this.state.loading}></Loading>
        <form id="form" target="_blank" method="post">
          <input type="hidden" name="cid" id="cid"></input>
          <input type="hidden" name="oid" id="oid"></input>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    balance: state.account.info.balance,
    token: state.account.token
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(Details)));
