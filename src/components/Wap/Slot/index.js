import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {GameService} from  '@Inwoker/tgs-api';
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Modal from "@material-ui/core/Dialog";
import Tab from "@material-ui/core/Tab";
import { AppHistory } from "../../../history/History";
import {

  GameTypeEnum,
  SlotFilterType,
} from "../../../utils/Enum";
import BookmarkPNG from "../../../assets/images/wap/bookmark.png";
import BookmarkFullPNG from "../../../assets/images/wap/bookmark-full.png";
import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import Loading from "../../Wap/Share/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BottomScrollListener from "react-bottom-scroll-listener";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;

  background-size: contain;
`;

const ListView = styled.div`
  padding-top: 160px;
`;
const ListItem = styled.div`
  position: relative;
  float: left;

  margin: 10px 0 10px 20px;

 

 

  width: 345px;
  height: 273px;
  border-radius: 10px;
  background-color: #404040;
`;
const ListitemLabelBackground = styled.div`
width: 345px;
height:76px;
background-image: linear-gradient(to top, #91030c,#c40511);
position: absolute;
bottom: 0;
left: 0;
`
const LeftContainer = styled.div`
  position: absolute;
  top: 170px;
  left: 20px;
`;
const GameProvider = styled.div`
  height: 40px;
  border-radius: 20px;
  background-image: linear-gradient(to bottom, #323534, #1a1e1f);
  text-align: center;
  color: #fff;
  font-size: 28px;
  display: inline-block;
  padding: 0 20px;
`;
const GameName = styled.div`
  color: #ffffff;
  font-size: 28px;
  margin-top: 6px;
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
`;
const Bookmark = styled.div`
  position: absolute;
  top: 215px;
  right: 10px;
  width: 48px;
  height: 44px;
  background-repeat: no-repeat;
  ${(props) =>
    props.isBookmark
      ? `  background-image: url(${BookmarkFullPNG});`
      : ` background-image: url(${BookmarkPNG});`}
`;
const StyledAppBar = withStyles({
  root: {
    top: "90px",
    height: "155px",

    boxShadow: "none",
  },
})(AppBar);


const GameItemSelection = styled.div`
  width: 100%;
  height: 60px;
  margin: 12px 0;
`;
const GameItem = styled.div`
 
  padding: 6px 20px 0 20px;
  font-size: 25px;

  text-align: center;
  

  float: left;
  ${(props) =>
    props.selected
      ? `border: solid 1px #c40511;color: #c40511;`
      : `color: #bdbdbd;`}

  min-width: 143px;
  height: 46px;

  border-radius: 22.8px;

`;
const StyleSearchIcon = styled(SearchIcon)`
  font-size: 60px;
  margin: 14px 20px 0 0;
  color:#fff;
`;
const StyledModal = withStyles((theme) => ({
  root: {},
  paper: {
    fontSize: "28px",
    color: "#666666",
    padding: "30px 0 30px 20px",
    maxWidth: "750px",
    width: "750px",
    backgroundColor: "#404040",
    margin: 0,
    // padding: 0,
    position: "absolute",
    top: 0,
  },
}))(Modal);
const SearchContainer = styled.div``;
const SearchKeywordWrap = styled.div`

  width: 750px;
  height: 90px;
`;


const SearchInputBG = styled.div`
  width: 600px;
  height: 70px;
  border-radius: 12px;
  background-color: #ffffff;
  float: left;
  margin: 15px 5px 0 5px;
`;
const SearchCancelButton = styled.div`
font-size: 30px;
    float: right;
    color: #d7d7d7;
    margin: 30px 0 0 0;
    width: 140px;
    text-align: center;
`;
const SearchInput = styled.input`
color:#404040;
  float: left;
  margin: 13px 18px;
  font-size: 30px;
  width: 485px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #d7d7d7;
    font-size: 30px;
    letter-spacing: 1px;
  }
  border: none;
`;
const SearchInputButton = styled(SearchIcon)`
  color: #192031;
  float: right;
  font-size: 60px !important;
  margin: 5px 15px 0 0;
`;
class Slot extends Component {
  constructor(props) {
    super(props);
    var title = "";

    var gameType = this.props.match.params.gameType
      ? this.props.match.params.gameType
      : "";

    switch (this.props.match.params.parentId) {
      case GameTypeEnum.SLOT:
        title = i18n.t("common.electron");
        break;
      case GameTypeEnum.FISH:
        title = i18n.t("common.fish");
        break;
      case GameTypeEnum.TIGERSLOT:
      default:
        title = i18n.t("common.slot");
        break;
    }
    this.state = {
      gameType: gameType,
      parentId: this.props.match.params.parentId
        ? parseInt(this.props.match.params.parentId)
        : 0,
      title: title,
      keyword: "",
      category: 0,
      gameList: [],
      page: 1,
      count: 9999,
      filterGame: 0,
      showSearch: false,
      showSuggest: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.getGameList(this.state.gameType);

  }
  componentWillUnmount() {

  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.parentId !== this.state.parentId ||
      prevState.filterGame !== this.state.filterGame ||
      prevProps.match.params.parent !== this.props.match.params.parent ||
      prevState.page !== this.state.page
    ) {
      if (
        prevProps.match.params.parentId !== this.props.match.params.parentId
      ) {
        this.setState({
          ...this.state,
          parentId: this.props.match.params.parentId
            ? this.props.match.params.parentId
            : "",
        });
      } else {
        this.getGameList(this.state.gameType);
      }
    }
  }
  getGameList(gameType, page = this.state.page) {
    this.setState({ ...this.state, loading: true });
    let result = null;

    result = GameService.GetGameList(
      this.state.gameType,
      GameTypeEnum.SLOT
    );
    result.then((response) => {
      this.setState({ ...this.state, loading: false });
      if (response.IsSuccess) {
        if (page === 1) {
          this.setState({
            ...this.state,
            gameList: response.data,
          });
        } else {
          this.setState({
            ...this.state,
            gameList: this.state.gameList.concat(response.data),
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
        });
      }
    });
  }
  handleScrollBottom = () => {
    if (this.state.gameList.length < this.state.total) {
      this.setState({ ...this.state, page: this.state.page + 1 });
    }
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleParentChange = (parentId) => {
    this.setState({ ...this.state, parentId: parentId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  handleChangeKeyword = (e) => {
    this.setState({
      ...this.state,
      keyword: e.target.value,
      showSuggest: e.target.value.length <= 0,
    });
  };

  handleSearchClick = (e) => {
    this.setState({
      ...this.state,
      showSearch: true,
      showSuggest: this.state.keyword.length <= 0,
      filterGame: 0,
      parentId: 0,
    });
  };
  handleCloseSearch = (e) => {
    this.getGameList(this.state.parentId);
    this.setState({ ...this.state, showSearch: false, loading: true });

  };
  handleResetSearch = (e) => {
    this.setState({
      ...this.state,
      showSearch: false,
      showSuggest: true,
      keyword: "",
    });
  };
  handleCategoryChange = (e) => {
    this.setState({ ...this.state, category: e.target.value });
  };
  handleGameClick = (gpcode,gpid) => {
    if (this.props.token) {
      window.open(
        `/${i18n.language}/joingame/${gpcode}/${gpid})}`)
    } else {
      this.props.history.push(
        `/${i18n.language}/}`
      );
    }
  };
  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, filterGame: newValue, page: 1 });
  };
  handleBookmarkClick = (id, collect_id) => {
    if (this.props.token) {
      if (collect_id > 0) {
        GameService.DeleteBookmarkSlotGame(collect_id).then((response) => {
          if (response.IsSuccess) {
            this.setState((preState) => {
              let newList = [];
              for (let k in this.state.gameList) {
                var item = this.state.gameList[k];
                if (item.id === id) {
                  item.collect_id = 0;
                  if (this.state.filterGame !== SlotFilterType.Bookmark) {
                    newList.push(item);
                  }
                } else {
                  newList.push(item);
                }
              }
              return { ...preState, gameList: newList };
            });
          } else {
          }
        });
      } else {
        GameService.BookmarkSlotGame(this.props.token, id).then((response) => {
          if (response.IsSuccess) {
            var collect_id = response.data;
            this.setState((preState) => {
              let newList = [];
              for (let k in this.state.gameList) {
                var item = this.state.gameList[k];
                if (item.id === id) {
                  item.collect_id = collect_id;
                }
                newList.push(item);
              }
              return { ...preState, gameList: newList };
            });
          } else {
          }
        });
      }
    }
  };
  render() {
    if (!this.props.game.homePageGameList) {
      return <></>;
    } else
      return (
        <Container>
          <Header
            token={this.props.token}
            balance={this.props.balance}
            onBackClick={this.handleBackClick}
            title={this.state.title}
            rightContent={
              <StyleSearchIcon
                style={{ fontSize: "60px" }}
                onClick={this.handleSearchClick}
              />
            }
          ></Header>
          <StyledAppBar>
            <Tabs
              value={this.state.filterGame}
              onChange={this.handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={i18n.t("slot.allGame")} value={SlotFilterType.All} />
              <Tab label={i18n.t("slot.hotGame")} value={SlotFilterType.Hot} />
              <Tab label={i18n.t("slot.newGame")} value={SlotFilterType.New} />
              {(() => {
                if (this.props.token) {
                  return (
                    <Tab
                      label={i18n.t("slot.bookmarkGame")}
                      value={SlotFilterType.Bookmark}
                    />
                  );
                } else {
                  return null;
                }
              })()}

              {(() => {
                if (this.props.token) {
                  return (
                    <Tab
                      label={i18n.t("slot.historyGame")}
                      value={SlotFilterType.Histroy}
                    />
                  );
                } else {
                  return null;
                }
              })()}
            </Tabs>
            <GameItemSelection>
              <GameItem
                selected={this.state.parentId === 0}
                onClick={() => this.handleParentChange(0)}
              >
                {i18n.t("slot.all")}
              </GameItem>
              {this.props.game.homePageGameList
                .filter((item) => item.type === this.state.gameType)
                .map((item) => {

                  return (
                    <GameItem
                      selected={this.state.parentId === item.game_platform_id}
                      onClick={() => this.handleParentChange(item.game_platform_id)}
                    >
                      {item.name}
                    </GameItem>
                  );
                })}


            </GameItemSelection>
          </StyledAppBar>

          <ListView>
            {this.state.gameList.map((row) => {
              return (
                <ListItem key={row.id}>
                  <LazyLoadImage
                    height={194}
                    width={344}
                    alt={""}
                    effect="blur"
                    src={row.file_url}
                    style={{ borderRadius: "20px 20px 0 0" }}
                    onClick={() => this.handleGameClick(row.gpcode,
                      row.id)}
                  />
                  <ListitemLabelBackground></ListitemLabelBackground>
                  <LeftContainer>
                    <GameProvider>{row.game_platform_id === 31 ? (this.state.gameType === GameTypeEnum.SLOT ? "KINGMAKER" : "REDTIGER") : row.game_platform_name}</GameProvider>
                    <GameName>{row.name}</GameName>
                  </LeftContainer>

                  <Bookmark
                    isBookmark={row.collect_id > 0}
                    onClick={() =>
                      this.handleBookmarkClick(row.id, row.collect_id)
                    }
                  ></Bookmark>
                </ListItem>
              );
            })}
            <BottomScrollListener onBottom={this.handleScrollBottom} />
          </ListView>
          <StyledModal
            open={this.state.showSearch}
            onClose={this.handleCloseSearch}
          >
            <SearchContainer>
              <SearchKeywordWrap>
                <SearchInputBG>
                  <SearchInput
                    placeholder={i18n.t("slot.search")}
                    type={"text"}
                    onChange={this.handleChangeKeyword}
                    value={this.state.keyword}
                  ></SearchInput>
                  <SearchInputButton
                    onClick={this.handleCloseSearch}
                  ></SearchInputButton>
                </SearchInputBG>
                <SearchCancelButton onClick={this.handleResetSearch}>
                  {i18n.t("common.cancel")}
                </SearchCancelButton>
              </SearchKeywordWrap>

            </SearchContainer>
          </StyledModal>
          <Loading show={this.state.loading}></Loading>
        </Container>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    game: state.game,
    balance: state.account.info.member_balance,
    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(withRouter(Slot));
