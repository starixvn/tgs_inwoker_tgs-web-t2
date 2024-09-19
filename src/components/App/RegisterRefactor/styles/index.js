import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import IconInboxSelectedPNG from "../../../../assets/images/icon-inbox-selected.png";



export const Container = styled.div`
  width: 506px;
  background: #101213;
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
export const CloseIconContainer = styled.div`
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
export const TitleContainer = styled.div`
  text-align: center;
  font-size: 42px;
  color: #fff;
`;
export const SubTitleContainer = styled.div`
  text-align: center;
  font-size: 18px;
  color: #fff;
`;
export const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;
export const CustomText = withStyles({
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
        "text-fill-color": "rgba(255, 255, 255)"
      },
      color: "rgba(255, 255, 255)"
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

export const CustomText2 = withStyles({
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

export const PhoneFieldDropdown = styled.select`
  background: #555555;
  border: none;
  width: 100px;
  border-radius: 6px;
  height: 51px;
  margin-top: 13px;
  color:rgba(255, 255, 255);
`;

export const ButtonLogin = styled.div`
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
export const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;

export const DescriptionContainer = styled.div`
  padding: 12px 0 0 8px;
`;
export const Description = styled.div`
  float: left;
  width: 310px;
  margin-left: 5px;
  font-size: 14px;
  line-height: 1.43;
  color: #fff;
`;

export const useStyles = makeStyles((theme) => ({
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

export const CustomInvitationContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 8px -2px rgb(0 0 0 / 75%);
`;

export const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 10px;
  bottom: 15px;
  border: none;
  outline: none;
  background: transparent;
`;

export const CustomTextWrapper = styled.div`
  box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  margin-top: 13px;
`;

export const VerificationWrapper = styled.div`
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