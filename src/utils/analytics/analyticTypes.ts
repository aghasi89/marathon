type LOGIN_TYPE = {
  parameterName: 'method';
  value: ISocialValueTypes;
};
type SIGNUP_TYPE = {
  parameterName: 'method';
  value: ISocialValueTypes;
};
type SHARE_TYPE = {
  parameterName: 'content_type' | 'share_method';
  value: IContentTypes | ISareMethods;
};
type PACKAGE_TYPE = {
  parameterName: 'package_id'|'package_price';
  value: number|string;
};
type LIVE_TYPE = {
  parameterName: 'live_training_id'|'live_training_price';
  value: number|string;
};
type FOLLOW_TYPE = {
  parameterName: 'user_type' | 'user_id';
  value: number | IUserRoleType;
};
type LIKE_AND_COMMENT_TYPE = {
  parameterName: 'post_id';
  value: number;
};
type COACH_MESSAGE_TYPE = {
  parameterName: 'coach_id';
  value: number;
};
type VIEW_POST_TYPE = {
  parameterName: 'content_type' | 'content_id';
  value: IContentTypes | number;
};
type REGION_TYPE = {
  parameterName: 'region';
  value: string;
};
type LANGUAGE_TYPE = {
  parameterName: 'language';
  value: string;
};
type VIEW_PROFILE_TYPE = {
  parameterName: 'profile_type' | 'profile_id';
  value: IUserRoleType | number;
};
type SEARCH_TYPE = {
  parameterName: 'query' | 'result_count';
  value: string | number;
};
type ADD_FAVORITES_TYPE = {
  parameterName: 'content_type' | 'content_id';
  value: IContentTypes | number;
};
type COMPLETE_WORKOUT_TYPE = {
  parameterName: 'content_type' | 'content_id';
  value: IContentTypes | number; //-------------------------------?
};
type SESSION_DURATION_TYPE = {
  parameterName: 'time_spent' | 'pages_viewed';
  value: string; //-------------------------------?
};
type LOGOUT_TYPE = {
  parameterName: 'userId';
  value: number; //-------------------------------?
};
type ERROR_TYPE = {
  parameterName: 'error_type' | 'error_type';
  value: string; //-------------------------------?
};
export type ISocialValueTypes = 'email' | 'facebook' | 'google'|'apple';
export type IContentTypes =
  | 'live'
  | 'article'
  | 'package'
  | 'recipe'
  | 'basic'
  | 'workout'
  | 'exercise'
  | 'profile';
export type IUserRoleType = 'user' | 'coach';
export type ISareMethods = 'chat' | 'social_media'; //---------------------------??
export type AddAnalyticsPropsType =
  | LOGIN_TYPE
  | SIGNUP_TYPE
  | SHARE_TYPE
  | PACKAGE_TYPE
  | LIVE_TYPE
  | LIKE_AND_COMMENT_TYPE
  | FOLLOW_TYPE
  | COACH_MESSAGE_TYPE
  | VIEW_POST_TYPE
  | LANGUAGE_TYPE
  | VIEW_PROFILE_TYPE
  | SEARCH_TYPE
  | ADD_FAVORITES_TYPE
  | COMPLETE_WORKOUT_TYPE
  | SESSION_DURATION_TYPE
  | LOGOUT_TYPE
  | ERROR_TYPE
  | REGION_TYPE;
export enum AnalyticEvents {
  LOGIN = 'user_login',
  SIGNUP = 'user_signup',
  SHARE = 'content_share',
  CLICK_PACKAGE = 'click_training_package',
  JOIN_PACKAGE = 'join_training_package',
  CLICK_LIVE = 'click_live_training',
  JOIN_LIVE = 'join_live_training',
  FOLLOW = 'follow_user',
  LIKE = 'like_post',
  WRITE_COMMENT = 'write_comment',
  CLICK_COACH_MESSAGE = 'click_message_coach',
  VIEW_POST = 'view_post',
  CHANGE_REGION = 'change_region',
  CHANGE_LANGUAGE = 'change_language',
  VIEW_PROFILE = 'view_profile',
  SEARCH = 'search',
  ADD_FAVORITES = 'add_to_favorites',
  UNFOLLOW = 'unfollow_user',
  COMPLETE_WORKOUT = 'complete_workout',
  SESSION_DURATION = 'session_duration',
  LOGOUT = 'user_logout',
  ERROR = 'error',
}
export type AnalyticEventPayload = {
  [AnalyticEvents.LOGIN]: LOGIN_TYPE;
  [AnalyticEvents.SIGNUP]: SIGNUP_TYPE;
  [AnalyticEvents.SHARE]: SHARE_TYPE;
  [AnalyticEvents.CLICK_PACKAGE]: PACKAGE_TYPE;
  [AnalyticEvents.JOIN_PACKAGE]: PACKAGE_TYPE;
  [AnalyticEvents.CLICK_LIVE]: LIVE_TYPE;
  [AnalyticEvents.JOIN_LIVE]: LIVE_TYPE;
  [AnalyticEvents.FOLLOW]: FOLLOW_TYPE;
  [AnalyticEvents.LIKE]: LIKE_AND_COMMENT_TYPE;
  [AnalyticEvents.WRITE_COMMENT]: LIKE_AND_COMMENT_TYPE;
  [AnalyticEvents.CLICK_COACH_MESSAGE]: COACH_MESSAGE_TYPE;
  [AnalyticEvents.VIEW_POST]: VIEW_POST_TYPE;
  [AnalyticEvents.CHANGE_REGION]: REGION_TYPE;
  [AnalyticEvents.CHANGE_LANGUAGE]: LANGUAGE_TYPE;
  [AnalyticEvents.VIEW_PROFILE]: VIEW_PROFILE_TYPE;
  [AnalyticEvents.SEARCH]: SEARCH_TYPE;
  [AnalyticEvents.ADD_FAVORITES]: ADD_FAVORITES_TYPE;
  [AnalyticEvents.UNFOLLOW]: FOLLOW_TYPE;
  [AnalyticEvents.COMPLETE_WORKOUT]: COMPLETE_WORKOUT_TYPE;
  [AnalyticEvents.SESSION_DURATION]: SESSION_DURATION_TYPE;
  [AnalyticEvents.LOGOUT]: LOGOUT_TYPE;
  [AnalyticEvents.ERROR]: ERROR_TYPE;
};
