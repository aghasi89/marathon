import { ILogin, IPostFirebaseToken, IRegister } from "../../types/types";
import { RegistrationTypes } from "../costants";

export const setLogin = (payload: ILogin, cb: () => void) => {
  return {
    type: RegistrationTypes.SET_LOGIN,
    payload,
    cb
  };
};
export const setSocialLogin = (payload: any, cb: (response: any) => void) => {
  return {
    type: RegistrationTypes.SET_SOCIAL_LOGIN,
    payload,
    cb
  };
};
export const setRegister = (payload: IRegister, cb: () => void, token?: string,) => {
  return {
    type: RegistrationTypes.SET_REGISTER,
    payload,
    token,
    cb
  };
};
export const createConfirmCode = (payload: string, cb: (confirm_code: string) => void) => {
  return {
    type: RegistrationTypes.CREATE_CONFIRM_CODE,
    payload,
    cb
  };
};
export const setForgetPassword = (payload: string, cb: () => void) => {
  return {
    type: RegistrationTypes.SET_FORGET_PASSWORD,
    payload,
    cb
  };
};
export const setIsNew = (payload: string) => {
  return {
    type: RegistrationTypes.SET_IS_NEW,
    payload,
  };
};
export const setIsLogin = (payload: boolean) => {
  return {
    type: RegistrationTypes.SET_IS_LOGIN,
    payload,
  };
};
export const setToken = (payload: string | undefined, assignCoachInfo: boolean, email?: string) => {
  return {
    type: RegistrationTypes.SET_TOKEN,
    payload,
    assignCoachInfo,
    email,
  };
};
export const setSelectedRole = (payload: string) => {
  return {
    type: RegistrationTypes.SET_SELECTED_ROLE,
    payload,
  };
};
export const initFirebaseNotification = (payload: IPostFirebaseToken) => {
  return {
    type: RegistrationTypes.INIT_NOTIFICATION,
    payload,
  };
};
export const deleteFirebasePushToken = (payload: IPostFirebaseToken) => {
  return {
    type: RegistrationTypes.DELETE_PUSH_TOKEN,
    payload,
  };
};
export const emailVerify = (payload: any, cb: (type: string) => void) => {
  return {
    type: RegistrationTypes.EMAIL_VERIFY,
    payload,
    cb
  }
}