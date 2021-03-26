import { ApiService } from "./ApiService";
import { GameEnum, SlotFilterType } from "../utils/Enum";
import config from "../config/config";
import i18n from "../utils/i18n";
export const GameService = {
  JoinAGLiveGame,
  JoinBBINLiveGame,
  JoinDGLiveGame,
  JoinGDLiveGame,
  JoinMGLiveGame,
  JoinLotteryGame,
  JoinQipaiGame,
  GetSlotGameList,
  BookmarkSlotGame,
  DeleteBookmarkSlotGame,
  GetBookmarkGameList,
  GetGameList,
  JoinSportsbook,
  GetSportsbookHomePage,
  GetKYGameList,
  GetHistoryGameList,
  GetJackpotPrizePool,
  JoinGame,
  JoinLobbyGame,
  GetHomePageGameList,
  GetGamePlatformByType,
};

function JoinAGLiveGame(token, game_type, return_url = window.location.href) {
  const result = ApiService.get(
    "casino/ag?token=" +
    token +
    "&game_type=" +
    game_type +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}
function JoinBBINLiveGame(token, game_code, return_url = window.location.href) {
  const result = ApiService.get(
    "casino/bbin?token=" +
    token +
    "&game_code=" +
    game_code +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}
function JoinDGLiveGame(token, return_url = window.location.href) {
  const result = ApiService.get(
    "casino/dg?token=" +
    token +
    "&from=" +
    config.from +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}

function JoinGDLiveGame(token, return_url = window.location.href) {
  const result = ApiService.get(
    "casino/gd?token=" +
    token +
    "&from=" +
    config.from +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}

function JoinMGLiveGame(token, return_url = window.location.href) {
  const result = ApiService.get(
    "casino/mg?token=" +
    token +
    "&from=" +
    config.from +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}
function JoinLotteryGame(token, kind, return_url = window.location.href) {
  const result = ApiService.post(
    "Ticket/play",
    {
      token,
      kind,
      from: config.from,
      return_url: return_url,
    },
    true
  );

  return result;
  // const result = ApiService.get("Ticket/play/" + game + "?token=" + token);

  // return result;
}
function JoinQipaiGame(
  token,
  game,
  kind = "",
  return_url = window.location.href
) {
  const result = ApiService.get(
    "chess/" +
    (game === GameEnum.BL ? "eoLinker" : game) +
    "?token=" +
    token +
    (kind.trim() !== ""
      ? "&" + (game === GameEnum.BL ? "game_code=" : "kind=") + kind.trim()
      : "") +
    "&return_url=" +
    encodeURIComponent(return_url)
  );

  return result;
}

function GetJackpotPrizePool() {
  const result = ApiService.get("game/jackpot");

  return result;
}

function JoinSportsbook(token, game_type, return_url = window.location.href) {
  let endpoint = "";
  if (game_type === GameEnum.Sabah) {
    endpoint = "oneWork";
  } else if (game_type === GameEnum._633) {
    endpoint = "gb";
  }

  const result = ApiService.get(
    "sport/" +
    endpoint +
    "?token=" +
    token +
    "&from=" +
    config.from +
    "&return_url=" +
    encodeURIComponent(return_url)
  );
  return result;
}
function GetSportsbookHomePage() {
  const result = ApiService.get("sport/index");
  return result;
}
function GetBookmarkGameList(type, page, limit) {
  const result = ApiService.get(
    `pc/userGameCollect?type=${type}&page=${page}&page_size=${limit}`
  );

  return result;
}
function GetHistoryGameList(type, page, limit) {
  const result = ApiService.get(
    `pc/userGameHistoryLog?type=${type}&page=${page}&page_size=${limit}`
  );

  return result;
}
function GetSlotGameList(
  gpCode
) {
  const result = ApiService.get(`Game/list?gpcode=${gpCode}&platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}&gametypes=15`);
  return result;
}
function BookmarkSlotGame(token, game_id) {
  const result = ApiService.post(
    "pc/userGameCollect",
    {
      game_id,
    },
    true
  );

  return result;
}
function DeleteBookmarkSlotGame(collect_id) {
  const result = ApiService.del("pc/userGameCollect/" + collect_id);

  return result;
}
function GetGameList() {
  const result = ApiService.get(`Game/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}&gpcode=sbo`);
  return result;
}
function GetKYGameList(token) {
  const result = ApiService.get(
    "chess/index?token=" + token + "&is_pc=" + config.isPC
  );
  return result;
}
function GetHomePageGameList() {
  //ApiService.get(`Game/lobby/geturl`);
  const result = ApiService.get(`GameProvider/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`);
  return result;
}
function JoinLobbyGame(gameType, gameCode) {
  const result = ApiService.get(`Game/lobby/geturl?gpcode=${gameCode}&gtype=${gameType}&language=${i18n.language}`);

  return result;
}
function JoinGame(gameType, gameCode) {
  const result = ApiService.get(`Game/geturl?gpcode=${gameType}&gid=${gameCode}&language=${i18n.language}`);

  return result;
}
function GetGamePlatformByType(type) {
  const result = ApiService.get(
    `GameProvider/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`
  );
  return result;
}
