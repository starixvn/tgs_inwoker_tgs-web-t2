import React from "react";
import styled from "styled-components";
// import ReactDOM from "react-dom";
import config from "../../../../config/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";
import Image1 from "../../../../assets/images/slider/banner-1.png";
import Image2 from "../../../../assets/images/slider/banner-1.png";

import i18n from "../../../../utils/i18n";
const SlideImage = styled.img`
  height: 330px;


  border: none;
  margin: 0 auto;
`;
const ATag = styled.a`
  text-decoration: none;
`;

const settings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  autoplay: true,
  appendDots: (dots) => (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>
  ),
  customPaging: (a) => {
    return (
      <div
        style={{
          border: "2px solid #fff",
          borderRadius: "50%",
          width: "12px",
          height: "12px",
        }}
      ></div>
    );
  },
  beforeChange: (current, next) => { },
};
class Slider extends React.Component {
  render() {
    return (
      <Slick {...settings}>
        <ATag >
          <SlideImage src={Image1}></SlideImage>
        </ATag>
        <ATag>
          <SlideImage src={Image2}></SlideImage>
        </ATag>
        {/* {this.props.list.map((row, index) => {
          return (
            <ATag href={"/" + i18n.language + "/" + row.url} key={index}>
              <SlideImage src={row.file_url}></SlideImage>
            </ATag>
          );
        })} */}
      </Slick>
    );
  }
}
export default Slider;
