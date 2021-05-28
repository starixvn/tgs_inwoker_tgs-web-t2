import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
  margin-right: 10px;
`;
const BtnStyle = styled.div`
  float: right;
  font-size: 14px;
  text-align: center;
  width: 60px;
  border-radius: 20px;
  margin-top: 5px;
`;
const BtnStyle1 = styled(BtnStyle)`
  line-height: 180%;
  margin-right: 5px;
  background-color: #f0ca83;
  color: #6d5d41;
  height: 25px;
  &:hover {
    color: #fdf8f0;
    cursor: pointer;
  }
`;
const BtnStyle2 = styled(BtnStyle)`
  line-height: 160%;
  background-color: transparent;
  color: #f0ca83;
  border-width: 2px;
  border-style: solid;
  border-color: #f0ca83;
  height: 25px;
  &:hover {
    color: #8a7f73;
    cursor: pointer;
  }
`;
const BtnLogout = styled.div`
  color: #8a7f73;
  text-align: right;
  padding: 10px 0px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
    color: #f0ca83;
  }
`;

const BtnTransfer = styled(BtnStyle2)``;
const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: #8a7f73;
  text-align: right;
  padding: 10px 10px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  margin: 2px 0 0 0;

  width: 16px;
  height: 16px;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${IconRefreshBalanceHoverPNG});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #f0ca83;
`;
const MemberUserName = styled.span`
  color: #f0ca83;
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 5px 0px 5px;
  float: right;
  background-color: #8a7f73;
`;
const InboxContainer = styled(BalanceContainer)`
  color: #f0ca83;
  text-align: right;
  padding: 8px 0px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const MailIconContainer = styled.span`
  margin-top: -2px;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  margin-top: 3px;
  color: #f0ca83;
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #8a7f73;
  float: right;
  margin-right: 0px;
  padding: 10px 0 0 0;
  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;
const TopContainer = styled.div``;
const BottomContainer = styled.div``;
class MemberContainer extends Component {
  render() {
    return (
      <Container>
        <TopContainer>
          <InboxContainer onClick={this.props.onhandleInboxClick}>
            <InboxCountLabel>
              {this.props.account.info.message_num}
            </InboxCountLabel>
            <MailIconContainer>
              <MailOutlineOutlinedIcon />
            </MailIconContainer>
          </InboxContainer>
          <Spliter></Spliter>
          <BtnLogout onClick={this.props.onhandleLogout}>
            {i18n.t("web.header.logout")}
          </BtnLogout>
          <Spliter></Spliter>
          <WelcomeContainer>
            <CustomLink to={"/" + i18n.language + "/account/profile"}>
              {i18n.t("web.header.welcomBack")}
              <MemberUserName>
                {this.props.account.info.member_username}
              </MemberUserName>
            </CustomLink>
          </WelcomeContainer>
        </TopContainer>
        <BottomContainer>
          {/* <BtnTransfer onClick={this.props.onhandleTransfer}>
            {i18n.t("web.header.transfer")}
          </BtnTransfer>
          <BtnDeposit onClick={this.props.onhandleDeposit}>
            {i18n.t("web.header.deposit")}
          </BtnDeposit> */}
          <BalanceContainer>
            <span>{i18n.t("web.header.mainAccount")}</span>
            <BalanceAmountLabel onClick={this.props.onhandleTransfer}>
              {Common.formatNumberWithThousand(this.props.mainBalance)}{" "}
            </BalanceAmountLabel>
            <span>{i18n.t("web.header.dollor")}</span>
            <RefreshBalance
              onMouseOver={this.props.onhandleRefreshBalanceClick}
            >
              <RefreshBalanceIcon></RefreshBalanceIcon>
            </RefreshBalance>
          </BalanceContainer>
        </BottomContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    mainBalance: state.wallet.mainBalance,
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(MemberContainer);
