import RestApi from '../RestApi';
import mainApi from '../mainInstance';
import { IAddedMember, ILogin, IPostFirebaseToken, IRegister, ISocialLogin } from '../../../types/types';
import notificationsApi from '../notificationsInstance';

class AuthorizationEP extends RestApi<any> {
  routeName = '';
  createConfirmCode = async (email: string) => {
    try {
      const res = await mainApi.post(`create-conf-code/`, { email: email });
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  register = async (payload: IRegister, token?: string) => {
    try {
      const res = await mainApi.post(token ? `register/?token=${token}` : `register/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  login = async (payload: ILogin) => {
    try {
      const res = await mainApi.post(`login/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  authSocialLogin = async (payload: ISocialLogin) => {
    try {
      const res = await mainApi.post(`social/`, payload);
      return res.data;
    } catch (ex: any) {
      return ex.response.data
    }
  };
  forgetPassword = async (email: string) => {
    try {
      const res = await mainApi.post(`send-forget-code/`, { email: email });
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
  postFirebaseToken = async (payload: IPostFirebaseToken) => {
    try {
      const res = await notificationsApi.post(`push-token/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
  deleteFirebasePushToken = async (payload: IPostFirebaseToken) => {
    try {
      const res = await notificationsApi.post(`delete-push-token/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
  sendAddedMemberNotification = async (payload: IAddedMember) => {
    try {
      const res = await mainApi.post(`/add-in-chat/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
  emailVerify = async (payload: any) => {
    try {
      const res = await mainApi.post(`/email-verification/`, payload);
      return res;
    } catch (ex: any) {
      return ex.response.data
    }
  }
}

const authorizationEP = new AuthorizationEP();

export default authorizationEP;
