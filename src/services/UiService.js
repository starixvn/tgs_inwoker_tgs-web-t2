import { ApiService } from "./ApiService";

export const UiService = {
  GetMarquee,
  GetBanner,
};

function GetBanner() {
  const result = ApiService.get("pc/advertisement?type=0");

  return result;
}
function GetMarquee() {
  const result = ApiService.get("announcement/list");

  return result;
}
