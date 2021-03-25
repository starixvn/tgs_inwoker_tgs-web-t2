import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { WalletService } from "../../../services/WalletService";
import { walletAction } from "../../../actions/walletAction";
import { withRouter } from "react-router-dom";
import Common from "../../../utils/Common";
import {
  WALLET_HIDEMESSAGE,
  RESET_WALLETRESULT,
} from "../../../constants/actionType";
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
  color: #01f1fe;
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

class Deposit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedType:
        this.props.wallet.depositTypeList.length > 0
          ? this.props.wallet.depositTypeList[0]
          : null,
      selectedChannel:
        this.props.wallet.depositTypeList.length > 0
          ? this.props.wallet.depositTypeList[0].channel[0]
          : null,
      depositAmount: "",
      isMaintenance: false,
    };
  }
  bankInfo = null;

  componentDidMount() {
    if (this.props.token != null) {
      WalletService.GetDepositBank().then(response => {
        if (response.IsSuccess) {
          this.bankInfo = response.data
        }

      })
    } else {
      AppHistory.replace("/" + i18n.language + "/");
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      preState.selectedType == null &&
      preProps.wallet.depositTypeList.length !=
      this.props.wallet.depositTypeList.length
    ) {
      this.setState({
        selectedType: this.props.wallet.depositTypeList[0],
        selectedChannel: this.props.wallet.depositTypeList[0].channel[0],
      });
    }

    if (
      this.props.wallet.depositResult !== null &&
      preProps.wallet.depositResult !== this.props.wallet.depositResult
    ) {
      if (!this.props.wallet.depositResult.IsSuccess) {
        this.props.alert("", this.props.wallet.depositResult.info);


      } else {
        if (this.state.selectedType.id === 0) {
          // handle manual deposit response
          AppHistory.push("/" + i18n.language + "/deposit/manual",
            {
              depositResult: this.props.wallet.depositResult,
              amount: this.state.depositAmount,
              selectedType: this.state.selectedType,
              selectedChannel: this.state.selectedChannel,
              bankInfo: this.bankInfo
            });
        } else {
          AppHistory.push("/" + i18n.language + "/deposit/details",
            {
              depositResult: this.props.wallet.depositResult,
              amount: this.state.depositAmount,
              selectedType: this.state.selectedType,
              selectedChannel: this.state.selectedChannel
            });
        }
      }
    }
  }

  CancelDeposit(token, id) {
    return WalletService.CancelDeposit(token, id);
  }

  handleBankClick = (item) => {
    this.setState({
      ...this.state,
      selectedBank: item,
      bankOpen: false,
    });
  };

  handleDepositClick = (e) => {
    if (this.state.depositAmount < this.state.selectedType.min) {
      this.props.alert("", i18n.t("deposit.msgMinDeposit").replace(/{{amount}}/g, this.state.selectedType.min));

      return;
    }

    if (this.state.depositAmount > this.state.selectedType.max) {
      this.props.alert("", i18n.t("deposit.msgMaxDeposit"));

      return;
    }
    if (this.state.selectedType.id === 0) {
      // manual deposit
      //bankId, channelId, amount, username
      this.props.doManualDeposit(this.bankInfo.id, this.state.selectedChannel.id, this.state.depositAmount, this.state.username)
    } else {
      this.props.doDeposit(
        this.state.depositAmount,
        this.state.selectedType.id,
        this.state.selectedChannel ? this.state.selectedChannel.id : ""
      );
    }

  };

  handleTunnelChange = (e) => {

    var selectedChannel = this.state.selectedType.channel.filter(item => item.id == e.target.value)[0];

    this.setState({
      ...this.state,
      selectedChannel: selectedChannel,
    });
  };
  handleDepositAmountChange = (e) => {
    this.setState({
      ...this.state,
      depositAmount: e.target.value.replace(/,/g, ""),
    });
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };
  handleChangeTab = (e, newValue) => {
    this.setState({
      ...this.state,
      selectedType: newValue,
      selectedChannel: newValue.channel[0],
    });
  };

  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("deposit.title")}
          rightContent={<BalanceLabel>￥{this.props.balance}</BalanceLabel>}
        ></Header>

        {(() => {
          if (this.state.isMaintenance) {
            return (
              <UnderConstructionWrap
                style={
                  this.state.isMaintenance
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
              </UnderConstructionWrap>
            );
          } else if (
            this.props.wallet.loading ||
            this.props.wallet.depositTypeList.length === 0 ||
            this.state.selectedType === null
          ) {
            return <Loading show={true}></Loading>;
          } else {
            return (
              <>
                <StyledAppBar>
                  <Tabs
                    value={this.state.selectedType}
                    onChange={this.handleChangeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {this.props.wallet.depositTypeList.map((item, index) => {
                      return (
                        <Tab
                          index={index}
                          key={index}
                          label={item.title}
                          value={item}
                        />
                      );
                    })}
                  </Tabs>
                </StyledAppBar>
                {(() => {
                  if (this.state.selectedType.channel.length !== 0) {
                    return (
                      <CustomText>
                        <CustomLabel>{i18n.t("deposit.paymentTunnel")}</CustomLabel>
                        <CustomFormControl variant="outlined">
                          <CustomSelect
                            native
                            inputProps={{
                              name: "age",
                            }}
                            style={{
                              fontSize: "28px",
                              height: "78px",
                              border: "none",

                            }}
                            onChange={this.handleTunnelChange}
                            value={this.state.selectedChannel.id}
                          >
                            {this.state.selectedType.channel.map(
                              (item, key) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.title}
                                  </option>
                                );
                              }
                            )}
                          </CustomSelect>
                        </CustomFormControl>
                      </CustomText>
                    );
                  }
                })()}

                {(() => {
                  if (this.state.selectedType) {
                    if (this.state.selectedType.banks) {
                      if (this.state.selectedType.banks.length > 0) {
                        return (
                          <Textbox
                            style={{ margin: "20px auto 20px auto" }}
                            value={this.state.selectedBank.title}
                            onClick={() =>
                              this.setState({ ...this.state, bankOpen: true })
                            }
                            type={"text"}
                            placeholder={i18n.t("deposit.msgEnterCard")}
                            label={i18n.t("deposit.bankCard")}
                            disabled={true}
                          ></Textbox>
                        );
                      }
                    }
                  }
                })()}

                {(() => {

                  if (this.state.selectedChannel) {

                    if (this.state.selectedChannel.amount_options) {
                      return (
                        <CustomText>
                          <CustomLabel>{i18n.t("deposit.depositAmount")}</CustomLabel>
                          <CustomFormControl variant="outlined">
                            <CustomSelect
                              native
                              inputProps={{
                                name: "age",
                              }}
                              id="customSelect"
                              style={{
                                fontSize: "28px",
                                height: "78px",
                                border: "none",
                                color: "#d09f58",
                              }}
                              value={this.state.depositAmount}
                              onChange={this.handleDepositAmountChange}
                              onBlur={this.handleDepositAmountBlur}
                            >
                              <option value={""} disabled>
                                {i18n.t("deposit.chooseAmount")}
                              </option>
                              {this.state.selectedChannel.amount_options.map(
                                (item, key) => {
                                  return (
                                    <option value={item} key={item}>
                                      {item}
                                    </option>
                                  );
                                }
                              )}
                            </CustomSelect>
                          </CustomFormControl>
                        </CustomText>
                      );
                    } else {
                      return (
                        <Textbox
                          style={{ margin: "20px auto 20px auto" }}
                          value={this.state.depositAmount}
                          onChange={this.handleDepositAmountChange}
                          type={"number"}
                          placeholder={
                            i18n.t("deposit.msgPleaseEnter") +
                            Common.formatNumberWithThousand(
                              this.state.selectedType.min
                            ) +
                            "-" +
                            Common.formatNumberWithThousand(
                              this.state.selectedType.max
                            ) +
                            i18n.t("deposit.dollor")
                          }
                          label={i18n.t("deposit.depositAmount")}
                        ></Textbox>
                      );
                    }
                  }
                })()}
                {(() => {
                  if (this.state.selectedType.id === 0) {
                    return (
                      <Textbox
                        style={{ margin: "20px auto 20px auto" }}
                        value={this.state.username}
                        onChange={(e) => this.setState({ ...this.state, username: e.target.value })}
                        type={"text"}
                        placeholder={i18n.t("deposit.senderName")}
                        label={i18n.t("deposit.senderName")}

                      ></Textbox>
                    )
                  }
                })()}
                <Button
                  style={{ margin: "40px auto 0 auto" }}
                  label={i18n.t("common.nextStep")}
                  onClick={this.handleDepositClick}
                  disabled={
                    this.state.depositAmount === 0 ||
                    this.state.depositAmount === "" ||
                    this.state.depositAmount < this.state.selectedType.min ||
                    this.state.depositAmount > this.state.selectedType.max
                  }
                ></Button>
                <form id="form" target="_blank" method="post">
                  <input type="hidden" name="cid" id="cid"></input>
                  <input type="hidden" name="oid" id="oid"></input>
                </form>
              </>
            );
          }
        })()}
        <StyledModalPopup
          onClose={this.props.hideAlert}
          open={this.props.wallet.message !== ""}
        >
          <DialoTitle>{i18n.t("common.info")}</DialoTitle>
          <DialoMessage>{this.props.wallet.message}</DialoMessage>
          <ButtonConfirm onClick={this.props.hideAlert}>{i18n.t("common.confirm")}</ButtonConfirm>
        </StyledModalPopup>
        {/* <StyledModalPopup
          open={
            this.props.wallet.depositResult &&
            this.props.wallet.depositResult.status === "1"
          }
        >
          <DialoTitle>{i18n.t("common.info")}</DialoTitle>
          <DialoMessage>{i18n.t("deposit.confirmRedirect")}</DialoMessage>
          <ButtonConfirm
            onClick={() => {
              window.open(this.props.wallet.depositResult.data.url, "_blank");
              this.props.resetDeposit();
            }}
            style={{ float: "left" }}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
          <ButtonConfirm
            onClick={this.props.resetDeposit}
            style={{ float: "right" }}
          >
            {i18n.t("common.cancel")}
          </ButtonConfirm>
        </StyledModalPopup> */}
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
    doDeposit: (amount, payment_id, extend) =>
      dispatch(walletAction.doDeposit(amount, payment_id, extend)),
    doManualDeposit: (bankId, channelId, amount, username) =>
      dispatch(walletAction.doManualDeposit(bankId, channelId, amount, username)),
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
