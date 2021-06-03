import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";
import IconInputIDPNG from "../../../../assets/images/icon-input-id.png";
import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";
import { AccountService, UPDATE_INFO } from "@Inwoker/tgs-api";

import i18n from "../../../../utils/i18n";
const Container = styled.div``;
let local_props = {
  member_name: "",
  member_card_no: "",
};

const onhandleNameChange = (e) => {
  local_props.member_name = e.target.value;
};
const onhandleIDChange = (e) => {
  local_props.member_card_no = e.target.value;
};

function IDVerification(props) {
  local_props = {
    member_name: props.account.info.member_name,
    member_card_no: props.account.info.member_card_no,
  };
  const onhandleClick = () => {
    AccountService.AddRealName(
      local_props.member_name,
      local_props.member_card_no
    ).then((response) => {
      if (response.IsSuccess) {
        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_name: local_props.member_name,
            check_pass_account: true,
          },
        });
        props.handleCloseDialog();
      } else {
        if (response.code === 401) {
          props.enqueueSnackbar(i18n.t("profile.nameVerify.msgInvalidICNum"), {
            variant: "error",
          });
        } else {
          props.enqueueSnackbar(response.info, {
            variant: "error",
          });
        }
      }
    });
  };
  return (
    <Container>
      <CustomTextField
        placeholder={i18n.t("common.realName")}
        adornment={IconInputReceivePNG}
        handleTextFieldChange={onhandleNameChange}
        defaultValue={props.account.info.member_name}
        readOnly={props.account.info.check_pass_account}
        maxLength={10}
      ></CustomTextField>
      {props.account.info.member_name === "" ||
      props.account.info.member_name === null ? (
        <CustomTextField
          placeholder={i18n.t("profile.nameVerify.icNum")}
          adornment={IconInputIDPNG}
          handleTextFieldChange={onhandleIDChange}
          defaultValue={props.account.info.member_card_no}
          readOnly={props.account.info.check_pass_account}
          maxLength={20}
        ></CustomTextField>
      ) : (
        <></>
      )}
      {(() => {
        if (props.account.info.check_pass_account === false) {
          return (
            <CustomButton
              name={i18n.t("common.submit")}
              handleClick={onhandleClick}
            ></CustomButton>
          );
        } else return null;
      })()}
    </Container>
  );
}

export default connect(null, null)(withSnackbar(IDVerification));
