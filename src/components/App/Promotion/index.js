import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.png";
import PromoModelPNG from "../../../assets/images/promo-bg-model.png";
import PromoPresentPNG from "../../../assets/images/promo-bg-present.png";
import PromoItemPNG from "../../../assets/images/promot-item.png";
import PromoEmpty from "../../../assets/images/promo-empty.png";
import { withSnackbar } from "notistack";
import Collapse from "@material-ui/core/Collapse";

import i18n from "../../../utils/i18n";
import {generalAction} from "../../../api-services/actions/generalAction";
import {SHOW_LOGIN} from "../../../api-services/constant/actionType";
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
  position: relative;
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
  background: url(${({ image }) => image}) no-repeat;
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
  width: 290px;
  background-color: #291c04;
  position: absolute;
  right: 0;
  top: 0;

  padding-right: 20px;
`;
const PromoTitle = styled.div`
  height: 125px;
  font-size: 26px;
  color: #ffffff;
  margin-top: 20px;
  text-align: right;
  font-weight: 600;
`;
const PromoDate = styled.div`
  font-size: 12px;
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
const PromoEmptyContainer = styled.div``;
const PromoEmptyBg = styled.div`
  background: url(${PromoEmpty}) no-repeat;
  position: absolute;

  left: 50%;
  bottom: -155px;
  margin-left: -240px;
  width: 1165px;
  height: 877px;
`;
const PromoEmptyText = styled.div`
  margin-top: 200px;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 56px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(#446597, #282828);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
      this.props.getPromotionList(i18n.language);
    } else {
      this.props.getPlayerPromotionList(i18n.language);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      if (this.props.account.token === null) {
        this.props.getPromotionList(i18n.language);
      } else {
        this.props.getPlayerPromotionList(i18n.language);
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
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
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
              {(() => {
                if (this.props.general.promotionList.items.length > 0)
                  return this.props.general.promotionList.items.map(
                    (data, index) => (
                      <Content key={index} image={data.desktopBanner}>
                        <LeftContent>
                          <Viewall
                            onClick={() =>
                              this.handlePromotionClick(
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
                            {i18n.t("promotion.details")}
                          </Viewall>
                        </LeftContent>
                        <RightContent>
                          <PromoTitle>
                            {data.localization
                              ? data.localization.name
                              : data.name}
                          </PromoTitle>

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
                    )
                  );
                else
                  return (
                    <PromoEmptyContainer>
                      <PromoEmptyText>
                        <PromoEmptyTextLine
                          style={
                            i18n.language === "en-US"
                              ? { fontSize: "40px", padding: "0 120px" }
                              : {}
                          }
                        >
                          {i18n.t("promotion.emptyLine1")}
                        </PromoEmptyTextLine>
                        <PromoEmptyTextLine>
                          {i18n.t("promotion.emptyLine2")}
                        </PromoEmptyTextLine>
                      </PromoEmptyText>
                    </PromoEmptyContainer>
                  );
              })()}
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
    getPromotionList: (language) =>
      dispatch(generalAction.getPromotionList(language, 1, 99, true, "", true)),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
