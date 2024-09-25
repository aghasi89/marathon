import { put, select, takeLatest } from 'redux-saga/effects';
import { IUploadImage } from '../../types/types';
import { ImageDirectoryType, uploadMediaToBunny } from '../../utils/bunny.net';
import { AdministrativeTypes } from '../costants';
import administratives from '../../services/api/routes/administrative';
import { setLocationAction } from '../actions/administrative-action';
import { getData } from '../../utils/local_storage';
import { GoogleConfigs } from '../../utils/googleConfigs';
import { profileSelector } from '../selectors/profile-selector';

function* uploadImageToBunny({
  mediaList,
  imageDir,
  cb,
}: {
  mediaList: IUploadImage[];
  imageDir?: ImageDirectoryType
  cb?: (public_key: string) => void;
}): Generator {
  try {
    const user: any = yield select(profileSelector)
    for (let index = 0; index < mediaList.length; index++) {
      const media = mediaList[index];
      const type: any = media?.mime?.split('/')[0];
      if (type === 'video' || type === 'image') {
        const public_key: any = yield uploadMediaToBunny(media, type, user.id, imageDir);
        if (type === 'image' && public_key) {
          cb && cb(public_key);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function* getLocation({ payload }: { payload: string[] | string }): Generator {
  try {
    const languageSelector: any = yield getData('selectedLanguage');
    let language: string;
    switch (languageSelector.code) {
      case 'UK':
        language = 'en';
        break;
      case 'AM':
        language = 'hy';
        break;
      default:
        language = languageSelector.code.toLowerCase();
        break;
    }
    console.log(payload, 'payyy');

    if (Array.isArray(payload)) {
      console.log(payload, 'kmtnii');
      const results = [];
      for (let index = 0; index < payload.length; index++) {
        const element = payload[index];
        const res: any = yield administratives.getLocation(
          element,
          GoogleConfigs.api_key,
          language,
        );
        if (res) {
          results.push(res)
        }
      }
      yield put(setLocationAction(results));
    } else {
      const res: any = yield administratives.getLocation(
        payload,
        GoogleConfigs.api_key,
        language,
      );
      if (res) {
        yield put(setLocationAction(res.results));
      }
    }
  } catch (error) {
    console.log('Error when get location', error);
  }
}
export function* watchAdministrariveSaga() {
  yield takeLatest(
    AdministrativeTypes.UPLOAD_IMAGE_TO_BUNNY as any,
    uploadImageToBunny,
  );
  yield takeLatest(AdministrativeTypes.GET_LOCATION as any, getLocation);
}
