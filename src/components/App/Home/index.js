import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Common from "../../../utils/Common";
import { GameTypeEnum, GameEnum } from "../../../utils/Enum";
import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import StartGamePNG from "../../../assets/images/start-game.png";
import StartGameHoverPNG from "../../../assets/images/start-game-hover.png";

import HomeAGBgJPG from "../../../assets/images/home-ag-bg.png";
import AGBGPNG from "../../../assets/images/ag-bg.png";
import HomeSportSabaPNG from "../../../assets/images/home-sport-saba.png";
import HomeSportSboPNG from "../../../assets/images/home-sport-sbo.png";
import HomeSportImesPNG from "../../../assets/images/home-sport-imes.png";
import HomeAGRoom1PNG from "../../../assets/images/home-ag-room1.png";
import HomeAGRoom2PNG from "../../../assets/images/home-ag-room2.png";
import HomeAGRoom3PNG from "../../../assets/images/home-ag-room3.png";
import HomeAGContentPNG from "../../../assets/images/home-ag-content.png";
import HomeKYBgJPG from "../../../assets/images/home-ky-bg.jpg";
import KYContentPNG from "../../../assets/images/ky-content.png";
import KYContentModelPNG from "../../../assets/images/ky-content-model.png";
import KYContentCardPNG from "../../../assets/images/ky-content-card.png";
import KYContentButtonPNG from "../../../assets/images/ky-content-button.png";

import Recommend from "./Recommend";
import Marquee from "./Marquee";
import FloatPanel from "./FloatPanel";
import { SHOW_MODAL, SHOW_LOGIN } from "../../../constants/actionType";

import i18n from "../../../utils/i18n";
import SlotSection from "./SlotSection";
import ScrollAnimation from "react-animate-on-scroll";
import KySlider from "./KySlider";
import AGSlider from "./AgSlider";
export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  bottom: 50px;
`;
const AGContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: visible;
`;
const AGImgBGContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: -75px;
  overflow: hidden;
  width: 100%;
`;
const AGImageBGFlex = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;
const AGImgBG = styled.img`
  width: 100%;
  min-width: 1920px;
`;
const AGTitle = styled.div`
  background: url(${`${process.env.PUBLIC_URL}/assets/images/${i18n.language}/sport-hotgame.png`}) no-repeat 10px center;
  width: 100%;
  height: 100px;
  display: inline-block;
  margin: 0 auto;
  margin-top: 40px;
}
`;
const AGText = styled.div`
  width: 500px;
  color: #fff;
  padding-left: 15px;
`;
const AGGameIconBar = styled.div`
  width: 500px;
  height: 100px;
  margin-top: 40px;
  padding-left: 15px;
  overflow: visible;
`;
const AGGameRoomHover = styled.div`
  width: 223px;
  height: 248px;
  margin-left: 10px;
  margin-top: 3px;
  border-radius: 26px 0 0 0;
  pointer-event: none;
  display: none;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(35, 35, 35, 0.5)
  );
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0;
`;
const AGGameRoomHoverLine1 = styled.div`
  color: #fff;
  font-size: 54px;
  text-align: center;
  border-bottom: 1px solid #fff;
  margin: 56px 74px 0 74px;
  font-weight: 500;
`;
const AGGameRoomHoverLine2 = styled.div`
  color: #fff;
  font-size: 20px;
  text-align: center;

  margin: 6px 0px 0 0px;
  font-weight: 500;
`;
const AGGameRoom = styled.div`
  width: 243px;
  height: 268px;
  display: inline-block;
  position: relative;
  float: left;
  &:hover {
    cursor: pointer;
  }
  &:hover ${AGGameRoomHover} {
    display: block;
  }
`;
const AGGameRoomName = styled.div`
  color: #fde73f;
  font-size: 25px;
  width: 120px;
  margin: 88px 0 0 29px;
`;
const AGGameRoom1 = styled(AGGameRoom)`
  background: url(${HomeAGRoom1PNG}) no-repeat;
`;
const AGGameRoom2 = styled(AGGameRoom)`
  background: url(${HomeAGRoom2PNG}) no-repeat;
`;
const AGGameRoom3 = styled(AGGameRoom)`
  background: url(${HomeAGRoom3PNG}) no-repeat;
`;
const AGGameLeftContent = styled.div`
  float: left;
  width: 700px;
`;
const AGGameRightContent = styled.div`
  width: 550px;
  height: 535px;
  margin-top: 28px;
  float: right;
  position: relative;
`;
const AGGameRightContentLogo = styled.div`
  width: 158px;
  height: 60px;

  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 26px;
  left: 24px;
`;

const ItemContainer = styled.div`
  width: 100%;
  position: relative
  z-index: 4;
`;
const AGContent = styled.div`
  width: 1280px;
  height: 535px;
  margin: 55px auto 0 auto;
  background: url(${AGBGPNG}) no-repeat;
  background-size: 100%;
`;

const AGContentStartGame = styled.div`
  position: absolute;
  left: 25px;
  top: 274px;

  width: 167px;
  height: 41px;
  background: url(${StartGamePNG}) no-repeat;
  &:hover {
    cursor: pointer;
    background: url(${StartGameHoverPNG}) no-repeat;
  }
  color: #fff;
  font-size: 17px;
  padding: 0px 50px 0px 5px;
  text-align: center;
  line-height: 40px;
`;

const KYContainer = styled.div`
  width: 100%;
  height: 530px;
  margin-top: 30px;
`;
const KYContent = styled.div`
  width: 1280px;
  height: 519px;

  margin: 38px auto 0 auto;
  position: relative;
`;
const KYButtonTitle = styled.div`
  color: #fff;
  font-size: 54px;
  text-align: center;
  border-bottom: 1px solid #fff;
  margin: 100px 74px 0 74px;
  font-weight: 500;
  transition: margin 2s;
`;
const KYButtonText = styled.div`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 6px 0px 0 0px;
  font-weight: 500;
`;
const KYButton = styled.div`
  width: 500px;
  height: 85px;
  background: url(${KYContentButtonPNG}) no-repeat center;
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  background-size: 80%;
  background-color: #292828c7;
  transition: height 2s;
`;
const KyModel = styled.img`
  width: 300px;
  height: 380px;
  margin-left: 130px;
  margin-top: 28px;
`;
const KyCard = styled.img`
  width: 240px;
  position: absolute;
  bottom: 160px;
  left: 140px
  animation: ${floatKeyframe} 3s linear 0s infinite;
`;
const KYMainCharacter = styled.div`
  width: 500px;
  height: 408px;
  background: url(${KYContentPNG}) no-repeat bottom;
  float:left;
  background-size: 100%;
  position: relative;
  overflow:visible;
  margin-top:49px;
  &:hover ${KyCard} {
    animation: none;
  }
  &:hover ${KyModel} {
    animation: ${floatKeyframe} 3s linear 0s infinite;
  }
  &:hover ${KYButton} {
    height: 100%;
  }
  &:hover ${KYButtonTitle} {
    margin: 250px 74px 0 74px;
  }
}
`;
const KYHotGameTitle = styled.div`
  background: url(${`${process.env.PUBLIC_URL}/assets/images/${i18n.language}/home-ky-hotgame.png`})
    no-repeat right center;
  width: 406px;
  height: 128px;
  margin-left: 150px;

  float: left;
`;
const KYButtonQG = styled(AGContentStartGame)`
  position: initial;
  margin: 415px 0 0 274px;
`;

const KYHotgameContainer = styled.div`
  float: left;
  width: 780px;
  height: 500px;
`;
const KYHotgameFrame = styled.div`
  width: 180px;
  height: 180px;

  float: left;
  margin-left: 5px;
  margin-top: 5px;
`;
const KYHotgameImg = styled.img`
  height: 133px;

  margin: 0 auto;
  margin-top: 20px;
  display: block;
  transition: transform 100ms ease-in;
  &:hover {
    transform: scale(1.2);
    transform-origin: center;
    cursor: pointer;
  }
`;
const GameIcon = styled.img`
  width: 130px;
  float: left;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in;
  &:hover {
    transform: scale(1.2);
    transform-origin: center;
    cursor: pointer;
  }
`;
class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();
    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
    };
  }

  componentDidMount() {
    let promotionId = "";
    let promotionChannelId = "";

    if (this.props.match.params) {
      promotionId = this.props.match.params.promotionid || "";
      promotionChannelId = this.props.match.params.promotionchannelid || "";
    }
    localStorage.setItem("promotionId", promotionId);
    localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType == GameTypeEnum.SPORTS ||
          gameType == GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(
              `/${i18n.language}/sports/play/${gameCode}/${gameType}`
            );
          }
        } else {
          this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
        }
      } else {
        Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
        </SliderContainer>
        <AGContainer>
          <AGImgBGContainer>
            <AGImageBGFlex>
              <AGImgBG src={HomeAGBgJPG}></AGImgBG>
            </AGImageBGFlex>
          </AGImgBGContainer>
          <ItemContainer>
            <ScrollAnimation
              animateIn="bounce"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <AGContent>
                <AGGameLeftContent>
                  <AGSlider
                    handleJoinGameClick={this.handleJoinGameClick}
                  ></AGSlider>
                </AGGameLeftContent>
                <AGGameRightContent>
                  <AGTitle></AGTitle>
                  <AGText>
                    如果您正在寻找好用的亚洲的体育博彩平台，请不要再犹豫了Sample是亚洲最值得信赖和最佳的体育博彩选择。快速的存取款让您可以随时随地通过桌面或移动设备下注您最喜欢的体育活动和赛事。各色各样体育投注，包括篮球、棒球、冰球、美式足球、足球、网球、桌球、排球等投注、还有特殊赛事等，让您从早到晚都能体验到iBET体育博彩的多元化玩法及高赔率。
                  </AGText>
                  <AGGameIconBar>
                    <GameIcon
                      src={HomeSportSboPNG}
                      onClick={() =>
                        this.handleJoinGameClick(
                          GameTypeEnum.SPORTS,
                          "",
                          GameEnum.SBO,
                          "/" +
                            i18n.language +
                            "/joingame/" +
                            GameTypeEnum.SPORTS +
                            "/" +
                            GameEnum.SBO
                        )
                      }
                    ></GameIcon>
                    <GameIcon
                      src={HomeSportSabaPNG}
                      onClick={() =>
                        this.handleJoinGameClick(
                          GameTypeEnum.SPORTS,
                          "",
                          GameEnum.Sabah,
                          "/" +
                            i18n.language +
                            "/joingame/" +
                            GameTypeEnum.SPORTS +
                            "/" +
                            GameEnum.Sabah
                        )
                      }
                    ></GameIcon>
                    <GameIcon
                      onClick={() =>
                        this.handleJoinGameClick(
                          GameTypeEnum.ESPORTS,
                          "",
                          GameEnum.IMES,
                          "/" +
                            i18n.language +
                            "/joingame/" +
                            GameTypeEnum.ESPORTS +
                            "/" +
                            GameEnum.IMES
                        )
                      }
                      src={HomeSportImesPNG}
                      style={{ marginTop: "10px" }}
                    ></GameIcon>
                  </AGGameIconBar>
                </AGGameRightContent>
              </AGContent>
            </ScrollAnimation>
            <KYContainer>
              <KYContent>
                <KYHotgameContainer>
                  <ScrollAnimation
                    animateIn="fadeInLeft"
                    duration={1}
                    animateOnce={true}
                    style={{ overflow: "visible" }}
                  >
                    <KySlider
                      handleJoinGameClick={this.handleJoinGameClick}
                    ></KySlider>
                  </ScrollAnimation>
                </KYHotgameContainer>
                <KYMainCharacter>
                  <ScrollAnimation
                    animateIn="fadeInRight"
                    duration={1}
                    animateOnce={true}
                    style={{ overflow: "visible" }}
                  >
                    <KyModel src={KYContentModelPNG}></KyModel>
                  </ScrollAnimation>
                  <KyCard src={KYContentCardPNG}></KyCard>
                  <KYButton
                    onClick={() =>
                      this.handleJoinGameClick(
                        GameTypeEnum.QIPAILOBBY,
                        "",
                        GameEnum.KY,
                        "/" +
                          i18n.language +
                          "/joingame/" +
                          GameTypeEnum.QIPAILOBBY +
                          "/" +
                          GameEnum.KY
                      )
                    }
                  >
                    <KYButtonTitle>GO</KYButtonTitle>
                    <KYButtonText>{i18n.t("common.startGame")}</KYButtonText>
                  </KYButton>
                </KYMainCharacter>
              </KYContent>
            </KYContainer>
          </ItemContainer>
        </AGContainer>
        <SlotSection></SlotSection>
        <Recommend></Recommend>

        <FloatPanel
          onhandleDepositClick={this.props.onhandleDepositClick}
          onhandleShowCSClick={this.props.onhandleShowCSClick}
          onDownloadClick={() =>
            this.handleNavigateClick("/" + i18n.language + "/download")
          }
        ></FloatPanel>
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
