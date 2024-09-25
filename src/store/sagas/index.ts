import { all } from 'redux-saga/effects';
import { watchFeeds } from './feed-saga';
import { watchAuthSaga } from './authSaga'
import { watchProfileSaga } from './profileSaga'
import { watchFollowersSaga } from './followersSaga';
import { watchFinansicalSaga } from './finansicalSaga';
import { watchSearchSaga } from './searchSaga';
import { watchCreateFeedSaga } from './createFeedSaga';
import { watchCreateExerciseSaga } from './createExerciseSaga';
import { watchAdministrariveSaga } from './administrariveSaga';
import { watchNotificationsSaga } from './notificationsSaga';
import { watchAssistantSaga } from './assistantSaga';

export default function* rootSaga() {
  yield all([
    watchFeeds(),
    watchAuthSaga(),
    watchProfileSaga(),
    watchFollowersSaga(),
    watchFinansicalSaga(),
    watchSearchSaga(),
    watchCreateFeedSaga(),
    watchCreateExerciseSaga(),
    watchAdministrariveSaga(),
    watchNotificationsSaga(),
    watchAssistantSaga()
  ]);
}
