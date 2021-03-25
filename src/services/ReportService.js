import { ApiService } from "./ApiService";

export const ReportService = {
  GetAccountDetails,
  GetTransactionDetails,
  GetDailyDetails,
  GetWithdrawalDetails,
  GetDepositDetails,
};

function GetAccountDetails(start, end, page, game_platform_id = 0) {
  const result = ApiService.get(
    "pc/userTransform?" +
    "start_time=" +
    start +
    "+00:00:00" +
    "&end_time=" +
    end +
    "+23:59:59" +
    "&page=" +
    page +
    (game_platform_id !== 0 ? "&game_platform_id=" + game_platform_id : "")
  );

  return result;
}
function GetTransactionDetails(start, end, page, game_platform_id) {
  const result = ApiService.get(
    "Player/report/rounds?" +
    "&from=" + start + " 00:00:00" +
    "&To=" + end + " 23:59:59" +
    "&ShowAll="+ false +
    "&Rows=10"+
    "&OrderBy=1"+
    "&SortBy=createdOn"+
    "&Page="+2
    // +"&ShowAll=true"
  );
  return result;
}
function GetDailyDetails(
  token,
  start,
  end,
  thirdparty_type = 0,
  thirdparty_id = 0
) {
  const result = ApiService.get(
    "member/dayStatistics?token=" +
    token +
    "&start=" +
    start +
    "&end=" +
    end +
    "&thirdparty_id=" +
    (thirdparty_type === 0 ? "" : thirdparty_id) +
    "&thirdparty_type=" +
    thirdparty_type +
    "&thirdparty_parent_id=" +
    (thirdparty_type === 0 ? thirdparty_id : "")
  );

  return result;
}
function GetWithdrawalDetails(dateFrom, dateTo, page, status) {
  const result = ApiService.get(
    "pc/withdraw?" +
    "start_time=" +
    dateFrom +
    "+00:00:00" +
    "&end_time=" +
    dateTo +
    "+23:59:59" +
    "&page=" +
    page +
    "&status=" +
    status
  );

  return result;
}

function GetDepositDetails(dateFrom, dateTo, page, check_status) {
  const result = ApiService.get(
    "pc/userRecharge/list?" +
    "start_time=" +
    dateFrom +
    "+00:00:00" +
    "&end_time=" +
    dateTo +
    "+23:59:59" +
    "&page=" +
    page +
    "&check_status=" +
    check_status
  );

  return result;
}
