import React, { Component } from "react";
import styled from "styled-components";

import IconBonusRedPNG from "../../../../assets/images/icon-bonus-active.png";
import Details from "./Details";
import i18n from "../../../../utils/i18n";
import { withSnackbar } from "notistack";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #ffffff;
  width: 100%;
  min-height: 796px;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconBonusRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;

const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

class Affiliate extends Component {
  state = {
    tab: 1,
  };

  componentDidMount() {
    if (this.props.token != null) {
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
    }
  }

  handleTabClick = (tab) => {
    this.setState({ ...this.state, tab: tab });
  };

  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("affiliate.title")}
        </Title>

        <InnerWrap>
          {(() => {
            switch (this.state.tab) {
              case 1:
                return (
                  <Details
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );

              default:
                return (
                  <Details
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
            }
          })()}
        </InnerWrap>
      </Container>
    );
  }
}

export default withSnackbar(Affiliate);
