import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "../../api-services/actions/accountAction";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconInboxSelectedPNG from "../../assets/images/icon-inbox-selected.png";
import IconEmailPNG from "../../assets/images/icon-input-email.png";

import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import config from "../../config/config";
import i18n from "../../utils/i18n";
import { generalAction } from "../../api-services/actions/generalAction";
import { AccountService } from "../../api-services/services/AccountService";

const Container = styled.div`
  width: 506px;
  background: #101213;
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/iconpack/close.png"})
    no-repeat;
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

    margin: 0,

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
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

const CustomText2 = withStyles({
  root: {
    marginLeft: "8px",
    width: "240px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    background: "#555555",

    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "#828282",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(CustomText);

const PhoneFieldDropdown = styled.select`
  background: #555555;
  border: none;
  width: 100px;
  border-radius: 6px;
  height: 51px;
  margin-top: 13px;
  color:rgba(255, 255, 255);
`;

const ButtonLogin = styled.div`
  margin-top: 24px;
  margin-bottom: 35px;
  color: #000;
  font-size: 20px;
  width: 350px;
  height: 51px;
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

const DescriptionContainer = styled.div`
  padding: 12px 0 0 8px;
`;
const Description = styled.div`
  float: left;
  width: 310px;
  margin-left: 5px;
  font-size: 14px;

  line-height: 1.43;

  color: #fff;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2px",
    border: "solid #404040 1px",
  },
  formControl: {
    width: "78px",
    height: "46px",
    marginTop: "14px",
    marginRight: "10px",

    broder: "solid 2px #000",

    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
  input: {
    fontSize: "14px",
  },
  checkboxRoot: {
    padding: "0",
    margin: "0",
    float: "left",
    "& .MuiIconButton-label": {
      borderRadius: "6px",
      border: "solid 1px #000",
    },
  },
  icon: {
    width: 20,
    height: 20,

    borderRadius: "5px",
    backgroundColor: "#fff",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconInboxSelectedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconInboxSelectedPNG + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      content: '""',
    },
    "input:hover ~ &": {},
  },
}));

const CustomInvitationContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 8px -2px rgb(0 0 0 / 75%);
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 10px;
  bottom: 15px;
  border: none;
  outline: none;
  background: transparent;
`;

const CustomTextWrapper = styled.div`
  box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  margin-top: 13px;
`;

const VerificationWrapper = styled.div`
  background: #555555;
  margin-top: 15px;
  border-radius: 6px;
  padding: 14px;
  display: flex;
  height: 53.5px;
  justify-content: space-between;

  input[type="text"] {
    background: transparent;
    border: none;

    ::placeholder {
      color: rgba(255, 255, 255, 0.2);
    };
    color: rgba(255, 255, 255)
  }

  button {
    background: rgba(0, 173, 239, 1);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  }
`;

const Verification = ({ code, changeCode, getCode, countdown = 0 }) => {
  return (
    <VerificationWrapper>
      <input
        type="text"
        placeholder={i18n.t("common.msgEnterCode")}
        value={code}
        onChange={changeCode}
      />
      <button
        onClick={() => {
          getCode();
        }}
        disabled={countdown > 0}
      >
        {countdown <= 0
          ? i18n.t("common.msgSendToken")
          : i18n.t("common.btnTokenResendLabel") + "(" + countdown + "s)"}
      </button>
    </VerificationWrapper>
  );
};

function Register(props) {
  const [username, setUsername] = React.useState("");
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [areacode, setAreacode] = React.useState(config.features.PhonePrefix);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [promotionId, setPromotionId] = React.useState(
    config.affiliateId !== ""
      ? config.affiliateId
      : localStorage.getItem("promotionId")
  );
  const [subid, setSubid] = React.useState(localStorage.getItem("subid"));

  const [upper, setUpper] = React.useState(localStorage.getItem("upper"));
  const [promoteType, setPromoteType] = React.useState(
    localStorage.getItem("invitationtype") === ""
      ? "a"
      : localStorage.getItem("invitationtype")
  );
  const [prefill, setPrefill] = React.useState(
    localStorage.getItem("promotionId") !== "" ||
      localStorage.getItem("upper") !== ""
      ? true
      : false
  );
  
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const [hadSend, setHadSend] = React.useState(false);

  const [fromCustomDomain, setFromCustomDomain] = React.useState(false);

  useEffect(() => {
    if (props.general.brand.hasInvitationCode) {
      props.getInvitationCode().then((result) => {
        if (result.IsSuccess && result.data.invitationCode) {
          setPromoteType("a");
          setPromotionId(result.data.invitationCode);
          setPrefill(true);
          setFromCustomDomain(true);
        }
      });
    }
  }, []);

  const [tnc, setTnc] = React.useState(true);
  
  const checkIfValid = (regex, value, msg) => {
    if (!regex.test(value)) {
      props.enqueueSnackbar(msg, {
        variant: "warning",
      });
      return false;
    }
    return true;
  };
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePromoChange = (e) => {
    setPromotionId(e.target.value);
  };
  const handleUpperChange = (e) => {
    setUpper(e.target.value);
  };
  const handleTncClick = (e) => {
    setTnc(!tnc);
  };
  const handleSwitchType = (e) => {
    setPromoteType(e.target.value);
    setUpper("");
    setPromotionId("");
  };
  
  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);
  
  const checkInfo = () => {
    let flag=true; //临时测试
    flag = flag && checkIfValid(
      /^[a-zA-Z0-9]{6,16}$/,
      username,
      i18n.t("common.msgRegisterUserNameInvalid")
    );
    
    flag = flag && checkIfValid(
      /^.{6,20}$/,
      password,
      i18n.t("common.msgRegisterPassInvalid")
    );
    
    if (flag && password !== password2) {
      flag = false;
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
    }
    
    flag = flag && checkIfValid(
      new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`),
      phone,
      i18n
        .t("common.noReachMin")
        .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
    );
    return flag;
  };
  const doInitPhone = () => {
    AccountService.NewRegister("InitPhone", {
      input: "Init",
      data: {
        areacode: areacode,
        phone: phone,
      },
    }).then(async (response) => {
      if (response.IsSuccess) {
        setSecurityKey(response.data.stepResponse);
        props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
          variant: "info",
        });
        setCountdown(60);
        setHadSend(true);
      } else {
        props.enqueueSnackbar(response.info, {
          variant: "warning",
        });
      }
    });
  }
  
  const performGetVerificationCode = () => {
    //https://raypro.atlassian.net/browse/TGS-4309
    //AccountService.GetMemberInfo().then().then(async (response) => {
    //  console.log(response);
    //  console.log(response.code==102);
    //});
    
    if(!checkInfo()){
      return;
    }
    if(hadSend){
      doInitPhone();
    }else{
      props
        .newRegister("CreatePlayer", {
          username: username,
          pwd: password,
          upper: upper,
          invitationcode: promotionId,
        })
        .then(async (response) => {
          if (response.IsSuccess) {
            if(response.data.isCompleted || response.data.stepResponse?.isnew===false){
              props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
                variant: "warning",
              });
            }else {
              AccountService.Login(username, password).then((response) => {
                if (response.IsSuccess) {
                  setToken(response.data.token);
                  doInitPhone();
                }
              });
            }
          } else {
            props.enqueueSnackbar(response.info, {
              variant: "warning",
            });
          }
        });
    }
  };
  
  const performValidateVerificationCode = () => {
    if(!checkInfo()){
      return;
    }
    if(code===""){
      props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
        variant: "info",
      });
      return;
    }
    if (tnc) {
      AccountService.NewRegister("InitPhone", {
        input: "Valid",
        data: {
          securitykey: securityKey,
          validatecode: code,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
            variant: "success",
          });
          props.getAccountInfo(token);
          props.onhandleClose();
        } else {
          props.enqueueSnackbar(response.info, {
            variant: "warning",
          });
        }
      });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
    }
  };

  const classes = useStyles();
  return (
    <Container>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
      {/*
      <SubTitleContainer>
        {i18n.t("web.register.registerTitleLine2")}
      </SubTitleContainer>
      */}
      <FormContainer>
        <CustomTextWrapper>
          <CustomText
            onChange={handleUsernameChange}
            id="username"
            value={username}
            placeholder={i18n.t("web.register.username")}
            variant="outlined"
            autoComplete="off"
            inputProps={{
              maxLength: 16,
            }}
          />
        </CustomTextWrapper>

        <CustomTextWrapper>
          <CustomText
            onChange={handlePasswordChange}
            id="password"
            value={password}
            placeholder={i18n.t("web.register.password")}
            variant="outlined"
            type="password"
            autoComplete="off"
            inputProps={{
              maxLength: 20,
            }}
          />
        </CustomTextWrapper>
        <CustomTextWrapper>
          <CustomText
            onChange={handlePassword2Change}
            id="password2"
            value={password2}
            placeholder={i18n.t("web.register.confirmPassword")}
            variant="outlined"
            type="password"
            autoComplete="off"
            inputProps={{
              maxLength: 20,
            }}
          />
        </CustomTextWrapper>

        {config.features.Register_ShowEmail && (
          <CustomTextWrapper>
            <CustomText
              onChange={handleEmailChange}
              id="email"
              value={email}
              placeholder={i18n.t("web.register.email")}
              variant="outlined"
              type="email"
              autoComplete="off"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ height: "26px", width: "30px" }}
                  >
                    <img src={IconEmailPNG} alt=""></img>
                  </InputAdornment>
                ),
              }}
            />
          </CustomTextWrapper>
        )}

        {!(config.features.Register_HideInvitation && fromCustomDomain) && (
          <CustomTextWrapper>
            <CustomInvitationContainer>
              <CustomText
                onChange={
                  promoteType === "a" ? handlePromoChange : handleUpperChange
                }
                value={promoteType === "a" ? promotionId : upper}
                id="code"
                placeholder={i18n.t("web.register.promoteCode")}
                variant="outlined"
                inputProps={{ disabled: prefill }}
              />
              {props.general.haveAffiliate && (
                <CustomInvitationSelect
                  disabled={prefill}
                  value={promoteType}
                  selected={promoteType}
                  onChange={handleSwitchType}
                >
                  <option value="a">{i18n.t("usertype.agent")}</option>
                  <option value="p">{i18n.t("usertype.player")}</option>
                </CustomInvitationSelect>
              )}
            </CustomInvitationContainer>
          </CustomTextWrapper>
        )}
        <PhoneFieldDropdown
          native
          variant="outlined"
          value={areacode}
          displayEmpty
          onChange={(e) => {
            setAreacode(e.target.value);
          }}
        >
          <option value={config.features.PhonePrefix} disabled>
            {config.features.PhonePrefix}
          </option>
        </PhoneFieldDropdown>
        <CustomText2
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          id="phone"
          value={phone}
          placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
          variant="outlined"
          type="text"
          autoComplete="off"
          inputProps={{
            maxLength: config.features.MAX_PHONE_LENGTH || 10,
          }}
        />
        <div className="clear"></div>
        <Verification
          code={code}
          changeCode={(e) => {
            setCode(e.target.value);
          }}
          getCode={() => {
            performGetVerificationCode();
          }}
          countdown={countdown}
        />
        <div class="clear"></div>
        
        <DescriptionContainer>
          <Checkbox
            checked={tnc}
            className={classes.checkboxRoot}
            onClick={handleTncClick}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
          />
          <Description>{i18n.t("web.register.contract")}</Description>
        </DescriptionContainer>

        <ButtonLogin onClick={performValidateVerificationCode}>
          <ButtonLoginLabel>
            {config.features.Register_CustomFlow_IDR
              ? i18n.t("common.nextStep")
              : i18n.t("web.register.btn")}
          </ButtonLoginLabel>
        </ButtonLogin>
      </FormContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInvitationCode: () => dispatch(generalAction.getInvitationCode()),
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode, upper) =>
      dispatch(
        accountAction.registerAccount(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )
      ),
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register))
);
