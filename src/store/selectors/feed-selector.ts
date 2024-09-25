import {
  ICommentItem,
  IExercise,
  IExerciseItem,
  IFeedCategoryItem,
  IFeedItem,
  IFeedListItem,
  IFeedMultiItem,
  ILikedUsersListItem,
  IReportFeedCategory,
  IUser,
  IVideoProgressItem,
  IWorkoutMultiItem,
} from '../../types/types';

export const feedListSelector = (state: {
  feedReducer: {feedsList: Array<IFeedListItem>};
}) => state.feedReducer.feedsList;

export const feedsCountSelector = (state: {
  feedReducer: {feedsCount: number};
}) => state.feedReducer.feedsCount;

export const chatFeedsSelector = (state: {feedReducer: {chatFeeds: any}}) =>
  state.feedReducer.chatFeeds;

export const selectedFeedSelector = (state: {
  feedReducer: {selectedFeed: IFeedItem | undefined};
}) => state.feedReducer.selectedFeed;

export const categoriesListSelector = (state: {
  feedReducer: {categoriesList: IFeedCategoryItem[]};
}) => state.feedReducer.categoriesList;

export const measurmentsListSelector = (state: {
  feedReducer: {measurmentsList: IWorkoutMultiItem[]};
}) => state.feedReducer.measurmentsList;

export const measurmentUnitsListSelector = (state: {
  feedReducer: {measurmentUnitsList: IFeedMultiItem[]};
}) => state.feedReducer.measurmentUnitsList;

export const coachFeedSelector = (state: {feedReducer: {coachFeeds: any}}) =>
  state.feedReducer.coachFeeds;

export const equipmentsListSelector = (state: {
  feedReducer: {equipmentList: IWorkoutMultiItem[]};
}) => state.feedReducer.equipmentList;

export const bodyPartsListSelector = (state: {
  feedReducer: {bodyPartsList: IExercise[]};
}) => state.feedReducer.bodyPartsList;
export const myExercisesListSelector = (state: {
  feedReducer: {exercisesList: IExerciseItem[]};
}) => state.feedReducer.exercisesList;
export const selectedExerciseSelector = (state: {
  feedReducer: {selectedExercise: IExerciseItem};
}) => state.feedReducer.selectedExercise;
export const coachWorkout = (state: {
  feedReducer: {coachWorkout: IFeedItem[]};
}) => state.feedReducer.coachWorkout;
export const coachRecipesSelector = (state: {
  feedReducer: {coachRecipes: IFeedItem[]};
}) => state.feedReducer.coachRecipes;
export const coverVideosProgressSelector = (state: {
  feedReducer: {coverVideosProgress: IVideoProgressItem[]};
}) => state.feedReducer.coverVideosProgress;
export const contextVideosProgressSelector = (state: {
  feedReducer: {contextVideosProgress: IVideoProgressItem[]};
}) => state.feedReducer.contextVideosProgress;
export const likedUsersListSelector = (state: {
  feedReducer: {likedUsersList: ILikedUsersListItem[]};
}) => state.feedReducer.likedUsersList;
export const permissionDeniedSelector = (state: {
  feedReducer: {permissionDenied: any};
}) => state.feedReducer.permissionDenied;
export const feedListActiveFilterSelector = (state: {
  feedReducer: {feedListActiveFilter: any};
}) => state.feedReducer.feedListActiveFilter;
export const coachesListSelector = (state: {
  feedReducer: {coachesList: IUser[]};
}) => state.feedReducer.coachesList;
export const commentListSelector = (state: {
  feedReducer: {commentsList: ICommentItem[]};
}) => state.feedReducer.commentsList;
export const reportCategoryListSelector = (state: {
  feedReducer: {reportCategoryList: IReportFeedCategory[]};
}) => state.feedReducer.reportCategoryList;
export const selectedDraftFeedSelector = (state: {
  feedReducer: { selectedDraftFeed: IFeedItem };
}) => state.feedReducer.selectedDraftFeed;
export const coachInfoSelector = (state: {
  feedReducer: { coachInfo: IUser };
}) => state.feedReducer.coachInfo;