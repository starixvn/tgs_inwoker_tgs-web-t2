import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n"
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
class AddCard extends Component {
  state = {
    number: "",
    password: "",
  };
  handleBankChange = (bankId) => {
    this.setState({ ...this.state, bankId: bankId });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };
  handleAccountHolderChange = (e) => {
    this.setState({ ...this.state, accountHolder: e.target.value });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };

  handleNextClick = (e) => {
    this.props.onhandleNextClick(
      this.state.bankId,
      this.state.bankBranch,
      this.state.accountHolder,
      this.state.number
    );
  };
  render() {
    return (
      <Container>
          <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>
          <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
        </SubHeaderContainer>
        <SubTitleDesc>{i18n.t("card.addCard.subTitle")}</SubTitleDesc>
        <TextFieldLabel>{i18n.t("common.bank")}</TextFieldLabel>
        <SelectionContainer>
          {this.props.bankList.map((item, key) => {
            return (
              <TunnelButton
                img={item.file}
                key={item.id}
                onClick={() => this.handleBankChange(item.id)}
                active={this.state.bankId === item.id}
              >
                {item.name}
              </TunnelButton>
            );
          })}
        </SelectionContainer>
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
        <TextFieldLabel>{i18n.t("card.addCard.cardHolder")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomTextField
            marginTop={10}
            placeholder={i18n.t("card.addCard.msgEnterCardHolder")}
            width={395}
            height={38}
            float={"none"}
            handleTextFieldChange={this.handleAccountHolderChange}
          ></CustomTextField>
        </TextFieldContainer>
        <TextFieldLabel>{i18n.t("card.addCard.cardNum")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomTextField
            marginTop={10}
            placeholder={i18n.t("card.addCard.msgEnterCard")}
            width={395}
            height={38}
            float={"none"}
            handleTextFieldChange={this.handleNumberChange}
          ></CustomTextField>
        </TextFieldContainer>

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
