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
  background-color: #c7a87c;
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
  color: #c7a87c;
  border-width: 2px;
  border-style: solid;
  border-color: #c7a87c;
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
    color: #c7a87c;
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
  width: 16px;
  height: 16px;

  background-color: ${({ theme }) => theme.primary};
  mask: url(${IconRefreshBalanceHoverPNG}) no-repeat center;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #c7a87c;
`;
const MemberUserName = styled.span`
  color: #c7a87c;
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 5px 0px 5px;
  float: right;
  background-color: #8a7f73;
`;
const InboxContainer = styled(BalanceContainer)`
  color: #c7a87c;
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
  color: #c7a87c;
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #8a7f73;
  float: right;
  margin-right: 0px;
  padding: 10px 0 0 0;
  max-width: 335px;
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

const MemberContainer = (props) => {
  return (
    <Container>
      <TopContainer>
        <InboxContainer onClick={props.onhandleInboxClick}>
          <InboxCountLabel>{props.account.info.message_num}</InboxCountLabel>
          <MailIconContainer>
            <MailOutlineOutlinedIcon />
          </MailIconContainer>
        </InboxContainer>
        <Spliter></Spliter>
        <BtnLogout onClick={props.onhandleLogout}>
          {i18n.t("web.header.logout")}
        </BtnLogout>
        <Spliter></Spliter>
        <WelcomeContainer>
          <CustomLink to={"/" + i18n.language + "/account/profile"}>
            <MemberUserName>
              {props.account.info.member_username} (VIP
              {props.account.info.member_level_id})
            </MemberUserName>
          </CustomLink>
        </WelcomeContainer>
      </TopContainer>
      <BottomContainer>
        {/* <BtnTransfer onClick={props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </BtnTransfer>
        <BtnDeposit onClick={props.onhandleDeposit}>
          {i18n.t("web.header.deposit")}
        </BtnDeposit> */}
        <BalanceContainer>
          <span>{i18n.t("web.header.mainAccount")}</span>
          <BalanceAmountLabel onClick={props.onhandleTransfer}>
            {Common.formatNumberWithThousand(
              props.wallet.mainBalance +
                props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .reduce((a, v) => (a = a + v.balance), 0)
            )}{" "}
          </BalanceAmountLabel>
          <span>{i18n.t("web.header.dollor")}</span>
          <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
            <RefreshBalanceIcon></RefreshBalanceIcon>
          </RefreshBalance>
        </BalanceContainer>
      </BottomContainer>
    </Container>
  );
};

export default MemberContainer;
