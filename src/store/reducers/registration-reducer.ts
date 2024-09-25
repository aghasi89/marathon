import { RegistrationTypes } from '../costants';

export interface IAuth {
  isNew: undefined | string,
  isLogin: undefined | boolean,
  role_mode: string,
  token: undefined | string,
  email: undefined | string,
  assignCoachInfo: boolean
}

export const initialState: IAuth = {
  isNew: undefined,
  isLogin: false,
  role_mode: '',
  token: undefined,
  email: undefined,
  assignCoachInfo: false
};

const registrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RegistrationTypes.SET_IS_NEW:
      return {
        ...state,
        isNew: action.payload,
      };
    case RegistrationTypes.SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case RegistrationTypes.SET_SELECTED_ROLE:
      return {
        ...state,
        role_mode: action.payload,
      };
    case RegistrationTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        assignCoachInfo: action.assignCoachInfo,
        email: action.email
      };
    default:
      return state;
  }
};
export default registrationReducer;
