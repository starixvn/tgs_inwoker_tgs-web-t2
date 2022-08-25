import React from "react";
import { connect } from "react-redux";
import { SHOW_LOGIN } from "../../../../api-services/constant/actionType";
import ShowGame from "./game";
import Landing from "./landing";

const WGHKHome = (props) => {
  return props.token ? (
    <ShowGame token={props.token} />
  ) : (
    <Landing showLogin={props.showLogin} />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WGHKHome);
