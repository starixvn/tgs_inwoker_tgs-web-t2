import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Slider from "react-slick";

import HomeFooterIcon1PNG from "../../assets/images/home-footer-icon1.png";
import HomeFooterIcon1ActivePNG from "../../assets/images/home-footer-icon1-active.png";
import Common from "../../utils/Common";
import i18n from "../../utils/i18n";
import config from "../../config/config";

import { AppHistory } from "../../history/History";
const Container = styled.div`
  width: 100%;
  height: 240px;
  background-color: #151515;
`;

const MiddleContainer = styled.div`
  height: 120px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px #443f3b;
  border-top: solid 1px #443f3b;
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
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

const BrandsImage = styled.div`
  opacity: 1;
  height: 80px;
  width: 175px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: contain;
`;

const ThirdPartyLogoHolder = styled.div`
  display: flex !important;
  justify-content: center;
  width: 175px;
`;
const settings = {
  className: "footer",
  dots: false,
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  cssEase: "linear",

  infinite: true,
};

function Footer(props) {
  return (
    <Container>
      <MiddleContainer>
        <MiddleInnerWrap>
          <Slider {...settings}>
            {(() => {
              return props.game.providerList.map((item, index) => {
                return (
                  <ThirdPartyLogoHolder>
                    <BrandsImage
                      img={
                        process.env.PUBLIC_URL +
                        `/assets/images/provider/${item.abbreviation.toLowerCase()}.png`
                      }
                    />
                  </ThirdPartyLogoHolder>
                );
              });
            })()}
          </Slider>
        </MiddleInnerWrap>
      </MiddleContainer>
      {/* <HelperContainer>
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
      </HelperContainer> */}
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brand)}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
