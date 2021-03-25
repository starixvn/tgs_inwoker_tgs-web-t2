import {
  KYGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_BEGIN,
  GETHOMEPAGEGAMELIST_SUCCESS,
  GETHOMEPAGEGAMELIST_FAIL,
  GETGAMEPLATFORMLIST_BEGIN,
  GETGAMEPLATFORMLIST_SUCCESS,
  GETGAMEPLATFORMLIST_FAIL,
} from "../constants/actionType";
import { GameTypeEnum } from "../utils/Enum"
const initialState = {
  pending: false,
  kyGameList: [],
  kyHotGameList: [],
  homePageGameList: [],
  error: null,
};
const gameImageMapping = {
  Wm: {
    pcHeaderMenu: "/assets/images/submenu-live-agv2.png",
  },
  Sa: {
    pcHeaderMenu: "/assets/images/submenu-live-bbinv2.png",
  },
  Ab: {
    pcHeaderMenu: "/assets/images/submenu-live-dgv2.png",
  },
  Bg: {
    pcHeaderMenu: "/assets/images/submenu-live-mgv2.png",
  },
  default: {
    pcHeaderMenu: "",
  },
};

export function gameReducer(state = initialState, action) {

  switch (action.type) {
    case KYGAMELIST_SUCCESS:
      return {
        ...state,
        kyGameList: action.payload.data.list,
        kyHotGameList: action.payload.data.hot_list,
      };
    case GETHOMEPAGEGAMELIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        homePageGameList: [],
      };
    case GETHOMEPAGEGAMELIST_SUCCESS:
      var gameList = action.payload.data;
      var list = [];
      for (var i = 0; i < gameList.length; i++) {
        for (var x = 0; x < gameList[i].gametypes.length; x++) {
          list.push({
            abbreviation: gameList[i].code,
            game_platform_id: 0,
            game_platform_name: gameList[i].name,
            is_try: 2,
            name: gameList[i].name,
            params: null,
            type: gameList[i].gametypes[x],
            status: gameList[i].status,
          })
        }

      }


      return {
        ...state,
        homePageGameList: list,
        loading: false,
      };
    case GETHOMEPAGEGAMELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        homePageGameList: [],
        loading: false,
      };
    case GETGAMEPLATFORMLIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        gamePlatformList: [],
      };
    case GETGAMEPLATFORMLIST_SUCCESS:
      return {
        ...state,
        gamePlatformList: action.payload.data,
        loading: false,
      };
    case GETGAMEPLATFORMLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        gamePlatformList: [],
        loading: false,
      };
    default:
      return state;
  }
}
function formatSorting(type) {
  switch (type) {
    case 4:
      return 20;
    case 7:
      return 22;
    case 8:
      return 21;
    default:
      return type;
  }
}