import {
  ICommentItem,
  IExerciseItem,
  IFeedCategoryItem,
  IFeedItem,
  IFeedListFilter,
  IFeedListItem,
  IFeedMultiItem,
  ILikedUsersListItem,
  IReportFeedCategory,
  IUser,
  IVideoProgressItem,
  IWorkoutMultiItem,
} from '../../types/types';
import { FeedTypes } from '../costants';

interface IInitialState {
  feedsList: IFeedListItem[] | undefined;
  feedsCount: number;
  selectedFeed?: IFeedItem | undefined;
  chatFeeds: [];
  categoriesList?: IFeedCategoryItem[] | undefined;
  measurmentsList?: IFeedMultiItem[] | undefined;
  measurmentUnitsList?: IFeedMultiItem[] | undefined;
  coachFeeds: IFeedItem[] | undefined;
  bodyPartsList?: IWorkoutMultiItem[] | undefined;
  equipmentsList?: IWorkoutMultiItem[] | undefined;
  exercisesList?: IExerciseItem[] | undefined;
  selectedExercise?: IExerciseItem;
  coachWorkout: IFeedItem[] | undefined;
  coachRecipes: IFeedItem[] | undefined;
  coverVideosProgress: IVideoProgressItem[];
  contextVideosProgress: IVideoProgressItem[];
  likedUsersList?: ILikedUsersListItem[];
  permissionDenied: any;
  feedListActiveFilter?: IFeedListFilter;
  coachesList?: IUser[];
  commentsList?: ICommentItem[]
  reportCategoryList?: IReportFeedCategory[]
  selectedDraftFeed?: IFeedItem | undefined
  coachInfo?: undefined | IUser
}

export const initialState: IInitialState = {
  feedsList: [],
  feedsCount: 0,
  selectedFeed: undefined,
  chatFeeds: [],
  categoriesList: [],
  measurmentsList: [],
  measurmentUnitsList: [],
  coachFeeds: [],
  bodyPartsList: [],
  equipmentsList: [],
  exercisesList: undefined,
  selectedExercise: undefined,
  coachWorkout: [],
  coachRecipes: [],
  coverVideosProgress: [],
  contextVideosProgress: [],
  likedUsersList: [],
  permissionDenied: undefined,
  feedListActiveFilter: {
    index: undefined,
    name: 'feed',
  },
  coachesList: [],
  commentsList: [],
  reportCategoryList: [],
  selectedDraftFeed: undefined,
  coachInfo: undefined
};

const feedReducer = (
  state = initialState,
  action: { type: string; payload: any | undefined },
) => {
  switch (action.type) {
    case FeedTypes.SET_FEED_LIST:
      return {
        ...state,
        feedsList: action.payload,
      };
    case FeedTypes.SET_FEED_LIST_MORE_ITEMS:
      return {
        ...state,
        feedsList:
          state.feedsList && action.payload
            ? [...state.feedsList, ...action.payload]
            : [],
      };
    case FeedTypes.SET_FEEDS_COUNT:
      return {
        ...state,
        feedsCount: action.payload,
      };
    case FeedTypes.SET_SELECTED_FEED:
      return {
        ...state,
        selectedFeed: action.payload,
      };
    case FeedTypes.SET_CHAT_FEEDS:
      return {
        ...state,
        chatFeeds: action.payload,
      };
    case FeedTypes.SET_FEED_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.payload,
      };
    case FeedTypes.SET_FEED_MEASURMENTS_LIST:
      return {
        ...state,
        measurmentsList: action.payload,
      };
    case FeedTypes.SET_FEED_MEASURMENT_UNITS_LIST:
      return {
        ...state,
        measurmentUnitsList: action.payload,
      };
    case FeedTypes.SET_COACH_FEEDS:
      return {
        ...state,
        coachFeeds: action.payload,
      };
    case FeedTypes.SET_EQUIPMENT_LIST:
      return {
        ...state,
        equipmentList: action.payload,
      };
    case FeedTypes.SET_BODY_PARTS_LIST:
      return {
        ...state,
        bodyPartsList: action.payload,
      };
    case FeedTypes.SET_MT_EXERCISES_LIST:
      return {
        ...state,
        exercisesList: action.payload,
      };
    case FeedTypes.SET_EXERCISE:
      return {
        ...state,
        selectedExercise: action.payload,
      };
    case FeedTypes.SET_COACH_WORKOUT_TYPE_FEEDS:
      return {
        ...state,
        coachWorkout: action.payload,
      };
    case FeedTypes.SET_COACH_RECIPE_TYPE_FEEDS:
      return {
        ...state,
        coachRecipes: action.payload,
      };
    case FeedTypes.SET_FEED_VIDEO_UPLOAD_PROGRESS:
      if (action.payload.type === 'cover') {
        const newList = [...state.coverVideosProgress];
        const currentVideoindex = newList?.findIndex(el => {
          return el?.public_key === action?.payload?.public_key;
        });
        if (currentVideoindex > -1) {
          newList[currentVideoindex] = action.payload;
          return {
            ...state,
            coverVideosProgress: newList,
          };
        }
        return {
          ...state,
          coverVideosProgress: [...state.coverVideosProgress, action.payload],
        };
      } else {
        const newList = [...state.contextVideosProgress];
        const currentVideoindex = newList?.findIndex(el => {
          return el?.public_key === action?.payload?.public_key;
        });
        if (currentVideoindex > -1) {
          newList[currentVideoindex] = action.payload;
          return {
            ...state,
            contextVideosProgress: newList,
          };
        }
        return {
          ...state,
          contextVideosProgress: [
            ...state.contextVideosProgress,
            action.payload,
          ],
        };
      }
    case FeedTypes.SET_LIKED_USERS_LIST:
      return {
        ...state,
        likedUsersList: action.payload,
      };
    case FeedTypes.SET_PERMISSION_DENIED:
      return {
        ...state,
        permissionDenied: action.payload,
      };
    case FeedTypes.SET_FEED_LIST_ACTIVE_FILTER:
      return {
        ...state,
        feedListActiveFilter: action.payload,
      };
    case FeedTypes.SET_COACHES_LIST:
      return {
        ...state,
        coachesList: action.payload,
      };
    case FeedTypes.SET_COMMENTS:
      return {
        ...state,
        commentsList: action.payload,
      };
    case FeedTypes.SET_REPORT_CATEGORY_LIST:
      return {
        ...state,
        reportCategoryList: action.payload,
      };
    case FeedTypes.SET_DRAFT_FEED:
      return {
        ...state,
        selectedDraftFeed: action.payload,
      }
    case FeedTypes.SET_COACH_INFO:
      return {
        ...state,
        coachInfo: action.payload,
      }
    default:
      return state;
  }
};
export default feedReducer;
