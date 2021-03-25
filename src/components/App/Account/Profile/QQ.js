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

class QQ extends Component {
  local_props = {
    member_wechat: "",
  };
  onhandleTextChange = (e) => {
    this.local_props.member_qq = e.target.value;
  };

  onhandleClick = () => {
    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!this.local_props.member_qq.match(re)) {
      this.props.enqueueSnackbar("QQ号码格式不正确", {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateQQ(
      this.local_props.member_qq
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_qq: this.local_props.member_qq.substring(0, 1) + "**",
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
          placeholder="QQ账号"
          adornment={IconInputReceivePNG}
          handleTextFieldChange={this.onhandleTextChange}
          defaultValue={this.local_props.member_qq}
          type={"number"}
        ></CustomTextField>

        <CustomButton
          name="提交"
          handleClick={this.onhandleClick}
        ></CustomButton>
      </Container>
    );
  }
}
export default connect(null, null)(withSnackbar(QQ));
