import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import IconDepositRedPNG from "../../../../assets/images/icon-deposit-active.png";
import { walletAction } from "../../../../actions/walletAction";
import { withRouter } from "react-router-dom";
import { WalletService } from "../../../../services/WalletService";
import NameVerification from "../../Share/NameVerification";
import Loading from "../../../../components/App/Loading";
import IconDepositCard from "../../../../assets/images/deposit-card.png";

import UnderConstructionPNG from "../../../../assets/images/underconstruction.png";
import IconManualDepositPNG from "../../../../assets/images/icon-manual-deposit.png"
import { withSnackbar } from "notistack";
import Step1 from "./Step1";
import Step2Form from "./Step2Form";
import Step2QR from "./Step2QR";
import Success from "./Success";
import i18n from "../../../../utils/i18n";
import {
  RESET_WALLETRESULT,
} from "../../../../constants/actionType";
import { AppHistory } from "../../../../history/History";
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
  margin-bottom:40px;
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
  background-position:center   14px;
  background-repeat:no-repeat;

  ${(props) =>
    props.active
      ? `    border: 1.5px solid #f0ca83;`
      : `   `};
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
      selectedType: null,
      depositType: [],
      paymentList: [],
      selectedPayment: {
        min: 0,
        max: 0,
        banks: [],
      },
      loading: false,
      selectedBank: 0,
      depositAmount: 0,
      selectedBonus: { bonus_id: "" },
      selectedBonusSubId: "",
      bonusList: [],
      parentBonusId: [],
      step: 1,
      order: {},
      isMaintenance: false,
      wait: true,
      username: "",
      //test
      wallet:{depositTypeList:[
        {id:"1",max:100,url:"",title:"title",channel:[{
          id:"1", title:"title"
        },{
          id:"2", title:"title2"
        },{
          id:"3", title:"title2"
        },{
          id:"4", title:"title2"
        },{
          id:"5", title:"title2"
        },{
          id:"6", title:"title2"
        },{
          id:"7", title:"title2"
        },{
          id:"8", title:"title2"
        }]},
        {id:"2",max:200,url:"",title:"title2",channel:[{
          id:"2", title:"title2"
        },]}
      ]}
    };
    this.state = this.initialState;
  }

  bankInfo = null;
  componentDidMount() {
    if (this.state.wallet.depositTypeList.length > 0) {
      this.setState({
        ...this.state,
        selectedType: this.state.wallet.depositTypeList[0],
        selectedChannel: this.state.wallet.depositTypeList[0].channel[0],
      });

    }
    // if (this.props.wallet.depositTypeList.length > 0) {
    //   this.setState({
    //     ...this.state,
    //     selectedType: this.props.wallet.depositTypeList[0],
    //     selectedChannel: this.props.wallet.depositTypeList[0].channel[0],
    //   });

    // }
    WalletService.GetDepositBank().then(response => {
      if (response.IsSuccess) {
        this.bankInfo = response.data
      }

    })
  }
  componentDidUpdate(preProps, preState) {
    // if (
    //   preState.selectedType == null &&
    //   preProps.wallet.depositTypeList.length !=
    //   this.props.wallet.depositTypeList.length
    // ) {
    //   this.setState({
    //     ...this.state,
    //     selectedType: this.props.wallet.depositTypeList[0],
    //     selectedChannel: this.props.wallet.depositTypeList[0].channel[0],
    //   });
    // }
    // if (
    //   preProps.wallet.depositResult != this.props.wallet.depositResult &&
    //   this.props.wallet.depositResult !== null
    // ) {
    //   if (this.props.wallet.depositResult.IsSuccess) {
    //     const response = this.props.wallet.depositResult;
    //     if (this.state.selectedType.id !== 0) {
    //       // not manual deposit then, open payment url
    //       window.open(response.data.url, "_blank");
    //     }
    //     this.setState({
    //       ...this.state,
    //       step: this.state.selectedType.id === 0 ? 3 : 2,
    //       loading: false,
    //     });

    //   } else {
    //     this.props.enqueueSnackbar(this.props.wallet.depositResult.info, {
    //       variant: "error",
    //     });
    //     this.setState({ ...this.state, loading: false });
    //   }
    // }
    // if (
    //   preProps.wallet.cancelDepositResult != this.props.wallet.cancelDepositResult &&
    //   this.props.wallet.cancelDepositResult !== null
    // ) {
    //   if (this.props.wallet.cancelDepositResult.IsSuccess) {
    //     this.props.enqueueSnackbar(i18n.t("deposit.cancelDeposit"), {
    //       variant: "success",
    //     });
    //     this.setState({
    //       ...this.initialState,
    //       selectedType: this.props.wallet.depositTypeList[0],
    //       selectedChannel: this.props.wallet.depositTypeList[0].channel[0]
    //     })
    //     this.props.resetDeposit();
    //   } else {
    //     this.props.enqueueSnackbar(this.props.wallet.cancelDepositResult.info, {
    //       variant: "error",
    //     });
    //     this.setState({ ...this.state, loading: false });
    //   }
    // }
    // if (
    //   preProps.wallet.depositUploadResult != this.props.wallet.depositUploadResult &&
    //   this.props.wallet.depositUploadResult !== null
    // ) {

    //   if (this.props.wallet.depositUploadResult.IsSuccess) {

    //     this.setState({
    //       ...this.state,
    //       step: 4,
    //       loading: false,
    //     });
    //     this.props.resetDeposit();

    //   } else {
    //     this.props.enqueueSnackbar(this.props.wallet.depositUploadResult.info, {
    //       variant: "error",
    //     });
    //     this.setState({ ...this.state, loading: false });
    //   }
    // }
  }

  handleTabClick = (item) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedType: item,
        selectedChannel: item.channel[0],
        depositAmount: 0,
        selectedPayment: {
          min: 0,
          max: 0,
          banks: [],
        },
        selectedBank: 0,
        bonusList: [],
        selectedBonus: { bonus_id: "" },
        selectedBonusSubId: "",
      });
    }



  };
  handleTunnelClick = (channel) => {
    this.setState({
      ...this.state,
      depositAmount: 0,
      selectedChannel: channel,
    });


  };
  handleUsernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value
    });
  }
  handleBankClick = (bankId) => {
    this.setState({
      ...this.state,
      selectedBank: bankId,
    });
  };

  handleDepositAmountChange = (e) => {
    this.setState({
      ...this.state,
      depositAmount: e.target.value.replace(/,/g, ""),
    });
  };

  handleDepositClick = (e) => {
    if (this.state.depositAmount < this.state.selectedType.min) {
      this.props.enqueueSnackbar(
        i18n.t("deposit.msgMaxDeposit").replace("{{amount}}", this.state.selectedType.min),
        {
          variant: "warning",
        }
      );
      return;
    }

    if (this.state.depositAmount > this.state.selectedType.max) {
      this.props.enqueueSnackbar(i18n.t("deposit.msgMaxDeposit"), {
        variant: "warning",
      });
      return;
    }


    this.setState({ ...this.state, loading: true });

    if (this.state.selectedType.id === 0) {
      // handle manual deposit

      this.props.doManualDeposit(this.bankInfo.id, this.state.selectedChannel.id,
        this.state.depositAmount, this.state.username)
    } else {
      this.props.doDeposit(
        this.state.depositAmount,
        this.state.selectedType.id,
        this.state.selectedChannel ? this.state.selectedChannel.id : ""
      );
    }


  };

  handleDepositConfirmClick = (typeId, uploadedImage) => {
    this.props.resetDeposit();
    if (typeId !== 0) {

      this.props.getBalanceList();
      AppHistory.replace("/" + i18n.language + "/account/transfer");
    } else {
      // manual deposit, no need refresh balance

    }


  };
  handleUploadClick = (file) => {

    if (!file) {
      this.props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
        variant: "error",
      });
      return;
    }
    // this.props.resetDeposit();
    this.props.doDepositUpload(file, "image", this.props.wallet.depositResult.data.order_id)

  };
  handleDepositCancelClick = () => {
    if (this.state.step === 3) {
      this.props.cancelDeposit(this.props.wallet.depositResult.data.order_id, this.props.wallet.depositResult.data.notice_id);
    } else {
      this.setState({
        ...this.initialState,
        selectedType: this.props.wallet.depositTypeList[0],
        selectedChannel: this.props.wallet.depositTypeList[0].channel[0]
      })
      this.props.resetDeposit();
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
                      {this.state.wallet.depositTypeList.map((item, key) => {
                        return (
                          <TabButton
                            key={key}
                            style={{
                              backgroundImage:
                                "url(" +
                                (item.payment_icon_url === "" ? IconManualDepositPNG : item.payment_icon_url) +
                                ")  ",
                              backgroundSize: "30px",
                            }}
                            onClick={() => this.handleTabClick(item)}
                            active={
                              this.state.selectedType &&
                              this.state.selectedType.id === item.id
                            }
                          >
                            <TabIconContainer>
                             <TabIcon src={IconDepositCard}></TabIcon>
                            </TabIconContainer>
                            <TabLabel>{item.title}</TabLabel>
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
                        if (this.state.step === 1) {
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
                        }
                        else if (this.state.step === 3) {
                          return (
                            <Step2QR
                              bankInfo={this.bankInfo}
                              amount={this.state.depositAmount}
                              selectedType={this.state.selectedType}
                              selectedChannel={this.state.selectedChannel}
                              depositResult={this.props.wallet.depositResult}
                              handleUploadClick={
                                this.handleUploadClick
                              }
                              handleDepositCancelClick={
                                this.handleDepositCancelClick
                              }
                            ></Step2QR>
                          );
                        }
                        else if (this.state.step === 4) {
                          return (
                            <Success handleConfirmClick={() => {
                              this.setState({
                                ...this.initialState,
                                selectedType: this.props.wallet.depositTypeList[0],
                                selectedChannel: this.props.wallet.depositTypeList[0].channel[0]
                              })
                            }}></Success>
                          );
                        }
                      }
                    })()}
                  </InnerWrap>
                </>
              );
            }
          })()}

          <Loading show={this.state.loading || this.props.wallet.depositLoading}></Loading>
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
    doManualDeposit: (bankId, channelId, amount, username) =>
      dispatch(walletAction.doManualDeposit(bankId, channelId, amount, username)),
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    doDeposit: (amount, payment_id, extend) =>
      dispatch(walletAction.doDeposit(amount, payment_id, extend)),
    cancelDeposit: (id, notice_id) =>
      dispatch(walletAction.cancelDeposit(id, notice_id)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
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
