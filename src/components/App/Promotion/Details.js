import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import BGJPG from "../../../assets/images/bg.jpg";

import { withSnackbar } from "notistack";

import { BonusService } from "../../../services/BonusService";

import { SHOW_LOGIN } from "../../../constants/actionType";
import i18n from "../../../utils/i18n";
import { bonusAction } from "../../../actions/bonusAction";
import { AppHistory } from "../../../history/History";

const Container = styled.div`
  width: 100%;

  position: relative;
  background: url(${BGJPG})
    no-repeat top center #19262f;
  min-height: 800px;
`;
const MainContent = styled.div`


  margin: 40px auto;
  padding: 23px 0;


  width: 1000px;
  min-height: 600px;
  border-radius: 20px;
  border: solid 2px #9eafff;
  background-image: linear-gradient(to top, #1b213f, #29356c);
`;
const Inner = styled.div`

`;
const Content = styled.div`

width: 927px;




margin:0 0 13px 32px;
float: left;
position:relative;
`;
const PromoTitle = styled.div`

height:40px;
font-size: 30px;

color: #ffffff;
margin-top:23px;
margin-bottom:23px;
`;
const PromoDate = styled.div`

font-size: 15px;

color: #01f1fe;
`;
const PromoDesc = styled.div`
  font-size: 14px;

  color: #747474;
`;

class PromotionDetails extends Component {
  state = {
    details: null
  };


  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    } else {
      BonusService.GetActivityDetails(this.props.match.params.id).then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            details: response.data,
          });
        }
      });
    }
    // this.getList(true, this.props.match.params.id);
  }

  handleJoinClick = (bosp_id) => {
    BonusService.JoinActivity(
      this.props.token,
      this.state.selectedPromoId,
      this.state.selectedBospId
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.enqueueSnackbar(response.msg, {
          variant: "success",
        });
        this.ResetPopup();
      } else {
        this.props.enqueueSnackbar(response.msg, {
          variant: "error",
        });
      }
    });
  };
  handleBospIdChange = (bospId) => {
    this.setState({ ...this.state, selectedBospId: bospId });
  };
  ResetPopup = () => {
    this.setState({
      ...this.state,
      openJoin: false,
      selectedPromoSpecifications: [],
      selectedPromoTitle: "",
      selectedBospId: 0,
    });
    this.props.history.push("/" + i18n.language + "/promotion");
  };
  handleCloseDialog = () => {
    this.ResetPopup();
  };
  ViewAllClick = (activity_id) => {
    let list = this.state.list;
    var foundIndex = list.findIndex((x) => x.id === activity_id);
    list[foundIndex].checked = !list[foundIndex].checked;

    this.setState({ ...this.state, list: list });
  };
  contentClickHandler = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    if (targetLink.href.indexOf("/promotion/") >= 0) {
      this.props.history.push(
        "/" +
        i18n.language +
        "/promotion/" +
        targetLink.href.substring(
          targetLink.href.indexOf("/promotion/") + 11,
          targetLink.href.length
        )
      );
    }
  };

  render() {
    if (this.state.details === null) {
      return (
        <Container>

        </Container>
      );
    } else {
      return (
        <Container>
          <MainContent>
            <Inner>
              <Content>
                <PromoTitle>{this.state.details.title}</PromoTitle>



                <PromoDate>{i18n.t("promotion.startDate")}{this.state.details.start_time_text}</PromoDate>
                <PromoDate>{i18n.t("promotion.endDate")}{this.state.details.end_time_text}</PromoDate>
                <PromoDesc
                  dangerouslySetInnerHTML={{
                    __html:
                      "<div class='custom-promotion'>" +
                      this.state.details.desc + this.state.details.pc_promotion_describe + "</div>",
                  }}
                ></PromoDesc>
              </Content>
            </Inner>
          </MainContent>




        </Container>
      );
    }

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    getPromotionList: () => {
      dispatch(bonusAction.getPromotionList());
    },
  };
};
export default withRouter(
  connect(null, mapDispatchToProps)(withSnackbar(PromotionDetails))
);
