import i18next from "i18next";
import React, { useEffect, useState, useCallback } from "react";
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
  const [totalPlayer, setTotalPlayer] = useState(null);

  useEffect(() => {
    const generateRandomNumber = () => {
      const userRange = randomNumberGenerator(
        config.features.Home_OnlineUsers.min,
        config.features.Home_OnlineUsers.max
      );
      setTotalPlayer(userRange);
      sessionStorage.setItem("userOnlineCount", userRange);
    };

    if (totalPlayer === null) {
      setTimeout(generateRandomNumber, 1000);
    }

    const interval = setInterval(generateRandomNumber, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <OnlineDisplayerText
      color={color}
      size={size}
      textAlign={textAlign}
      padding={padding}
    >
      {i18next.t("common.playeronline")}:{" "}
      <OnlineUserText>{totalPlayer}</OnlineUserText>
    </OnlineDisplayerText>
  );
};

export default OnlineUserDisplayer;
