import React from "react";

import styled from "styled-components";
import { withRouter } from "react-router-dom";

import FooterHandIconPNG from "../../assets/images/footer-hand-icon.png";
import FooterArrowIconPNG from "../../assets/images/footer-arrow-icon.png";
import Footer18plusIconPNG from "../../assets/images/footer-18plus-icon.png";
import FooterAffIconPNG from "../../assets/images/footer-aff-icon.png";
import Footer24CSIconPNG from "../../assets/images/footer-24cs-icon.png";
import Provider1PNG from "../../assets/images/provider1.png";
import Provider2PNG from "../../assets/images/provider2.png";
import Provider3PNG from "../../assets/images/provider3.png";
import Provider4PNG from "../../assets/images/provider4.png";
import Provider5PNG from "../../assets/images/provider5.png";
import Provider6PNG from "../../assets/images/provider6.png";
import Provider7PNG from "../../assets/images/provider7.png";
import Provider8PNG from "../../assets/images/provider8.png";
import Provider9PNG from "../../assets/images/provider9.png";
import Provider10PNG from "../../assets/images/provider10.png";
import Provider11PNG from "../../assets/images/provider11.png";

import HomeFooterIcon1PNG from "../../assets/images/home-footer-icon1.png";
import HomeFooterIcon1ActivePNG from "../../assets/images/home-footer-icon1-active.png";
import Common from "../../utils/Common";
import i18n from "../../utils/i18n";
import { AppHistory } from "../../history/History";
const Container = styled.div`
  width: 100%;
  height: 240px;
  background-color: #151515;
`;
const InnerWrap = styled.div`
  margin: 0 auto;
  width: 1280px;
  font-size: 14px;
`;
const TopContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 18px;
`;
const TopLeftContainer = styled.div`
  width: 205px;
  margin-left: 10px;
  float: left;
`;
const TopLeftContent = styled.div`
  width: 200px;
  height: 155px;
  border-radius: 20px;
  border: dashed 1px #f6f6f6;
`;
const TopLeftContentTopContainer = styled.div`
  height: 58px;
`;
const RestricContainer = styled.div`
  padding-top: 20px;
`;
const RestricImage = styled.img`
  margin: 0 18px;
`;
const TopLeftContentBottomContainer = styled.div`
  font-size: 11px;
  ${i18n.language === "en-US" ? `line-height:1;` : `line-height:1.6;`}

  text-align: justify;
  color: #f6f6f6;
  padding: 0px 20px;
`;

const TopCenterContainer = styled.div`
  float: left;
  margin-left: 42px;
  padding-top: 28px;
`;
const TopRightContainer = styled.div`
  width: 250px;
  height: 180px;
  float: right;
  margin-right: 0px;
`;
const AffAndCSContainer = styled.div`
  width: 238px;
  height: 62px;
  border-radius: 3px;
  border: solid 1px #f6f6f6;
  color: #f6f6f6;
`;
const AffContainer = styled(AffAndCSContainer)`
  margin-top: 17px;

  &:hover {
    cursor: pointer;
  }
`;
const AffImg = styled.img`
  margin: 12px 26px;
`;
const CSImg = styled.img`
  margin: 12px 24px;
`;
const AffCSRightContent = styled.div`
  height: 63px;
  width: 150px;
  float: right;
`;
const AffCSRightContentLine1 = styled.span`
  font-size: 14px;
  margin-top: 12px;
  display: block;
`;
const AffCSRightContentLine2 = styled.span`
  font-size: 14px;
  display: block;
`;
const AffRightContentLine1 = styled(AffCSRightContentLine1)``;
const AffRightContentLine2 = styled(AffCSRightContentLine2)``;
const CSContainer = styled(AffAndCSContainer)`
  margin-top: 5px;
`;
const MiddleContainer = styled.div`
  height: 100px;
  width: 100%;
  padding-top: 20px;
  border-bottom: solid 1px #443f3b;
  border-top: solid 1px #443f3b;
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
`;
const ProductUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px auto;
  display: table;
`;

const ProductLI = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
`;
const ProductImg = styled.div`
  margin: 0 8px;
  width: 100px;
  height: 60px;
  background: url(${(props) => props.img}) no-repeat;
  background-position: center;
  background-size: contain;
  display: block;
  &:hover {
    -webkit-transition: transform 0.8s;
    -webkit-transition: -webkit-transform 0.8s;
    transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
    transition: transform 0.8s, -webkit-transform 0.8s;
    -webkit-transform: rotateX(360deg);
    transform: rotateY(360deg);
  }
`;
const HelperContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  height: 60px;
  width: 1280px;
  padding-top: 18px;
  margin: 0 auto;
  color: #f6f6f6;
  border-bottom: solid 1px #443f3b;
`;
const HelpIcon = styled.span`
  text-indent: 20px;
`;
const HelperText = styled.a`
  color: #fff;
  text-indent: 20px;
  &:hover {
    color: #f0ca83;
    cursor: pointer;
  }
`;
const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: 16px;
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const FooterLabelCotanier = styled.div`
  text-align: center;
`;
const FooterIconFrame = styled.div`
  width: 100%;
  height: 50px;
`;

const FooterIcon1 = styled(FooterIconFrame)`
  background: url(${HomeFooterIcon1PNG}) no-repeat center;
`;
const FooterColumn = styled.div`
  border-right: solid 1px #f6f6f6;
  padding-right: 30px;
  float: left;
  padding-top: 15px;
  width: 200px;
  &:hover ${FooterIcon1} {
    background: url(${HomeFooterIcon1ActivePNG}) no-repeat center;
  }
`;
const FooterATag = styled.div`
  font-size: 14px;
  color: #f6f6f6;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
  &:hover ${FooterColumn} {
    color: #fde73f;
  }
`;

const QRContainerVisit = styled.div`
  float: left;
  margin: 0 20px;
`;
const QRImg = styled.img`
  width: 80px;
  margin: 0 auto;
  display: block;
`;

const QRDownloadImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
`;
const QRRedTitle = styled.div`
  text-align: center;
  font-size: 12px;
  color: #f6f6f6;
  margin-top: 5px;
`;
function handleOpenLink(url) {
  Common.PopupCenter(url, "", 1280, 720);
}

function Footer(props) {
  return (
    <Container>
      <MiddleContainer>
        <MiddleInnerWrap>
          <ProductUL>
            <ProductLI>
              <ProductImg img={Provider1PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider2PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider3PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider4PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider5PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider6PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider7PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider8PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider9PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider10PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg img={Provider11PNG}></ProductImg>
            </ProductLI>
          </ProductUL>
        </MiddleInnerWrap>
      </MiddleContainer>
      <HelperContainer>
        <HelperText>关于我们 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>联系我们 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>存款帮助 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>取款帮助 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>常见问题 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>规则与条款 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>App 下载 </HelperText>
      </HelperContainer>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>{i18n.t("web.footer.copyrightLine2")}</CopyRightLine2>
        <Version>
          Version {process.env.REACT_APP_VERSION} (
          {process.env.REACT_APP_CUSTOM_NODE_ENV})
        </Version>
      </BottomContainer>
    </Container>
  );
}

export default withRouter(Footer);
