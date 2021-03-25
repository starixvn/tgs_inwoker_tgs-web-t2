import { ApiService } from "./ApiService";
import config from "../config/config";
export const GeneralService = {
  CheckIPRestrict,
  AffiliateClick,
  GetMobilePrefix,
  GetSiteToken
};
function GetSiteToken() {
  const result = ApiService.post("Auth/jwt", { client: config.client, currency: config.currency });

  return result;
}
function CheckIPRestrict() {
  const result = ApiService.post("index/ipCheck", {}, true);

  return result;
}
function GetMobilePrefix() {
  const result = ApiService.get("api/mobileCode");

  return result;
}

function AffiliateClick(promotion_id, promotion_channel_id) {
  const result = ApiService.post(
    "index/click",
    {
      from: config.from,
      promotion_id,
      promotion_channel_id,
    },
    true
  );

  return result;
}
