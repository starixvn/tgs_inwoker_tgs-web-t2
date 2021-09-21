import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import { SHOW_LOGIN, GameTypeEnum } from "@Inwoker/tgs-api";

import LotteryBGNewPNG from "../../../assets/images/lottery/lottery-bg-new.png";

import _633Lottery from "../../../assets/images/lottery/633-lotteryball.png";
import _633Description from "../../../assets/images/lottery/633-lotterydescription.png";

import i18n from "../../../utils/i18n";
import CommonMarquee from "../CommonMarquee";
import ScrollAnimation from "react-animate-on-scroll";
import config from "../../../config/config";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 870px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/pcGamePage/lottery/background.jpg)
    no-repeat center;
`;

const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;
const RightSlide = styled(ScrollAnimation)`
  display: flex;
`;
const ItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
`;
class Lottery extends Component {
  constructor(props) {
    super(props);

    var lotteryList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.LOTTERY;
    });

    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var lotteryList = this.props.game.homePageGameList.filter((item) => {
        return item.type == GameTypeEnum.LOTTERY;
      });

      this.setState({
        ...this.state,
        selected: lotteryList[0],

        list: lotteryList,
      });
    }
  }
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LOTTERYLOBBY +
          "/" +
          params.toUpperCase(),
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <ItemContainer style={{ marginTop: 370 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list
              .slice(0, 3)
              .reverse()
              .filter((a) => {
                if (a.abbreviation.includes("TCG")) {
                  switch (config.currency) {
                    case "CNY":
                      return (
                        a.abbreviation === "TCG_LOTTO" ||
                        a.abbreviation === "TCG_SEA"
                      );
                    case "VND":
                      return (
                        a.abbreviation === "TCG_LOTTO_VN" ||
                        a.abbreviation === "TCG_SEA"
                      );
                    default:
                      return a.abbreviation === "TCG_SEA";
                  }
                } else {
                  return a;
                }
              })
              .map((item, index) => {
                return (
                  <GirlImage
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/lottery/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation, item.type);
                    }}
                  />
                );
              })}
          </LeftSlide>
        </ItemContainer>
        <ItemContainer style={{ marginTop: 560 }}>
          <RightSlide
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list
              .filter((a) => {
                if (a.abbreviation.includes("TCG")) {
                  switch (config.currency) {
                    case "CNY":
                      return (
                        a.abbreviation === "TCG_LOTTO" ||
                        a.abbreviation === "TCG_SEA"
                      );
                    case "VND":
                      return (
                        a.abbreviation === "TCG_LOTTO_VN" ||
                        a.abbreviation === "TCG_SEA"
                      );
                    default:
                      return a.abbreviation === "TCG_SEA";
                  }
                } else {
                  return a;
                }
              })
              .map((item, index) => {
                if (index >= 3) {
                  return (
                    <GirlImage
                      style={{ float: "left" }}
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/lottery/" +
                        item.abbreviation.toLowerCase() +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation, item.type);
                      }}
                    />
                  );
                }
              })}
          </RightSlide>
        </ItemContainer>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
