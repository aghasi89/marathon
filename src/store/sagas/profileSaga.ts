import { takeLatest, all, put, debounce, select } from 'redux-saga/effects';
import { MessageResponse } from 'stream-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMarathonFinansicalApiAuthorizationHeader } from '../../services/api/finansicalInstance';
import { setMarathonApiAuthorizationHeader } from '../../services/api/mainInstance';
import { setMarathonApiFeedHeader } from '../../services/api/feedInstance';
import profileEP from '../../services/api/routes/profile';
import { IError, IRequestStatusType, IUserFeeds } from '../../types/types';
import generateChatGPTList from '../../utils/generateChatGptList';
import {
  setLocation,
  setProfileInfo,
  getGoogleLocation,
  setPersonInfo,
  specialities,
  languages,
  setSpecialities,
  setLanguages,
  setFeeds,
  setFollowers,
  setFollowings,
  setSearchUsers,
  setGeneratedMessage,
  setRegions,
  setMyPurchases,
  setMyCreatedFeedsByStatusAction,
} from '../actions/profile-action';
import { setError } from '../actions/administrative-action';
import { ProfileTypes } from '../costants';
import { setMarathonNotificationsApiAuthorizationHeader } from '../../services/api/notificationsInstance';

function* getProfileInfo({ cb }: any): Generator {
  try {
    const response: any = yield profileEP.profileInfo();
    if (response) {
      yield put(setProfileInfo(response));
      yield put(getGoogleLocation(response.location));
      yield put(languages());
      yield put(specialities());
      if (cb)
        cb(response)
    }
  } catch (ex: any) {
    if (ex.code === 'token_not_valid') {
      const data: IError = {
        title: 'Something went wrong',
        text: "Please login again",
        buttonTitle: 'OK',
      };
      yield put(setError(data));
      AsyncStorage.removeItem('accessToken')
      setMarathonApiAuthorizationHeader('');
      setMarathonApiFeedHeader('');
      setMarathonFinansicalApiAuthorizationHeader('');
      setMarathonNotificationsApiAuthorizationHeader('')
    }
  }
}

function* getPersonInfo({ id, cb }: any): Generator {
  try {
    const response: any = yield profileEP.personInfo(id);
    if (response) {
      yield put(setPersonInfo(response));
      cb();
    }
  } catch (ex: any) { }
}

function* getPersonInfoByUsername({ username, cb }: any): Generator {
  try {
    const response: any = yield profileEP.personInfoByUsername(username);
    if (response) {
      yield put(setPersonInfo(response));
      cb();
    }
  } catch (ex: any) { }
}

function* changeProfileInfo({ id, payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.changeProfileInfo(id, payload);
    if (response.status == 200) {
      cb();
    }
  } catch (ex: any) { }
}

function* setFiles({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.setFiles(payload);
    if (response) {
      cb(response);
    }
  } catch (ex: any) { }
}

function* changeEmail({ email, cb }: any): Generator {
  try {
    const response: any = yield profileEP.changeEmail(email);
    if (response.status == 201) {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* changePassword({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.changePassword(payload);
    if (response.status == 201) {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* resetPassword({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.resetPassword(payload);
    if (response.status == 200) {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* setPassword({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.setPassword(payload);
    if (response.status == 200) {
      cb();
    } else {
      const data: IError = {
        title: 'Something went wrong ...',
        text: response.message,
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  } catch (ex: any) { }
}

function* getLocation({ payload }: any): Generator {
  try {
    const response: any = yield profileEP.getLocation(payload);
    if (response) {
      yield put(setLocation(response[0].formatted_address));
    }
  } catch (ex: any) { }
}

function* getSpecialities(): Generator {
  try {
    const response: any = yield profileEP.getSpecialities();
    if (response) {
      yield put(setSpecialities(response));
    }
  } catch (ex: any) { }
}

function* getLanguages(): Generator {
  try {
    const response: any = yield profileEP.getLanguages();
    if (response) {
      yield put(setLanguages(response));
    }
  } catch (ex: any) { }
}

function* getFeeds({ payload, cb, params }: any): Generator {
  try {
    const response: any = yield profileEP.getFeeds({ ...payload, ...params });
    if (response) {
      yield put(setFeeds(response.results));
      cb();
    }
  } catch (ex: any) { }
}

function* getMyPurchases({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.getMyPurchases(payload);
    if (response) {
      yield put(setMyPurchases(response.results));
      cb();
    }
  } catch (ex: any) { }
}

function* followUser({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.followUser(payload);
    if (response) {
      cb && cb('success');
    }
  } catch (ex: any) {
    cb && cb('reject');
  }
}

function* getFollowers({ payload }: any): Generator {
  try {
    const response: any = yield profileEP.getFollowers(payload);
    if (response) {
      yield put(setFollowers(response));
    }
  } catch (ex: any) { }
}

function* getFollowings({ payload }: any): Generator {
  try {
    const response: any = yield profileEP.getFollowings(payload);
    if (response) {
      yield put(setFollowings(response));
    }
  } catch (ex: any) { }
}
function* getSearchUsers({ payload }: any): Generator {
  try {
    const response: any = yield profileEP.searchUser(payload);
    if (response) {
      yield put(setSearchUsers(response));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getRegions(): Generator {
  try {
    const response: any = yield profileEP.getRegions();
    if (response) {
      yield put(setRegions(response));
    }
  } catch (error) {
    console.log(error);
  }
}
function* getGeneratedMessage({ payload }: any): Generator {
  try {
    const messages = yield select(state => {
      return state.chatReducer.messages;
    });
    const id = yield select(state => {
      return state.profileReducer?.user?.get_stream_id | 1;
    });
    if (id) {
      const conversation = generateChatGPTList(
        messages as MessageResponse[],
        payload,
        id as number,
      );
      const data = {
        messages: conversation.map(message => ({
          content: message?.text,
          role: message?.user?.id !== id.toString() ? 'user' : 'assistant',
        })),
      };
      const response: any = yield profileEP.generateMessage(data);
      if (response) {
        yield put(setGeneratedMessage(response.message));
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function* getMyCreationsByStatus({
  payload,
  cb,
}: {
  payload: IUserFeeds;
  cb?: (status: IRequestStatusType) => void;
}): Generator {
  try {
    const response: any = yield profileEP.getMyCreatedFeedsByStatus(payload);
    if (response) {
      yield put(setMyCreatedFeedsByStatusAction(response));
      cb && cb('success');
    }
  } catch (error) {
    cb && cb('reject');
    console.log(error);
  }
}
function* getUserWithStream({ id, cb }: any): Generator {
  try {
    const response: any = yield profileEP.getUserWithStream(id);
    if (response) {
      yield put(setPersonInfo(response));
      cb();
    }
  } catch (ex: any) {
    console.log(ex, "ex")
  }
}
function* postCertificate({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.postCertificate(payload);
    if (response) {
      cb && cb();
    }
  } catch (ex: any) {
    console.log(ex, "ex")
  }
}
function* deleteCertificate({ id, cb }: any): Generator {
  try {
    const response: any = yield profileEP.deleteCertificate(id);
    if (response) {
      cb && cb();
    }
  } catch (ex: any) {
    console.log(ex, "ex")
  }
}
function* editCertificate({ payload, id, cb }: any): Generator {
  try {
    const response: any = yield profileEP.editCertificate(payload, id);
    console.log(response, "sagaaa");
    if (response) {
      cb && cb();
    }
  } catch (ex: any) {
    console.log(ex, "ex")
  }
}
function* setCoachPassword({ payload, cb }: any): Generator {
  try {
    const response: any = yield profileEP.setCoachPassword(payload);
    if (response) {
      cb();
    }
  } catch (ex: any) {
    console.log(ex, "ex")
  }
}

export function* watchProfileSaga() {
  yield all([
    takeLatest(ProfileTypes.GET_PROFILE_INFO as any, getProfileInfo),
    takeLatest(ProfileTypes.GET_PERSON_INFO as any, getPersonInfo),
    takeLatest(ProfileTypes.CHANGE_PROFILE_INFO as any, changeProfileInfo),
    takeLatest(ProfileTypes.GET_LACATION as any, getLocation),
    takeLatest(ProfileTypes.CHANGE_EMAIL as any, changeEmail),
    takeLatest(ProfileTypes.CHANGE_PASSWORD as any, changePassword),
    takeLatest(ProfileTypes.SET_PASSWORD as any, setPassword),
    takeLatest(ProfileTypes.GET_SPECIALITIES as any, getSpecialities),
    takeLatest(ProfileTypes.GET_LANGUAGES as any, getLanguages),
    takeLatest(ProfileTypes.SET_FILES as any, setFiles),
    takeLatest(ProfileTypes.GET_FEEDS as any, getFeeds),
    takeLatest(ProfileTypes.FOLLOW_USER as any, followUser),
    takeLatest(ProfileTypes.GET_FOLLOWERS as any, getFollowers),
    takeLatest(ProfileTypes.GET_FOLLOWINGS as any, getFollowings),
    debounce(1000, ProfileTypes.GET_SEARCH_USERS as any, getSearchUsers),
    takeLatest(ProfileTypes.GET_GENERATED_MESSAGE as any, getGeneratedMessage),
    takeLatest(ProfileTypes.GET_REGIONS as any, getRegions),
    takeLatest(ProfileTypes.GET_MY_PURCHASES as any, getMyPurchases),
    takeLatest(
      ProfileTypes.GET_MY_CREATIONS_BY_STATUS as any,
      getMyCreationsByStatus,
    ),
    takeLatest(ProfileTypes.GET_USER_WITH_STREAM as any, getUserWithStream),
    takeLatest(ProfileTypes.POST_CERTIFICATE as any, postCertificate),
    takeLatest(ProfileTypes.DELETE_CERTIFICATE as any, deleteCertificate),
    takeLatest(ProfileTypes.EDIT_CERTIFICATE as any, editCertificate),
    takeLatest(ProfileTypes.RESET_PASSWORD as any, resetPassword),
    takeLatest(ProfileTypes.GET_PERSON_INFO_BY_USERNAME as any, getPersonInfoByUsername),
    takeLatest(ProfileTypes.SET_COACH_PASSWORD as any, setCoachPassword),
  ]);
}
