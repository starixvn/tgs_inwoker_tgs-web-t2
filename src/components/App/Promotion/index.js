import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.png";
import PromoModelPNG from "../../../assets/images/promo-bg-model.png";
import PromoPresentPNG from "../../../assets/images/promo-bg-present.png";
import PromoItemPNG from "../../../assets/images/promot-item.png";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";
import Collapse from "@material-ui/core/Collapse";
import { BonusService } from "../../../services/BonusService";
import Join from "./Join";
import { SHOW_LOGIN } from "../../../constants/actionType";
import i18n from "../../../utils/i18n";
import { bonusAction } from "../../../actions/bonusAction";
import CommonMarquee from "../CommonMarquee";
import ScrollAnimation from 'react-animate-on-scroll';

export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  background: url(${BGPromotionJPG}) no-repeat center;
  min-height: 770px;
  background-size: auto 100%;
  overflow: visible;
`;
const MainContent = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  overflow: visible;
`;
const MainContentLeft = styled.div`
  float: left;
  width: 480px;
  height: 700px;
  position: relative;
  overflow: visible;
  padding-top: 152px;
`;
const PromoImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;
const PromoModel = styled.img`
  height: 608px;
  width: 500px;
`;
const PromoPresent = styled.img`
  height: 195px;
  width: 200px;
  position: absolute;
  top: 0px;
  right: -55px;
  animation: ${floatKeyframe} 3s linear 0s infinite;
`;

const MainContentRight = styled.div`
  float: left;
  margin: 30px auto;
  padding: 25px 25px;
  width: 800px;
  height: 700px;
  background-color: #f0ededb3;
  border-radius: 20px;
  position relative;
  overflow-y: scroll;
`;
const Inner = styled.div`

`;
const Content = styled.div`
  border-radius: 20px;
  width: 740px;
  height: 184px;
  background-color: #8a7f73;
  margin:13px 0 13px 0px;
  float: left;
  position:relative;
  background: url(${PromoItemPNG}) no-repeat center;
  background-size: auto 100%;
  transition: all 0.2s linear 0.2s;
  filter: grayscale(30%);
  &:hover {
    cursor: pointer;
    filter: grayscale(0%);
     background-size: auto 105%;
  }
`;
const LeftContent = styled.div`
  float: left;
  width: 444px;
`;
const RightContent = styled.div`
  float: left;
  height: 184px;
  width: 297px;
  background-color: #291c04;
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 40px;
  padding-right: 20px;
`;
const PromoTitle = styled.div`
  height:40px;
  font-size: 30px;
  color: #ffffff;
  margin-top: 20px;
  text-align: right;
  font-weight: 600;
`;
const PromoDate = styled.div`
  font-size: 18px;
  color: #ffffff;
  text-align: right;
`;
const PromoDesc = styled.div`
  font-size: 14px;
  color: #fff;
`;
const PromoImg = styled.img`
  width: 444px;
  height: 184px;

`;
const Viewall = styled.div`
    font-size: 15px;
    color: #ffffff;
    position: absolute;
    bottom: 10px;
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    left: 20px;
    display: inline-block;
    &:after{
      content:'';
      display: block;
      position: absolute;
      top:4px;
      bottom: 4px;
      left: 4px;
      right: 4px;
      border: 2px solid #fff;
    }
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 6px 0  rgba(255, 255, 255, 0.75);
  }
`;
const ViewallArrow = styled.img`
  ${(props) =>
    props.checked ? `transform: rotateX(0deg);` : `transform: rotateX(180deg);`}

  float: right;
  margin-left: 7px;
  margin-top: 7px;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  getList = (firstLoad, selectedId) => {
    BonusService.GetActivityList().then((response) => {
      if (response.IsSuccess) {
        let list = response.data.list;
        let preSelectedItem = null;
        for (let item of list) {
          item.checked = false;
          if (selectedId) {
            if (item.id == selectedId) {
              preSelectedItem = item;
              item.checked = true;
            }
          }
        }
        let selectedTab = 0;
        let selectedPromoId = "";
        let selectedPromoSpecifications = [];
        let selectedPromoTitle = "";
        if (preSelectedItem != null) {
          if (preSelectedItem.is_hot !== 1) {
            selectedTab = preSelectedItem.type_id;
          }
          selectedPromoId = preSelectedItem.activity_id;
          selectedPromoSpecifications = preSelectedItem.specifications;
          selectedPromoTitle = preSelectedItem.title;
          // selectedPromoId: this.props.match.params.id,
          // selectedPromoSpecifications:
          //   promo.length > 0 ? promo[0].specifications : [],
          // selectedPromoTitle: promo[0].title
          setTimeout(() => {
            if (document.querySelector("#promo" + selectedId)) {
              window.scrollTo({
                top:
                  window.scrollY +
                  document
                    .querySelector("#promo" + selectedId)
                    .getBoundingClientRect().top -
                  120,
                behavior: "smooth",
              });
              this.props.history.push("/" + i18n.language + "/promotion");
            }
          }, 800);
        }

        // this.state.selectedTab === 0
        // ? item.is_hot === 1
        // : item.type_id === this.state.selectedTab

        this.setState({
          ...this.state,
          list: list,
          selectedTab: selectedTab,
          // selectedPromoId: selectedPromoId,
          // selectedPromoSpecifications: selectedPromoSpecifications,
          // selectedPromoTitle: selectedPromoTitle
        });
      } else {
        this.props.enqueueSnackbar(response.msg, {
          variant: "error",
        });
      }
    });
  };
  handleTabChange = (tab) => {
    // this.getList(tab);
    this.setState({ ...this.setState, selectedTab: tab });
  };
  componentDidMount() {
    //test
    var qipaiList=[
      { 
        id: 1,
        pc_thumbnail_text: "test1", 
        title:"test2",
        end_time_text: "11:00",
        pc_promotion_describe: "<p>hi</p>"
      },
      {
        id: 2,
        pc_thumbnail_text: "test3", 
        title:"test4",
        end_time_text: "11:00",
        pc_promotion_describe: "<p>hi2</p>"
      },
      {
        id: 3,
        pc_thumbnail_text: "test4", 
        title:"tes52",
        end_time_text: "11:00",
        pc_promotion_describe: "<p>hi3</p>"
      },
      {
        id: 4,
        pc_thumbnail_text: "test4", 
        title:"tes52",
        end_time_text: "11:00",
        pc_promotion_describe: "<p>hi3</p>"
      },
    ]
    this.setState(
      {
        list: qipaiList
      })
    // this.getList(true, this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.id &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      let promo = this.state.list.filter((row) => {
        return row.id === parseInt(this.props.match.params.id);
      });
      if (promo.length > 0) {
        if (this.props.token == null) {
          this.props.history.push("/" + i18n.language + "/promotion");
          this.props.showLogin(true);
        } else {
          if (promo[0].type_id === 11) {
            this.props.history.push("/" + i18n.language + "/account/deposit");
          } else {
            this.setState({
              ...this.state,
              openJoin: true,
              selectedPromoId: this.props.match.params.id,
              selectedPromoSpecifications:
                promo.length > 0 ? promo[0].specifications : [],
              selectedPromoTitle: promo[0].title,
            });
          }
        }
      }
    }
    if (prevProps.token != this.props.token) {
      this.getList(false, this.props.match.params.id);
    }
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
    // let list = this.state.list;
    // var foundIndex = list.findIndex((x) => x.id === activity_id);
    // list[foundIndex].checked = !list[foundIndex].checked;
    AppHistory.push("/" + i18n.language + "/promotion/" + activity_id);

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
    return (
      <Container>
        <CommonMarquee></CommonMarquee>
        <MainContent>
            <MainContentLeft>
            <ScrollAnimation animateIn='fadeInLeft' duration={1} animateOnce={true} style={{overflow: "visible"}}>
              <PromoImageContainer>
                <PromoModel src={PromoModelPNG}></PromoModel>
                <PromoPresent src={PromoPresentPNG}></PromoPresent>
              </PromoImageContainer>
              </ScrollAnimation>
            </MainContentLeft>
          <MainContentRight className="scrollbar-wrap">
            <Inner>

              {this.state.list.map((row,index) => (
                <Content key={row.id} id={"promo" + row.id}>
                  <LeftContent>
                    <Viewall onClick={() => this.ViewAllClick(row.id)} 
                      style={index % 2 === 0 ?{backgroundColor:"#8a7f73"}:{backgroundColor:"#a27d38"}}
                    >
                      {i18n.t("promotion.moreInfo")}
                    </Viewall>
                  </LeftContent>
                  <RightContent>
                    <PromoTitle>{row.title}</PromoTitle>

                    <PromoDate>{row.end_time_text}</PromoDate>
                    <Collapse
                      in={row.checked}
                      collapsedHeight="70px"
                      style={{textAlign:"right"}}

                    >
                      <PromoDesc
                        onClick={this.contentClickHandler}
                        dangerouslySetInnerHTML={{
                          __html: row.pc_promotion_describe.replace(
                            /{activity_id}/g,
                            row.id
                          ),
                        }}
                      ></PromoDesc>

                    </Collapse>

                  </RightContent>
                </Content>
              ))}
            </Inner>
          </MainContentRight>
        </MainContent>
      </Container>
    );
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
  connect(null, mapDispatchToProps)(withSnackbar(Promotion))
);
