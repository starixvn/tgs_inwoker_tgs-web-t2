// import React, { Component } from "react";

// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import LoginBGPNG from "../../assets/images/login-bg.png";

// import CloseIcon from "@material-ui/icons/Close";
// import TextField from "@material-ui/core/TextField";
// import { withSnackbar } from "notistack";
// import { AccountService } from "../../services/AccountService";
// const Container = styled.div`
//   width: 420px;

//   background: url(${LoginBGPNG});
//   display: table;
// `;
// const CloseIconContainer = styled(CloseIcon)`
//   float: right;
//   margin: 10px 10px 0 0;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const TitleContainer = styled.div`
//   font-size: 26.5px;
//   text-align: center;
//   color: #16242a;
// `;

// const FormContainer = styled.div`
//   margin: 0 35px;
// `;
// const CustomText = withStyles({
//   root: {
//     width: "350px",
//     height: "46px",
//     margin: 0,
//     marginTop: "13px",
//     float: "left",
//     background: "white",
//     "& .MuiOutlinedInput-input": {
//       fontSize: "14px"
//     },
//     "& label.Mui-focused": {
//       color: "#b6b6b6"
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#b6b6b6"
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "#b6b6b6"
//       },
//       "&:hover fieldset": {
//         borderColor: "#b6b6b6"
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#b6b6b6"
//       }
//     }
//   }
// })(TextField);

// const Button = styled.div`
//   width: 175px;
//   height: 46px;
//   float: left;
//   border: solid 1px #b6b6b6;
//   margin-top: 15px;
//   background-image: linear-gradient(to top, #c0252d, #d95a61);
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;
//   float: left;
//   &:hover {
//     cursor: pointer;
//     background-blend-mode: screen, normal;
//     background-image: linear-gradient(
//         to bottom,
//         rgba(255, 255, 255, 0.08),
//         rgba(255, 255, 255, 0.08)
//       ),
//       linear-gradient(to top, #c0252d, #d95a61);
//   }
// `;
// const ButtonLabel = styled.span`
//   text-align: center;
//   display: block;
//   margin-top: 10px;
// `;
// const LinkStyle = styled.a`
//   color: #c0252d;
//   font-size: 14px;
//   margin-top: 5px;
//   text-decoration: underline;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const Description = styled.p`
//   font-size: 13px;
//   color: #686868;
//   text-align: center;
//   display: inline-block;
//   width: 100%;
// `;

// const ContactUsLink = styled(LinkStyle)`
//   font-size: 13px;
// `;
// const StyleButton = styled.div`
//   width: 135px;
//   height: 46px;
//   border: solid 1px #b6b6b6;
//   margin: 0;
//   margin-top: 13px;
//   margin-left: 5px;
//   float: left;

//   ${props =>
//     props.disable === true
//       ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
//       : `  background-image: linear-gradient(
//     90deg,
//     rgb(15, 123, 154) 0%,
//     rgb(59, 171, 204) 100%
//   );
// `}

//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;

//   &:hover {
//     cursor: pointer;
//     ${props =>
//       props.disable === true
//         ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
//         : `      background-blend-mode: screen, normal;
//         background-image: linear-gradient(
//             to bottom,
//             rgba(59, 171, 204, 0.08),
//             rgba(59, 171, 204, 0.08)
//           ),
//           linear-gradient(to top, #3babcc, #3babcc);
//         }
//   `}
// `;
// const StyleButtonLabel = styled.span`
//   text-align: center;
//   display: block;
//   margin-top: 10px;
// `;
// class ForgotPasswordEmail extends Component {
//   state = {
//     email: "",
//     code: "",
//     countdown: 0
//   };
//   timer = null;
//   componentDidMount() {}
//   componentWillUnmount() {
//     if (this.timer != null) {
//       clearTimeout(this.timer);
//     }
//   }
//   handleCodeChange = e => {
//     this.setState({ ...this.state, code: e.target.value });
//   };
//   handleEmailChange = e => {
//     this.setState({ ...this.state, email: e.target.value });
//   };
//   onhandleGetCodeClick = () => {
//     if (this.state.countdown <= 0) {
//       AccountService.GetEmailVerificationCode(
//         "",
//         this.state.email,
//         "resetPassword"
//       ).then(response => {
//         // this.setState({ ...this.state, message: response.msg });
//         if (response.IsSuccess) {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "info"
//           });
//         } else {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "error"
//           });
//         }
//         this.setState({ ...this.state, countdown: response.data });
//         this.checkCountdown();
//       });
//     }
//   };
//   checkCountdown = () => {
//     if (this.state.countdown > 0) {
//       this.timer = setTimeout(() => {
//         this.setState({ ...this.state, countdown: this.state.countdown - 1 });
//         this.checkCountdown();
//       }, 1000);
//     }
//   };
//   render() {
//     return (
//       <Container>
//         <CloseIconContainer
//           viewBox="4 4 16 16"
//           onClick={this.props.onhandleClose}
//         ></CloseIconContainer>
//         <div className="clear"></div>
//         <TitleContainer>输入验证</TitleContainer>

//         <FormContainer>
//           <CustomText
//             placeholder="请输入电子邮件"
//             variant="outlined"
//             value={this.state.email}
//             onChange={this.handleEmailChange}
//             autoComplete="off"
//           />
//           <CustomText
//             placeholder="请输入验证码"
//             variant="outlined"
//             onChange={this.handleCodeChange}
//             value={this.state.code}
//             type={"number"}
//             autoComplete="off"
//             style={{
//               width: "208px",
//               height: "46px"
//             }}
//           />
//           <StyleButton
//             onClick={this.onhandleGetCodeClick}
//             disable={this.state.countdown > 0}
//           >
//             <StyleButtonLabel>
//               {this.state.countdown <= 0
//                 ? "发送验证码"
//                 : "重新发送(" + this.state.countdown + "s)"}
//             </StyleButtonLabel>
//           </StyleButton>
//           <Button onClick={this.props.onhandleBackClick}>
//             <ButtonLabel>返回</ButtonLabel>
//           </Button>
//           <Button onClick={() => this.props.onhandleNextClick(this.state.code)}>
//             <ButtonLabel>下一步</ButtonLabel>
//           </Button>
//           <Description>
//             如有问题，请及时
//             <ContactUsLink onClick={this.props.onhandleOnlineSupport}>
//               联系我们
//             </ContactUsLink>
//           </Description>
//         </FormContainer>
//       </Container>
//     );
//   }
// }

// export default withSnackbar(ForgotPasswordEmail);
