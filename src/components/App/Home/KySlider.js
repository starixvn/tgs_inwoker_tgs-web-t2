import React from "react";
import styled, { keyframes } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import KyHotGame1PNG from "../../../assets/images/ky-hotgame1.png";
import KyHotGame2PNG from "../../../assets/images/ky-hotgame2.png";
import KyHotGame3PNG from "../../../assets/images/ky-hotgame3.png";
import { GameTypeEnum } from "../../../utils/Enum";

export default function KySlider(props) {
  
  const getConfigurableProps = () => ({
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
    centerMode: true,
    swipeScrollTolerance: 5,
    centerSlidePercentage:100/4
  });
  
  const CarouselContainer = styled(Carousel)`
  background: none;
  margin: 8px 0px;
  height: 400px;
  width: 100%;
  overflow:visible;
`;
const KYHotGameTitle = styled.div`
  width:100%;
  height: 200px;
  background-color: #f9f9f9;
  height: 60px;
  border-bottom: 5px solid #8a7f73;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 600;
  color: #8a7f73;
  line-height: 55px;
`;
const AGSlideContainer = styled.div`
  height:400px;
  cursor: pointer;
  &:hover ${KYHotGameTitle} {
    border-bottom: 5px solid #f0ca83;
    color: #f0ca83;
  }
`;
const KyGameContainer = styled.div`
    position: absolute;
`;
const KYHotGame = styled.img`
  width:500px;
`;
  return (
        <CarouselContainer
            {...getConfigurableProps()}
          >
                <AGSlideContainer>
                    <KyGameContainer style={{bottom:"0px"}} 
                        onClick={() =>
                            props.handleJoinGameClick(
                                GameTypeEnum.QIPAI,
                                {
                                "KindID": "830",
                                "game_platform_id": 26
                                }
                            )}
                    >
                        <KYHotGame src={KyHotGame1PNG}></KYHotGame>
                        <KYHotGameTitle>抢庄牛牛</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
                <AGSlideContainer>
                    <KyGameContainer style={{bottom:"50px"}} 
                            onClick={() =>
                                props.handleJoinGameClick(
                                    GameTypeEnum.QIPAI,
                                    {
                                    "KindID": "910",
                                    "game_platform_id": 26
                                    }
                                )}
                        >
                        <KYHotGame src={KyHotGame2PNG}></KYHotGame>
                        <KYHotGameTitle>百家乐</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
                <AGSlideContainer>
                    <KyGameContainer style={{bottom:"0px"}} 
                            onClick={() =>
                                props.handleJoinGameClick(
                                    GameTypeEnum.QIPAI,
                                    {
                                    "KindID": "220",
                                    "game_platform_id": 26
                                    }
                                )}
                        >
                        <KYHotGame src={KyHotGame3PNG}></KYHotGame>
                        <KYHotGameTitle>炸金花</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
                <AGSlideContainer>
                        <KyGameContainer style={{bottom:"50px"}} 
                            onClick={() =>
                                props.handleJoinGameClick(
                                    GameTypeEnum.QIPAI,
                                    {
                                    "KindID": "630",
                                    "game_platform_id": 26
                                    }
                                )}
                        >
                        <KYHotGame src={KyHotGame2PNG}></KYHotGame>
                        <KYHotGameTitle>十三水</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
                <AGSlideContainer>
                    <KyGameContainer style={{bottom:"0px"}} 
                            onClick={() =>
                                props.handleJoinGameClick(
                                    GameTypeEnum.QIPAI,
                                    {
                                    "KindID": "900",
                                    "game_platform_id": 26
                                    }
                                )}
                        >
                        <KYHotGame src={KyHotGame1PNG}></KYHotGame>
                        <KYHotGameTitle>押庄老虎</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
                <AGSlideContainer>
                    <KyGameContainer style={{bottom:"50px"}} 
                            onClick={() =>
                                props.handleJoinGameClick(
                                    GameTypeEnum.QIPAI,
                                    {
                                    "KindID": "870",
                                    "game_platform_id": 26
                                    }
                                )}
                        >
                        <KYHotGame src={KyHotGame3PNG}></KYHotGame>
                        <KYHotGameTitle>通比牛牛</KYHotGameTitle>
                    </KyGameContainer>
                </AGSlideContainer>
          </CarouselContainer>
  );
}
