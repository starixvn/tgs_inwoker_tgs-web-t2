import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import IconEditPNG from "../../../../assets/images/icon-edit.png";
import IconBankDisablePNG from "../../../../assets/images/icon-bank-disable.png";
import CustomButton from "../../../Share/Button";
import CustomTextField from "../../../Share/TextField";
import i18n from "../../../../utils/i18n";
import Common from "../../../../utils/Common";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { connect } from "react-redux";

const TabButton = styled.div`
  height: 41px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 0px;
`;
const BankCardButton = styled(TabButton)`
  width: 204px;
  text-align: left;
  padding: 10px 0 0 38px;
  background: url(${IconBankDisablePNG}) no-repeat 15px center;
`;
const BankCardButtonLabel = styled.div`
  width: 86px;
  display: inline-block;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
  margin-right: 10px;
`;
const ManageCardButton = styled(TabButton)`
  width: 133px;
  background: url(${IconEditPNG}) no-repeat 15px center;
  padding: 12px 0 0 26px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0;
`;

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #000;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
  margin-top: 10px;
`;

const Turnover = styled.div`
  margin: 10px;
  a {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;

const Main = (props) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState("");
  const [amount, setAmount] = useState("");

  const [disabled, setDisabled] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [paymentList, setPaymentList] = useState(props.wallet.depositTypeList);

  var minValue = [];
  var maxValue = [];

  const handleSelectCardChange = (index) => {
    setSelectedCardIndex(index);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdrawalClick = (e) => {
    props.onhandleWithdrawalClick(
      this.props.cardList[this.state.selectedCardIndex].id,
      amount
    );
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const getTransferLimit = (channelId) => {
    //reset everything
    minValue = [];
    maxValue = [];
    setMin(0);
    setMax(0);
    //update new data.
    for (var i = 0; i < paymentList.length; i++) {
      const methodList = paymentList[i].method;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner].channel;
          for (var channel = 0; channel < channelList.length; channel++)
            if (channelList[channel]) {
              if (channelList[channel].channelid === channelId) {
                minValue.push(channelList[channel].transferlimit.from);
                maxValue.push(channelList[channel].transferlimit.to);
                setMin(Math.min(...minValue));
                setMax(Math.max(...maxValue));
              }
            }
        }
      }
    }
  };

  return (
    <>
      <SubHeaderContainer>
        <NumberContainer>1</NumberContainer>

        <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
      </SubHeaderContainer>
      <SelectionContainer>
        {props.cardList.map((item, index) => {
          return (
            <BankCardButton
              key={index}
              active={index === selectedCardIndex}
              onClick={() => {
                handleSelectCardChange(index);
                getTransferLimit(item.paymentchannelid);
              }}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <BankCardButtonLabel items>
                {i18n.t("withdrawal.bankCard")}
              </BankCardButtonLabel>
              <BankCardButtonCardNoHL items>
                {(() => {
                  if (
                    item.banktype === "ThirdParty" ||
                    item.banktype === "FPS"
                  ) {
                    if (item.detail.phone) {
                      return item.detail.phone.substring(
                        item.detail.phone.length - 4,
                        item.detail.phone.length
                      );
                    } else if (item.detail.address) {
                      return item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      );
                    }
                  } else {
                    if (item.detail.bankAccount) {
                      return item.detail.bankAccount.substring(
                        item.detail.bankAccount.length - 4,
                        item.detail.bankAccount.length
                      );
                    } else if (item.detail.address) {
                      return item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      );
                    }
                  }
                })()}
              </BankCardButtonCardNoHL>
              <BankCardButtonCardNo items>
                {i18n.t("withdrawal.tail")}
              </BankCardButtonCardNo>
            </BankCardButton>
          );
        })}
        <ManageCardButton
          onClick={props.onhandleManageCardClick}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid items> {i18n.t("withdrawal.manageBank")}</Grid>
        </ManageCardButton>
      </SelectionContainer>

      <>
        <SplitLine></SplitLine>
        <SubHeaderContainer>
          <NumberContainer>2</NumberContainer>

          <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          <CustomTextField
            width={250}
            height={38}
            placeholder={i18n.t("withdrawal.enterAmount")}
            handleTextFieldChange={handleAmountChange}
            variant="outlined"
            autoComplete="off"
            value={amount}
            pattern="[0-9]*"
            type={"number"}
            maxLength={12}
          ></CustomTextField>

          <LimitPopupContainer>
            {Common.formatNumberWithThousand(min)} -{" "}
            {Common.formatNumberWithThousand(max)}
          </LimitPopupContainer>

          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <span>
              {Common.formatNumberWithThousand(props.minWithdrawLimit)}
            </span>
          </Turnover>
        </SelectionContainer>

        <CustomButton
          disabled={
            parseFloat(amount) < props.withdrawalMinLimit ||
            parseFloat(amount) > props.withdrawalMaxLimit ||
            disabled
          }
          name={i18n.t("common.nextStep")}
          width={255}
          marginTop={0}
          float={"none"}
          marginLeft={290}
          handleClick={handleWithdrawalClick}
        ></CustomButton>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
