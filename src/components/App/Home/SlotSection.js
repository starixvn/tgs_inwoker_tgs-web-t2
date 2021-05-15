import React from "react";
import styled, { keyframes } from "styled-components";
import TitleImg from "../../../assets/images/slot-title.png";
import BGimage from "../../../assets/images/slot-bg.png";
import HomeSportSabaPNG from "../../../assets/images/home-sport-saba.png";
import HomeSportSboPNG from "../../../assets/images/home-sport-sbo.png";
import ScrollAnimation from "react-animate-on-scroll";

export default function SlotSection(props) {
  const Container = styled.div`
    width: 100%;
    height: 500px;
    overflow: visible;
    position: relative;
    z-index: 6;
  `;
  const TitleContainer = styled.div`
    margin: 0 auto;
    width: 1280px;
    display: flex;
    position: relative;
    height: 500px;
    overflow: visible;
    z-index: 5;
  `;
  const SlotImageBg = styled.img`
    width: 1280px;
    position: absolute;
  `;
  const Title = styled.img`
    width: 250px;
    position: absolute;
    z-index: 4;
    top: 200px;
    left: 365px;
  `;
  const SlotText = styled.div`
    width: 850px;
    position: absolute;
    z-index: 4;
    top: 285px;
    left: 365px;
    color: #fff;
    font-size: 18px;
  `;
  const SlotGameContainer = styled.div`
    width: 850px;
    position: absolute;
    z-index: 4;
    top: 360px;
    left: 365px;
    color: #fff;
    font-size: 18px;
    overflow: visible;
  `;
  const GameIcon = styled.img`
    width: 150px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    transition: transform 0.5s ease-in;
    &:hover {
      transform: scale(1.2);
      transform-origin: center;
      cursor: pointer;
    }
  `;
  return (
    <Container>
      <ScrollAnimation
        animateIn="bounceInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <TitleContainer>
          <ScrollAnimation
            animateIn="bounceInLeft"
            duration={3}
            animateOnce={true}
            style={{ overflow: "visible", zIndex: "6" }}
          >
            <Title src={TitleImg}></Title>
          </ScrollAnimation>
          <SlotImageBg src={BGimage}></SlotImageBg>
          <SlotText>
            电子竞技是由一群资深专业的电子竞技玩家研发的电竞竞猜平台。不但有顶尖的技术支持，还拥有令人惊叹的视觉界面及高效的用户体验。所以IM电竞竞猜平台能让您轻松上手，一目了然，轻松投注。
          </SlotText>
          <SlotGameContainer>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={6}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <GameIcon src={HomeSportSboPNG}></GameIcon>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={8}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <GameIcon src={HomeSportSabaPNG}></GameIcon>
            </ScrollAnimation>
          </SlotGameContainer>
        </TitleContainer>
      </ScrollAnimation>
    </Container>
  );
}
