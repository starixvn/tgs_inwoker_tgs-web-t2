import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import IconDepositRedPNG from "../../../../assets/images/icon-deposit-active.png";

import { walletAction, RESET_WALLETRESULT } from "@Inwoker/tgs-api";
import { withRouter } from "react-router-dom";

import NameVerification from "../../Share/NameVerification";
import Loading from "../../../../components/App/Loading";
import IconDepositCard from "../../../../assets/images/deposit-card.png";

import UnderConstructionPNG from "../../../../assets/images/underconstruction.png";
import IconManualDepositPNG from "../../../../assets/images/icon-manual-deposit.png";
import { withSnackbar } from "notistack";
import Step2Form from "./Step2Form";
import Success from "./Success";
import i18n from "../../../../utils/i18n";
import NewStepOne from "./NewStep1";
import NewStepTwo from "./NewStep2";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;
  width: 100%;
  min-height: 796px;
  background-color: #ffffff;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconDepositRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const TabButtonContainer = styled.div`
  padding: 6px;
  margin-bottom: 40px;
`;
const TabIconContainer = styled.div`
  border-radius: 50px;
  background-color: #f5f6fa;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: 15px;
`;
const TabIcon = styled.img`
  width: 29px;
  height: 19px;
`;
const TabButton = styled.div`
  font-size: 14px;
  color: #151a34;
  text-align: center;
  float: left;
  margin-right: 8px;
  border: 1.5px solid #8a7f73;
  width: 104px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  background-position: center 14px;
  background-repeat: no-repeat;

  ${(props) => (props.active ? `    border: 1.5px solid #f0ca83;` : `   `)};
  &:hover {
    cursor: pointer;
  }
`;

const TabLabel = styled.div`
  margin: 10px 0 0 0;
`;
const Wrap = styled.div`
  width: 935px;

  position: relative;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px 25px 25px 0px
  margin-top: 14px;
  position: relative;
  min-height: 630px;border-radius: 10px;
`;
const UnderConstructionWrap = styled.div`
  width: 935px;
  height: 100%;

  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
  position: absolute;
  top: 0;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
`;

const NameVerificationWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 4px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
`;
class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedChannelIndex: 0,
      selectedMethodIndex: 0,
      loading: false,

      amount: 0,
      name: "",
      step: 1,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.getDepositMethod();
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];

        if (payment.paymentcode.toUpperCase() === "LEEPAY")
          window.open(response.data.paymenturl, "_blank");

        this.setState({
          ...this.state,
          step: payment.paymentcode.toUpperCase() !== "LEEPAY" ? 2 : 3,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.depositResult.info, {
          variant: "error",
        });
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({
          ...this.state,
          step: 4,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.depositUploadResult.info, {
          variant: "error",
        });
        this.setState({ ...this.state, loading: false });
      }
    }
  }

  handleTabClick = (item, index) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedPaymentIndex: index,
      });
    }
  };
  handleChannelChange = (index) => {
    this.setState({
      ...this.state,
      amount: 0,
      selectedChannelIndex: index,
    });
  };
  handleMethodChange = (index) => {
    this.setState({
      ...this.state,
      amount: 0,
      selectedMethodIndex: index,
    });
  };
  handleNextClick = (e) => {
    this.setState({ ...this.state, loading: true });

    var payment =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];

    if (payment.paymentcode.toUpperCase() !== "LEEPAY") {
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

  // handleUploadClick = (file) => {
  //   if (!file) {
  //     this.props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   // this.props.resetDeposit();
  //   this.props.doDepositUpload(
  //     file,
  //     "image",
  //     this.props.wallet.depositResult.data.order_id
  //   );
  // };

  //newly declared function - START

  handleChangeManualDepositMethod = (value) => {
    this.setState({
      ...this.state,
      methodCode: value,
    });
  };

  handleChangePaymentOption = (value) => {
    this.setState({
      ...this.state,
      paymentId: value,
    });
  };

  performSendData = () => {
    // TGSWalletService.PerformManualDeposit(
    //   this.state.amount,
    //   this.state.account,
    //   this.state.paymentId
    // ).then((result) => {
    //   if (result.IsSuccess) {
    //     this.setState({
    //       manualDepositId: result.data,
    //     });
    //     TGSWalletService.PerformGetManualDepositDetail(
    //       this.state.manualDepositId
    //     ).then((result) => {
    //       this.setState({
    //         ...this.state,
    //         manualDepositDetail: result.data,
    //         newStep: 2,
    //       });
    //     });
    //   }
    // });
    //this.props.performManualDeposit(
    //  this.state.amount,
    //  this.state.account,
    //  this.state.paymentId
    //);
  };

  performUploadImage = (file) => {
    this.props.doUploadDepositProof(this.props.wallet.depositResult.data, file);
  };
  handleAmountChange = (e) => {
    this.setState({
      ...this.state,
      amount: e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };
  handleRestartClick = (e) => {
    this.setState(this.initialState);
    this.props.resetDeposit();
  };
  switchStep = (steps) => {
    switch (steps) {
      case 1:
        return (
          <NewStepOne
            amount={this.state.amount}
            onAmountChange={this.handleAmountChange}
            name={this.state.name}
            onNameChange={this.handleNameChange}
            selectedChannelIndex={this.state.selectedChannelIndex}
            onChannelChange={this.handleChannelChange}
            selectedMethodIndex={this.state.selectedMethodIndex}
            onMethodChange={this.handleMethodChange}
            selectedPaymentIndex={this.state.selectedPaymentIndex}
            paymentType={
              this.props.wallet.depositTypeList.length > 0
                ? this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ]
                : null
            }
            onNextClick={this.handleNextClick}
          />
        );
      case 2:
        return (
          <NewStepTwo
            extended={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].extended
            }
            depositResult={this.props.wallet.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
          />
        );
      case 3:
        return (
          <Step2Form
            depositResult={this.props.wallet.depositResult}
            amount={this.state.amount}
            handleRestartClick={this.handleRestartClick}
          ></Step2Form>
        );
      case 4:
        return <Success handleRestartClick={this.handleRestartClick}></Success>;
    }
  };

  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("deposit.title")}
        </Title>
        <Wrap>
          {(() => {
            if (this.props.account.info.member_name === "") {
              return (
                <NameVerificationWrap>
                  <NameVerification token={this.props.token}></NameVerification>
                </NameVerificationWrap>
              );
            } else {
              return (
                <>
                  <InnerWrap>
                    <TabButtonContainer>
                      {this.props.wallet.depositTypeList.map((item, index) => {
                        return (
                          <TabButton
                            key={index}
                            onClick={() => this.handleTabClick(item, index)}
                            active={this.state.selectedPaymentIndex === index}
                          >
                            <TabIconContainer>
                              <TabIcon src={IconDepositCard}></TabIcon>
                            </TabIconContainer>
                            <TabLabel>{item.paymentcode}</TabLabel>
                          </TabButton>
                        );
                      })}
                    </TabButtonContainer>
                    {(() => {
                      if (this.props.account.info.member_name === "") {
                        return (
                          <NameVerification
                            token={this.props.token}
                          ></NameVerification>
                        );
                      } else {
                        return this.switchStep(this.state.step);
                        {
                          /* if (this.state.step === 1) {
                          return (
                            <Step1
                              username={this.state.username}
                              selectedType={this.state.selectedType}
                              selectedChannel={this.state.selectedChannel}
                              depositAmount={this.state.depositAmount}
                              handleDepositClick={this.handleDepositClick}
                              handleDepositAmountChange={
                                this.handleDepositAmountChange
                              }
                              handleUsernameChange={this.handleUsernameChange}
                              handleTunnelClick={this.handleTunnelClick}
                            ></Step1>
                          );
                        } else if (this.state.step === 2) {
                          return (
                            <Step2Form
                              depositResult={this.props.wallet.depositResult}
                              handleDepositConfirmClick={
                                this.handleDepositConfirmClick
                              }
                              handleDepositCancelClick={
                                this.handleDepositCancelClick
                              }
                            ></Step2Form>
                          );
                        } else if (this.state.step === 3) {
                          return (
                            <Step2QR
                              bankInfo={this.bankInfo}
                              amount={this.state.depositAmount}
                              selectedType={this.state.selectedType}
                              selectedChannel={this.state.selectedChannel}
                              depositResult={this.props.wallet.depositResult}
                              handleUploadClick={this.handleUploadClick}
                              handleDepositCancelClick={
                                this.handleDepositCancelClick
                              }
                            ></Step2QR>
                          );
                        } else if (this.state.step === 4) {
                          return (
                            <Success
                              handleConfirmClick={() => {
                                this.setState({
                                  ...this.initialState,
                                  selectedType:
                                    this.props.wallet.depositTypeList[0],
                                  selectedChannel:
                                    this.props.wallet.depositTypeList[0]
                                      .channel[0],
                                });
                              }}
                            ></Success>
                          );
                        } */
                        }
                      }
                    })()}
                  </InnerWrap>
                </>
              );
            }
          })()}

          <Loading
            show={this.state.loading || this.props.wallet.depositLoading}
          ></Loading>
          <UnderConstructionWrap
            style={
              this.state.isMaintenance
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
          </UnderConstructionWrap>
        </Wrap>
        <form id="form" target="_blank" method="post">
          <input type="hidden" name="cid" id="cid"></input>
          <input type="hidden" name="oid" id="oid"></input>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doManualDeposit: (amount, account, paymentid) =>
      dispatch(walletAction.doManualDeposit(amount, account, paymentid)),
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    doLeePayDeposit: (amount, payment_id) =>
      dispatch(walletAction.doLeePayDeposit(amount, payment_id)),
    cancelDeposit: (id, notice_id) =>
      dispatch(walletAction.cancelDeposit(id, notice_id)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    resetDeposit: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Deposit)));
