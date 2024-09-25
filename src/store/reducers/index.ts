import { combineReducers } from 'redux';
import registrationReducer from './registration-reducer';
import profileReducer from './profile-reducer';
import followersReducer from './followers-reducer';
import feedReducer from './feed-reducer';
import administrativeReducer from './administrative-reducer'
import finansicalReducer from './finansical-reducer'
import chatReducer from './chat-reducer';
import searchReducer from './search-reducer';
import createFeedReducer from './create-feed-reducer';
import createExerciseReducer from './create-exercise-reducer';
import notificationsReducer from './notifications-reducer';
import assistantReducer from './assistant-reducer';

export default combineReducers({
  registrationReducer,
  profileReducer,
  followersReducer,
  feedReducer,
  administrativeReducer,
  finansicalReducer,
  chatReducer,
  searchReducer,
  createFeedReducer,
  createExerciseReducer,
  notificationsReducer,
  assistantReducer
});
