import React from "react";

import styled from "styled-components";
import i18n from "../../../utils/i18n";

const AnnounceContainer = styled.div`
  width: 1280px;
  height: 40px;
  margin: 0 auto;
`;
const MarqueeContainer = styled.div`
  position:absolute;
  top:15px;
  width: 100%;
  white-space: nowrap;
  font-weight: bold;
  font-size: 14px;
  color: #f0ca83;
  float: left;
  padding-top: 4px;
  background-color: rgba(0, 0, 0, 0.5)
`;

function Marquee(props) {
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
    </AnnounceContainer>
  );
}
export default Marquee;
