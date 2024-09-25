import { takeLatest, all, put } from 'redux-saga/effects';
import getFollowersEP from '../../services/api/routes/followers';
import { setCheckCoachesFollow, setFollowers, setFollowings } from '../actions/followers-action';
import { FollowersTypes } from '../costants';

function* followers(): Generator {
  try {
    const data = yield getFollowersEP.followers()
    yield put(setFollowers(data))
  } catch (ex: any) {
    console.log(ex)
  }
}
function* followings(): Generator {
  try {
    const data = yield getFollowersEP.followings()
    yield put(setFollowings(data))
  } catch (ex: any) {
    console.log(ex)
  }
}
function* checkCoachesFollow({ payload }: any): Generator {
  try {
    const data = yield getFollowersEP.checkCoachFollow(payload);
    if(data) {
      yield put(setCheckCoachesFollow(data))
    }
  } catch (ex: any) {
    console.log(ex)
  }
}
export function* watchFollowersSaga() {
  yield all([
    takeLatest(FollowersTypes.GET_FOLLOWERS as any, followers),
    takeLatest(FollowersTypes.GET_FOLLOWINGS as any, followings),
    takeLatest(FollowersTypes.GET_CHECK_COACHES_FOLLOW as any, checkCoachesFollow),
  ]);
}