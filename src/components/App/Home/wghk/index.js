import React from "react";
import { connect } from "react-redux";
import { SHOW_LOGIN } from "../../../../api-services/constant/actionType";
import Marquee from "../Marquee";
import ShowGame from "./game";
import Landing from "./landing";
import styled from "styled-components";

const MarqueeContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  background: #b4b4b4;
  justify-content: center;
`;

const MarqueeContent = styled.div`
  width: 1280px;
  display: flex;
  color: #fff;
`;

const TheSpeaker = styled.div`
  color: #fff;

  transform: rotate(180deg);
  z-index: 3;
`;

const TheMarqueeHolder = styled.div`
  padding-left: 40px;
  width: 100%;
`;

const WGHKHome = (props) => {
  return (
    <>
      <MarqueeContainer>
        <MarqueeContent>
          <TheSpeaker>🕪</TheSpeaker>
          <TheMarqueeHolder>
            <marquee>123123</marquee>
          </TheMarqueeHolder>
        </MarqueeContent>
      </MarqueeContainer>

      {props.token ? (
        <ShowGame token={props.token} />
      ) : (
        <Landing showLogin={props.showLogin} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
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
