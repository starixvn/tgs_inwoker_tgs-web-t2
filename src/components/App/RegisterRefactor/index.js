import RegisterPc from "./RegisterPc";
import {RegisterProvider} from "../../Common/providers";

/** 此组件没有NotifyContentProvider 因为要用回之前的错误提示 enqueueSnackbar */
const RegisterRefactor = (props) => {
  return (
    <RegisterProvider>
      <RegisterPc {...props} />
    </RegisterProvider>)
}

export default RegisterRefactor;