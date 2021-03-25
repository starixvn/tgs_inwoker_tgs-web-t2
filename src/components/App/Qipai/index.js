import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import Common from "../../../utils/Common";
import QipaiBGNewPNG from "../../../assets/images/qipai/qipai-bg-new.png";

import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";
import BtnJoinQipaiPNG from "../../../assets/images/btn-join-qipai.png";
import BtnJoinQipaiHoverPNG from "../../../assets/images/btn-join-qipai-hover.png";


import { SHOW_LOGIN } from "../../../constants/actionType";


import _633SelectedPNG from "../../../assets/images/qipai/633-selectedv2.png";

import { GameTypeEnum } from "../../../utils/Enum";
import i18n from "../../../utils/i18n";
import CommonMarquee from "../CommonMarquee";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Left from "../../../assets/images/arrow-left.svg";
import Right from "../../../assets/images/arrow-right.svg";
import ScrollAnimation from 'react-animate-on-scroll';

const Container = styled.div`
  width: 100%;
  height: 650px;
  position: relative;
  background: url(${QipaiBGNewPNG}) no-repeat center;
  background-size: auto 100%;
  overflow: visible;
`;
const GameContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const LeftContainer = styled.div`
  float: left;
  width: 875px;
  margin-top: 50px;
`;
const RightSideContainer = styled.div`
  float: left;
  width: 395px;
  height: 480px;
  overflow: visible;
  position: relative;
  margin-top: 50px;
`;
const rightLeftRightFirst = keyframes`
0%{
  -webkit-transform:translate3d(30px,0,0);
  opacity:0;
  transform:translate3d(30px,0,0);

}
100%{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);

}
  `;
const rightLeftRight = keyframes`
0%{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);
}
50%{
  -webkit-transform:translate3d(30px,0,0);
  opacity:0;
  transform:translate3d(30px,0,0);

}
100%{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);

}
  `;
const rightLeftRightHide = keyframes`
  0%{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0);
  }
  50%{
    -webkit-transform:translate3d(30px,0,0);
    opacity:0;
    transform:translate3d(30px,0,0);
    display:none;
  }
  100%{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0);
  }
    `;

const QipaiMascot = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  transition: animation 1s;
  pointer-events: none;
`;

const ButtonJoin = styled.div`
  background: url(${BtnJoinQipaiPNG}) no-repeat;
  width: 194px;
  height: 66px;
  position: absolute;
  bottom: 50px;
  bottom: 150px;
  left: 100px;
  color: #000;
  &:hover {
    cursor: pointer;
    background: url(${BtnJoinQipaiHoverPNG}) no-repeat;
    color: #fff;
  }
  font-size: 30px;

  text-shadow: #000;
  font-weight: bold;
  text-align: center;

  line-height:64px;
`;

const LiveGameDescription = styled.div`
height: 100%;
width: 280px;
position: absolute;
top: 145px;
left: 60px;
color: #8a7f73;
font-size: 17px;
font-weight: 600;
text-align: center;
`;

const RightContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  animation: ${(props) =>
    props.first?
    css`
          ${rightLeftRightFirst} 800ms   forwards;
        `
    :
    props.transition
      ? css`
          ${rightLeftRight} 1000ms   forwards;
        `
      : css`
          ${rightLeftRightHide} 1000ms   forwards;
        `};
`;

const LogoImg = styled.img`
  width: 250px;
  position: absolute;
  left: 55px;
`;

const CarouselContainer = styled(Carousel)`
background: none;
margin: 8px 0px;
height: 420px;
width: 100%;
overflow: visible;
`;
const KYHotGameTitle = styled.div`
  position: absolute;
  bottom: 120px;
  left: -10px;
  width: 100%;
  text-align: center;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  z-index: 8;
`;
const ImageContainer = styled.div`
clip-path: polygon(15% 0,100% 0%,80% 120%,-2% 96%);
width: 275px;
height:500px;
cursor: pointer;
position: relative;
overflow-y: visible;
cursor: pointer;
display:flex;
justify-content: center;
aligin-item: center;
${(props) =>
  props.active
    ? `
   z-index:2;
  `
    : `
  `}
`;

const KYHotGame = styled.img`
  height: 400px!important;
  ${(props) =>
    props.active
      ? `
      filter: grayscale(0%);
      transition: transform 0.5s ease-in,filter 0.5s ease-in;
    `
      : `
      filter: grayscale(100%);
    `}
`;
const ArrowButton = styled.a`
  margin-left: calc(50%);
  opacity: 0.7;
  background-color: #86858247;
  height: 100px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content:center;
`;

const ArrowContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0 !important;
  height: 100%;
  width: 9.5%;

  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${ArrowButton} {
      opacity: 1;
    }
  }
`;

const LeftArrowButton = styled(ArrowButton)`
`;

const RightArrowButton = styled(ArrowButton)``;

const LeftArrowContainer = styled(ArrowContainer)`
  left: 0;
  display: flex;
`;

const RightArrowContainer = styled(ArrowContainer)`
  right: 0;

`;

const ArrowIcon = styled.img`
  width: 20px!important;
`;
class Qipai extends Component {
  constructor(props) {
    super(props);

    var qipaiList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.QIPAI;
    });

    this.state = {
      selected: qipaiList[0],
      subMenu: null,
      trigger: true,
      list: qipaiList,
      selectedIndex: 0,
      first: true
    };
  }
  componentDidMount() {
    //test for fake input
    var qipaiList=[
      { 
        id: 1,
        name: "开元棋牌", 
        abbreviation:"ky"
      },
      {
        id: 2,
        name: "AS棋牌", 
        abbreviation:"as"
      },
      {
        id: 3,
        name: "AP棋牌", 
        abbreviation:"ap"
      },
    ]
    this.setState(
      {
        selected: qipaiList[0],
        list: qipaiList
      })
  }
  componentDidUpdate(preProps, preStates) {
    // if (
    //   preProps.game.homePageGameList.length !==
    //   this.props.game.homePageGameList.length
    // ) {
    //   var qipaiList = this.props.game.homePageGameList.filter((item) => {
    //     return item.type == GameTypeEnum.QIPAI;
    //   });

    //   this.setState({
    //     ...this.state,
    //     selected: qipaiList[0],

    //     list: qipaiList,
    //   });
    // }
  }

  handleJoinGameClick = (kind) => {
    if (this.props.token) {
      Common.PopupCenter(
        "/" +
        i18n.language +
        "/joingame/" +
        GameTypeEnum.QIPAI +
        "/" +
        JSON.stringify(this.state.selected.params),
        1280,
        720
      );
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (index) => {
    var gameSelected = this.state.list.filter(function(el) {
      return el.id === index;
    });
    this.setState({
      selected: gameSelected[0],

    });
  };
  getConfigurableProps = (listSize) => ({
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: false,
    showThumbs: false,
    autoPlay: false,
    stopOnHover: true,
    swipeable: false,
    dynamicHeight: false,
    emulateTouch: true,
    autoFocus: false,
    thumbWidth: true,
    selectedItem: true,
    transitionTime: 500,
    selectedItem: 0,
    centerMode: true,
    swipeScrollTolerance: 5,
    centerSlidePercentage:listSize>3?100/4:100/listSize,
    onClickItem:(index)=>{
        this.setState({
          trigger:  !this.state.trigger,
          selectedIndex: index,
          first: false,
        })
        this.handleGameChange(index+1)
  },
  onChange:(index)=>{
      this.setState({
        trigger:  !this.state.trigger,
        selectedIndex: index,
        first: false,
      })
      this.handleGameChange(index+1)
    }
});
  
  render() {
    return (
      <Container>
        <CommonMarquee></CommonMarquee>
        <GameContainer>
          <LeftContainer>
          <ScrollAnimation animateIn='fadeInLeft' duration={2} animateOnce={true} style={{overflow: "visible"}}>
            <CarouselContainer
                {...this.getConfigurableProps(this.state.list.length)}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <LeftArrowContainer onClick={onClickHandler}>
                      <LeftArrowButton>
                        <ArrowIcon src={Left} />
                      </LeftArrowButton>
                    </LeftArrowContainer>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <RightArrowContainer onClick={onClickHandler}>
                      <RightArrowButton>
                        <ArrowIcon src={Right} />
                      </RightArrowButton>
                    </RightArrowContainer>
                  )
                }
              >
                {this.state.list.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ImageContainer active={this.state.selectedIndex===index}>
                          <KYHotGameTitle>{data.name}</KYHotGameTitle>
                            <KYHotGame src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/qipai/left/"+data.abbreviation.toLowerCase()+".png"} active={this.state.selectedIndex===index}></KYHotGame>
                    </ImageContainer>
                      </React.Fragment>
                    );
                  })}
              </CarouselContainer>
              </ScrollAnimation>
            </LeftContainer>
            <RightSideContainer>
            {this.state.list.length>0?
            <>
            <RightContainer
                  transition={this.state.trigger}
                  first={this.state.first}
                >
                   <LogoImg src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/qipai/right/"+this.state.selected.abbreviation.toLowerCase()+".png"} ></LogoImg>
                  <LiveGameDescription
                  >
                    {i18n.t(`web.chessGame.${this.state.selected.abbreviation.toLowerCase()}Desc`)}</LiveGameDescription>
                  <ButtonJoin
                    onClick={() =>
                      this.handleJoinGameClick(this.state.selected.params)
                    }
                  >
                    {i18n.t("common.startGame")}
                  </ButtonJoin>
                </RightContainer>
                </>:<></>
            }
            </RightSideContainer>
            </GameContainer>
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
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);

