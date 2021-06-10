import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-lazy-load-image-component/src/effects/blur.css";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
import { generalAction } from "@Inwoker/tgs-api";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;

  background-size: contain;
`;

const ListView = styled.div``;
const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;
  background-size: cover;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 240px;
`;

const ListItemTitle = styled.div`
  color: #fff;
  position: absolute;
  font-size: 44px;
  width: 350px;
  height: 230px;
  margin: 33px 0 0 40px;
  line-height: 0.95em;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    openJoin: false,
    selectedPromoSpecifications: [],
  };
  componentDidMount() {
    if (this.props.token === null || this.props.token === "") {
      this.props.getPromotionList();
    } else {
      this.props.getPlayerPromotionList();
    }
  }

  handleTabChange = (tab) => {
    // this.getList(tab);
    this.setState({ ...this.setState, selectedTab: tab });
  };
  handlePromoClick = (id) => {
    AppHistory.replace({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
  };

  handleBackClick = () => {
    AppHistory.goBack();
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, selectedTab: newValue });
  };
  a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      "aria-controls": `wrapped-tabpanel-${index}`,
    };
  }
  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("promotion.title")}
        ></Header>

        <ListView>
          {this.props.general.promotionList.items.map((row, index) => {
            return (
              <ListItem
                key={index}
                src={Common.GetPromoImg(index)}
                onClick={() => this.handlePromoClick(row.id)}
              >
                <ListItemTitle>{row.name}</ListItemTitle>
              </ListItem>
            );
          })}
          {/* <ListItem
            id={"promo"}
            src={Banner1}
            // onClick={() => this.handlePromoClick(row)}
          >
            <ListItemTitle>活动1</ListItemTitle>
          </ListItem>
          <ListItem
            id={"promo"}
            src={Banner2}
            // onClick={() => this.handlePromoClick(row)}
          >
            <ListItemTitle>活动2</ListItemTitle>
          </ListItem>{" "}
          <ListItem
            id={"promo"}
            src={Banner3}
            // onClick={() => this.handlePromoClick(row)}
          >
            <ListItemTitle>活动3</ListItemTitle>
          </ListItem> */}
          {
            //  this.state.list.map((row) => (
            //    <ListItem
            //      key={row.id}
            //      id={"promo" + row.id}
            //      src={row.app_thumbnail_text}
            //      onClick={() => this.handlePromoClick(row)}
            //    >
            //      <ListItemTitle>{row.title}</ListItemTitle>
            //    </ListItem>
            //  ))
          }
        </ListView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    general: state.general,
    token: state.account.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPromotionList: () =>
      dispatch(generalAction.getPromotionList(1, 99, true, "", true)),
    getPlayerPromotionList: () =>
      dispatch(generalAction.getPlayerPromotionList(1, 99, true, "", true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Promotion));
