import { IReducer } from "../../types/types";

export const isNewnSelector = (state: IReducer) => state.registrationReducer.isNew;
export const isLoginSelector = (state: IReducer) => state.registrationReducer.isLogin;
export const roleModeSelector = (state: IReducer) => state.registrationReducer.role_mode;
export const tokenSelector = (state: IReducer) => state.registrationReducer.token;
export const emailSelector = (state: IReducer) => state.registrationReducer.email;
export const assignCoachInfoSelector = (state: IReducer) => state.registrationReducer.assignCoachInfo;