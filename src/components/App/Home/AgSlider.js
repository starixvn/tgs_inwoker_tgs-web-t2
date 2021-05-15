import React, { Component } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomeSport1PNG from "../../../assets/images/home-sport-1.png";
import HomeSport2PNG from "../../../assets/images/home-sport-2.png";
import { GameEnum, GameTypeEnum } from "../../../utils/Enum";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 700px;
  height: 500px;
  margin-left: 20px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  cursor: pointer;
  width: 280px;
  height: 455px;

  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  background-position: center bottom;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

class AgSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  getConfigurableProps = () => ({
    showArrows: false,
    showStatus: false,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: false,
    autoPlay: false,
    stopOnHover: true,
    dynamicHeight: false,
    emulateTouch: false,
    autoFocus: false,
    thumbWidth: false,
    selectedItem: false,
    transitionTime: 500,
    centerMode: true,
    swipeScrollTolerance: 5,
    centerSlidePercentage: 100 / 3,
    onClickItem: (index) => {
      this.setState({
        slideIndex: index,
      });
    },
    onChange: (index) => {
      this.setState({
        slideIndex: index,
      });
    },
  });

  render() {
    return (
      <Container>
        <ImageContainer
          img={HomeSport1PNG}
          style={{ float: "left", width: "370px" }}
          active={this.state.slideIndex === 0 ? true : false}
          onClick={() =>
            this.props.handleJoinGameClick(
              GameTypeEnum.SPORTS,
              "",
              GameEnum.SBO,
              "/" +
                i18n.language +
                "/joingame/" +
                GameTypeEnum.SPORTS +
                "/" +
                GameEnum.SBO
            )
          }
        ></ImageContainer>
        <ImageContainer
          img={HomeSport2PNG}
          style={{ float: "right" }}
          active={this.state.slideIndex === 1 ? true : false}
          onClick={() =>
            this.props.handleJoinGameClick(
              GameTypeEnum.SPORTS,
              "",
              GameEnum.SABA,
              "/" +
                i18n.language +
                "/joingame/" +
                GameTypeEnum.SPORTS +
                "/" +
                GameEnum.SABA
            )
          }
        ></ImageContainer>
      </Container>
    );
  }
}
export default AgSlider;
