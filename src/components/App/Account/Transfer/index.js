import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import { withSnackbar } from "notistack";
import IconTransferRedPNG from "../../../../assets/images/icon-transfer-active.png";
import TransferMWalletPNG from "../../../../assets/images/transfer-mwallet.png";
import TransferTWalletPNG from "../../../../assets/images/transfer-twallet.png";
import TransferTotalPNG from "../../../../assets/images/transfer-total.png";
import ArrowRightPNG from "../../../../assets/images/arrow-right.png";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import IconRefreshPNG from "../../../../assets/images/icon-refresh.png";

import { walletAction, RESET_WALLETRESULT, WalletType } from "@Inwoker/tgs-api";

import Loading from "../../Loading";
import Common from "../../../../utils/Common";
import Messagebox from "../../Messagebox";
import i18n from "../../../../utils/i18n";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  background-color: #ffffff;
  min-height: 796px;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconTransferRedPNG}) no-repeat left center;
  background-size: 25px 25px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  box-sizing: border-box;
  padding: 25px 40px;
  position: relative;
  border-radius: 10px;
`;
const WalletFrame = styled.div`
  width: 220px;
  height: 220px;
  float: left;
  border: 1.5px solid #8a7f73;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  margin-right: 50px;
  position: relative;
`;
const RefreshButton = styled.div`
  width: 28px;
  height: 29px;

  position: absolute;
  right: 5px;
  top: 5px;

  background: url(${IconRefreshPNG}) no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
`;
const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 77px;
`;
const WalletIcon = styled.img`
  width: 38px;
  height: 30px;
`;
const WalletTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  color: #8a7f73;
  text-align: center;
  width: 100%;
`;
const WalletAmount = styled.div`
  font-family: Arial;
  font-size: 26px;
  font-weight: 400;
  color: #404040;
  margin: 10px 10px;
  text-align: center;
  overflow: hidden;
  border: 1.5px solid #8a7f73;
  border-radius: 10px;
  white-space: nowrap;
`;
const TransferAllButton = styled.div`
  color: #404040;
  text-align: center;
  padding-top: 5px;
  float: right;
  margin: 5px 10px 0 0;
  width: 80px;
  height: 30px;
  border-radius: 12px;
  border: solid 1px #ffffff;
  background-color: #f0ca83;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const SubTitle = styled.div`
  font-size: 20px;
  color: #404040;
  display: inline-block;
  width: 100%;
  margin: 40px 0 5px 0;
  padding-bottom: 20px;
`;
const QuickTransferContainer = styled.div`
  width: 100%;
  height: 60px;
`;
const QuickTransferArrow = styled.div`
  width: 23px;
  height: 18px;
  float: left;
  background: url(${ArrowRightPNG}) no-repeat;
  margin: 10px 10px 0 8px;
`;
const QuickTransferLabel = styled.div`
  float: left;
  font-size: 16px;
  margin: 8px 10px 0 18px;
  color: #404040;
`;
const QuickTransferButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  width: 160px;
  max-height: 39px;
  border-radius: 6px;

  ${(props) =>
    props.disabled === true
      ? "background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-color: #8a7f73;"}
  &:hover {
    ${(props) =>
      props.disabled === true
        ? " "
        : "cursor: pointer;box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const GameTranferWallet = styled.div`
  width: 170px;
  height: 140px
  border-radius: 4px;
  border: 1.5px solid #8a7f73;
  background-image: linear-gradient(to top, #f4f4f4, #ffffff);
  margin: 0 10px 10px 0;
  float: left;
`;
const GameTranferLeftWrap = styled.div`
  width: 100%;
  padding: 10px 0;
`;
const GameIcon = styled.div`
  height: 50px;
  width: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: cover;
  margin: 0 auto;
  display: block;
`;
const GameName = styled.div`
  font-size: 20px;
  text-align: center;
  color: #404141;
`;
const GameWalletAmount = styled.div`
  font-family: Arial;
  font-size: 15px;
  text-align: center;
  color: #29356c;
  border: 1.5px solid #8a7f73;
  border-radius: 10px
  margin: 0px 30px;
  padding: 5px 0px;
`;
const GameWalletButton = styled.div`
  font-size: 12px;
  ${(props) =>
    props.disabled
      ? "    background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-color: #f0ca83;"}

  text-align: center;
  padding: 5px;
  width: 95px;
  margin: 10px auto 0 auto;
  color: #404040;
  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1.5px #8a7f73;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;
const TransferContainer = styled.div`
  min-height: 91px;
`;

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: 8,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#f0ca83",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SubtitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "250px",
    height: "40px",
    borderRadius: "12px",
    boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "12px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);

class Transfer extends Component {
  state = {
    mainWalletAmount: "0.00",
    transferWalletAmount: "0.00",
    totalAmount: "0.00",
    singleWalletGameName: "",
    loading: false,
    transferFrom: "",
    transferTo: 0,
    transferAmount: "0.00",
    transferWalletSelectList: [],
    transferWalletQuickList: [],
    showMessagebox: false,
    messageboxText: "",
    mainAccountId: "0",
    autotransfer: this.props.wallet.autotransfer,
  };

  // bindData() {
  //   let singleWalletGameName = "";
  //   let transferWalletAmount = 0;
  //   let mainWalletAmount = 0;
  //   let totalAmount = 0;
  //   let transferWalletList = [];
  //   for (let wallet of this.props.wallet.balanceList) {
  //     if (wallet.purse_type === WalletType.MainWallet) {
  //       mainWalletAmount = parseFloat(wallet.balance);
  //       transferWalletList.push(wallet);
  //       this.mainAccountId = wallet.id;
  //     } else if (wallet.purse_type === WalletType.SingleWallet) {
  //       singleWalletGameName += wallet.name + "、";
  //     } else if (wallet.purse_type === WalletType.TransferWallet) {
  //       transferWalletAmount += parseFloat(wallet.balance);
  //       transferWalletList.push(wallet);
  //     }
  //     totalAmount += parseFloat(wallet.balance);
  //   }
  //   if (singleWalletGameName.length > 1) {
  //     singleWalletGameName = singleWalletGameName.substring(
  //       0,
  //       singleWalletGameName.length - 1
  //     );
  //   }
  //   this.setState({
  //     ...this.state,
  //     mainWalletAmount: Common.formatNumberWithCommas(mainWalletAmount),
  //     singleWalletGameName,
  //     transferWalletAmount: Common.formatNumberWithCommas(transferWalletAmount),
  //     totalAmount: Common.formatNumberWithCommas(totalAmount),
  //     transferWalletSelectList: transferWalletList
  //       .filter((item) => item.maintenance !== 1)
  //       .map((item, key) => (
  //         <option
  //           value={isNaN(item.id) === true ? item.id : item.parent_id}
  //           key={item.id}
  //         >
  //           {item.name}
  //         </option>
  //       )),
  //     transferWalletQuickList:
  //       this.GetTransferWalletQuickList(transferWalletList),
  //   });
  // }

  GetTransferWalletQuickList = (transferWalletList) => {
    return transferWalletList
      .filter(function (wallet) {
        return wallet.purse_type !== WalletType.MainWallet;
      })
      .map((item, key) => (
        <GameTranferWallet key={item.id}>
          <GameTranferLeftWrap>
            <GameName> {item.name}</GameName>
          </GameTranferLeftWrap>
          <GameWalletAmount>
            {item.maintenance === 1
              ? i18n.t("transfer.maintenance")
              : "￥ " + Common.formatNumberWithCommas(item.balance)}
          </GameWalletAmount>
          <GameWalletButton
            disabled={item.maintenance === 1}
            onClick={() => this.handleTranferIn(item.abbreviation)}
          >
            {i18n.t("transfer.oneKeyTransfer")}
          </GameWalletButton>
        </GameTranferWallet>
      ));
  };
  componentDidMount() {
    // if (this.props.wallet.balanceList.length > 0) {
    //   this.bindData();
    // }
  }
  componentDidUpdate(preProps) {
    // if (
    //   this.props.wallet.balanceList.length !==
    //     preProps.wallet.balanceList.length &&
    //   this.props.wallet.balanceList.length > 0
    // ) {
    //   this.bindData();
    // } else {
    //   if (
    //     this.props.wallet.loading !== preProps.wallet.loading &&
    //     this.props.wallet.loading === false
    //   ) {
    //     this.bindData();
    //   }
    // }

    if (
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null
    ) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.getAllGameBalance();
        this.setState({
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(this.props.wallet.transferResult.info, {
          variant: "error",
        });
        // if (
        //   this.props.wallet.transferResult.code === 208 ||
        //   this.props.wallet.transferResult.code === 209
        // ) {
        //   this.props.enqueueSnackbar(i18n.t("transfer.msgFailedTransfer"), {
        //     variant: "error",
        //   });
        // } else {
        //   this.props.enqueueSnackbar(this.props.wallet.transferResult.info, {
        //     variant: "error",
        //   });
        // }
      }
    }

    // withdrawal all response
    if (
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null
    ) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "0.00",
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(this.props.wallet.withdrawalAllResult.info, {
          variant: "error",
        });
      }
    }
  }
  handleTransferFromChange = (e) => {
    const fromWallet = e.target.value;
    this.setState({
      ...this.state,
      transferFrom: fromWallet,
      transferTo: this.state.mainAccountId,
    });
  };
  handleTransferToChange = (e) => {
    const toWallet = e.target.value;
    this.setState({
      ...this.state,
      transferFrom: this.state.mainAccountId,
      transferTo: toWallet,
    });
  };
  handleTransferAmountChange = (e) => {
    this.setState({ ...this.state, transferAmount: e.target.value });
  };
  handleTranferClick = (e) => {
    const transferFrom = this.state.transferFrom;
    const transferTo = this.state.transferTo;
    const transferAmount = parseFloat(
      this.state.transferAmount.replace(/,/g, "")
    );
    const balance = this.props.wallet.mainBalance;
    if (parseFloat(transferAmount) <= 0) {
      this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
        variant: "error",
      });
      return;
    }
    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(i18n.t("transfer.insufficient"), {
          variant: "error",
        });
      }
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo == this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom == this.state.mainAccountId ? 1 : 2
    );
  };
  handleWithdrawAllClick = (e) => {
    this.props.doWithdrawAll();
  };
  handleTranferIn = (gpcode) => {
    this.props.doTransfer(gpcode, this.props.wallet.mainBalance);
    // if (item.maintenance !== 1) {
    //   const transferFrom = this.props.wallet.mainId; //main account
    //   const transferTo = item.parent_id;
    //   const transferAmount = parseInt(this.props.wallet.mainBalance);
    //   if (parseFloat(transferAmount) > 0) {
    //     this.transfer(transferFrom, transferTo, transferAmount);
    //   } else {
    //     this.props.enqueueSnackbar(i18n.t("transfer.insufficient"), {
    //       variant: "error",
    //     });
    //   }
    // }
  };
  handleSwitchAutoTransfer = () => {
    this.props
      .updateAutoTransferStatus()
      .then((e) => {
        if (e.IsSuccess) {
          this.setState({
            autotransfer: !this.state.autotransfer,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("transfer.title")}
        </Title>
        <InnerWrap>
          <WalletFrame>
            {/* <TransferAllButton onClick={this.handleWithdrawAllClick}>
              {i18n.t("transfer.oneKeyReceive")}
            </TransferAllButton> */}
            <IconContainer>
              <WalletIcon src={TransferMWalletPNG}></WalletIcon>
            </IconContainer>
            <WalletTitle>{i18n.t("transfer.mainAccount")}</WalletTitle>
            <RefreshButton
              onClick={() => {
                this.props.getAllGameBalance();
                this.props.getBalanceList();
              }}
            ></RefreshButton>
            <div className="clear"></div>
            <WalletAmount>
              ￥
              <DynamicFont
                content={Common.formatNumberWithThousand(
                  this.props.wallet.mainBalance
                )}
              />
            </WalletAmount>
          </WalletFrame>
          <WalletFrame>
            <IconContainer>
              <WalletIcon src={TransferTWalletPNG}></WalletIcon>
            </IconContainer>
            <WalletTitle>{i18n.t("transfer.transferWallet")}</WalletTitle>

            <div className="clear"></div>
            <WalletAmount>
              ￥
              <DynamicFont
                content={Common.formatNumberWithThousand(
                  this.props.game.providerList.reduce(
                    (total, item) =>
                      item.transferwallet === true
                        ? (total += item.balance)
                        : (total += 0),
                    0
                  )
                )}
              />
            </WalletAmount>
          </WalletFrame>
          <WalletFrame>
            <IconContainer>
              <WalletIcon src={TransferTotalPNG}></WalletIcon>
            </IconContainer>
            <WalletTitle>{i18n.t("transfer.totalFund")}</WalletTitle>
            <div className="clear"></div>
            <WalletAmount>
              ￥
              <DynamicFont
                content={Common.formatNumberWithThousand(
                  this.props.game.providerList.reduce(
                    (total, item) =>
                      item.transferwallet === true
                        ? (total += item.balance)
                        : (total += 0),
                    0
                  ) + this.props.wallet.mainBalance
                )}
              />
            </WalletAmount>
          </WalletFrame>

          <SubTitle>
            <SubtitleContent>
              <div>{i18n.t("transfer.quickTransfer")}</div>

              <CustomSwitchContainer>
                <div>
                  {i18n.t("transfer.autoTransfer")} (
                  {this.state.autotransfer
                    ? i18n.t("transfer.on")
                    : i18n.t("transfer.off")}
                  )
                </div>
                <CustomSwitch
                  checked={this.state.autotransfer}
                  onChange={this.handleSwitchAutoTransfer}
                />
              </CustomSwitchContainer>
            </SubtitleContent>
          </SubTitle>

          <QuickTransferContainer>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                value={this.state.transferFrom}
                displayEmpty
                onChange={this.handleTransferFromChange}
              >
                <option value={this.state.mainAccountId}>
                  {i18n.t("transfer.mainAccount")}
                </option>
                {this.props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .map((item, index) => (
                    <option value={item.abbreviation} key={index}>
                      {item.name}
                    </option>
                  ))}
              </CustomSelect>
            </CustomFormControl>

            <QuickTransferArrow></QuickTransferArrow>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                value={this.state.transferTo}
                displayEmpty
                onChange={this.handleTransferToChange}
              >
                <option value={this.state.mainAccountId}>
                  {i18n.t("transfer.mainAccount")}
                </option>
                {this.props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .map((item, index) => (
                    <option value={item.abbreviation} key={index}>
                      {item.name}
                    </option>
                  ))}
              </CustomSelect>
            </CustomFormControl>

            <QuickTransferLabel>{i18n.t("common.amount")}</QuickTransferLabel>
            <CurrencyTextField
              className="CurrencyTextField"
              style={{
                height: "40px",
                width: "160px",
                float: "left",
                borderRadius: "12px",
                boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
                backgroundColor: "#fff",
              }}
              value={this.state.transferAmount}
              placeholder={i18n.t("transfer.msgEnterAmount")}
              onChange={this.handleTransferAmountChange}
              variant="outlined"
              autoComplete="off"
              minimumValue="0"
              inputProps={{
                maxLength: 15,
              }}
              currencySymbol=""
              decimalPlaces={0}
            ></CurrencyTextField>
          </QuickTransferContainer>
          <QuickTransferButton
            disabled={
              this.state.transferFrom === "" || this.state.transferTo === ""
            }
            onClick={this.handleTranferClick}
          >
            {i18n.t("transfer.transfer")}
          </QuickTransferButton>

          <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>
          <TransferContainer>
            {this.props.game.providerList
              .filter(
                (item) => item.status === 0 && item.transferwallet === true
              )
              .map((item, key) => (
                <GameTranferWallet key={item.id}>
                  <GameTranferLeftWrap>
                    <GameName> {item.name}</GameName>
                  </GameTranferLeftWrap>
                  <GameWalletAmount>
                    {item.maintenance === 1
                      ? i18n.t("transfer.maintenance")
                      : "￥ " + Common.formatNumberWithCommas(item.balance)}
                  </GameWalletAmount>
                  <GameWalletButton
                    disabled={item.maintenance === 1}
                    onClick={() => this.handleTranferIn(item.abbreviation)}
                  >
                    {i18n.t("transfer.oneKeyTransfer")}
                  </GameWalletButton>
                </GameTranferWallet>
              ))}
          </TransferContainer>
          <Loading
            show={
              this.state.loading ||
              this.props.wallet.transferLoading ||
              this.props.wallet.updateBalanceloading
            }
          ></Loading>
        </InnerWrap>
        <Messagebox
          open={this.state.showMessagebox}
          message={this.state.messageboxText}
          onhandleCloseDialog={() =>
            this.setState({ ...this.state, showMessagebox: false })
          }
        ></Messagebox>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    doWithdrawAll: () => dispatch(walletAction.doWithdrawAll()),
    updateAutoTransferStatus: () =>
      dispatch(walletAction.updateAutoTransferStatus()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Transfer));
