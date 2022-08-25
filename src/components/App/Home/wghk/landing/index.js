import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";

const WGHKBackgorund = styled.div`
  display: flex;
  background: url(${process.env.PUBLIC_URL +
  "/assets/images/pcHomePage/WGHK/background.png"});
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const TheButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20%;
  width: 100vw;
`;

const TheButton = styled.div`
  padding: 15px 45px;
  font-size: 24px;
  border-radius: 10px;
  color: #fff;
  background: #ff9900;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Landing = ({ showLogin }) => {
  return (
    <WGHKBackgorund>
      <TheButtonContainer>
        <TheButton
          onClick={() => {
            showLogin(true);
          }}
        >
          {i18n.t("WGHK.loginRegister")}
        </TheButton>
      </TheButtonContainer>
    </WGHKBackgorund>
  );
};

export default Landing;
