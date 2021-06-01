import React, { Component } from "react";
import styled from "styled-components";
import Carousel from "react-spring-3d-carousel";

import { config } from "react-spring";
import HomeSport1PNG from "../../../assets/images/home-sport-1.png";
import HomeSport2PNG from "../../../assets/images/home-sport-2.png";
import HomeSport3PNG from "../../../assets/images/home-sport-3.png";

const Container = styled.div`
  width: 700px;
  height: 500px;
  margin-left: 20px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  cursor: pointer;
  width: 415px;
  height: 455px;

  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  background-position: center bottom;
*/}
`;

class AgSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToSlide: 0,
      offsetRadius: 2,
      showNavigation: false,
      config: config.slow,
    };
  }
  interval = null;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.autoSlide();
    }, 2000);
  }
  componentWillUnmount() {
    if (this.interval !== null) clearInterval(this.interval);
  }
  autoSlide() {
    var gotoSlide = this.state.goToSlide + 1;
    if (gotoSlide > 2) gotoSlide = 0;
    this.setState({ ...this.state, goToSlide: gotoSlide });
  }
  slides = [
    {
      key: 1,
      content: <ImageContainer img={HomeSport1PNG} alt="1" />,
    },
    {
      key: 2,
      content: <ImageContainer img={HomeSport2PNG} alt="2" />,
    },
    {
      key: 3,
      content: <ImageContainer img={HomeSport3PNG} alt="3" />,
    },
  ].map((slide, index) => {
    return { ...slide };
  });
  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };
  render() {
    return (
      <Container>
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        {/* <ImageContainer
          img={HomeSport1PNG}
          style={{ float: "left", width: "370px" }}
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
        ></ImageContainer> */}
      </Container>
    );
  }
}
export default AgSlider;
