import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { AppHistory } from "../../history/History";
import { withSnackbar } from "notistack";
import { UPDATING_SCREEN_SIZE, SHOW_LOGIN } from "../../constants/actionType";
import { accountAction } from "../../actions/accountAction";
import { generalAction } from "../../actions/generalAction";
import { walletAction } from "../../actions/walletAction";
import { gameAction } from "../../actions/gameAction";
import { uiAction } from "../../actions/uiAction";
import { GeneralService } from "../../services/GeneralService"
import BlowFishEncryption from "../../utils/BlowFishEncryption";
import LiveGame from "./LiveGame/index";
import Slots from "./Slots/index";
import SlotPlay from "./Slots/Play";
import Qipai from "./Qipai/index";
import Sports from "./Sports/index";
import SportsPlay from "./Sports/Play";
import Lottery from "./Lottery/index";
import LotteryPlay from "./Lottery/Play";
import Promotion from "./Promotion/index";
import PromotionDetails from "./Promotion/Details";
import Home from "./Home/index";
// import Maintenance from "./Maintenance";
import Account from "./Account/index";

import Header from "./Header";
import Common from "../../utils/Common";
import Footer from "./Footer";
import Loading from "./Loading";
// import RegisterSuccess from "./RegisterSuccess";
import Download from "./Download/index";

// import VIP from "./VIP/index";

import { SupportService } from "../../services/SupportService";

import i18n from "../../utils/i18n";
const baseRouteUrl = "/:locale(zh-CN|zh-TW|en-US)";
const Main = styled.div`
  min-height: 600px;

`;
const EmptyHeader = styled.div`
  height: 105px;
  background-image: linear-gradient(to top, #060d0f,#1b213f, #29356c);
  @media (max-width: 1261px) {
    height: 187px;
  }
`;
let csWindowTab = null;
class App extends Component {
  state = {
    showCS: false,
    isIpRestrict: false,
  };
  async componentDidMount() {
    var response = await GeneralService.GetSiteToken();
    if (response.IsSuccess) {
      localStorage.setItem("client-token", response.data.token);

    }
    // this.props.getMobilePrefix();
    this.props.getMarquee();
    // this.props.getBanner();
    // this.props.getGamePlatformList();
    this.props.getHomePageGameList();

    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
      }
    }
    if (urlParams.has("open")) {
      const openValue = urlParams.get("open");
      if (openValue) {
        AppHistory.replace("/" + i18n.language + "/" + openValue);
      }
    }
    if (urlParams.has("do")) {
      const doValue = urlParams.get("do");

      switch (doValue) {
        case "login":
        case "logout":
        case "register":
        case "login_auth":
        case "register_auth":
          localStorage.removeItem("token");
          break;
        case "login_token":
          const decryptedToken = BlowFishEncryption.Decrypt(
            urlParams.get("token")
          );

          localStorage.setItem("token", decryptedToken);
          AppHistory.replace("/");
          break;
      }
    } else {
      const localStorageToken = localStorage.getItem("token");
      if (
        localStorageToken != null &&
        this.props.account.token == null &&
        this.props.account.info.token === ""
      ) {
        const responseToken = await this.props.checkTokenIsValid();
        if (responseToken.IsSuccess) {

          // this.props.getAccountInfo();
          // this.props.checkGame();
          // this.props.getBankList();
          // this.props.getBalanceList();
          // this.props.getIDCardNo();
          // this.props.getInviteLink();
          // this.props.getDepositChannel();
        }
      }
    }


  }
  componentDidUpdate(preProps) {
    if (preProps.account.token == null && this.props.account.token != null) {
      // this.props.getKYGameList(this.props.account.token);
    }
  }
  GetSupportUrl = (userid, name, question) => {

    var result = SupportService.GetLiveSupport(
      userid,
      name,
      question,
      document.URL,
      document.referrer
    )
    if (result.IsSuccess) {
      if (!csWindowTab || csWindowTab.closed) {
        csWindowTab = Common.PopupCenter(result.data.online, "", 785, 750);
      } else {
        csWindowTab.focus();
      }
    } else {
      this.props.enqueueSnackbar(result.info, {
        variant: "error",
      });
    }
  };

  handleShowCSClick = () => {
    this.GetSupportUrl(
      this.props.account.info.member_id,
      this.props.account.info.member_username,
      ""
    );
  };

  handleDepositClick = () => {
    if (this.props.account.token == null) {
      this.props.showLogin(true);
    } else {
      this.props.history.push("/" + i18n.language + "/account/deposit");
    }
  };

  render() {
    return (
      <Router history={AppHistory}>
        {(() => {
          if (this.state.isIpRestrict) {
            return <Loading show={true} opacity={1}></Loading>;
          } else {
            return (
              <>
                <Header onhandleShowCSClick={this.handleShowCSClick}></Header>
                <EmptyHeader></EmptyHeader>
                <Main>
                  <Switch>
                    <Route
                      exact
                      path={[
                        baseRouteUrl + "/",
                        baseRouteUrl + "/a/:promotionid",
                        baseRouteUrl + "/t/:promotionid",
                        baseRouteUrl + "/f/:promotionid",
                      ]}
                      render={(props) => (
                        <Home
                          onhandleShowCSClick={this.handleShowCSClick}
                          onhandleDepositClick={this.handleDepositClick}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/live"}
                      component={LiveGame}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/chess"}
                      component={Qipai}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/sports"}
                      component={Sports}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/sports/play/:params"}
                      component={SportsPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/lottery"}
                      component={Lottery}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/lottery/play/:params?"}
                      component={LotteryPlay}
                    />

                    <Route
                      exact
                      path={baseRouteUrl + "/slots/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/electron/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/fish/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={
                        baseRouteUrl +
                        "/slots/play/:type/:params"
                      }
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/promotion"}
                      render={(props) => (
                        <Promotion token={this.props.account.token} />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/promotion/:id"}
                      render={(props) => (
                        <PromotionDetails />
                      )}
                    />
                    {/* <Route
                      exact
                      path={baseRouteUrl + "/vip"}
                      render={(props) => (
                        <VIP vip={this.props.account.vip.curr_vip.title} />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/maintenance"}
                      render={(props) => <Maintenance />}
                    /> 
                    <Route
                      exact
                      path={baseRouteUrl + "/registersuccess/:username"}
                      component={RegisterSuccess}
                    />*/}
                    <Route
                      exact
                      path={baseRouteUrl + "/account/:tab/:popup?"}
                      render={(props) => (
                        <Account
                          token={this.props.account.token}
                          onhandleCSClick={this.GetSupportUrl}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/download"}
                      component={Download}
                    />
                    <Redirect to={"/" + i18n.language} />
                  </Switch>
                </Main>
                <Footer target={"_blank"}></Footer>
              </>
            );
          }
        })()}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateScreenSize: (width, height) => {
      dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    getKYGameList: (token) => dispatch(gameAction.getKYGameList(token)),

    getAccountInfo: () =>
      dispatch(accountAction.getAccountInfo()),

    getMobilePrefix: () => dispatch(generalAction.getMobilePrefix()),
    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),
    getMarquee: () => dispatch(uiAction.getMarquee()),
    getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBanner: () => dispatch(uiAction.getBanner()),
    getBankList: () => dispatch(walletAction.getBankList()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getGamePlatformList: () => dispatch(gameAction.getGamePlatformList()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    checkGame: () => dispatch(accountAction.checkGame()),
    getSiteToken: () => dispatch(generalAction.getSiteToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(App)));
