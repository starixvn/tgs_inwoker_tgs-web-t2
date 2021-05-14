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

  getList = (firstLoad, selectedId) => {
    // BonusService.GetActivityList().then((response) => {
    //   if (response.IsSuccess) {
    //     let list = response.data.list;
    // let preSelectedItem = null;
    // for (let item of list) {
    //   item.checked = false;
    //   if (selectedId) {
    //     if (item.activity_id == selectedId) {
    //       preSelectedItem = item;
    //       item.checked = true;
    //     }
    //   }
    // }
    // let selectedTab = 0;
    // let selectedPromoId = "";
    // let selectedPromoSpecifications = [];
    // let selectedPromoTitle = "";
    // if (preSelectedItem != null) {
    //   if (preSelectedItem.is_hot !== 1) {
    //     selectedTab = preSelectedItem.type_id;
    //   }
    //   selectedPromoId = preSelectedItem.activity_id;
    //   selectedPromoSpecifications = preSelectedItem.specifications;
    //   selectedPromoTitle = preSelectedItem.title;
    //   // selectedPromoId: this.props.match.params.id,
    //   // selectedPromoSpecifications:
    //   //   promo.length > 0 ? promo[0].specifications : [],
    //   // selectedPromoTitle: promo[0].title
    //   // setTimeout(() => {
    //   //   if (document.querySelector("#promo" + selectedId)) {
    //   //     window.scrollTo({
    //   //       top:
    //   //         window.scrollY +
    //   //         document
    //   //           .querySelector("#promo" + selectedId)
    //   //           .getBoundingClientRect().top -
    //   //         120,
    //   //       behavior: "smooth"
    //   //     });
    //   //     this.props.history.push("/promotion");
    //   //   }
    //   // }, 800);
    // }
    // this.state.selectedTab === 0
    // ? item.is_hot === 1
    // : item.type_id === this.state.selectedTab
    //     this.setState({
    //       ...this.state,
    //       list: list,
    //       // selectedPromoId: selectedPromoId,
    //       // selectedPromoSpecifications: selectedPromoSpecifications,
    //       // selectedPromoTitle: selectedPromoTitle
    //     });
    //   } else {
    //     this.props.alert("", response.info);
    //   }
    //  });
  };
  handleTabChange = (tab) => {
    // this.getList(tab);
    this.setState({ ...this.setState, selectedTab: tab });
  };
  handlePromoClick = (id) => {
    AppHistory.replace({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
  };
  componentDidMount() {
    this.getList(true, this.props.match.params.id);
  }
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
export default connect(mapStateToProps, null)(withRouter(Promotion));
