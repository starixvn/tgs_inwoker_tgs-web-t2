import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";

import { AppHistory } from "../../../history/History";

import { BonusService } from "../../../services/BonusService";
import i18n from "../../../utils/i18n";

const Content = styled.div`
  width: 100%;

  padding: 0 30px 30px 30px;
`;



class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      details: null,
    };
    document.getElementsByTagName("body")[0].style.background = "#fff";
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "";
  }
  handleBonusChange = (e) => {
    this.setState({ ...this.state, bonusSubId: parseInt(e.target.value) });
  };
  handleJoinNowClick = (e) => {
    BonusService.JoinActivity(
      this.props.token,
      this.state.promo.activity_id,
      this.state.bonusSubId
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.alert(response.msg);
        this.setState({ ...this.state, show: false });
      } else {
        this.props.alert(response.msg);
      }
      AppHistory.replace("/" + i18n.language + "/promotion");
    });
  };
  async componentDidMount() {
    if (this.props.promo == null) {
      AppHistory.replace("/" + i18n.language + "/promotion-list");
    } else {
      BonusService.GetActivityDetails(this.props.promo.id).then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            details: response.data,
          });
        } else {
          this.props.alert("", response.info);
        }
      });
    }
  }

  componentDidUpdate(preProps, preState) {
    if (
      typeof preProps.match.params.activityId === "undefined" &&
      this.props.match.params.activityId
    ) {
      this.handleJoinNowClick();
    }
  }
  handleBackClick = () => {
    AppHistory.replace("/" + i18n.language + "/promotion-list");
  };

  render() {
    if (this.state.details != null) {
      return (
        <>
          <Header
            token={null}
            balance={0}
            background={true}
            onBackClick={this.handleBackClick}
            title={i18n.t("promotion.promoDetail")}
          ></Header>

          <Content
            dangerouslySetInnerHTML={{
              __html:
                "<div class='custom-promotion'>" +
                this.state.details.app_promotion_describe ||
                this.state.details.app_promotion_describe.replace(
                  /{activity_id}/g,
                  this.state.details.id
                ) + "</div>",
            }}
          ></Content>

        </>
      );
    } else {
      return <></>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(Details));
