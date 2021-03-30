import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, Route, Switch, Redirect } from "react-router";

import Web from "./components/App/index";
import Wap from "./components/Wap/index";
import * as serviceWorker from "./utils/serviceWorker";
import { isMobile } from "react-device-detect";
import { Provider } from "react-redux";
//import store from "./store/index";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import Interceptor from "./services/Interceptor";
import JoinGame from "./components/Share/JoinGame";
import JoinLobbyGame from "./components/Share/JoinLobbyGame";
// import IPRestrict from "./components/App/IPRestrict";
// import CS from "./components/App/CS";
// import AboutUs from "./components/AboutUs/index";
// import GameRules from "./components/GameRules/index";
import { AppHistory } from "./history/History";
import { SnackbarProvider } from "notistack";
import styled from "styled-components";
import Config from "./config/config";

import DangerPNG from "../src/assets/images/warning.png";
import InfoPNG from "../src/assets/images/info.png";
import SuccessPNG from "../src/assets/images/success.png";
import { makeStyles } from "@material-ui/core";
import i18n from "./utils/i18n";
import {ConfigService} from '@Inwoker/tgs-api';

const baseRouteUrl = "/:locale(zh-CN|zh-TW|en-US)";

require("es6-promise").polyfill();
const store = createStore(rootReducer, applyMiddleware(thunk));
Interceptor.setupInterceptors(store);
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: "#fff", color: "#000" },
  error: { backgroundColor: "#fff", color: "#000" },
  warning: { backgroundColor: "#fff", color: "#000" },
  info: { backgroundColor: "#fff", color: "#000" },
}));

const Dismiss = styled.a`
  margin-right: 12px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;

Config.from = isMobile ? "h5" : "h5";
Config.isPC = isMobile ? 1 : 0;

//add config at tgs library
ConfigService.setFrom(isMobile ? "h5" : "h5")
ConfigService.setPc(isMobile ? 1 : 0)
ConfigService.setLang(i18n.language)

// if (
//   process.env.REACT_APP_CUSTOM_NODE_ENV !== "development" &&
//   (process.env.REACT_APP_CUSTOM_NODE_ENV !== "qa" || Config.baseUrl === "") &&
//   (process.env.REACT_APP_CUSTOM_NODE_ENV !== "staging" || Config.baseUrl === "")
// ) {
//   let url = window.location.hostname;
//   let new_sub = "service";
//   let baseUrl = "";
//   if (url.split(/[\/\.]+/).length >= 3) {
//     baseUrl = url.replace(url.split(/[\/\.]+/)[0], new_sub);
//   } else {
//     baseUrl = new_sub + "." + url;
//   }
//   baseUrl = window.location.protocol + "//" + baseUrl + "/";
//   Config.baseUrl = baseUrl;
// }

const AppWrapper = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info,
        }}
        iconVariant={{
          success: <Icon src={SuccessPNG}></Icon>,
          error: <Icon src={DangerPNG}></Icon>,
          warning: <Icon src={DangerPNG}></Icon>,
          info: <Icon src={InfoPNG}></Icon>,
        }}
        action={(key) => <Dismiss onClick={onClickDismiss(key)}>x</Dismiss>}
        maxSnack={3}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ref={notistackRef}
      >
        <Router history={AppHistory}>
          <Switch>
            <Route
              exact
              path={baseRouteUrl + "/joingame/:type/:params"}
              component={JoinGame}
            />
            <Route
              exact
              path={baseRouteUrl + "/joinlobbygame/:type/:params"}
              component={JoinLobbyGame}
            />
            <Route
              path={baseRouteUrl + "/"}
              render={(props) => (isMobile ? <Wap /> : <Web />)}
            />
            <Redirect to={"/zh-CN/"} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
};

ReactDOM.render(<AppWrapper></AppWrapper>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
