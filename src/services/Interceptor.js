import axios from "axios";
import { UNAUTHORIZE } from "../constants/actionType";
import { AppHistory } from "../history/History";
import i18n from "../utils/i18n";
import Promise from "promise-polyfill";
export default {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.request.use(
      function (config) {

        const client = localStorage.getItem("client-token");
        if (client != null && client != "") {
          config.headers["Authorization"] = "bearer " + client;
        }

        const token = localStorage.getItem("token");
        if (token != null && token != "") {
          config.headers["Token"] = token;
        }
        config.headers["Content-Type"] = "application/json";

        config.headers["Accept-Language"] = localStorage.getItem("i18nextLng");

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        var newResponse = {
          IsSuccess: false,
          info: response.data.errmsg,
          code: response.data.err,
          data: response.data.data ? response.data.data : {}
        }
        if (response.data.url) {
          newResponse.data.url = response.data.url

        }
        if (response.data.items) {
          newResponse.data = response.data
          newResponse.IsSuccess = true;
        }
        if (response.data.token) {
          newResponse.data.token = response.data.token
        }
        if (newResponse.code === 0) {
          newResponse.IsSuccess = true;


        } else if (newResponse.code === 102 || newResponse.code === 101 || newResponse.code === 401) {
          localStorage.removeItem("token");
          store.dispatch({ type: UNAUTHORIZE });

          AppHistory.replace("/" + i18n.language + "/");
        }

        return newResponse;
      },
      function (error) {
        //if user login platform wrong or token expired
        if (error.response.data.err == 102 || error.response.data.err == 101 || error.response.data.err == 401 || error.response.data.errmsg === "request platform is not matched with player login platform.") {
          localStorage.removeItem("token");
          store.dispatch({ type: UNAUTHORIZE });

          AppHistory.replace("/" + i18n.language + "/");
        }
        return {
          IsSuccess: false,
          info: error.response.data.errmsg,
          code: error.response.data.err,
          data: {},
        };
      }
    );
  },
};
