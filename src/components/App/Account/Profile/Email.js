import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CustomButton from "../../../Share/Button";
import IconInputEmailPNG from "../../../../assets/images/icon-input-email.png";
import IconInputVerifyCodePNG from "../../../../assets/images/icon-input-verifycode.png";
import { withSnackbar } from "notistack";
import { AccountService } from "../../../../services/AccountService";

import { accountAction } from "../../../../actions/accountAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
const CustomText = withStyles({
  root: {
    marginTop: "10px",
    float: "left",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      color: "#b6b6b6",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);
const Container = styled.div``;

const StyleButton = styled.div`
  width: 140px;
  height: 44px;
  border: solid 1px #b6b6b6;
  margin: 0;
  margin-top: 10px;
  margin-left: 5px;
  float: left;

  ${(props) =>
    props.disable === true
      ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
      : `  background-image: linear-gradient(to top, #f0ca83, #f0ca83);
`}

  border-radius: 5px;
  font-size: 16px;
  color: #fff;

  &:hover {
    cursor: pointer;

    ${(props) =>
      props.disable === true
        ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
        : `      background-blend-mode: screen, normal;
        background-image: linear-gradient(to top,#ffc65c,#f0b64b);
        }
  `}


`;
const ButtonLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;
const Message = styled.div`
  color: red;
  float: left;
  font-size: 13px;
  margin: 10px 0 0 0;
  width: 100%;
  text-align: left;
`;
class Address extends Component {
  state = {
    isNew: this.props.email === "" || this.props.email === null ? true : false,
    step: 1,
    message:
      this.props.email === ""
        ? "请放心，我们不会泄露任何用户信息，以及发送骚扰信息。"
        : "",
    email: this.props.email,
    code: "",
    countdown: 0,
  };
  timer = null;
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  onhandleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  onhandleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  onhandleGetCodeClick = () => {
    if (this.state.countdown <= 0) {
      let events = "";
      if (this.props.isForSecurityQuestion) {
        events = "resetQuestion";
      } else {
        if (this.state.isNew) {
          events = "bind";
        } else {
          if (this.state.step === 1) {
            events = "check";
          } else if (this.state.step === 2) {
            events = "bind";
          }
        }
      }

      AccountService.GetEmailVerificationCode(
        this.props.token,
        this.state.email,
        events
      ).then((response) => {
        if (response.IsSuccess) {
          this.props.enqueueSnackbar(response.msg, {
            variant: "info",
          });
        } else {
          this.props.enqueueSnackbar(response.msg, {
            variant: "error",
          });
        }
        this.setState({ ...this.state, countdown: response.data });
        this.checkCountdown();
      });
    }
  };
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  onhandleClick = () => {
    if (this.state.isNew) {
      AccountService.UpdateEmail(
        this.state.email,
      ).then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountInfo();
          this.props.handleCloseDialog();
        } else {
          this.props.enqueueSnackbar(response.msg, {
            variant: "error",
          });
        }
      });
    } else {
      if (this.props.isForSecurityQuestion) {
        AccountService.VerifySecurityQuestionByEmail(
          this.props.token,
          this.state.code
        ).then((response) => {
          if (response.IsSuccess) {
            this.props.onhandleVerifySuccess(
              this.props.isForSecurityQuestion,
              this.props.isForWithdrawalPassword
            );
          } else {
            this.props.enqueueSnackbar(response.msg, {
              variant: "error",
            });
            // this.setState({ ...this.state, message: response.msg });
          }
        });
      } else {
        if (this.state.step === 1) {
          AccountService.UpdateEmailStep1(
            this.props.token,
            this.state.code
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({
                ...this.state,
                code: "",
                email: "",
                step: 2,
                message: response.msg,
                countdown: 0,
              });
            } else {
              this.props.enqueueSnackbar(response.msg, {
                variant: "error",
              });
              // this.setState({ ...this.state, message: response.msg });
            }
          });
        } else if (this.state.step === 2) {
          AccountService.UpdateEmailStep2(
            this.props.token,
            this.state.email,
            this.state.code
          ).then((response) => {
            if (response.IsSuccess) {
              this.props.getAccountProfile(this.props.token);
              this.props.handleCloseDialog();
              this.props.enqueueSnackbar(response.msg, {
                variant: "info",
              });
            } else {
              this.props.enqueueSnackbar(response.msg, {
                variant: "error",
              });
            }
          });
        }
      }
    }
  };
  render() {
    return (
      <Container>
        <CustomText
          placeholder="请输入您的邮箱地址"
          adornment={IconInputEmailPNG}
          onChange={this.onhandleEmailChange}
          inputProps={{
            maxLength: 50,
          }}
          style={{
            width: "340px",
            height: "46px",
          }}
          value={this.state.email}
          variant="outlined"
          autoComplete="off"
          disabled={this.state.isNew === false && this.state.step === 1}
        ></CustomText>
        <CustomText
          placeholder="请输入验证码"
          adornment={IconInputVerifyCodePNG}
          onChange={this.onhandleCodeChange}
          value={this.state.code}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 6);
          }}
          style={{
            width: "200px",
            height: "46px",
          }}
          variant="outlined"
          autoComplete="off"
          type={"number"}
        ></CustomText>
        <StyleButton
          onClick={this.onhandleGetCodeClick}
          disable={this.state.countdown > 0}
        >
          <ButtonLabel>
            {this.state.countdown <= 0
              ? "发送验证码"
              : "重新发送(" + this.state.countdown + "s)"}
          </ButtonLabel>
        </StyleButton>
        <Message>{this.state.message}</Message>
        <CustomButton
          name="提交"
          handleClick={this.onhandleClick}
          marginTop={15}
        ></CustomButton>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () =>
      dispatch(accountAction.getAccountInfo()),
    dispatchFunction: (json) => dispatch(json),
  };
};
export default connect(null, mapDispatchToProps)(withSnackbar(Address));
