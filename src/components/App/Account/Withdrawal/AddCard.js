import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import { Select, FormControl, withStyles } from "@material-ui/core";
const Container = styled.div`
  width: 100%;
`;
const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 25px;
  font-family: Arial;
  font-size: 25px;
  color: #ffffff;
  text-align: center;
  float: left;
  -webkit-text-stroke: 1px black;
`;
const SubTitle = styled.div`
  color: #404040;
  font-size: 20px;
  float: left;
  margin: 0 0 0 10px;
`;
const SubTitleDesc = styled.div`
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #818181;
`;
const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: left;
  color: #818181;
  margin-top: 20px;
`;
const TextFieldContainer = styled.div`
  margin: 5px 0px;
  display: table;
`;
const TabButton = styled.div`
  font-size: 14px;

  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      color: #151a34;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
  ${(props) => {
    return `background:url(${props.img}) no-repeat 10px center,#f7f7f7;`;
  }}
  background-size: auto 30px;
  padding-left: 40px;
  margin-bottom: 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 0px;
`;
const TunnelButton = styled(TabButton)`
  width: 150px;
  height: 41px;
  padding-top: 10px;
  margin-top: 0px;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "395px",
    height: "38px",
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
class AddCard extends Component {
  state = {
    password: "",
    number: "",
    bankName: "",
    bankAccountName: "",
    bankBranch: "",
    selectedChannelIndex: 0,

    selectedBankTypeIndex: 0,
  };
  componentDidMount() {}
  handleBankTypeChange = (e) => {
    this.setState({ ...this.state, selectedBankTypeIndex: e.target.value });
  };
  handleChannelChange = (e) => {
    this.setState({ ...this.state, selectedChannelIndex: e.target.value });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };
  handleNextClick = (e) => {
    var selected = this.props.withdrawalList[this.state.selectedBankTypeIndex];
    var detail = {};
    if (selected.banktype === "Bank") {
      detail = {
        bankAccount: this.state.number,
        bankName: this.state.bankName,
        name: this.state.bankAccountName,
        bankBranch: this.state.bankBranch,
      };
    } else {
      detail = {
        address: this.state.number,
      };
    }
    this.props.onhandleNextClick(
      selected.channel[this.state.selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };
  render() {
    const { withdrawalList } = this.props;
    return (
      <Container>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>
          <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
        </SubHeaderContainer>
        <TextFieldLabel>{i18n.t("common.withdrawalBankType")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={this.state.selectedBankTypeIndex}
              onChange={this.handleBankTypeChange}
            >
              {withdrawalList.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item.banktype}
                  </option>
                );
              })}
            </CustomSelect>
          </CustomFormControl>
        </TextFieldContainer>
        <TextFieldLabel>{i18n.t("common.withdrawalChannel")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={this.state.selectedChannelIndex}
              onChange={this.handleChannelChange}
            >
              {withdrawalList.length > 0 &&
                withdrawalList[this.state.selectedBankTypeIndex].channel.map(
                  (item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.channelname}
                      </option>
                    );
                  }
                )}
            </CustomSelect>
          </CustomFormControl>
        </TextFieldContainer>
        <TextFieldLabel>{i18n.t("common.withdrawalNumber")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomTextField
            marginTop={10}
            placeholder={i18n.t("common.msgEnterWithdrawalNumber")}
            width={395}
            height={38}
            maxLength={50}
            float={"none"}
            handleTextFieldChange={this.handleNumberChange}
          ></CustomTextField>
        </TextFieldContainer>
        {(() => {
          if (
            withdrawalList.length > 0 &&
            withdrawalList[this.state.selectedBankTypeIndex].banktype === "Bank"
          ) {
            return (
              <>
                <TextFieldLabel>
                  {i18n.t("card.addCard.BankName")}
                </TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={i18n.t("card.addCard.msgEnterBankName")}
                    width={395}
                    height={38}
                    float={"none"}
                    handleTextFieldChange={this.handleBankNameChange}
                  ></CustomTextField>
                </TextFieldContainer>
                <TextFieldLabel>
                  {i18n.t("card.addCard.BankAccountName")}
                </TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={i18n.t("card.addCard.msgEnterBankAccountName")}
                    width={395}
                    height={38}
                    float={"none"}
                    handleTextFieldChange={this.handleBankAccountNameChange}
                  ></CustomTextField>
                </TextFieldContainer>
                <TextFieldLabel>{i18n.t("card.addCard.branch")}</TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={i18n.t("card.addCard.branchPlaceHolder")}
                    width={395}
                    height={38}
                    float={"none"}
                    handleTextFieldChange={this.handleBankBranchChange}
                  ></CustomTextField>
                </TextFieldContainer>
              </>
            );
          } else {
            return null;
          }
        })()}
        <TextFieldContainer>
          {(() => {
            if (this.props.showBack === true) {
              return (
                <Button
                  grayMode={true}
                  name={i18n.t("common.back")}
                  width={257}
                  marginRight={20}
                  handleClick={this.props.onhandleBackClick}
                ></Button>
              );
            } else {
              return null;
            }
          })()}

          <Button
            name={i18n.t("common.nextStep")}
            width={160}
            handleClick={this.handleNextClick}
          ></Button>
        </TextFieldContainer>
      </Container>
    );
  }
}

export default connect(null, null)(AddCard);
