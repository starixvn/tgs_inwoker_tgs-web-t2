import config from "../config/config"
export const SupportService = {
  GetLiveSupport,
};

function GetLiveSupport(user_id, name, memo, enter_url, page_referrer) {
  const result = {
    IsSuccess: true,
    data: { online: `https://go.crisp.chat/chat/embed/?website_id=${config.CRISP_WEBSITE_ID}&user_nickname=${name}` }
  }

  return result;
}
