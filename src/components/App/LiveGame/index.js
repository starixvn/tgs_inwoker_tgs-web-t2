import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import LiveBgNewJPG from "../../../assets/images/live/live-bg-new.png";
import Left from "../../../assets/images/arrow-left.svg";
import Right from "../../../assets/images/arrow-right.svg";

import i18n from "../../../utils/i18n";

import { GameTypeEnum } from "../../../utils/Enum";

import { SHOW_LOGIN } from "../../../constants/actionType";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import ImgBtnPng from "../../../assets/images/live-btn.png";
import BtnBackGround from "../../../assets/images/live-btn-bg.png";
import LiveDice from "../../../assets/images/live-dice.png";

import CommonMarquee from "../CommonMarquee";

export const moveFromLeftIcon = keyframes`
  from {
    -webkit-transform: translateX(-320%); }
  to {
    -webkit-transform: translateX(0%); }
`;

export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
  background: url(${LiveBgNewJPG}) no-repeat center;
  background-size: auto 100%;
`;


const ButtonIcon = styled.div`
  background: url(${(props) =>
  `${process.env.PUBLIC_URL}/assets/images/pcGamePage/live/right/${props.abbreviation.toLowerCase()}.png`})
  no-repeat center;
  width: 100px;
  height: 75px;
  background-size: contain;
  position: absolute;
  left: 68px;
  top: 70px;
  &:hover {
   transition: transform 0.8s;
   transform: rotateY(360deg);
   }

`;
const ButtonJoin = styled.div`
  background: url(${ImgBtnPng}) no-repeat center;
  width: 236px;
  height: 200px;
  width: 236px;
  position: absolute;
  left: -25px;
  bottom: 85px;
  z-index: 20;
  transition: all 0.5s linear;
  
  ${(props) =>
    props.active
      ? `
      filter: grayscale(50%);
      transition: transform 0.5s ease-in,filter 0.5s ease-in;
      transform: scale(1);
      &:hover {
        cursor: pointer;
        filter: grayscale(0%);
        transform:scale(1.05)
      }
    `
      : `
      filter: grayscale(100%);
      transform: scale(0.65);
      bottom: 30px;
    `}
`;
const CarouselContainer = styled(Carousel)`
  background: none;
  height: 650px;
  overflow: visible;
`;
const GameSlideContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
  height: 650px;
  overflow: visible;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 650px;
  position: relative;
  overflow: visible;
  cursor: pointer;
  margin: 0 auto;
`;
const SportSlideImage = styled.img`
  position: absolute;
  cursor: pointer;
  left: -20px;
  top:150px;
  z-index: 2;
  transition: all 0.5s linear;
  transform: scale(2);
  ${(props) =>
    props.active
      ? `
      filter: grayscale(0%);
      transition: transform 0.5s ease-in,filter 0.5s ease-in;
      z-index: 5;
    `
      : `
      filter: grayscale(100%);
    `}
`;
const ButtonDecoration = styled.img`
  position: absolute;
  width: 400px!important;
  position: absolute;
  bottom: 200px;
  left: -115px;
  animation: ${floatKeyframe} 3s linear 0s infinite;
  display:none!important;
  z-index:21;
  ${(props) =>
    props.active
      ? `
        display:block!important;
    `
      : `
    `}
`;
const ButtonBg = styled.div`
  margin: 0 auto;
  width: 1300px;
  height: 200px;
  background: url(${BtnBackGround}) no-repeat center;
  position: absolute;
  bottom: 90px;
  overflow: visible;
  bottom: 25px;
  left: -548px;
  z-index: 19;
  background-size: 75% auto;
`;
const ArrowButton = styled.a`
  margin-left: calc(50%);
  opacity: 0.7;
  background-color: #86858247;
  height: 225px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content:center;
`;

const ArrowContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0 !important;
  height: 590px;
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
class LiveGame extends Component {
  constructor(props) {
    super(props);

    var liveList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.LIVE;
    });

    this.state = {
      selected: liveList[0],
      subMenu: null,
      isSelected: false,
      hide: true,
      list: liveList,
      slideIndex:0,
    };
  }
  componentDidMount() {
    //test for fake input
    var liveList=[
      {
        name: "ab", 
        abbreviation:"ab"
      },
      {
        name: "bg", 
        abbreviation:"bg"
      },
      {
        name: "sa", 
        abbreviation:"sa"
      },
      {
        name: "vg", 
        abbreviation:"vg"
      },
      {
        name: "wm", 
        abbreviation:"wm"
      }
    ]
    this.setState(
      {
        list: liveList
      }
    )
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    // if (
    //   preProps.game.homePageGameList.length !==
    //   this.props.game.homePageGameList.length
    // ) {
    //   var liveList = this.props.game.homePageGameList.filter((item) => {
    //     return item.type === GameTypeEnum.LIVE;
    //   });
    //   this.setState({
    //     ...this.state,
    //     selected: liveList[0],
    //     list: liveList,
    //   });
    // }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
    setTimeout(() => {
      this.triggerSetSelected(false);
    }, 800);
  };
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      window.open(
        "/" +
        i18n.language +
        "/joingame/" +
        GameTypeEnum.LIVE +
        "/" +
        JSON.stringify(this.state.selected.params),
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
    getConfigurableProps = (listSize) => ({
      showArrows: true,
      showStatus: false,
      showIndicators: false,
      infiniteLoop: false,
      showThumbs: false,
      autoPlay: false,
      stopOnHover: true,
      dynamicHeight: false,
      emulateTouch: false,
      autoFocus: false,
      thumbWidth: false,
      selectedItem: false,
      transitionTime: 500,
      centerMode: true,
      swipeScrollTolerance: 5,
      centerSlidePercentage:listSize>4?100/5:100/listSize,
      onClickItem:(index)=>{
          this.setState({
              slideIndex: index
          })
      },
      onChange:(index)=>{
          this.setState({
              slideIndex: index
          })
        }
    });

  render() {
    return (
      <Container>
         <CommonMarquee></CommonMarquee>
         <GameSlideContainer>
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
                        <ImageContainer>
                          <SportSlideImage src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/live/left/"+data.abbreviation.toLowerCase()+".png"} active={this.state.slideIndex===index}></SportSlideImage> 
                          <ButtonDecoration 
                                  src={LiveDice}
                                  active={this.state.slideIndex===index}
                          ></ButtonDecoration>
                          <ButtonBg></ButtonBg>
                          <ButtonJoin
                            active={this.state.slideIndex===index}
                            onClick={() => this.handleJoinGameClick(data.abbreviation)}
                          >
                           <ButtonIcon abbreviation={data.abbreviation}></ButtonIcon>
                          </ButtonJoin>
                        </ImageContainer>
                      </React.Fragment>
                    );
                  })}
              </CarouselContainer>
        </GameSlideContainer>
        {/* <TabContainer>
          {this.state.list.map((data, index) => {
            return (
              <ButtonTab
                key={index}
                onClick={() => {
                  this.handleGameChange(data);
                  this.triggerSetSelected(true);
                }}
                selected={this.state.selected.id === data.id}
              >
                {data.name}
              </ButtonTab>
            );
          })}

        </TabContainer>
        {this.state.list.map((data, index) => {
          return (
            <div key={index}>
              <LiveGameGirl
                abbreviation={data.abbreviation}
                index={index}
                loaded={this.state.hide}
                transition={
                  this.state.selected.abbreviation === data.abbreviation
                }
                onAnimationEnd={() =>
                  this.setState({ ...this.state, loaded: true })
                }
              ></LiveGameGirl>
              <RightContainer
                abbreviation={data.abbreviation}
                loaded={this.state.hide}
                index={index}
                transition={
                  this.state.selected.abbreviation === data.abbreviation
                }
              >
                <LiveGameDescription
                  game={this.state.selected.abbreviation}
                >{i18n.t(`web.liveGame.${this.state.selected.abbreviation.toLowerCase()}Desc`)}</LiveGameDescription>

                <ButtonJoin
                  onClick={() =>
                    this.handleJoinGameClick(this.state.selected.params)
                  }
                >
                  {i18n.t("common.startGame")}
                </ButtonJoin>
              </RightContainer>
            </div>
          );
        })} */}

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
export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
