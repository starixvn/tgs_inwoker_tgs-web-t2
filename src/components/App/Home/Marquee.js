import React, { useEffect, useState } from "react";

import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { UiService } from "@Inwoker/tgs-api";
const AnnounceContainer = styled.div`
  width: 1280px;
  height: 40px;
  margin: 0 auto;
`;
const MarqueeContainer = styled.div`
  position: absolute;
  top: 15px;
  width: 100%;
  white-space: nowrap;
  font-weight: bold;
  font-size: 14px;
  color: #f0ca83;
  float: left;
  padding-top: 4px;
  background-color: rgba(0, 0, 0, 0.5);
`;

function Marquee(props) {
  const [loaded, setLoaded] = useState(false);

  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    setLoaded(true);
  });

  useEffect(() => {
    if (loaded) {
      UiService.GetMarquee(i18n.language).then((result) => {
        if (result.IsSuccess) {
          setAnnouncement(result.data);
        }
      });
    }
  }, [loaded]);

  useEffect(() => {});
  return (
    <AnnounceContainer>
      <MarqueeContainer>
        <marquee>
          {announcement.map((row, index) => {
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
                {row.localization !== null && row.localization.content
                  ? row.localization.content
                  : row.content}
              </div>
            );
          })}
        </marquee>
        
      </MarqueeContainer>
    </AnnounceContainer>
  );
}
export default Marquee;
