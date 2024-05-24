import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import i18n from "../../utils/i18n";
const Container = styled.div`
  width: 506px;
  background: #101213;
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${process.env.PUBLIC_URL + "/assets/images/iconpack/close.png"}) no-repeat;
  background-size: 100%;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: #fff;
`;
const SubTitleContainer = styled.div`
  text-align: center;

  font-size: 18px;

  color: #fff;
`;
const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    background: "#555555",

    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
      },
      color: "rgba(255, 255, 255)",
      "text-fill-color":"rgba(255, 255, 255)",
    },
    
    "& label.Mui-focused": {
      color: "#828282",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#828282",
    },
  },
})(TextField);

const ButtonLogin = styled.div`
  margin-top: 35px;
  width: 350px;
  height: 51px;
  color: #000;
  font-size: 20px;

  border-radius: 6px;

  background-image: linear-gradient(to top, #f0bc5a, #f0ca83);

  &:hover {
    cursor: pointer;

    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;
const LinkStyle = styled.a`
  margin-top: 5px;
  text-decoration: underline;

  font-size: 15px;

  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
const LinkRegister = styled(LinkStyle)`
  float: left;
`;
const LinkForgotPassword = styled(LinkStyle)`
  float: right;
`;
const EmptyBlock = styled.div`
  clear: both;
  height: 30px;
`;
const Description = styled.p`
  text-align: center;

  font-size: 14px;

  line-height: 1.43;

  color: #fff;
`;
const OnlineSupportLink = styled(LinkStyle)`
  font-size: 13px;
`;

const TheThreeIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .item {
    /* background: #555; */
    border-radius: 6px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3px;

    .icon {
      aspect-ratio: 1;
      width: 100%;
    }

    .title {
      color: #fff;
      white-space: nowrap;
    }

    .subtitle {
      color: #fff;
      font-size: 11px;
      opacity: 0.8;
    }
  }
`;

class Login extends Component {
  local_props = {
    rememberChecked: false,
    username: "",
    password: "",
  };
  handleTextFieldChange = (e) => {
    this.local_props[e.target.id] = e.target.value;
  };

  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("common.login")}</TitleContainer>

        <FormContainer>
          <TheThreeIcon>
            <div className="item">
              <img
                className="icon"
                src={process.env.PUBLIC_URL + "/assets/images/sponsors/1.png"}
                alt=""
              />
              <div className="title">{i18n.t("astonvilla")}</div>
              <div className="subtitle">{i18n.t("officialpartners")}</div>
            </div>
            <div className="item">
              <img
                className="icon"
                src={process.env.PUBLIC_URL + "/assets/images/sponsors/2.png"}
                alt=""
              />
              <div className="title">{i18n.t("laclipper")}</div>
              <div className="subtitle">{i18n.t("officialpartners")}</div>
            </div>
            <div className="item">
              <img
                className="icon"
                src={process.env.PUBLIC_URL + "/assets/images/sponsors/3.png"}
                alt=""
              />
              <div className="title">{i18n.t("sscnapoli")}</div>
              <div className="subtitle">{i18n.t("officialpartners")}</div>
            </div>
          </TheThreeIcon>
          <CustomText
            onChange={this.handleTextFieldChange}
            id="username"
            placeholder={i18n.t("common.username")}
            variant="outlined"
            inputProps={{
              maxLength: 16,
            }}
          />
          <CustomText
            onChange={this.handleTextFieldChange}
            id="password"
            placeholder={i18n.t("common.password")}
            variant="outlined"
            type="password"
            inputProps={{
              maxLength: 20,
            }}
          />
          <ButtonLogin
            onClick={() =>
              this.props.onhandleLoginClick(
                this.local_props.username,
                this.local_props.password
              )
            }
          >
            <ButtonLoginLabel>{i18n.t("web.login.login")}</ButtonLoginLabel>
          </ButtonLogin>
          <LinkRegister onClick={this.props.onhandleRegister}>
            {i18n.t("web.login.newRegister")}
          </LinkRegister>
          <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
            {i18n.t("web.login.forgetPass")}
          </LinkForgotPassword>
          {/* {(() => {
            var brand = ["HK28", "21GEN", "21gen", "MESS8", "PISO", "BUNNY"];
            if (brand.indexOf(config.brand) <= 0) {
              return (
                <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
                  {i18n.t("web.login.forgetPass")}
                </LinkForgotPassword>
              );
            }
          })()} */}
          <EmptyBlock></EmptyBlock>
        </FormContainer>
        <Description>
          {i18n.t("web.login.cs")}
          <OnlineSupportLink onClick={this.props.onhandleOnlineSupport}>
            {i18n.t("web.login.contactus")}
          </OnlineSupportLink>

          <br></br>
          {i18n.t("web.login.footerDesc")}
        </Description>
      </Container>
    );
  }
}

export default Login;
