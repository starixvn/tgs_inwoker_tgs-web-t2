import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";

import { AccountService } from "../../../../services/AccountService";
import { UPDATE_INFO } from "../../../../constants/actionType";
import { withSnackbar } from "notistack";
import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";
const Container = styled.div``;

class Wechat extends Component {
  local_props = {
    member_wechat: "",
  };
  onhandleTextChange = (e) => {
    this.local_props.member_wechat = e.target.value;
  };

  onhandleClick = () => {
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!this.local_props.member_wechat.match(re)) {
      this.props.enqueueSnackbar("微信号码格式不正确", {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateWechat(
      this.local_props.member_wechat
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_wechat:
              this.local_props.member_wechat.substring(0, 1) + "**",
          },
        });
        this.props.handleCloseDialog();
      } else {
        this.props.enqueueSnackbar(response.msg, {
          variant: "error",
        });
      }
    });
  };
  render() {
    return (
      <Container>
        <CustomTextField
          placeholder="Wechat账号"
          adornment={IconInputReceivePNG}
          handleTextFieldChange={this.onhandleTextChange}
          defaultValue={this.local_props.member_wechat}
          type={"text"}
        ></CustomTextField>

        <CustomButton
          name="提交"
          handleClick={this.onhandleClick}
        ></CustomButton>
      </Container>
    );
  }
}
export default connect(null, null)(withSnackbar(Wechat));
