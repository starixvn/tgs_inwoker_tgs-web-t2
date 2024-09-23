import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { AccountService } from "../../../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../../../utils/ErrorSwitcher";
import i18n from "../../../../../utils/i18n";
import config from "../../../../../config/config";
import Default from "./default";
import Approved from "./approved";
import WaitingVerification from "./waiting-verification";
import { useBaseInfo } from "../../../../Common/hooks/pages/profile";

function IDVerification(props) {
  const { playerIdentityAuthenticationEnabled, getComType } = useBaseInfo()
  const [memberName, setMemberName] = useState(props.account.info.member_name);
  const [memberCard, setMemberCard] = useState(
    props.account.info.member_card_no
  );

  const [icUpload, setICUpload] = useState("");

  const [view, setView] = useState("");

  const onhandleNameChange = (e) => {
    setMemberName(e.target.value);
  };
  const onhandleIDChange = (e) => {
    setMemberCard(e.target.value);
  };

  var currentFormStatus = props.account.info.identityformstatus;
  var hasSubmitted = props.account.info.identityformid ? true : false;

  useEffect(() => {
    if (props.edit) {
      setView("waiting-submit");
    } else if (props.account.info.member_name && !playerIdentityAuthenticationEnabled) {
      setView("approved");
    } else {
      setView(getComType())
    }
  }, []);

  const onhandleClick = () => {
    if (!memberName) {
      props.enqueueSnackbar(i18n.t("profile.nameVerify.msgPlsEnterName"), {
        variant: "error",
      });
      return;
    }
    if (playerIdentityAuthenticationEnabled && !memberCard) {
      props.enqueueSnackbar(i18n.t("profile.nameVerify.msgPlsEnterICNum"), {
        variant: "error",
      });
      return;
    }

    if (playerIdentityAuthenticationEnabled && icUpload === "") {
      props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateMemberNameAndIC(
      memberName,
      memberCard,
      playerIdentityAuthenticationEnabled ? icUpload[0] : null
    ).then((response) => {
      if (response.IsSuccess) {
        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_name: memberName,
            identityformstatus: 0,
            identityformid: "confirm not empty",
          },
        });
        props.handleCloseDialog();
      } else {
        props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
          variant: "error",
        });
      }
    });
  };
  var check_pass_account = false;
  if (config.features.ICVerification) {
    if (
      props.account.info.member_name !== "" &&
      props.account.info.member_name !== null
    ) {
      check_pass_account = props.account.info.check_pass_account;
    }
  } else {
    check_pass_account = props.account.info.check_pass_account;
  }

  function handleFileChange(e) {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 5120) {
        props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        setICUpload(files);
      }
    }
  }

  const commonprops = {
    onhandleNameChange: onhandleNameChange,
    onhandleIDChange: onhandleIDChange,
    handleFileChange: handleFileChange,
    onhandleClick: onhandleClick,
    account: props.account,
    check_pass_account: check_pass_account,
    handleCSClick: props.handleCSClick,
    icUpload: icUpload,
    edit: props.edit,
  };

  const sceneSwitcher = (scene) => {
    switch (scene) {
      case "waiting-verification":
        return <WaitingVerification {...commonprops} />;
      case "approved":
        return <Approved {...commonprops} />;
      case "waiting-submit":
        return <Default {...commonprops} showInfo={playerIdentityAuthenticationEnabled} />;
      case "reject":
        return <Default {...commonprops} showInfo={playerIdentityAuthenticationEnabled} />;
      default:
        return <Default {...commonprops} showInfo={playerIdentityAuthenticationEnabled} />;
    }
  };
  return sceneSwitcher(view);
}

export default connect(null, null)(withSnackbar(IDVerification));
