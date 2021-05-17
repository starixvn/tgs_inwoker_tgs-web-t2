import React from "react";
import styled from "styled-components";
import { Component } from "react";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  withStyles,
} from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
const CustomText = withStyles({
  root: {
    marginTop: "10px",
    float: "left",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      color: "#b6b6b6",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "340px",
    height: "47.63px",
    marginTop: "12px",
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
const TabButton = styled.div`
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px #f0ca83;
      color: #f0ca83;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
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
  margin: 15px 0 0 30px;
`;
const TunnelButton = styled(TabButton)`
  min-width: 133px;
  height: 41px;

  margin-top: 3px;
  padding: 10px 20px 0 20px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);
const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const CustomTable = styled.table`
  width: 340px;
  margin: 20px 0 20px 30px;
  border: solid 1px #d9d9d9;
`;
const TitleTD = styled.td`
  width: 112px;
  height: 55px;
  background-color: #f7f7f7;
  text-align: center;
  border: solid 1px #d9d9d9;
`;
const ValueTD = styled.td`
  width: 209px;
  height: 55px;
  background-color: #ffffff;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
class NewStepOne extends Component {
  render() {
    const {
      amount,
      onAmountChange,
      name,
      onNameChange,
      selectedMethodIndex,
      onMethodChange,
      selectedChannelIndex,
      onChannelChange,
      selectedPaymentIndex,
      paymentType,
      onNextClick,
    } = this.props;
    if (paymentType === null) return <></>;

    const methodList = paymentType.method;
    return (
      <>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>

          <SubTitle>{i18n.t("deposit.msgPlsSelectPayment")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          {methodList.map((item, index) => {
            return (
              <TunnelButton
                key={index}
                onClick={() => onMethodChange(index)}
                active={selectedMethodIndex === index}
              >
                {item.methodcode}
              </TunnelButton>
            );
          })}
        </SelectionContainer>
        <SplitLine></SplitLine>

        {(() => {
          if (methodList.length > 0 && selectedMethodIndex !== -1) {
            return (
              <>
                <SubHeaderContainer>
                  <NumberContainer>2</NumberContainer>

                  <SubTitle>{i18n.t("deposit.msgPlsSelectMethod")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  {methodList[selectedMethodIndex].channel.map(
                    (item, index) => {
                      return (
                        <TunnelButton
                          key={index}
                          onClick={() => onChannelChange(index)}
                          active={selectedChannelIndex === index}
                        >
                          {item.channelname}
                        </TunnelButton>
                      );
                    }
                  )}
                </SelectionContainer>
                {/* {(() => {
                  if (paymentType.paymentcode.toUpperCase() !== "LEEPAY") {
                    return (
                      <CustomTable cellPadding="0" cellSpacing="0">
                        <tbody>
                          <tr>
                            <TitleTD>{i18n.t("deposit.receiverBank")}</TitleTD>
                            <ValueTD>
                              {
                                methodList[selectedMethodIndex].channel[
                                  selectedChannelIndex
                                ].extended.name
                              }
                            </ValueTD>
                          </tr>
                          <tr>
                            <TitleTD>
                              {i18n.t("deposit.receiverAccount")}
                            </TitleTD>
                            <ValueTD>
                              {
                                methodList[selectedMethodIndex].channel[
                                  selectedChannelIndex
                                ].extended.bankAccount
                              }
                            </ValueTD>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </CustomTable>
                    );
                  }
                })()} */}

                <SplitLine></SplitLine>

                {(() => {
                  if (paymentType.paymentcode.toUpperCase() === "MANUAL") {
                    return (
                      <>
                        <SubHeaderContainer>
                          <NumberContainer>3</NumberContainer>

                          <SubTitle>
                            {i18n.t("deposit.msgPlsEnterAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          <TextField
                            style={{
                              height: "38px",
                              width: "220px",
                              float: "left",
                              marginRight: "5px",
                              padding: 0,
                            }}
                            placeholder={i18n.t("deposit.msgPlsEnterAccount")}
                            onChange={onNameChange}
                            outputFormat="string"
                            variant="outlined"
                            autoComplete="off"
                            value={name}
                          ></TextField>
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  }
                })()}

                <SubHeaderContainer>
                  <NumberContainer>
                    {paymentType.paymentcode.toUpperCase() === "MANUAL"
                      ? "4"
                      : "3"}
                  </NumberContainer>

                  <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <CurrencyTextField
                    style={{
                      height: "38px",
                      width: "220px",
                      float: "left",
                      marginRight: "5px",
                      padding: 0,
                    }}
                    placeholder={i18n.t("deposit.plsEnterDepositAmount")}
                    onChange={onAmountChange}
                    outputFormat="string"
                    variant="outlined"
                    autoComplete="off"
                    value={amount}
                    maximumValue={methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].transferlimit.to.toString()}
                    inputProps={{
                      maxLength: 15,
                    }}
                    currencySymbol=""
                    decimalPlaces={0}
                  ></CurrencyTextField>
                  <LimitPopupContainer>
                    <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                    <LimitAmount>
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.from
                      )}{" "}
                      -{" "}
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.to
                      )}
                    </LimitAmount>
                  </LimitPopupContainer>
                </SelectionContainer>
                <SplitLine></SplitLine>

                <CustomButton
                  name={i18n.t("common.nextStep")}
                  width={257}
                  marginTop={0}
                  float={"none"}
                  marginLeft={290}
                  handleClick={() => {
                    onNextClick();
                  }}
                  disabled={
                    selectedMethodIndex < 0 ||
                    selectedChannelIndex < 0 ||
                    amount <
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from ||
                    amount >
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to ||
                    (paymentType.paymentcode.toUpperCase() === "MANUAL" &&
                      name.length <= 0)
                  }
                ></CustomButton>
              </>
            );
          }
        })()}
      </>
    );

    return (
      <Grid container justify="center" direction="column" alignContent="center">
        <CustomFormControl>
          <CustomSelect
            native
            variant="outlined"
            value={selectedMethodIndex}
            displayEmpty
            onChange={(e) => {
              onMethodChange(e.target.value);
            }}
          >
            <option value="-1" disabled>
              请选择存款方式
            </option>
            {(() => {
              return methodList.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item.methodcode}
                  </option>
                );
              });
            })()}
          </CustomSelect>
        </CustomFormControl>
        <CustomFormControl>
          <CustomSelect
            native
            variant="outlined"
            value={selectedChannelIndex}
            displayEmpty
            onChange={(e) => {
              onChannelChange(e.target.value);
            }}
          >
            <option value="-1">请选择存款方式</option>
            {(() => {
              if (methodList.length > 0 && selectedMethodIndex !== -1) {
                return methodList[selectedMethodIndex].channel.map(
                  (item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.channelname}
                      </option>
                    );
                  }
                );
              }
            })()}
          </CustomSelect>
        </CustomFormControl>
        <CustomText
          placeholder="请输入您的银行账号名称"
          inputProps={{
            maxLength: 50,
          }}
          style={{
            width: "340px",
            height: "46px",
          }}
          value={name}
          name="account"
          onChange={onNameChange}
          variant="outlined"
        ></CustomText>
        <CustomText
          placeholder="请输入您想存款的数量"
          inputProps={{
            maxLength: 50,
          }}
          style={{
            width: "340px",
            height: "46px",
          }}
          value={amount}
          name="amount"
          onChange={onAmountChange}
          variant="outlined"
        ></CustomText>

        <CustomButton
          disabled={
            selectedMethodIndex < 0 ||
            selectedChannelIndex < 0 ||
            amount <= 0 ||
            name.length <= 0
          }
          name={i18n.t("common.nextStep")}
          onClick={onNextClick}
        ></CustomButton>
      </Grid>
    );
  }
}

export default NewStepOne;
