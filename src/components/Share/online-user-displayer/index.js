import i18next from "i18next";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import config from "../../../config/config";

const OnlineDisplayerText = styled.div`
  color: ${({ color, theme }) => color || theme.secondary};
  font-size: ${({ size }) => size || ""};
  text-align: ${({ textAlign }) => textAlign || "unset"};
  min-width: 125px;
  padding: ${({ padding }) => padding || "0 10px 0 0"};
`;

const OnlineUserText = styled.span`
  font-weight: bold;
`;

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const OnlineUserDisplayer = ({ color, size, textAlign, padding }) => {
  const totalPlayerRef = useRef(null);

  const generateRandomNumber = useCallback(() => {
    const userRange = randomNumberGenerator(
      config.features.Home_OnlineUsers.min,
      config.features.Home_OnlineUsers.max
    );
    totalPlayerRef.current = userRange;
    sessionStorage.setItem("userOnlineCount", userRange);
  }, []);

  useEffect(() => {
    if (totalPlayerRef.current === null) {
      setTimeout(generateRandomNumber, 1000);
    }

    const interval = setInterval(generateRandomNumber, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [generateRandomNumber]);

  return (
    <OnlineDisplayerText
      color={color}
      size={size}
      textAlign={textAlign}
      padding={padding}
    >
      {i18next.t("common.playeronline")}:{" "}
      <OnlineUserText>{totalPlayerRef.current}</OnlineUserText>
    </OnlineDisplayerText>
  );
};

export default OnlineUserDisplayer;
