import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import { SHOW_LOGIN } from "../../../constants/actionType";

import LotteryBGNewPNG from "../../../assets/images/lottery/lottery-bg-new.png";

import BtnJoinPNG from "../../../assets/images/btn-join.png";
import BtnJoinHoverPNG from "../../../assets/images/btn-join-hover.png";
import _633Lottery from "../../../assets/images/lottery/633-lotteryball.png";
import _633Description from "../../../assets/images/lottery/633-lotterydescription.png";
import { GameTypeEnum } from "../../../utils/Enum";
import i18n from "../../../utils/i18n";
import CommonMarquee from "../CommonMarquee";
import ScrollAnimation from 'react-animate-on-scroll';

export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 670px;
  position: relative;
  background: url(${LotteryBGNewPNG}) no-repeat center;
  background-size: auto 100%;
  overflow: visible;
`;

const leftRightLeft = keyframes`
from  {
  -webkit-transform:translate3d(-30px,0,0);
  opacity:0;
  transform:translate3d(-30px,0,0);
 
}
to{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);
}
  `;
const leftRightLeftHide = keyframes`
  from{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0);
  }
  to{
    -webkit-transform:translate3d(-30px,0,0);
    opacity:0;
    transform:translate3d(-30px,0,0);
  }
    `;

const rightLeftRight = keyframes`
from{
  -webkit-transform:translate3d(30px,0,0);
  opacity:0;
  transform:translate3d(30px,0,0);

}
to{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);

}
  `;
const rightLeftRightHide = keyframes`
  from{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0)
;
  }
  to{
    -webkit-transform:translate3d(30px,0,0);
    opacity:0;
    transform:translate3d(30px,0,0);
  }
    `;
    
  const Tabheader = styled.div`
     width: 1080px;
     margin: 0 auto;
     text-align: center;
`;
const TabContainer = styled.div`
  z-index: 3;
  background-color: #76727252;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1080px;
  margin: 5px auto;
  position: relative;
  text-align: center;
  display: inline-block;
`;

const ButtonTab = styled.button`
  width: 170px;
  border: none;
  height: 50px;
  outline: none;
  float: left;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 25px;
  background-color: transparent;
  margin: 8px 5px;
  transition: background-color 0.5s ease;
  padding: 5px;
  ${(props) => {
    if (props.selected === true) {
      return `border: 2px solid #ebc468;
        background-color: #8a7f73;

      `;
    } else {
      return ` &:hover {
        cursor: pointer;
        border: 2px solid #ebc468;
        background-color: #8a7f73;
      }
     `;
    }
  }}
`;
const ButtonIcon = styled.div`
  background: url(${(props) =>
    `${process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/right/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center;
  background-size: contain;
  height: 100%;
  width: 100%;
  background-position-y: 5px;
`;
const MenuIcon = styled.div`
  background: url(${(props) =>
    `${process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/right/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center;
  background-size: contain;
  height: 105px;
  width: 300px;
  position: absolute;
  bottom: 210px;
  left: 85px;
`;
const LotteryContainer = styled.div`
  position: relative;
  width: 1080px;
  height: 400px;
  height: 325px;
  margin: 375px auto 0 auto;
  overflow: visible;
`;
const Model = styled.img`
  width: 295px;
  height: 447px;
  position: absolute;
  right: 50px;
  bottom: -319px;
`;
const Element = styled.img`
  width: 455px;
  height: 260px;
  position: absolute;
  right: -30px;
  bottom: -220px;
  animation: ${floatKeyframe} 4s linear 0s infinite;
`;
const LotteryGames = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  transition: animation 1s;
  background: url(${(props) =>
    `${process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/left/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center bottom;

  ${(props) =>
    props.index === 0
      ? ""
      : props.loaded
        ? `
          visibility:hidden;
          `
        : `
        visibility:visible;
          `}
  animation: ${(props) =>
    props.transition
      ? css`
          ${leftRightLeft} 1000ms   forwards;
        `
      : css`
          ${leftRightLeftHide} 800ms   forwards;
        `};
`;

const ButtonJoin = styled.div`
  background-color:#322e2a;
  width: 180px;
  height: 50px;
  position: absolute;
  bottom: 80px;
  z-index: 10;
  left: 150px;
  border-radius: 25px;
  border: 2px solid transparent;
  &:hover {
    cursor: pointer;
  }
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height:45px;
 
`;
const LiveGameDescription = styled.div`
  width: 420px
  position: absolute;
  color: #000;
  font-size: 16px;
  text-align: left;
  bottom: 150px;
  left: 70px;
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
    //test for lottery
    var qipaiList=[
      { 
        id: 1,
        name: "bg", 
        abbreviation:"bg"
      },
      {
        id: 2,
        name: "km", 
        abbreviation:"km"
      },
      {
        id: 3,
        name: "vr", 
        abbreviation:"vr"
      },
    ]
    this.setState(
      {
        selected: qipaiList[0],
        list: qipaiList
      })
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
    if (this.props.account.token) {
      this.props.history.push(
        "/" + i18n.language + "/lottery/play/" + JSON.stringify(params)
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
         <CommonMarquee></CommonMarquee>
        {this.state.list.length > 1 ? (
          <Tabheader>
            <TabContainer>
              {this.state.list.map((data, index) => {
                return (
                  <ButtonTab
                    key={index}
                    onClick={() => {
                      this.handleGameChange(data);
                    }}
                    selected={this.state.selected.id === data.id}
                  >
                  <ButtonIcon abbreviation={data.abbreviation}></ButtonIcon>
                  </ButtonTab>
                );
              })}
            </TabContainer>
          </Tabheader>
        ) : null}

        {this.state.list.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <LotteryGames
                abbreviation={data.abbreviation}
                index={index}
                loaded={this.state.hide}
                transition={
                  this.state.selected.abbreviation === data.abbreviation
                }
                onAnimationEnd={() =>
                  this.setState({ ...this.state, loaded: true })
                }
              >
                <LotteryContainer>
                  <MenuIcon abbreviation={data.abbreviation}></MenuIcon>
                  <LiveGameDescription
                    game={this.state.selected}
                  >{i18n.t(`web.lotteryGame.${this.state.selected.abbreviation.toLowerCase()}Desc`)}</LiveGameDescription>
                   <ScrollAnimation animateIn='fadeInRight' duration={1} animateOnce={true} style={{overflow: "visible"}}>
                    <Model src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/lottery/left/"+data.abbreviation.toLowerCase()+"-model.png"}></Model>
                    <Element src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/lottery/left/"+data.abbreviation.toLowerCase()+"-element.png"}></Element>
                  </ScrollAnimation>
                  <ButtonJoin
                      onClick={() => this.handleJoinGameClick(data.params)}
                    >
                    {i18n.t("common.startGame")}
                  </ButtonJoin>
                </LotteryContainer>
              </LotteryGames>
            </React.Fragment>
          );
        })}
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
