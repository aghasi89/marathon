import { takeLatest, all, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMarathonApiAuthorizationHeader } from '../../services/api/mainInstance';
import { setMarathonFinansicalApiAuthorizationHeader } from '../../services/api/finansicalInstance';
import authorizationEP from '../../services/api/routes/auth';
import { IError } from '../../types/types';
import { ChatTypes, RegistrationTypes } from '../costants';
import { setError } from '../actions/administrative-action';
import { setMarathonApiFeedHeader } from '../../services/api/feedInstance';
import { setMarathonNotificationsApiAuthorizationHeader } from '../../services/api/notificationsInstance';

function* createConfirmCode({ payload, cb }: any): Generator {
  try {
    const { code }: any = yield authorizationEP.createConfirmCode(payload)
    if (code) {
      cb(code)
    }
  } catch (ex: any) {

  }
}
function* registration({ payload, cb, token }: any): Generator {
  try {
    const response: any = yield authorizationEP.register(payload, token)
    if (response.status == '201') {
      cb()
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK'
      }
      yield put(setError(data))
    }
  } catch (ex: any) {

  }
}
function* login({ payload, cb }: any): Generator {
  try {
    const response: any = yield authorizationEP.login(payload)
    if (response.status == '201') {
      setMarathonApiAuthorizationHeader(response.data.access)
      setMarathonApiFeedHeader(response.data.access)
      setMarathonFinansicalApiAuthorizationHeader(response.data.access)
      setMarathonNotificationsApiAuthorizationHeader(response.access)
      AsyncStorage.setItem('accessToken', JSON.stringify(response.data.access))
      cb()
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK'
      }
      yield put(setError(data))
    }
  } catch (ex: any) {
    console.log(ex, "error");
  }
}
function* socialLogin({ payload, cb }: any): Generator {
  try {
    const response: any = yield authorizationEP.authSocialLogin(payload)
    if (response.access) {
      setMarathonApiAuthorizationHeader(response.access)
      setMarathonApiFeedHeader(response.access)
      setMarathonFinansicalApiAuthorizationHeader(response.access)
      setMarathonNotificationsApiAuthorizationHeader(response.access)
      AsyncStorage.setItem('accessToken', JSON.stringify(response.access))
      cb({ message: 'Success' })
    } else {
      cb(response)
    }
  } catch (ex: any) {
    console.log(ex, "exxxxx");
  }
}
function* forgetPassword({ payload, cb }: any): Generator {
  try {
    const response: any = yield authorizationEP.forgetPassword(payload)
    if (response.status == 200) {
      cb()
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.detail,
        buttonTitle: 'OK'
      }
      yield put(setError(data))
    }
  } catch (ex: any) {

  }
}
function* initFirebase({ payload }: any): Generator {
  try {
    yield authorizationEP.postFirebaseToken(payload)
  } catch (ex: any) {
    console.log(ex, "exxxxx");
  }
}
function* deleteFirebasePushToken({ payload }: any): Generator {
  try {
    yield authorizationEP.deleteFirebasePushToken(payload)
  } catch (ex: any) {
    console.log(ex, "exxxxx");
  }
}
function* sendAddMemberNotification({ payload }: any): Generator {
  try {
    yield authorizationEP.sendAddedMemberNotification(payload)
  } catch (ex: any) {
    console.log(ex, "exxxxx");
  }
}
function* emailVerify({ payload, cb }: any): Generator {
  try {
    const response: any = yield authorizationEP.emailVerify(payload);
    if (response.status === 200) {
      cb("sended")
    } else {
      cb("")
    }
  } catch (ex: any) {
    console.log(ex, "exxxxx");
  }
}

export function* watchAuthSaga() {
  yield all([
    takeLatest(RegistrationTypes.SET_REGISTER as any, registration),
    takeLatest(RegistrationTypes.SET_LOGIN as any, login),
    takeLatest(RegistrationTypes.SET_SOCIAL_LOGIN as any, socialLogin),
    takeLatest(RegistrationTypes.SET_FORGET_PASSWORD as any, forgetPassword),
    takeLatest(RegistrationTypes.CREATE_CONFIRM_CODE as any, createConfirmCode),
    takeLatest(RegistrationTypes.INIT_NOTIFICATION as any, initFirebase),
    takeLatest(RegistrationTypes.DELETE_PUSH_TOKEN as any, deleteFirebasePushToken),
    takeLatest(ChatTypes.SEND_ADD_MEMBER_NOTIFICATION as any, sendAddMemberNotification),
    takeLatest(RegistrationTypes.EMAIL_VERIFY as any, emailVerify)
  ]);
}