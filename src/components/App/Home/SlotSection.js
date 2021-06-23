import React from "react";
import styled, { keyframes } from "styled-components";

import BGimage from "../../../assets/images/slot-bg.png";
import HomeSportSabaPNG from "../../../assets/images/home-sport-saba.png";
import HomeSportSboPNG from "../../../assets/images/home-sport-sbo.png";
import HomeSportImesPNG from "../../../assets/images/home-sport-imes.png";
import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
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
    width: 880px;
    position: absolute;
    z-index: 4;
    top: 285px;
    left: 365px;
    color: #fff;
    font-size: 18px;
  `;
  const SlotGameContainer = styled.div`
    width: 880px;
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
            <Title
              src={
                process.env.PUBLIC_URL +
                `/assets/images/${Common.getLanguagePrefixFolder()}/e-sports.png`
              }
            ></Title>
          </ScrollAnimation>
          <SlotImageBg src={BGimage}></SlotImageBg>
          <SlotText>{i18n.t("esports.desc")}</SlotText>
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
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={8}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <GameIcon
                src={HomeSportImesPNG}
                style={{ marginTop: "8px" }}
              ></GameIcon>
            </ScrollAnimation>
          </SlotGameContainer>
        </TitleContainer>
      </ScrollAnimation>
    </Container>
  );
}
