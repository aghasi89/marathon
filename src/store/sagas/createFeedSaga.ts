import {takeLatest, put, takeEvery, select, call} from 'redux-saga/effects';
import {CreateFeedTypes} from '../costants';
import {
  ICreateFeed,
  IFeedMediaItem,
  IFeedTypes,
  IMediaForTypes,
  IMediaSize,
  IUploadImage,
} from '../../types/types';
import {uploadMediaToBunny} from '../../utils/bunny.net';
import uploadingProgress from '../../utils/bunny.net/videoUploadingProgress';
import {
  getVideoUploadProgressAction,
  setContextAction,
  setMediaAction,
  setVideoUploadProgressAction,
} from '../actions/createFeed-action';
import {MEDIA_PATH} from '../../types/enums';
import {editFeedAction} from '../actions/feed-action';
import {setLoadingAction} from '../actions/administrative-action';
import {createFeedStateSelector} from '../selectors/create-feed-selector';
import { profileSelector } from '../selectors/profile-selector';
import uploadVideoToBunny from '../../utils/bunny.net/videoUpload';

function* uploadMediaForFeedCreating({
  payload: {
    mediaList,
    size,
    mediaFor,
    feedId,
    feedType,
    isEditing,
    contextIndex,
  },
}: {
  payload: {
    mediaList: IUploadImage[];
    size: IMediaSize;
    mediaFor: IMediaForTypes;
    feedId: number;
    feedType: IFeedTypes;
    isEditing: boolean;
    contextIndex: number;
  };
}): Generator {
  try {
    const state: any = yield select(createFeedStateSelector);
    const user:any = yield select(profileSelector)
    let data: IFeedMediaItem[] = [...(state[mediaFor] || [])]
      .filter(el => (mediaFor === 'media' ? el.url : el.value))
      .map(item => ({
        size:item.size,
        type: item.type,
        [MEDIA_PATH[mediaFor]]:item[MEDIA_PATH[mediaFor]],
      }));
    for (let index = 0; index < mediaList.length; index++) {
      const media = mediaList[index];
      const type: any = media?.mime?.split('/')[0];
      if (type === 'video' || type === 'image') {        
        // const public_key: any = yield uploadMediaToBunny(media, type,user?.id,'feed');
        // const public_key: any = yield call(uploadMediaToBunny, { media, type,user?.id,'feed' });
        // const public_key: any = yield call(uploadMediaToBunny(media, type,user?.id,'feed'));
        // const public_key: any = yield call(uploadMediaToBunny, { file:media, mediaType:type, userDir:user?.id, imageDir:'feed' });
        const public_key: any = yield call(uploadMediaToBunny, media, type, user?.id, 'feed', put);



        if (type === 'video') {
          if (mediaFor === 'media') {
            data.push({type, url: public_key, size});
          } else {
            const newItem = {type, value: public_key, size};
            if (data[contextIndex]) {
              data.splice(contextIndex, 1, newItem);
            } else {
              data = [...data, newItem];
            }
          }
          console.log(public_key, "PUBLICCC KETYYYYYYy");
          
          
          yield put(
            getVideoUploadProgressAction({
              public_key,
              mediaFor,
              size,
              contextIndex,
            }),
          );
        } else {
          if (mediaFor === 'media') {
            data.push({type, url: public_key, size});
            yield put(setMediaAction(data));
          } else {
            const newItem = {type, value: public_key, size};
            if (data[contextIndex]) {
              data.splice(contextIndex, 1, newItem);
            } else {
              data = [...data, newItem];
            }
            yield put(setContextAction(data));
          }
        }
      }
    }
    if (!isEditing)
      yield put(editFeedAction(feedType, {[mediaFor]: data}, feedId));
    yield put(setLoadingAction(false));
  } catch (error) {
    console.log(error, "VIDEO UPLOAD ERRRRRRRRRRROORRRRRRRRRRRRRRRRR");
  }
}

function delay(second: number) {
  return new Promise(r => {
    setTimeout(()=>r(false), second * 1000);
  });
}
function* getVideoUploadProgress({
  payload,
}: {
  payload: {
    public_key: string;
    mediaFor: IMediaForTypes;
    size: IMediaSize;
    contextIndex: number;
  };
}): Generator {
  const {public_key, mediaFor, size, contextIndex} = payload;
  let inProgress: any = true;
  while (true) {
    try {
      const res: any = yield uploadingProgress({public_key});
      console.log(res.encodeProgress, "LASTT PROGRESSSSSS");
      
      yield put(
        setVideoUploadProgressAction({
          mediaItem: {
            [MEDIA_PATH[mediaFor]]: public_key,
            uploadingProgress: res.encodeProgress,
            height: res.height,
            width: res.width,
            size,
            type: 'video',
            inProgress,
          },
          mediaFor,
          contextIndex,
        }),
      );
      if (!inProgress) {
        break;
      } else {
        yield delay(2);
      }
      if (res.encodeProgress === 100) {
        inProgress = false;
      }
    } catch (error) {
      console.log(error, "NEW ERRRRROR");
      
    }
  }
}
export function* watchCreateFeedSaga() {
  yield takeLatest(
    CreateFeedTypes.UPLOAD_MEDIA_FOR_FEED_CREATING as any,
    uploadMediaForFeedCreating,
  );
  yield takeEvery(
    CreateFeedTypes.GET_FEED_VIDEO_UPLOAD_PROGRESS as any,
    getVideoUploadProgress,
  );
}
