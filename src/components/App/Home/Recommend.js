import React from "react";
import styled, { keyframes } from "styled-components";
import TitleImg from "../../../assets/images/rec-title.png";
import RecImg1 from "../../../assets/images/rec-img1.png";
import RecImg2 from "../../../assets/images/rec-img2.png";
import RecImg3 from "../../../assets/images/rec-img3.png";
import RecImg4 from "../../../assets/images/rec-img4.png";
import RecImgBg from "../../../assets/images/rec-imgbase.png";
import ScrollAnimation from 'react-animate-on-scroll';

export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;
export default function Recommend(props) {
  const Container = styled.div`
    width: 100%;
    position: relative;
    z-index: 5;
    padding-top: 50px;
  `;
  const TitleContainer = styled.div`
    margin: 0 auto;
    min-width: 1280px;
    display: flex;
    justify-content: center;
    
  `;
  const Title = styled.img`
    width:160px;
  `;
  const RecommendContainer = styled.div`
    margin: 0 auto;
    width: 1280px;
    height: 510px;
    padding-top: 40px;
`;
const RecommendRow = styled.div`
  overflow:visible;
`;
const RecommendColumn = styled.div`
    float:left;
    width: 50%;
    position: relative;
    height: 200px;
    overflow:visible;
`;
const RecommendBase = styled.img`
    width:140px;
    position: absolute;
    left: 100px;
`;
const RecommendImg = styled.img`
    position: absolute;
    z-index:5;
    animation: ${floatKeyframe} 4s linear 0s infinite;
`;
const RecommendTitle = styled.div`
    color:#8a7f73;
    font-size: 30px;
    font-weight: 600;
    position: absolute;
    left: 260px;
    height:45px
`;
const RecommendText = styled.div`
    color:#8a7f73;
    font-size: 18px;
    position: absolute;
    left: 260px;
    top: 60px;
    width: 350px;
`;
  return (
    <Container>
      <TitleContainer>
         <Title src={TitleImg}></Title>
      </TitleContainer>
      <RecommendContainer>
          <RecommendRow>
              <RecommendColumn>
                  <RecommendImg src={RecImg4} style={{top:"-20px",left:"70px", width:"140px"}}></RecommendImg>
                  <RecommendBase src={RecImgBg}></RecommendBase>
                  <ScrollAnimation animateIn='fadeInDown' duration={2} animateOnce={true} style={{overflow: "visible"}}>
                        <RecommendTitle>极速存取转款</RecommendTitle>
                  <RecommendText>最新技术自主研发的财务处理系统真正做到极速存、取、转独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟。</RecommendText>
                  </ScrollAnimation>
              </RecommendColumn>
              <RecommendColumn>
                <RecommendImg src={RecImg2} style={{top:"-10px",left:"80px", width:"140px"}}></RecommendImg>
                <RecommendBase src={RecImgBg}></RecommendBase>
                <ScrollAnimation animateIn='fadeInDown' duration={4} animateOnce={true} style={{overflow: "visible"}}>
                  <RecommendTitle>海量赛事种类</RecommendTitle>
                  <RecommendText>每天为您提供近千场精彩体育赛事，更有真人、彩票、电子游戏等多种娱乐方式选择，让您拥有完美游戏体验。</RecommendText>
                  </ScrollAnimation>
              </RecommendColumn>
          </RecommendRow>
          <RecommendRow>
                <RecommendColumn>
                  <RecommendImg src={RecImg3} style={{top:"0px",left:"90px", width:"130px"}}></RecommendImg>
                  <RecommendBase src={RecImgBg}></RecommendBase>
                  <ScrollAnimation animateIn='fadeInDown' duration={6} animateOnce={true} style={{overflow: "visible"}}>
                  <RecommendTitle>加密安全管理</RecommendTitle>
                  <RecommendText>独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注、无后顾之忧！</RecommendText>
                  </ScrollAnimation>
                </RecommendColumn>
                <RecommendColumn>
                <RecommendImg src={RecImg1} style={{top:"0px",left:"80px", width:"160px"}}></RecommendImg>
                  <RecommendBase src={RecImgBg}></RecommendBase>
                  <ScrollAnimation animateIn='fadeInDown' duration={8} animateOnce={true} style={{overflow: "visible"}}>
                  <RecommendTitle>三端任您选择</RecommendTitle>
                  <RecommendText>引领市场的卓越技术，自主研发了全套终端应用，让您畅享Web、H5，更有iOS、Android原生APP，让您随时随地，娱乐投注! 7x24小时在线客服提供最贴心，最优质的服务</RecommendText>
                  </ScrollAnimation>
                </RecommendColumn>
          </RecommendRow>
      </RecommendContainer>
    </Container>
  );
}
