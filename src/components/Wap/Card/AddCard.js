import React, { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { AppHistory } from "../../../history/History";
import { withStyles } from "@material-ui/core/styles";
import { accountAction } from '@yifan1997/tgs-api-mapping';
import { walletAction } from "../../../actions/walletAction";
import { RESET_WALLETRESULT } from "../../../constants/actionType";
import Header from "../../Wap/Share/Header";

import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import MessageDialog from "../../Wap/Share/MessageDialog";
import Loading from "../../Wap/Share/Loading";
import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";

import Modal from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import BgProfilePNG from "../../../assets/images/wap/bg-profile.png";
import i18n from "../../../utils/i18n"
const Container = styled.div`
  width: 100%;
  padding-top: 170px;
`;
const StyledAppBar = withStyles({
  root: {
    height: "170px",
    background: `url(${BgProfilePNG}) no-repeat left top`,
    display: "block",
    backgroundSize: "cover",
  },
})(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #ffffff;
  margin: 0 auto 20px auto;
`;

const SubTitle = styled.div`
  font-size: 34px;
  font-weight: 550;
  margin: 40px 0 0 50px;
  color: #404040;
`;

const BottomInfo = styled.div`
  font-size: 22px;
  font-weight: 600;
  height: 30px;
  color: #c40511;
  background: url(${IconRedInfoPNG}) no-repeat left center;
  padding-left: 40px;
  display: table;
  margin: 0 auto;
`;
const StyledModalBank = withStyles((theme) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}))(Modal);
const StyledListItemIcon = withStyles((theme) => ({
  root: {
    marginLeft: "150px",
  },
}))(ListItemIcon);
const StyledListItemImage = styled.img`
  width: 64px;
  height: 64px;
`;
const StyledListItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
  },
}))(ListItem);
const StyledListItemText = withStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: "50px",
    "& .MuiTypography-root": {
      fontSize: "28px",
    },
  },
}))(ListItemText);

class AddCard extends Component {
  state = {
    branch: "",
    accountHolder: "",
    number: "",

    bankOpen: false,
    selectedBank: null,
    loading: false,
    showDialog: false,
    dialogMessage: "",
  };
  componentDidMount() { }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.addBankCardResult !==
      this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        AppHistory.goBack();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.addBankCardResult.info,
        });
      }
    }
  }

  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleNextClick = () => {
    //card, name, foreign_id, bank_branch
    this.props.addBankCard(
      this.state.number,
      this.state.accountHolder,
      this.state.selectedBank.id,
      this.state.branch
    );
  };
  handleBranchChange = (e) => {
    this.setState({ ...this.state, branch: e.target.value });
  };
  handleAccountHolderChange = (e) => {
    this.setState({ ...this.state, accountHolder: e.target.value });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };

  handleBankClick = (bank) => {
    this.setState({ ...this.state, selectedBank: bank, bankOpen: false });
  };
  render() {
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={i18n.t("card.addCard.title")}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
          <BalanceLabel>￥{this.props.wallet.mainBalance}</BalanceLabel>
        </StyledAppBar>
        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.selectedBank ? this.state.selectedBank.name : ""}
          onClick={() => this.setState({ ...this.state, bankOpen: true })}
          type={"text"}
          placeholder={i18n.t("card.addCard.msgSelectBank")}
          label={i18n.t("common.bank")}
          disabled={true}
        ></Textbox>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.branch}
          onChange={this.handleBranchChange}
          type={"text"}
          placeholder={i18n.t("card.addCard.branchPlaceHolder")}
          label={i18n.t("card.addCard.branch")}
        ></Textbox>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.accountHolder}
          onChange={this.handleAccountHolderChange}
          type={"text"}
          placeholder={i18n.t("card.addCard.msgEnterCardHolder")}
          label={i18n.t("card.addCard.cardHolder")}
        ></Textbox>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.number}
          onChange={this.handleNumberChange}
          type={"number"}
          placeholder={i18n.t("card.addCard.msgEnterCard")}
          label={i18n.t("card.addCard.cardNum")}
        ></Textbox>

        <BottomInfo>{i18n.t("card.addCard.desc")}</BottomInfo>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.confirm")}
          onClick={this.handleNextClick}
          disabled={
            this.state.branch === "" ||
            this.state.accountHolder === "" ||
            this.state.number === "" ||
            this.state.selectedBank === null
          }
        ></Button>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankOpen: false })}
          open={this.state.bankOpen}
        >
          {this.props.wallet.bankList.map((item, index) => {
            return (
              <StyledListItem
                button
                key={index}
                onClick={() => this.handleBankClick(item)}
              >
                <StyledListItemIcon>
                  <StyledListItemImage src={item.file}></StyledListItemImage>
                </StyledListItemIcon>
                <StyledListItemText primary={item.name}></StyledListItemText>
              </StyledListItem>
            );
          })}
        </StyledModalBank>
        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        ></MessageDialog>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    addBankCard: (card, name, foreign_id, bank_branch) =>
      dispatch(walletAction.addBankCard(card, name, foreign_id, bank_branch)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AddCard));
