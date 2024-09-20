import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import { useRegisterForm, useRegisterHandle } from "../../Common/hooks/pages/register";
import { RegisterContext } from "../../Common/contexts";
import clsx from "clsx";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";

import {useStyles,VerificationWrapper, Container, CloseIconContainer, FormContainer,Description,TitleContainer,CustomTextWrapper, CustomText, CustomInvitationContainer, CustomInvitationSelect,PhoneFieldDropdown, 
    CustomText2, DescriptionContainer, ButtonLoginLabel, ButtonLogin} from './styles'



const Verification = ({ code, changeCode, getCode, countdown = 0 }) => {
    return (
        <VerificationWrapper>
            <input
                type="text"
                placeholder={i18n.t("common.msgEnterCode")}
                value={code}
                onChange={changeCode}
            />
            <button
                onClick={() => {
                    getCode();
                }}
                disabled={countdown > 0}
            >
                {countdown <= 0
                    ? i18n.t("common.msgSendToken")
                    : i18n.t("common.btnTokenResendLabel") + "(" + countdown + "s)"}
            </button>
        </VerificationWrapper>
    );
};


const RegisterPc = (props) => {
    useEffect(() => {
        console.log("RegisterPc v9.19.1");
    }, []);
    const { onHandleClose, onHandleLoginSuccess } = props;
    const { performNewRegister, performGetCode, states } = useRegisterForm();
    const { countdown, prefill, fromCustomDomain, haveAffiliate } = states;
    const {
        handleChangeUserName, handleChangePwd, handleChangePwd2, handleChangePhone, handleChangePromotion,
        handleTncClick, handleChangeAreaCode, handleChangeUpper, handleChangeCode, handleChangePromoteType
    } = useRegisterHandle();
    const { formData, setFormData } = useContext(RegisterContext);

    const onClickRegister = () => {
        performNewRegister(false, onHandleLoginSuccess);
    }
 

    const classes = useStyles();
    return (
        <Container>
            <CloseIconContainer
                viewBox="4 4 16 16"
                onClick={onHandleClose}
            ></CloseIconContainer>
            <div className="clear"></div>
            <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
            <FormContainer>
                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangeUserName}
                        id="username"
                        value={formData.username}
                        placeholder={i18n.t("web.register.username")}
                        variant="outlined"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 16,
                        }}
                    />
                </CustomTextWrapper>
                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangePwd}
                        id="password"
                        value={formData.password}
                        placeholder={i18n.t("web.register.password")}
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 20,
                        }}
                    />
                </CustomTextWrapper>
                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangePwd2}
                        id="password2"
                        value={formData.password2}
                        placeholder={i18n.t("web.register.confirmPassword")}
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 20,
                        }}
                    />
                </CustomTextWrapper>

                {!(config.features.Register_HideInvitation && fromCustomDomain) && (
                    <CustomTextWrapper>
                        <CustomInvitationContainer>
                            <CustomText
                                onChange={
                                    formData.promoteType === "a" ? handleChangePromotion : handleChangeUpper
                                }
                                value={formData.promoteType === "a" ? formData.promotionId : formData.upper}
                                id="code"
                                placeholder={i18n.t("web.register.promoteCode")}
                                variant="outlined"
                                inputProps={{ disabled: prefill }}
                            />
                            {haveAffiliate && (
                                <CustomInvitationSelect
                                    disabled={prefill}
                                    value={formData.promoteType}
                                    selected={formData.promoteType}
                                    onChange={handleChangePromoteType}
                                >
                                    <option value="a">{i18n.t("usertype.agent")}</option>
                                    <option value="p">{i18n.t("usertype.player")}</option>
                                </CustomInvitationSelect>
                            )}
                        </CustomInvitationContainer>
                    </CustomTextWrapper>
                )}
                <PhoneFieldDropdown
                    native
                    variant="outlined"
                    value={formData.areacode}
                    displayEmpty
                    onChange={handleChangeAreaCode}
                >
                    <option value={config.features.PhonePrefix} disabled>
                        {config.features.PhonePrefix}
                    </option>
                </PhoneFieldDropdown>
                <CustomText2
                    onChange={handleChangePhone}
                    id="phone"
                    value={formData.phone}
                    placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    inputProps={{
                        maxLength: config.features.MAX_PHONE_LENGTH || 10,
                    }}
                />
                <div className="clear"></div>
                <Verification
                    code={formData.code}
                    changeCode={handleChangeCode}
                    getCode={performGetCode}
                    countdown={countdown}
                />
                <div class="clear"></div>

                <DescriptionContainer>
                    <Checkbox
                        checked={formData.tnc}
                        className={classes.checkboxRoot}
                        onClick={handleTncClick}
                        checkedIcon={
                            <span className={clsx(classes.icon, classes.checkedIcon)} />
                        }
                        icon={<span className={classes.icon} />}
                    />
                    <Description>{i18n.t("web.register.contract")}</Description>
                </DescriptionContainer>

                <ButtonLogin onClick={onClickRegister}>
                    <ButtonLoginLabel>
                        {i18n.t("web.register.btn")}
                    </ButtonLoginLabel>
                </ButtonLogin>
            </FormContainer>
        </Container>
    )
}


export default RegisterPc;