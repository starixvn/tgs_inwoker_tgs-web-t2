import React from "react";

import styled from "styled-components";
import i18n from "../../utils/i18n";
import MarqueeIconPNG from "../../assets/images/marqueeicon.png";
const AnnounceContainer = styled.div`
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;
const MarqueeIcon = styled.img`
    width: 80px;
    margin-top: 5px;
    padding-right: 25px;
    float: right;
    @media (max-width: 320px) {
       display: none;
      }
`;
const MarqueeContainer = styled.div`
  position: relative;
  overflow: visible;
  float:right;
  width: 78%;
  white-space: nowrap;
  font-weight: bold;
  font-size: 14px;
  color: #f0ca83;
  padding-top: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  @media (max-width: 320px) {
    width: 100%;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: -23px;
    width: 0;
    height: 0;
    border-right: 23px solid rgba(0, 0, 0, 0.7);
    border-bottom: 24px solid transparent;
    @media (max-width: 320px) {
        display: none;
      }
  }
`;

function CommonMarquee(props) {
  return (
    <AnnounceContainer>
      <MarqueeContainer>
        <marquee>
          test testestsetssssssssssssssssssssssssssssssssssssssss
          {/* {props.text.map((row, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "inline",
                  whiteSpace: "nowrap",
                  wordBreak: "keep-all",
                  overflow: "visible",
                }}
              >
                {row}
              </div>
            );
          })} */}
        </marquee>
      </MarqueeContainer>
      <MarqueeIcon src={MarqueeIconPNG}></MarqueeIcon>
    </AnnounceContainer>
  );
}
export default CommonMarquee;
