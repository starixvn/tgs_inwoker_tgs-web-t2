import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  width: 637px;
  height: 81px;
  border-radius: 8px;

  border: solid 1px #ffffff;
  background: ${(props) =>
    props.styledtype === "2"
      ? " #404040"
      : props.theme.new_gradientBackground ??
        `linear-gradient(to top, ${props.theme.primaryGradient}, ${props.theme.primary});`};

  text-transform: ${({ theme }) =>
    theme.new_gradientBackground ? "uppercase" : "capitalize"};
  font-weight: ${({ theme }) =>
    theme.new_gradientBackground ? "bold" : "normal"};

  margin: 0 auto;
  font-size: 25px;

  color: ${({ theme }) => (theme.new_gradientBackground ? "#000" : "#fff")};

  padding-top: 20px;
  text-align: center;
`;

class ButtonWap extends Component {
  render() {
    return (
      <StyleButton onClick={this.props.onClick} {...this.props}>
        {this.props.name}
      </StyleButton>
    );
  }
}
export default ButtonWap;
