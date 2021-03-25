import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router";
import IconWithdrawRedPNG from "../../../../assets/images/icon-withdraw.png";
import { withRouter } from "react-router-dom";
import Loading from "../../Loading";
import NameVerification from "../../Share/NameVerification";
// import PassSetting from "./PassSetting";
import { WalletService } from "../../../../services/WalletService";
import { AccountService } from "../../../../services/AccountService";
import { UPDATE_INFO } from "../../../../constants/actionType";
import AddCard from "./AddCard";
import AddCardSuccess from "./AddCardSuccess";
import CardManage from "./CardManage";
import Main from "./Main";
import Success from "./Success"
import { RESET_WALLETRESULT } from "../../../../constants/actionType";
import { walletAction } from "../../../../actions/walletAction";
import { withSnackbar } from "notistack";
import i18n from "../../../../utils/i18n"
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
  background: url(${IconWithdrawRedPNG}) no-repeat left center;
  background-size: 24px 24px;
  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  padding: 25px 0px;
  position: relative;
`;

class Withdrawal extends Component {
  state = {
    loading: false,
    bankCardList: [],
    defaultCard: 0,
    addCard: {
      number: "",
      password: "",
    },
    isAddCardSuccess: false,
    displayView: 1,
    showMessagebox: false,
    messageboxText: "",
    withdrawalInfo: {
      bonus_limit_list: [],
    },
  };
  async componentDidMount() {
    // if (this.props.wallet.bankCardList.length === 0)
    //   this.props.getBankCardList();
  }

  componentDidUpdate(preProps) {
    // if (
    //   preProps.wallet.deleteBankCardResult !==
    //   this.props.wallet.deleteBankCardResult &&
    //   this.props.wallet.deleteBankCardResult !== null
    // ) {
    //   if (this.props.wallet.deleteBankCardResult.IsSuccess) {
    //     this.props.getBankCardList();
    //   } else {
    //     this.props.enqueueSnackbar(
    //       this.props.wallet.deleteBankCardResult.info,
    //       {
    //         variant: "error",
    //       }
    //     );
    //   }
    //   this.props.resetResult();
    // }
    // if (
    //   preProps.wallet.addBankCardResult !==
    //   this.props.wallet.addBankCardResult &&
    //   this.props.wallet.addBankCardResult !== null
    // ) {
    //   if (this.props.wallet.addBankCardResult.IsSuccess) {
    //     this.props.resetResult();
    //     this.props.getBankCardList();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       isAddCardSuccess: true,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(this.props.wallet.addBankCardResult.info, {
    //       variant: "error",
    //     });
    //   }
    // }

    // if (
    //   preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
    //   this.props.wallet.withdrawalResult !== null
    // ) {
    //   if (this.props.wallet.withdrawalResult.IsSuccess) {
    //     this.props.resetResult();
    //     this.props.getBalanceList();
    //     this.setState({ ...this.state, displayView: 4 })

    //   } else {
    //     this.props.enqueueSnackbar(this.props.wallet.withdrawalResult.info, {
    //       variant: "error",
    //     });
    //   }
    // }
  }

  GetWithdrawalDetails() {
    WalletService.GetWithdrawalDetails(this.props.token).then((response) => {
      this.setState({ ...this.state, withdrawalInfo: response.data });
    });
  }

  handleNameVerificationClick = (name) => {
    AccountService.UpdateMemberName(this.props.token, name).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_name: name,
          },
        });
        this.props.enqueueSnackbar(response.msg, {
          variant: "success",
        });
      } else {
        this.props.enqueueSnackbar(response.msg, {
          variant: "error",
        });
      }
    });
  };
  handleSetPasswordClick = (password1, password2) => {
    AccountService.UpdateWithdrawalPassword(
      this.props.token,
      password1,
      password2
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_safe_password: "set",
          },
        });

        this.props.enqueueSnackbar(response.msg, {
          variant: "success",
        });
      } else {
        this.props.enqueueSnackbar(response.msg, {
          variant: "error",
        });
      }
    });
  };
  handleAddCardNextClick = (bankId, bankBranch, accountHolder, number) => {
    this.props.addBankCard(number, accountHolder, bankId, bankBranch);
    // this.setState({ ...this.state, loading: true });
    // WalletService.AddBankCard(this.props.token, number, 1, password).then(
    //   (response) => {
    //     if (response.IsSuccess) {
    //       // this.GetBankCardList();
    //       this.setState({
    //         ...this.state,
    //         loading: false,
    //         isAddCardSuccess: true,
    //       });
    //     } else {
    //       this.props.enqueueSnackbar(response.msg, {
    //         variant: "error",
    //       });
    //       this.setState({
    //         ...this.state,
    //         loading: false,
    //         // showMessagebox: true,
    //         // messageboxText: response.msg
    //       });
    //     }
    //   }
    // );
  };

  // handleBindCardClick = (number, password) => {
  //   this.setState({ ...this.state, loading: true });
  //   WalletService.AddBankCard(
  //     this.props.token,
  //     this.props.account.info.member_name,
  //     number,
  //     1,
  //     password
  //   ).then(response => {
  //     if (response.IsSuccess) {
  //       this.GetBankCardList();
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         isAddCardSuccess: true
  //       });
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error"
  //       });
  //       this.setState({
  //         ...this.state,
  //         loading: false
  //         // showMessagebox: true,
  //         // messageboxText: response.msg
  //       });
  //     }
  //   });
  // };
  handleBindCardClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 2 });
  };
  handleGoWithdrawClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 1 });
  };
  handleCSClick = () => {
    this.props.onhandleCSClick(
      this.props.account.info.member_id,
      this.props.account.info.member_name,
      ""
    );
  };
  handleManageCardClick = () => {
    this.setState({ ...this.state, displayView: 3 });
  };
  handleAddCardClick = () => {
    this.setState({ ...this.state, displayView: 2 });
  };
  handleCardManageBack = () => {
    this.setState({ ...this.state, displayView: 1 });
  };
  handleAddCardBack = () => {
    this.setState({ ...this.state, displayView: 3 });
  };
  handleDeleteCardClick = (id) => {
    this.props.deleteBankCard(id);
    // this.setState({ ...this.state, loading: true });
    // WalletService.DeleteBankCard(this.props.token, id).then((response) => {
    //   if (response.IsSuccess) {
    //     this.GetBankCardList();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
  };
  handleReportClick = () => {
    this.props.onhandleClickTab("report");
  };
  handleSuccessConfirmClick = () => {
    this.setState({ ...this.state, displayView: 1 })
  }
  handleWithdrawalClick = (bankid, amount, password) => {
    const formatedamount = amount.toString().replace(/,/g, "");
    if (bankid == 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterBank"), {
        variant: "warning",
      });
      return;
    }
    if (parseFloat(formatedamount) <= 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgInvalidAmt"), {
        variant: "warning",
      });
      return;
    }

    if (
      parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    ) {
      this.props.enqueueSnackbar(
        i18n.t("withdrawal.msgInsufficient"),
        {
          variant: "warning",
        }
      );
      return;
    }
    if (password.length <= 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterWithdrawalPass"), {
        variant: "warning",
      });
      return;
    }
    this.props.doWithdrawal(formatedamount, password, bankid);
    // this.setState({ ...this.state, loading: true });
    // const result = WalletService.Withdrawal(
    //   this.props.token,
    //   bankid,
    //   formatedamount
    // );

    // result.then((response) => {
    //   if (response.IsSuccess) {
    //     // this.GetBankCardList();
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "success",
    //     });
    //     this.GetWithdrawalDetails();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
    //  return result;
  };
  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("withdrawal.title")}
        </Title>
        <InnerWrap>
          {(() => {
            if (this.props.account.loading === false) {
              if (this.props.account.info.member_name === "") {
                return (
                  <NameVerification token={this.props.token}></NameVerification>
                );
              } else {
                if (this.props.account.info.member_safe_password !== "set") {
                  return (
                    <Redirect
                      to={`/${i18n.language}/account/profile/member_safe_password`}
                    ></Redirect>
                  );
                } else {
                  if (
                    this.props.wallet.bankCardList != null &&
                    this.props.wallet.bankCardList.length === 0
                  ) {
                    return (
                      <AddCard
                        name={this.props.account.info.member_name}
                        onhandleNextClick={this.handleAddCardNextClick}
                        bankList={this.props.wallet.bankList}
                        showBack={false}
                      ></AddCard>
                    );
                  } else {
                    if (this.state.isAddCardSuccess === true) {
                      return (
                        <AddCardSuccess
                          onhandleBindCardClick={this.handleBindCardClick}
                          onhandleGoWithdrawClick={this.handleGoWithdrawClick}
                          onhandleCSClick={this.handleCSClick}
                        ></AddCardSuccess>
                      );
                    } else {
                      switch (this.state.displayView) {
                        case 1:
                          return (
                            <Main
                              defaultCard={this.state.defaultCard}
                              cardList={this.props.wallet.bankCardList}
                              withdrawalInfo={this.state.withdrawalInfo}
                              onhandleManageCardClick={
                                this.handleManageCardClick
                              }
                              onhandleWithdrawalClick={
                                this.handleWithdrawalClick
                              }
                              account={this.props.account}
                            ></Main>
                          );
                        case 2:
                          return (
                            <AddCard
                              name={this.props.account.info.member_name}
                              onhandleNextClick={this.handleAddCardNextClick}
                              onhandleBackClick={this.handleAddCardBack}
                              bankList={this.props.wallet.bankList}
                              showBack={true}
                            ></AddCard>
                          );
                        case 3:
                          return (
                            <CardManage
                              cardList={this.props.wallet.bankCardList}
                              onhandleAddCardClick={this.handleAddCardClick}
                              onhandleBackClick={this.handleCardManageBack}
                              onhandleDeleteCardClick={
                                this.handleDeleteCardClick
                              }
                              onhandleReportClick={this.handleReportClick}
                            ></CardManage>
                          );
                        case 4:
                          return <Success
                            handleConfirmClick={this.handleSuccessConfirmClick}
                          ></Success>
                        default:
                          return null;
                      }
                    }
                  }
                }
              }
            }
          })()}

          <Loading
            show={this.state.loading}
          ></Loading>
        </InnerWrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,

    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    addBankCard: (card, name, foreign_id, bank_branch) =>
      dispatch(walletAction.addBankCard(card, name, foreign_id, bank_branch)),
    addBilling: (card_id, amount) =>
      dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doWithdrawal: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdrawal(amount, password, user_account_id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Withdrawal))
);
