import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import IconInboxRedPNG from "../../../../assets/images/icon-inbox-active.png";

import { withSnackbar } from "notistack";

import List from "./List";
import { InboxService } from "../../../../services/InboxService";
import { accountAction } from "../../../../actions/accountAction"
import { SHOWING_DIALOG } from "../../../../constants/actionType";
import i18n from "../../../../utils/i18n"
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

  background: url(${IconInboxRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 630px;border-radius: 10px;

`;


class Inbox extends Component {
  state = {
    selectAll: false,
    openDialog: false,
    dialogTitle: "收件箱",
    selectedRecord: false,
    page: 0,
    selected: [],
    inbox: {
      list: [],
      count: 0,
      page_size: 10,
    },
    limit: 10,
  };
  handleChangePage = (newPage) => {
    this.setState({ ...this.state, page: newPage - 1 });
    this.GetInboxList(newPage - 1);
  };
  GetInboxList = (page) => {
    InboxService.InboxList(page, this.state.limit).then((response) => {
      if (response.IsSuccess) {
        if (response.IsSuccess) {
          this.setState({ ...this.state, inbox: response.data });
        } else {
          this.props.enqueueSnackbar(response.msg, {
            variant: "error",
          });
        }
      }
    });

  };


  componentDidMount() {
    if (this.props.token != null) {
      InboxService.UpdateReadMessage().then(response => {
        this.props.getAccountInfo();
        this.GetInboxList(0);
      })

    }
  }
  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
      this.GetInboxList(0);
    }
  }

  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  handleDeleteSelected = () => {
    this.DeleteSelectedInbox(this.state.selected.join());
  };
  handleReadSelected = () => {
    this.ReadSelectedInbox(this.state.selected.join());
  };
  handleClickDelete = (id) => {
    this.DeleteSelectedInbox(id);
    this.setState({ ...this.state, openDialog: false });
  };
  handleRowClick = (event, row) => {
    this.ReadSelectedInbox([row.id]);
    this.setState({
      ...this.state,
      selectedRecord: row,
      openDialog: true,
    });
  };
  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("inbox.title")}
        </Title>

        <InnerWrap>
          <List
            page={this.state.page}
            rows={this.state.inbox.list}
            total={this.state.inbox.count}
            selected={this.state.selected}
            onhandleChangePage={this.handleChangePage}
            onhandleRowClick={this.handleRowClick}
            onhandleSelectedChange={this.handleSelectedChange}
          ></List>

        </InnerWrap>
        {/* <StyledDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          <DialogHeader>
            <DialogHeadertitle>{this.state.dialogTitle}</DialogHeadertitle>
            <DialogCloseIconContainer
              onClick={this.handleCloseDialog}
            ></DialogCloseIconContainer>
          </DialogHeader>
          <DialogContainer>
            <Details
              inbox={this.state.selectedRecord}
              onhandleClickConfirm={this.handleCloseDialog}
              onhandleClickDelete={this.handleClickDelete}
            ></Details>
          </DialogContainer>
        </StyledDialog> */}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inbox: state.account.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    getAccountInfo: () =>
      dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Inbox));
