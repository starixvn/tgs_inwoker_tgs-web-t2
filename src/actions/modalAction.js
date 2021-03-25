import { SHOW_MODAL } from "../constants/actionType";
export const showModal = pageName => ({
  pageName,
  type: SHOW_MODAL
});
