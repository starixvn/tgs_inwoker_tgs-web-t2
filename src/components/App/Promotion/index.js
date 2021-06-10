import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.png";
import PromoModelPNG from "../../../assets/images/promo-bg-model.png";
import PromoPresentPNG from "../../../assets/images/promo-bg-present.png";
import PromoItemPNG from "../../../assets/images/promot-item.png";

import { withSnackbar } from "notistack";
import Collapse from "@material-ui/core/Collapse";

import i18n from "../../../utils/i18n";
import { generalAction, SHOW_LOGIN } from "@Inwoker/tgs-api";
import CommonMarquee from "../CommonMarquee";
import ScrollAnimation from "react-animate-on-scroll";
import { AppHistory } from "../../../history/History";
export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;
const moment = require("moment");
const Container = styled.div`
  width: 100%;
  position: relative;
  background: url(${BGPromotionJPG}) no-repeat center;
  min-height: 770px;
  background-size: auto 100%;
  overflow: visible;
`;
const MainContent = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  overflow: visible;
`;
const MainContentLeft = styled.div`
  float: left;
  width: 480px;
  height: 700px;
  position: relative;
  overflow: visible;
  padding-top: 152px;
`;
const PromoImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;
const PromoModel = styled.img`
  height: 608px;
  width: 500px;
`;
const PromoPresent = styled.img`
  height: 195px;
  width: 200px;
  position: absolute;
  top: 0px;
  right: -55px;
  animation: ${floatKeyframe} 3s linear 0s infinite;
`;

const MainContentRight = styled.div`
  float: left;
  margin: 30px auto;
  padding: 25px 25px;
  width: 800px;
  height: 700px;
  background-color: #f0ededb3;
  border-radius: 20px;
  position relative;
  overflow-y: scroll;
`;
const Inner = styled.div``;
const Content = styled.div`
  border-radius: 20px;
  width: 740px;
  height: 184px;
  background-color: #8a7f73;
  margin: 13px 0 13px 0px;
  float: left;
  position: relative;
  background: url(${PromoItemPNG}) no-repeat center;
  background-size: auto 100%;
  transition: all 0.2s linear 0.2s;
  filter: grayscale(30%);
  &:hover {
    cursor: pointer;
    filter: grayscale(0%);
    background-size: auto 105%;
  }
`;
const LeftContent = styled.div`
  float: left;
  width: 444px;
`;
const RightContent = styled.div`
  float: left;
  height: 184px;
  width: 420px;
  background-color: #291c04;
  position: absolute;
  right: 0;
  top: 0;

  padding-right: 20px;
`;
const PromoTitle = styled.div`
  height: 125px;
  font-size: 30px;
  color: #ffffff;
  margin-top: 20px;
  text-align: right;
  font-weight: 600;
`;
const PromoDate = styled.div`
  font-size: 18px;
  color: #ffffff;
  text-align: right;
`;
const PromoDesc = styled.div`
  font-size: 14px;
  color: #fff;
`;
const PromoImg = styled.img`
  width: 444px;
  height: 184px;
`;
const Viewall = styled.div`
  font-size: 15px;
  color: #ffffff;
  position: absolute;
  bottom: 10px;
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  left: 20px;
  display: inline-block;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    right: 4px;
    border: 2px solid #fff;
  }
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 6px 0 rgba(255, 255, 255, 0.75);
  }
`;
const ViewallArrow = styled.img`
  ${(props) =>
    props.checked ? `transform: rotateX(0deg);` : `transform: rotateX(180deg);`}

  float: right;
  margin-left: 7px;
  margin-top: 7px;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.getPromotionList();
    } else {
      this.props.getPlayerPromotionList();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      if (this.props.account.token === null) {
        this.props.getPromotionList();
      } else {
        this.props.getPlayerPromotionList();
      }
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }

  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        ["FirstDeposit", "DailySecondDeposit", "DailyFirstDeposit"].indexOf(
          promotionType
        ) >= 0
      ) {
        AppHistory.push({
          pathname: "/" + i18n.language + "/account/deposit/" + id,
        });
      }
    }
  };
  render() {
    return (
      <Container>
        <CommonMarquee></CommonMarquee>
        <MainContent>
          <MainContentLeft>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <PromoImageContainer>
                <PromoModel src={PromoModelPNG}></PromoModel>
                <PromoPresent src={PromoPresentPNG}></PromoPresent>
              </PromoImageContainer>
            </ScrollAnimation>
          </MainContentLeft>
          <MainContentRight className="scrollbar-wrap">
            <Inner>
              {this.props.general.promotionList.items.map((data, index) => (
                <Content key={index}>
                  <LeftContent>
                    <Viewall
                      onClick={() =>
                        this.handlejoinPromotionClick(
                          data.id,
                          data.promotionType
                        )
                      }
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "#8a7f73" }
                          : { backgroundColor: "#a27d38" }
                      }
                    >
                      {i18n.t("promotion.joinPromo")}
                    </Viewall>
                  </LeftContent>
                  <RightContent>
                    <PromoTitle>{data.name}</PromoTitle>

                    <PromoDate>
                      {moment(data.from).format("YYYY/MM/DD HH:mm:ss")}
                      {" - "}
                      {moment(data.to).format("YYYY/MM/DD HH:mm:ss")}
                    </PromoDate>
                    <Collapse
                      in={data.checked}
                      collapsedHeight="70px"
                      style={{ textAlign: "right" }}
                    ></Collapse>
                  </RightContent>
                </Content>
              ))}
            </Inner>
          </MainContentRight>
        </MainContent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    getPromotionList: () =>
      dispatch(generalAction.getPromotionList(1, 99, true, "", true)),
    getPlayerPromotionList: () =>
      dispatch(generalAction.getPlayerPromotionList(1, 99, true, "", true)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
