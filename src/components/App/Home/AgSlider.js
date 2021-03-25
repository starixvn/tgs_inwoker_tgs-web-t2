import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import HomeSportPNG from "../../../assets/images/home-sport.png";

const CarouselContainer = styled(Carousel)`
  background: none;
  margin: 8px 0px;
  height: 500px;
`;
const Container = styled.div`
  width: 660px;
  height: 500px;
  margin-left: 40px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 500px;
  position: relative;
  overflow: visible;
`;
const AGSlideImage = styled.img`
  position: absolute;
  top: 50px;
  left: 0px;
  width: 80px
  cursor: pointer;
  transition: all 0.5s linear;
  ${(props) =>
    props.active
      ? `
      filter: grayscale(0%);
      transform: scale(1.4);
      top: 150px;
      transition: transform 0.5s ease-in,filter 0.5s ease-in;
    `
      : `
      filter: grayscale(100%);
      transform: scale(0.9);
    `}
`;

class AgSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex:0
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
    centerSlidePercentage:100/3,
    onClickItem:(index)=>{
        this.setState({
            slideIndex: index
        })
    },
    onChange:(index)=>{
        this.setState({
            slideIndex: index
        })
      }
  });
  
render() {
    return (
      <Container>
                <CarouselContainer
                    {...this.getConfigurableProps()}
                >
                    <ImageContainer><AGSlideImage src={HomeSportPNG} active={this.state.slideIndex===0?true:false}></AGSlideImage> </ImageContainer>
                    <ImageContainer> <AGSlideImage src={HomeSportPNG} active={this.state.slideIndex===1?true:false}></AGSlideImage> </ImageContainer>
                    <ImageContainer> <AGSlideImage src={HomeSportPNG} active={this.state.slideIndex===2?true:false}></AGSlideImage> </ImageContainer>
                </CarouselContainer>
    </Container>
  )}
}
export default AgSlider;