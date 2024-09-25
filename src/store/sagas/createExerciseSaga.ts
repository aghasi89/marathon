import {takeLatest, put, takeEvery, select} from 'redux-saga/effects';
import {IMediaSize, IUploadImage} from '../../types/types';
import {uploadMediaToBunny} from '../../utils/bunny.net';
import {setLoadingAction} from '../actions/administrative-action';
import uploadingProgress from '../../utils/bunny.net/videoUploadingProgress';
import {
  getExerciseVideoUploadProgressAction,
  setMediaAction,
} from '../actions/createExercise-action';
import {CreateExerciseTypes} from '../costants';
import { profileSelector } from '../selectors/profile-selector';

function* uploadMediaForExerciseCreating({
  payload: {mediaList, size},
}: {
  payload: {
    mediaList: IUploadImage[];
    size: IMediaSize;
  };
}): Generator {
  try {
    const user:any = yield select(profileSelector)
    for (let index = 0; index < mediaList.length; index++) {
      const media = mediaList[index];
      const type: any = media?.mime?.split('/')[0];
      if (type === 'video' || type === 'image') {
        const public_key: any = yield uploadMediaToBunny(media, type,user.id,'feed');
        if (type === 'video') {
          yield put(getExerciseVideoUploadProgressAction(public_key, size));
        }
      }
    }
    yield put(setLoadingAction(false));
  } catch (error) {
    console.log(error);
  }
}

function delay(second: number) {
  return new Promise(r => {
    setTimeout(() => r(false), second * 1000);
  });
}
function* getVideoUploadProgress({
  public_key,
  size,
}: {
  public_key: string;
  size: IMediaSize;
}): Generator {
  try {
    let inProgress: any = true;
    while (true) {
      const res: any = yield uploadingProgress({public_key});
      yield put(
        setMediaAction([
          {
            url: public_key,
            uploadingProgress: res.encodeProgress,
            height: res.height,
            width: res.width,
            size,
            type: 'video',
            inProgress,
          },
        ]),
      );
      if (!inProgress) {
        break;
      } else {
        yield delay(2);
      }
      if (res.encodeProgress === 100) {
        inProgress = false;
      }
    }
  } catch (error) {
    console.log(error, 'getVideoUploadProgress error');
  }
}
export function* watchCreateExerciseSaga() {
  yield takeLatest(
    CreateExerciseTypes.UPLOAD_EXERCISE_MEDIA_CREATING as any,
    uploadMediaForExerciseCreating,
  );
  yield takeEvery(
    CreateExerciseTypes.GET_VIDEO_UPLOADING_PROGRESS as any,
    getVideoUploadProgress,
  );
}
