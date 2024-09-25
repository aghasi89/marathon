import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import feeds from '../../services/api/routes/feeds';
import {
  setFeedListAction,
  setFeedListMoreItemsAction,
  setFeedsCountAction,
  setFeedCategoriesAction,
  setSelectedFeedAction,
  setFeedMeasurmentsAction,
  setChatFeeds,
  setFeedMeasurmentUnitsListAction,
  setCoachFeeds,
  setEquipmentsList,
  setBodyPartsList,
  setMyExercisesList,
  setExercise,
  setCoachRecipeTypeFeedsAction,
  setCoachWorkoutTypeFeedsAction,
  setLikedUsersLitsAction,
  setCoachesList,
  setComments,
  setReportCategoryList,
  setDraftFeedAction,
  setCoachInfo,
} from '../actions/feed-action';
import { FeedTypes } from '../costants';
import { setError } from '../actions/administrative-action';

function* getFeedsList({ type, payload, cb }) {
  try {
    if (payload.filterBy !== 'coaches') {
      const res = yield feeds.getFeedList(payload);
      if (res.results.length > 0) {
        if (type !== FeedTypes.GET_FEED_LIST_MORE_ITEMS && res) {
          yield put(setFeedsCountAction(res.count));
          yield put(setFeedListAction(res.results));
          cb && cb();
        } else {
          yield put(setFeedListMoreItemsAction(res.results));
          cb && cb();
        }
      } else {
        cb && cb();
      }
    } else {
      const res = yield feeds.getCoachesList();
      if (res) {
        yield put(setCoachesList(res));
        cb && cb();
      }
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getFeedById({ type, payload }) {
  try {
    const res = yield feeds.getFeedById(payload.id, payload.type);
    if (res) {
      yield put(setSelectedFeedAction(res));
      payload.cb && payload.cb('success');
    }
  } catch (ex) {
    if (ex.response.status == 400) {
      yield put(setCoachInfo(ex.response.data.coach));
      payload.cb('reject')
    } else {
      const data = {
        title: 'Something went wrong ...',
        text: 'Page not found',
        buttonTitle: 'OK',
      };
      yield put(setError(data));
    }
  }
}
function* getChatFeeds(data) {
  try {
    const res = yield feeds.getChatFeeds(data.payload);
    if (res) {
      yield put(setChatFeeds(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* createDraftFeed({ payload }) {
  try {
    const res = yield feeds.createDraftFeed(payload);
    if (res) {
      yield put(setDraftFeedAction(res))
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* editFeed({ feedType, data, id ,cb}) {
  try {
    const res = yield feeds.editFeed(feedType, data, id);
    if (res) {
      cb&&cb('success')
      if (res.feed?.is_completed) {
        yield put(setFeedListAction(undefined))
      }
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getCategoriesList({ feedType }) {
  try {
    const res = yield feeds.getCategoriesList(feedType);
    if (res) {
      const tmp = res.reduce((acc, item) => {
        const { category, ...rest } = item;
        for (let i = 0; i < category.length; i++) {
          const element = category[i];
          const index = parseInt(element.id);
          if (!acc[index]) {
            acc[index] = { ...element, category: [] };
          }
          acc[index].category.push(rest);
        }
        return acc;
      }, []);
      yield put(setFeedCategoriesAction(tmp.filter(i => i)));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getMeasurmentsList() {
  try {
    const res = yield feeds.getMeasurementsList();
    if (res) {
      yield put(setFeedMeasurmentsAction(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getMeasurmentUnitsList() {
  try {
    const res = yield feeds.getMeasurementUnitsList();
    if (res) {
      yield put(setFeedMeasurmentUnitsListAction(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getCoachFeeds({ payload }) {
  try {
    const res = yield feeds.getCoachFeed(payload.id, payload.feedType);
    if (res) {
      yield put(setCoachFeeds(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getEquipmetList() {
  try {
    const res = yield feeds.getEquipmentsList();
    if (res) {
      yield put(setEquipmentsList(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getBodyPartsList() {
  try {
    const res = yield feeds.getBotyPartsList();
    if (res) {
      yield put(setBodyPartsList(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* createExercise({ payload, cb }) {
  try {
    const res = yield feeds.createExercise(payload);
    if (res.status <= 201) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getMyExercisesList({ cb }) {
  try {
    const res = yield feeds.getMyExecises();
    if (res) {
      yield put(setMyExercisesList(res));
      cb && cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* editExercise({ id, payload, cb }) {
  try {
    const res = yield feeds.editExercise(id, payload);
    if (res) {
      cb && cb('success');
    }
  } catch (ex) {
    cb && cb('reject');
  }
}
function* getExercise({ payload }) {
  try {
    const res = yield feeds.getExecise(payload);
    if (res) {
      yield put(setExercise(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* deleteExercise({ payload, cb }) {
  try {
    const res = yield feeds.deleteExercise(payload);
    if (res) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getCoachFeedsByType({ id, feedType }) {
  try {
    const res = yield feeds.getCoachFeeds(id, feedType);
    if (res) {
      if (feedType === 'recipe') {
        yield put(setCoachRecipeTypeFeedsAction(res));
      } else if (feedType === 'workout') {
        yield put(setCoachWorkoutTypeFeedsAction(res));
      }
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* connectPrivateWorkout({ payload }) {
  try {
    const res = yield feeds.connectPrivateWorkout(payload);
    if (res) {
    }
  } catch (ex) {
    console.log(ex, 'exxxxx');
  }
}
function* deleteFeed({ id, cb }) {
  try {
    const res = yield feeds.deleteFeed(id);
    if (res) {
      cb('success');
    }
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* setCoachQuestionAnswer({ payload, cb }) {
  try {
    const res = yield feeds.setCoachQuestionsAnswer(payload);
    if (res) {
      cb && cb('success');
    }
  } catch (ex) {
    cb && cb('reject');
    console.log('exxxxxxxx', ex);
  }
}

function* setLikeOrDislikeFeed({ payload, cb }) {
  try {
    const res = yield feeds.setLikeOrDislikeFeed(payload);
    if (res) {
      cb && cb('success');
    }
  } catch (ex) {
    cb && cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* getLikedUsersList({ payload, cb }) {
  try {
    const res = yield feeds.getLikedUsersList(payload);
    if (res) {
      cb && cb('success');
      yield put(setLikedUsersLitsAction(res));
    }
  } catch (ex) {
    cb && cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* postComment({ payload, cb }) {
  try {
    const res = yield feeds.postComment(payload);
    if (res) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* getComments({ payload, cb }) {
  try {
    const res = yield feeds.getComments(payload);
    if (res) {
      yield put(setComments(res));
      cb && cb('success');
    }
  } catch (ex) {
    cb && cb('reject');
    console.log('exxxxxxxx', ex);
  }
}
function* postCommentReply({ payload, cb }) {
  try {
    const res = yield feeds.postCommentReply(payload);
    if (res) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* hideFeed({ payload, cb }) {
  try {
    const res = yield feeds.hideFeed(payload);
    if (res) {
      cb('success');
    }
  } catch (ex) {
    cb('reject');
    console.log('exxxxxxxx', ex);
  }
}

function* getReportCategories() {
  try {
    const res = yield feeds.getReportCategory();
    if (res) {
      yield put(setReportCategoryList(res));
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* createReport({ payload, cb }) {
  try {
    const res = yield feeds.createReport(payload);
    if (res) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* deleteComment({ payload, cb }) {
  try {
    const res = yield feeds.deleteComment(payload);
    if (res.status === 204) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* likeComment({ payload, cb }) {
  try {
    const res = yield feeds.likeComment(payload);
    if (res.status === 200) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}

function* deleteReplyComment({ payload, cb }) {
  try {
    const res = yield feeds.deleteReplyComment(payload);
    if (res.status === 204) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}

function* likeReplyComment({ payload, cb }) {
  try {
    const res = yield feeds.likeReplyComment(payload);
    if (res.status === 200) {
      cb();
    }
  } catch (ex) {
    console.log('exxxxxxxx', ex);
  }
}
function* checkIsQuetstinsExist({ payload, cb }) {
  try {
    const res = yield feeds.checkIsQuetstinsExist(payload);
    if (res.status === 200) {
      cb('no questions');
    }
  } catch (error) {
    if (error.message === 'Please answer questions') {
      cb('questions exist');
    } else {
      cb('rejected');
      console.log('exxxxxxxx', error);
    }
  }
}
export function* watchFeeds() {
  yield takeEvery(FeedTypes.GET_FEED_LIST, getFeedsList);
  yield takeLatest(FeedTypes.GET_FEED_LIST_MORE_ITEMS, getFeedsList);
  yield takeLatest(FeedTypes.GET_FEED_BY_ID, getFeedById);
  yield takeLatest(FeedTypes.GET_CHAT_FEEDS, getChatFeeds);
  yield takeLatest(FeedTypes.CREATE_DRAFT_FEED, createDraftFeed);
  yield takeLatest(FeedTypes.GET_FEED_CATEGORIES_LIST, getCategoriesList);
  yield takeLatest(FeedTypes.GET_FEED_MEASURMENTS_LIST, getMeasurmentsList);
  yield takeLatest(
    FeedTypes.GET_FEED_MEASURMENT_UNITS_LIST,
    getMeasurmentUnitsList,
  );
  yield takeLatest(FeedTypes.GET_COACH_FEEDS, getCoachFeeds);
  yield takeLatest(FeedTypes.EDIT_FEED, editFeed);
  yield takeLatest(FeedTypes.GET_EQUIPMENT_LIST, getEquipmetList);
  yield takeLatest(FeedTypes.GET_BODY_PARTS_LIST, getBodyPartsList);
  yield takeLatest(FeedTypes.CREATE_EXERCISE, createExercise);
  yield takeLatest(FeedTypes.GET_MT_EXERCISES_LIST, getMyExercisesList);
  yield takeLatest(FeedTypes.EDIT_EXERCISE, editExercise);
  yield takeLatest(FeedTypes.GET_EXERCISE, getExercise);
  yield takeLatest(FeedTypes.DELETE_EXERCISE, deleteExercise);
  yield takeLatest(FeedTypes.DELETE_FEED, deleteFeed);
  yield takeEvery(FeedTypes.GET_COACH_FEED_BY_TYPE, getCoachFeedsByType);
  yield takeLatest(
    FeedTypes.SET_CONNECT_PRIVATE_WORKOUT,
    connectPrivateWorkout,
  );
  yield takeLatest(FeedTypes.SET_COACH_QUESTION_ANSWER, setCoachQuestionAnswer);
  yield takeEvery(FeedTypes.SET_LIKE_OR_DISLIKE_FEED, setLikeOrDislikeFeed);
  yield takeLatest(FeedTypes.GET_LIKED_USERS_LIST, getLikedUsersList);
  yield takeLatest(FeedTypes.POST_COMMENT, postComment);
  yield takeLatest(FeedTypes.GET_COMMENTS, getComments);
  yield takeLatest(FeedTypes.POST_COMMENT_REPLY, postCommentReply);
  yield takeLatest(FeedTypes.HIDE_FEED, hideFeed);
  yield takeLatest(FeedTypes.GET_REPORT_CATEGORY_LIST, getReportCategories);
  yield takeLatest(FeedTypes.POST_REPORT_FEED, createReport);
  yield takeLatest(FeedTypes.DELETE_COMMENT, deleteComment);
  yield takeLatest(FeedTypes.DELETE_REPLY_COMMENT, deleteReplyComment);
  yield takeLatest(FeedTypes.LIKE_COMMENT, likeComment);
  yield takeLatest(FeedTypes.LIKE_REPLY_COMMENT, likeReplyComment);
  yield takeLatest(FeedTypes.CHECK_IS_QUESTIONS_EXIST, checkIsQuetstinsExist);
}
