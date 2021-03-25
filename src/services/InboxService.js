import { ApiService } from "./ApiService";

export const InboxService = {
  InboxList,
  UpdateReadMessage,
  DeleteMessage,
};

function InboxList(page, limit) {
  const result = ApiService.get(
    `pc/customerService/systemNoticeList?page=${page}&page_size=${limit}`
  );

  return result;
}

function UpdateReadMessage(token, id) {
  const result = ApiService.post(
    "member/messageRead",
    {
      token,
      id,
    },
    true
  );

  return result;
}
function DeleteMessage(token, id) {
  const result = ApiService.post(
    "member/messageDelete",
    {
      token,
      id,
    },
    true
  );

  return result;
}
