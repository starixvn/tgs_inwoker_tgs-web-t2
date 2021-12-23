import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import "react-sticky-header/styles.css";
import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

import {
  accountAction,
  walletAction,
  SHOWING_DIALOG,
  SHOW_LOGIN,
  GameTypeEnum,
  GameService,
} from "@Inwoker/tgs-api";

import TimerPNG from "../../assets/images/timer.png";
import BtnAppsPNG from "../../assets/images/btn-apps.png";
import BtnCSPNG from "../../assets/images/btn-cs.png";
import BtnAppsHoverPNG from "../../assets/images/btn-apps-hover.png";
import BtnCSHoverPNG from "../../assets/images/btn-cs-hover.png";

import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import TopMenuLivePNG from "../../assets/images/top-menu-live.png";
import TopMenuQipaiPNG from "../../assets/images/top-menu-qipai.png";
import TopMenuSportsPNG from "../../assets/images/top-menu-sports.png";
import TopMenuLotteryPNG from "../../assets/images/top-menu-lottery.png";
import TopMenuSlotPNG from "../../assets/images/top-menu-slot.png";
import TopMenuTigerPNG from "../../assets/images/top-menu-tiger.png";
import TopMenuFishPNG from "../../assets/images/top-menu-fish.png";
import TopMenuPromoPNG from "../../assets/images/top-menu-promo.png";

import TopMenuLiveHoverPNG from "../../assets/images/top-menu-live-hover.png";
import TopMenuQipaiHoverPNG from "../../assets/images/top-menu-qipai-hover.png";
import TopMenuSportsHoverPNG from "../../assets/images/top-menu-sports-hover.png";
import TopMenuLotteryHoverPNG from "../../assets/images/top-menu-lottery-hover.png";
import TopMenuSlotHoverPNG from "../../assets/images/top-menu-slot-hover.png";
import TopMenuTigerHoverPNG from "../../assets/images/top-menu-tiger-hover.png";
import TopMenuFishHoverPNG from "../../assets/images/top-menu-fish-hover.png";
import TopMenuPromoHoverPNG from "../../assets/images/top-menu-promo-hover.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";

const moment = require("moment");

const InnerWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
`;
const TopContainer = styled.div`
  height: 25px;
  background-color: #8a7f73;
`;
const TimerContainer = styled.div`
  font-family: Roboto;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 260px) {
    display: none;
  }
`;

const TimerSpan = styled.span`
  font-size: 16px;
  color: #f6f6f6;
  float: left;
  margin-left: 5px;
  width: 230px;
  word-spacing: 10px;
`;
const LinkContainer = styled.div`
  padding-top: 2px;

  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: #f6f6f6;

  &:hover {
    color: #fde73f;
    text-decoration: underline;
  }
`;
const CustomExternalLink = styled.a`
  ${(props) =>
    props.selected === true
      ? `
 color:#f0ca83; 
font-weight:bold;
pointer-event:none;
`
      : `
color:#f6f6f6; 

&:hover {
 cursor:pointer;
 color: #fde73f;
 
 }
`}
`;
const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const LinkListItem = styled.li`
  display: inline;
`;

const RightContainer = styled.div`
  float: right;
  height: 80px;
  display: flex;
  align-items: center;
`;

const BtnAppsAndCS = styled.div`
  width: 77px;
  height: 30px;
  margin-top: 3px;
  float: right;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BtnApps = styled(BtnAppsAndCS)`
  background-image: url(${BtnAppsPNG});
  &:hover {
    background-image: url(${BtnAppsHoverPNG});
  }
`;
const BtnCS = styled(BtnAppsAndCS)`
  margin-right: 8px;

  background-image: url(${BtnCSPNG});
  color: #f6f6f6;
  &:hover {
    background-image: url(${BtnCSHoverPNG});
    color: #fde73f;
  }
  padding-left: 34px;
  line-height: 30px;
`;

const BottomContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  width: 160px;
  height: 80px;
  background-position: left center;
  float: left;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1261px) {
    display: none;
  }
  @media (max-width: 1100px) {
    display: block;
  }
`;

const RightMenuContainer = styled.div`
  float: left;
`;
const RightMenuUL = styled.ul`
  float: left;
  list-style: none;
  padding: 0;
  margin: 0 0 0 10px;
`;

const RightMenuTextSpan = styled.span`
  font-size: 16px;
  margin: 0 auto;
  display: block;
  color: #8a7f73;
  padding-top: 6px;
  text-align: center;
  max-width: 85px;
`;
const RightMenuTextIcon = styled.span`
  margin-left: 5px;
`;
const RightMenuTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
`;
const MouseOverContainer = styled.div`
  width: 100%;
  height: 0px;
  position: fixed;
  left: 0;
  top: 156px;
  z-index: 1;
  cursor: default;
  transition: height 0.5s;
  @media (max-width: 1261px) {
    top: 185px !important;
  }
`;
const MouseOverBackground = styled.div`
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
  height: 160px;
  position: absolute;
  bottom: 30px;
`;

const RightMenuImg = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) => `background-image:url(${props.img});`}

  ${(props) =>
    props.active
      ? `

  background-image:url(${props.hoverimg});
  `
      : `
  
  `}
`;
const MouseOverInner = styled.div`
  width: 1280px;
  height: 161px;
  margin: 0 auto;
`;

const GameImg = styled.img`
  height: 130px;
  float: right;
  position: absolute;

  padding-bottom: 10px;
  transition: transform 0.6s;
  bottom: 0;
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuBottomLine = styled.div`
  height: 10px;
  background-color: transparent;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const RightMenuLI = styled.li`
  display: inline-block;
  padding: 0 11px;
  height: 95%;
  color: #f6f6f6;

  &:hover {
    color: #f0ca83;

    cursor: pointer;
  }
  &:hover ${MouseOverContainer} {
    height: 190px;
  }
  &:hover ${RightMenuBottomLine} {
    background-color: #f0ca83;
  }
  &:hover ${RightMenuImg} {
    ${(props) => `background-image:url(${props.hoverimg});`}
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  &:hover ${RightMenuTextSpan} {
    color: #f0ca83;
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
      color: #f0ca83;
      ${RightMenuBottomLine} {
        background-color: #f0ca83;
      }
      ${RightMenuTextSpan} {
        color: #f0ca83;
      }


  `
      : `
  
  `}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: not-allowed;
  pointer-event: none;
  color: white;

  text-transform: capitalize;

  font-weight: bold;
  font-size: 18px;
  user-select: none;
  cursor: not-allowed;
`;

const GameFrame = styled.div`
  max-width: 290px;
  float: left;
  min-height: 160px;
  position: relative;
  transition: transform 0.6s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameImg}{
        filter: brightness(40%) grayscale(200%);
      }

      ${Maintenance}{

        display: flex;
      }

    
    
    
    `
      : ``;
  }}
`;

const CustomCsButton = styled(CustomExternalLink)`
  margin-left: 40px;
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "80px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

const MenuItemList = [
  {
    path: "live",
    title: i18n.t("common.live"),
    img: TopMenuLivePNG,
    hoverImg: TopMenuLiveHoverPNG,
    gameType: [GameTypeEnum.LIVELOBBY],
  },
  {
    path: "chess",
    title: i18n.t("common.chess"),
    img: TopMenuQipaiPNG,
    hoverImg: TopMenuQipaiHoverPNG,
    gameType: [GameTypeEnum.QIPAILOBBY],
  },
  {
    path: "sports",
    title: i18n.t("common.sports"),
    img: TopMenuSportsPNG,
    hoverImg: TopMenuSportsHoverPNG,
    gameType: [GameTypeEnum.SPORTS, GameTypeEnum.ESPORTS],
  },
  {
    path: "lottery",
    title: i18n.t("common.lottery"),
    img: TopMenuLotteryPNG,
    hoverImg: TopMenuLotteryHoverPNG,
    gameType: [GameTypeEnum.LOTTERYLOBBY],
  },
  {
    path: `slots`,
    title: i18n.t("common.slot"),
    img: TopMenuTigerPNG,
    hoverImg: TopMenuTigerHoverPNG,
    gameType: [GameTypeEnum.SLOT],
  },
  {
    path: `electron`,
    title: i18n.t("common.electron"),
    img: TopMenuSlotPNG,
    hoverImg: TopMenuSlotHoverPNG,
    gameType: [GameTypeEnum.TABLEGAME],
  },
  {
    path: `fish`,
    title: i18n.t("common.fish"),
    img: TopMenuFishPNG,
    hoverImg: TopMenuFishHoverPNG,
    gameType: [GameTypeEnum.FISH],
  },
];
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });

    this.FireTimerToUpdateBalance();
  }
  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });

      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleTransfer = () => {
    this.props.history.push("/" + i18n.language + "/account/transfer");
  };
  onhandleDeposit = () => {
    this.props.history.push("/" + i18n.language + "/account/deposit");
  };
  handleInboxClick = () => {
    this.props.history.push("/" + i18n.language + "/account/inbox");
  };
  handleRefreshBalanceClick = () => {
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .map((a) => {
        this.props.getGameBalance(a.abbreviation);
      });
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/" + i18n.language + "/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/" + i18n.language + "/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    this.setState({ ...this.state, selected: path });
    this.props.history.push("/" + i18n.language + `/${path}`);
  };

  RightMenuItem = (to, label, subMenuImg) => {
    const { classes } = this.props;

    return (
      <RightMenuLI
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
        // hoverimg={imageHover}
      >
        <RightMenuTextContainer>
          <RightMenuTextSpan
            className={`${
              this.state.shouldShow === null
                ? classes.maxLabel
                : this.state.shouldShow
                ? classes.maxLabel
                : classes.minLabel
            }`}
          >
            {label}
          </RightMenuTextSpan>
        </RightMenuTextContainer>
        <RightMenuBottomLine></RightMenuBottomLine>
        {(() => {
          if (subMenuImg != null) {
            return (
              <MouseOverContainer
                onClick={(e) => e.stopPropagation()}
                style={
                  this.state.shouldShow === null
                    ? { top: "135px" }
                    : this.state.shouldShow
                    ? { top: "135px" }
                    : { top: "114px" }
                }
              >
                <MouseOverBackground>{subMenuImg}</MouseOverBackground>
              </MouseOverContainer>
            );
          } else {
            return null;
          }
        })()}
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (this.props.account.token != null) {
      window.open(
        "/" + i18n.language + "/joinlottery/" + name,
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
    ];
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (gameType == GameTypeEnum.SPORTS || gameType == GameTypeEnum.ESPORTS) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameCode === "WGFM" || gameCode === "WGVIA") {
            window.open(
              `/${i18n.language}/joinlobbygame/${gameType}/${gameCode}`,
              "_blank"
            );
          } else {
            this.props.history.push(
              "/" + i18n.language + "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      Common.PopupCenter(url, gameCode, 1280, 720);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") != -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };
  render() {
    const { classes } = this.props;
    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap>
          <TopContainer>
            <TimerContainer>
              <LinkContainer style={{ float: "left" }}>
                <LinkList>
                  <LinkListItem style={{ lineHeight: "1.7em" }}>
                    GMT+8 {this.state.systemDateTime}
                  </LinkListItem>
                </LinkList>
              </LinkContainer>

              <LinkContainer style={{ float: "right" }}>
                <LinkList>
                  <LinkListItem>
                    {this.props.general.brandLanguage.map((lang, index) => {
                      return (
                        <>
                          <CustomExternalLink
                            selected={i18n.language === lang.culturecode}
                            onClick={() => {
                              window.location.href = `/${lang.culturecode}`;
                            }}
                          >
                            {i18n.t("lang." + lang.culturecode)}
                          </CustomExternalLink>
                          {this.props.general.brandLanguage.length - 1 !== index
                            ? " | "
                            : ""}
                        </>
                      );
                    })}

                    {/* <CustomExternalLink
                      selected={i18n.language === "zh-CN"}
                      onClick={() => {
                        window.location.href = "/zh-CN";
                      }}
                    >
                      简体
                    </CustomExternalLink>
                    {" | "}
                    <CustomExternalLink
                      selected={i18n.language === "zh-TW"}
                      onClick={() => {
                        window.location.href = "/zh-TW";
                      }}
                    >
                      繁体
                    </CustomExternalLink>
                    {" | "}
                    <CustomExternalLink
                      selected={i18n.language === "en-US"}
                      onClick={() => {
                        window.location.href = "/en-US";
                      }}
                    >
                      English
                    </CustomExternalLink> */}
                    <CustomCsButton onClick={this.props.onhandleShowCSClick}>
                      {i18n.t("common.cs")}
                    </CustomCsButton>
                  </LinkListItem>
                </LinkList>
              </LinkContainer>
            </TimerContainer>

            {/* <RightContainer>
              <BtnApps onClick={this.handleDownloadAppsClick}></BtnApps>
              <BtnCS onClick={this.props.onhandleShowCSClick}>
                {i18n.t("common.cs")}
              </BtnCS>
              {(() => {
                if (
                  this.props.account.token !== this.props.account.info.token
                ) {
                  return (
                    <GuestContainer
                      onhandleShowCSClick={this.props.onhandleShowCSClick}
                      onhandleContactUsClick={this.handleContactUsClick}
                    ></GuestContainer>
                  );
                } else {
                  return (
                    <MemberContainer
                      onhandleLogout={this.onhandleLogout}
                      onhandleTransfer={this.onhandleTransfer}
                      onhandleDeposit={this.onhandleDeposit}
                      onhandleInboxClick={this.handleInboxClick}
                      onhandleRefreshBalanceClick={
                        this.handleRefreshBalanceClick
                      }
                    ></MemberContainer>
                  );
                }
              })()}
            </RightContainer> */}
          </TopContainer>
          <BottomContainer>
            <LogoContainer
              img={
                this.props.general.brand &&
                this.props.general.brand.desktopLogoUrl
              }
              onClick={this.onhandleLogoClick}
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            ></LogoContainer>
            <RightMenuContainer></RightMenuContainer>
            <RightContainer>
              {(() => {
                if (
                  this.props.account.token !== this.props.account.info.token
                ) {
                  return (
                    <GuestContainer
                      onhandleShowCSClick={this.props.onhandleShowCSClick}
                      onhandleContactUsClick={this.handleContactUsClick}
                    ></GuestContainer>
                  );
                } else {
                  return (
                    <MemberContainer
                      onhandleLogout={this.onhandleLogout}
                      onhandleTransfer={this.onhandleTransfer}
                      onhandleDeposit={this.onhandleDeposit}
                      onhandleInboxClick={this.handleInboxClick}
                      onhandleRefreshBalanceClick={
                        this.handleRefreshBalanceClick
                      }
                    ></MemberContainer>
                  );
                }
              })()}
            </RightContainer>
            <RightMenuUL
              className="top-menu"
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            >
              {MenuItemList.map((item, index) => {
                return (
                  <RightMenuLI
                    key={index}
                    active={this.state.selected === `${item.path}`}
                    onClick={() => this.handleClickMenu(item.path)}
                    onMouseOver={() => this.handleMenuMouseOver(item.path)}
                    onMouseLeave={this.handleMenuMouseLeave}
                    hoverimg={item.hoverImg}
                  >
                    <RightMenuTextContainer>
                      <RightMenuTextSpan
                        className={`${
                          this.state.shouldShow === null
                            ? classes.maxLabel
                            : this.state.shouldShow
                            ? classes.maxLabel
                            : classes.minLabel
                        }`}
                      >
                        {item.title}
                        {
                          //     <RightMenuTextIcon>
                          //     <ArrowDropDownCircleOutlinedIcon
                          //       style={{ fontSize: 14 }}
                          //     />
                          //   </RightMenuTextIcon>
                        }
                      </RightMenuTextSpan>
                    </RightMenuTextContainer>
                    <RightMenuBottomLine></RightMenuBottomLine>
                    <MouseOverContainer
                      onClick={(e) => e.stopPropagation()}
                      style={
                        this.state.shouldShow === null
                          ? { top: "105px" }
                          : this.state.shouldShow
                          ? { top: "105px" }
                          : { top: "100px" }
                      }
                    >
                      <MouseOverBackground>
                        <MouseOverInner>
                          {/* <ImagePromo src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/${item.path}/rebate.png`} alt=""></ImagePromo> */}
                          {(() => {
                            var list = this.props.game.homePageGameList.filter(
                              (game) => item.gameType.indexOf(game.type) >= 0
                            );

                            return list.map((game, index) => {
                              return (
                                <GameFrame
                                  key={index}
                                  style={{
                                    width: `calc(1264px / ${list.length})`,
                                  }}
                                  //TODO: To remove
                                  maintenance={game.status != 0}
                                >
                                  <GameFrameWrapper>
                                    <Maintenance>
                                      {i18n.t("transfer.maintenance")}
                                    </Maintenance>

                                    <GameImg
                                      index={index}
                                      src={`${
                                        process.env.PUBLIC_URL
                                      }/assets/images/pcHeaderMenu/${
                                        item.path
                                      }/${game.abbreviation.toLowerCase()}${
                                        config.features.SportsHideLogo &
                                        (game.abbreviation.toLowerCase() ===
                                          "wgvia" ||
                                          game.abbreviation.toLowerCase() ===
                                            "wgfm")
                                          ? "-HKJP"
                                          : ""
                                      }.png`}
                                      alt=""
                                      onClick={() => {
                                        if (
                                          game.type ===
                                            GameTypeEnum.LOTTERYLOBBY ||
                                          game.type === GameTypeEnum.LOBBY
                                        ) {
                                          this.handleJoinLotteryGame(
                                            game.abbreviation
                                          );
                                        } else {
                                          this.handleJoinGameClick(
                                            game.type,
                                            item.path,
                                            game.abbreviation,
                                            "/" +
                                              i18n.language +
                                              "/joingame/" +
                                              game.type +
                                              "/" +
                                              game.abbreviation
                                          );
                                        }
                                      }}
                                    ></GameImg>
                                  </GameFrameWrapper>
                                </GameFrame>
                              );
                            });
                          })()}
                        </MouseOverInner>
                      </MouseOverBackground>
                    </MouseOverContainer>
                  </RightMenuLI>
                );
              })}
              {this.RightMenuItem(
                "promotion",
                i18n.t("common.promotion"),
                null
              )}
            </RightMenuUL>
          </BottomContainer>
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(Header)))
);
