import React, { Component } from "react";
import styled from "styled-components";

import BGAppDownloadJPG from "../../../assets/images/bg-app-download.jpg";


import AppDownloadPhoneIconPNG from "../../../assets/images/appdownload-phone-icon.png";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background: url(${BGAppDownloadJPG}) no-repeat center bottom;
`;
const Inner = styled.div`
  width: 880px;
  margin: 0 auto;
  padding-top: 90px;
`;
const LeftContainer = styled.div`
  width: 300px;
  height: 600px;
  float: left;

`;
const RightContainer = styled.div`
  width: 450px;
  height: 600px;
  float: right;
`;
const TitleContainer = styled.div`
  background: url(${AppDownloadPhoneIconPNG}) no-repeat  center;

  font-weight: bold;
  color: #404040;
  
  height: 99px;
width:450px;
`;
const DescContainer = styled.div`

font-size: 15px;
padding: 20px;
text-align: center;
color: #404040;
`;
const QRContainer = styled.div`
  margin: 50px 0 0 60px;
  float: left;
  width: 160px;
`;
const QRRedTitle = styled.div`

  text-align: center;



  font-size: 22px;


  color: #404040;
`;
const QRMiniTitle = styled.div`

  text-align: center;

  margin: 8px;


  font-size: 14px;

  color: #404040;
`;
const QRContainerVisit = styled(QRContainer)`
  padding-top: 15px;
`;
const QRImg = styled.img`
  width: 103px;
  margin: 0 auto;
  display: block;
  margin: 20px auto 0 auto;
`;

const QRImgDiv = styled.div`
  width: 103px;
  height: 103px;
  margin: 0 auto;
  display: block;
  background:url(${props => props.src}) no-repeat;
  background-size:contain;
  text-align:center;
  color:#000;
  font-size:18px;
  font-weight:bold;
  line-height: 103px;
`;
class Download extends Component {
  render() {
    return (
      <Container>
        <Inner>
          <LeftContainer></LeftContainer>
          <RightContainer>
            <TitleContainer></TitleContainer>
            <DescContainer>
              {i18n.t("web.download.titleDesc")}
            </DescContainer>
            <QRContainer>
              <QRRedTitle>{i18n.t("web.download.supportPlatform")}</QRRedTitle>
              <QRMiniTitle>{i18n.t("web.download.mobileDownload")}</QRMiniTitle>
              <QRImgDiv src={`${process.env.PUBLIC_URL}/assets/images/qrcode/appdownload-qr-soon.png`}>
                {i18n.t("common.comingSoon")}
              </QRImgDiv>
            </QRContainer>
            <QRContainerVisit>
              <QRRedTitle>{i18n.t("web.download.pcDownload")}</QRRedTitle>

              <QRImg src={`${process.env.PUBLIC_URL}/assets/images/qrcode/website.png`}></QRImg>
            </QRContainerVisit>
          </RightContainer>
        </Inner>
      </Container>
    );
  }
}

export default Download;
