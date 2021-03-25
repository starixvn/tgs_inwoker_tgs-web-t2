import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import SportsBGNewPNG from "../../../assets/images/sportsbook/sports-bg.png";
// import PinnaclePNG from "../../../assets/images/sportsbook/pinnacle.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import StartGamePNG from "../../../assets/images/start-game.png";
import StartGameHoverPNG from "../../../assets/images/start-game-hover.png";


import MiddleSoccer from "../../../assets/images/sportsbook/middleman.png";
import LeftSoccer from "../../../assets/images/sportsbook/leftman.png";
import RightSoccer from "../../../assets/images/sportsbook/rightman.png";
import MiddleText from "../../../assets/images/sportsbook/middletext.png";


import { SHOW_LOGIN } from "../../../constants/actionType";
import i18n from "../../../utils/i18n";
import { GameTypeEnum } from "../../../utils/Enum";
import CommonMarquee from "../CommonMarquee";
import Left from "../../../assets/images/arrow-left.svg";
import Right from "../../../assets/images/arrow-right.svg";

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
  height: 750px;
  position: relative;
  background: url(${SportsBGNewPNG}) no-repeat center;
  background-size: auto 100%;
  overflow: visible;
`;

const GameName = styled.div`
position:absolute;
width:254px;
height:47px;
top: 180px;
${props => props.index === 0 ? `right:10px;` : ``}
background: url(${(props) =>
    `${process.env.PUBLIC_URL}/assets/images/${i18n.language}/sports-${props.abbreviation.toLowerCase()}.png`}) no-repeat;
    background-position:center;
`
const ButtonJoin = styled.div`
  background: url(${StartGamePNG}) no-repeat;
  width: 168px;
  height: 41px;
  &:hover {
    cursor: pointer;
    background: url(${StartGameHoverPNG}) no-repeat;

  }
  color: #fff;
  font-size: 17px;
  padding: 0px 50px 0px 5px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  bottom: 70px;
  transform: scale(1.5);
  left: 125px;
  opacity:0;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.active
      ? `
      opacity: 1;
    `
      : `
    `}
`;
const CarouselContainer = styled(Carousel)`
  background: none;
  height: 700px;
  overflow: visible;
`;
const GameSlideContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
  height: 750px;
  overflow: visible;
`;
const ImageContainer = styled.div`
  width: 400px;
  height: 700px;
  position: relative;
  overflow: visible;
  cursor: pointer;
  margin: 0 auto;
`;
const SportSlideImage = styled.img`
  position: absolute;
  top: 20px;
  left: -50px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.5s linear;
  width: 500px!important;
  animation: ${(props) =>
    props.active
      ? css`
      ${floatKeyframe} 4s linear 0s infinite;
        `
      : css`
        `};
  ${(props) =>
    props.active
      ? `
      filter: grayscale(0%);
      transform: scale(1.2);
      top: 140px;
      transition: transform 0.5s ease-in,filter 0.5s ease-in;
      z-index: 5;
    `
      : `
      filter: grayscale(100%);
      transform: scale(0.95);
    `}
`;
const ArrowButton = styled.a`
  margin-left: calc(50%);
  opacity: 0.7;
  background-color: #86858247;
  height: 330px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content:center;
`;

const ArrowContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0 !important;
  height: 630px;
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
class Sports extends Component {
  constructor(props) {
    super(props);

    var sportsList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.SPORTS;
    });

    this.state = {
      selected: sportsList[0],
      slideIndex:0,
      list: sportsList,
    };
  }

  componentDidMount() { 
    //test for fake input
    var sportList=[
      {
        name: "yy", 
        abbreviation:"yy"
      },
      {
        name: "sbo", 
        abbreviation:"sbo"
      },
      {
        name: "asub", 
        abbreviation:"asub"
      },
     
    ]
    this.setState(
      {
        list: sportList
      })
  }
  componentDidUpdate(preProps, preStates) {
    // if (
    //   preProps.game.homePageGameList.length !==
    //   this.props.game.homePageGameList.length
    // ) {
    //   var sportsList = this.props.game.homePageGameList.filter((item) => {
    //     return item.type == GameTypeEnum.SPORTS;
    //   });
      
    //   this.setState({
    //     ...this.state,
    //     selected: sportsList[0],

    //     list: sportsList,
    //   });
    // }
  }
  handleJoinGameClick = (params) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    }
    else{
      this.props.history.push(
        "/" + i18n.language + "/sports/play/" + params
      );
    }
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
    centerSlidePercentage:listSize>2?100/3:100/listSize,
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
                          <SportSlideImage src={process.env.PUBLIC_URL+"/assets/images/pcGamePage/sports/"+data.abbreviation.toLowerCase()+".png"} active={this.state.slideIndex===index}></SportSlideImage> 
                          <ButtonJoin
                            active={this.state.slideIndex===index}
                            onClick={() => this.handleJoinGameClick(data.abbreviation)}
                          >
                            {i18n.t("common.startGame")}
                          </ButtonJoin>
                        </ImageContainer>
                      </React.Fragment>
                    );
                  })}
              </CarouselContainer>
        </GameSlideContainer>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sports));
