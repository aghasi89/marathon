import { ViewStyle } from 'react-native';
import { IInputListDetails } from '../store/reducers/marathons-reducer';
import { IProfile } from '../store/reducers/profile-reducer';
import { IAuth } from '../store/reducers/registration-reducer';
import { IAdministrative } from '../store/reducers/administrative-reducer';
import { IFinansical } from '../store/reducers/finansical-reducer';
import { WorkoutLevel } from './enums';
import { INotificationCenter } from '../store/reducers/notifications-reducer';
export interface IAction {
  type: string;
  payload: any;
}
export interface IExercise {
  slug?: string;
  id: number;
  name_en?: string;
  name_fr?: string;
  name_hy?: string;
  name_ru?: string;
}
export interface IRest {
  restCount: number;
  restTime: string;
  value: number;
}
export interface ITag {
  id: number;
  title: string;
}
export interface IFile {
  fileName: string;
  fileType: string;
  image: string;
}
export interface IFilter {
  id: number;
  title: string;
}

export interface INote {
  text: string;
}
export interface ISpeciality {
  id: number;
  title: string;
}
export interface ICategory {
  id: number;
  title: string;
}
export interface ILanguageItem {
  id: number;
  code?: string;
  flag?: string;
  name?: string;
}
export interface IGaleryImages {
  id: number;
  image: string;
  format: string;
}
export interface ICancellationPeriodList {
  value: string;
  lable: string;
}
export interface INotification {
  name: string;
  title: string;
  imageUrl: string;
  date: string;
  unRead: boolean;
}
export interface IPayment {
  name: string;
  title: string;
  imageUrl: string;
  date: string;
  price: string;
}
export interface IMarathons {
  id?: number;
  name: string;
  count: string;
  price: string;
  imageUrl: string;
  calendarRange: string[];
  time: string;
  listTags: Array<ITag>;
  categories: Array<ICategory>;
  language: Array<ILanguageItem>;
  selectedGalleryImages: Array<IGaleryImages>;
  marathonInfo: string;
  isNutritionsActive: boolean;
  isTrainingsActive: boolean;
  isGroupChatActive: boolean;
  isMeasurmentsActive: boolean;
  cancellationPeriod: ICancellationPeriodList;
  marathonVisibility: boolean;
  inputList: Array<IInputListDetails>;
  users?: Array<IUser>;
  notifications?: Array<INotification>;
  payments?: Array<IPayment>;
}

export interface IRegister {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  phone_number?: string;
  confirm_code?: string;
}
export interface ILogin {
  email?: string;
  password?: string;
}
export interface ISocialLogin {
  client_id: string;
  grant_type: string;
  client_secret: string;
  backend: string;
  role: string;
  token: null | string;
}
export interface ILanguage {
  code: string;
}
export interface IUser {
  get_stream_id?: string;
  user: {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    username: string;
  };
  status: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  phone_number: string;
  role_mode: string;
  location: string;
  certificate: {
    id: number;
    created_at: string;
    user: number;
    certificate: ICertificate;
  }[];
  language: {
    id: number;
    created_at: string;
    user: number;
    language: ILanguage;
  }[];
  gender: number;
  speciality: {
    id: number;
    created_at: string;
    user: number;
    speciality: ISpeciality;
  }[];
  id: number;
  image: string | null;
  googleLocation?: string | undefined;
  background_image: string | null;
  am_i_follow?: boolean;
  is_public?: boolean;
  user_role?: number[];
  rating?: number;
  isVerified?: boolean;
  geolocation?: string;
  password_is_null?: boolean
}
export interface IFollower {
  id: number;
  whom_user: IWhomUser;
}
export interface IWhomUser {
  id: number;
  image: string;
  user: IUserFollowing;
  get_stream_id?: string;
}
export interface IUserFollowing {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  username: string;
}
export interface IFollowers {
  followers?: IFollower[];
  followings?: IFollower[];
  checkCoachFollow?: any
}
interface IAssistant {
  assistantChannels: IAssistantChannels[] | undefined;
  messageList: IAssistantChannelMessagesResultItem[];
  messageCount: number;
  assistantTitle: string;
  assistantChatId: number | undefined;
  isAssistantActive: boolean;
}
export interface IReducer {
  registrationReducer: IAuth;
  profileReducer: IProfile;
  followersReducer: IFollowers;
  followingsReducer: IFollowers;
  administrativeReducer: IAdministrative;
  finansicalReducer: IFinansical;
  notificationsReducer: INotificationCenter
  assistantReducer: IAssistant
}
export interface IFeedItem {
  id: number;
  start_day?: string;
  duration?: number;
  datetime?: Date;
  user_count: number;
  price?: string;
  currency_id?: number;
  wallet_id?: number;
  feed?: IFeedInfo;
  language?: ILanguageItem;
  measurement?: IFeedCategoryItem[];
  coach_question?: IFeedCoachQuestionItem[];
  feed_category?: IFeedCategoryItem[];
  tag?: IFeedMultiItem[];
  type: IFeedTypes;
  first_name?: string;
  last_name?: string;
  description?: string;
  kcal_measurement?: IMeasurmentsType;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  apportionment?: number;
  serving_size?: number;
  is_more?: boolean;
  components?: IFeedMultiItem[];
  preparation_steps?: IFeedPreparationSteps[];
  is_finished?: boolean;
  is_individual?: boolean;
  context?: IFeedContext[];
  username?: string;
  image?: string | null;
  text: string;
  unit_of_measurement: IFeedMultiItem;
  level?: WorkoutLevel;
  calorie?: number;
  body_parts?: IExercise[];
  equipments?: IWorkoutMultiItem[];
  trainings?: ITraningItem[];
  members?: IFeedJoinMember[];
  is_protected?: boolean;
  channel_id?: string;
  chat_type?: string;
  liked: boolean;
  userId?: string;
  get_stream_id: string;
  isExpired?: boolean
}

export interface IFeedPreparationSteps {
  id?: number;
  text?: string;
}

interface IFeedInfo {
  id: number;
  creator?: number;
  title?: string;
  is_public?: boolean;
  created_at?: string;
  media: IFeedMediaItem[];
  like_count: number;
  comment_count?: number;
  is_protected?: boolean;
  type: IFeedTypes;
  get_stream_id: string;
  is_completed: boolean;
  is_draft: boolean;
}
export interface IFeedMultiItem {
  id?: number;
  name?: string;
  category?: number;
  isSelected?: boolean;
  wallet_id?: number;
  code?: string;
  icon?: React.ReactNode;
}
export interface IFeedMediaItem {
  id?: number;
  type?: IFeedMediaTypes;
  url?: string;
  value?: string;
  localLink?: string;
  uploadingProgress?: number;
  inProgress?: boolean;
  thumbnail?: string;
  height?: number;
  width?: number;
  size?: IMediaSize;
  animationURL?: string;
}
export interface IFeedCategoryItem {
  id: number;
  name?: string;
  feed_type?: IFeedTypes;
  name_en?: string;
  name_fr?: string;
  name_hy?: string;
  name_ru?: string;
  type?: string;
  category?: IFeedMultiItem[];
  isActive?: boolean;
  unit_of_measurement?: IFeedCategoryItem;
  measurement_answer?: IMeasurementAnswer;
}
export interface IFeedCoachQuestionItem {
  id?: number;
  text?: string;
  crated_at?: Date;
  coach?: number;
  answer?: IMeasurementAnswer;
}
export interface IFeedCardData {
  id?: number;
  creatorId?: number;
  feedDate: string;
  userName: string;
  followButtonShow: boolean;
  userImage?: string;
  commentsCount?: number;
  isLiked?: boolean;
  likesCount?: number;
  isBookmarked?: boolean;
  description?: string;
  hashtags?: IFeedMultiItem[];
  trainingType?: 'individual' | 'groupe';
  userCount?: number;
  placeCount?: number;
  startDate?: string;
  duration?: string;
  price?: string;
  isJoined?: boolean;
  isOwner?: boolean;
  availablePlacesExist?: boolean;
  type: IFeedTypes;
  imageURL?: string;
  liveDuration?: string;
  recipe?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    prepTime?: number;
  };
  videoUrl?: string;
  thumbnail?: string;
  animatedThumbnail?: string;
  videoTitle?: string;
  isPublic?: boolean;
  customStyle?: {
    cardContainerStyle?: ViewStyle;
    videoContainerStyle?: ViewStyle;
  };
  wallet_id?: number;
  mediaType?: IFeedMediaTypes;
  mediaUrl?: string;
  workoutInfo?: string;
  workoutLevel?: WorkoutLevel;
  traningCount?: number;
  channel_id?: string;
  chat_type?: string;
  is_protected?: boolean;
  am_i_follow?: boolean;
  measurement?: IFeedCategoryItem[];
  coach_question?: IFeedCoachQuestionItem[];
  mediaSize?: IMediaSize;
  get_stream_id?: string;
  role_mode?: 'coach' | 'user';
  mediaList?: IFeedMediaItem[];
  isExpired?: boolean
}
export interface ISelectedFeedData {
  id?: number;
  type?: IFeedTypes;
  userImage?: string;
  userName?: string;
  feedDate?: string;
  commentsCount?: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  likesCount?: number;
  title?: string;
  description?: string;
  inputValue?: string;
  inputDisable?: boolean;
  commentData?: ISelectedFeedCommentData[];
  progressData?: ISelectedFeedProgressData;
  recipeChipsData?: ISelectedFeedRecipeChipsData;
  ingredientsData?: ISelectedFeedIngredientsData[];
  preparationSteps?: string[];
  mediaData?: ISelectedFeedMediaData;
  hashtagsData?: ISelectedFeedHashtagsData;
  traningInfoData?: ISelectedFeedTraningInfoData;
  liveInfoData?: ISelectedFeedLiveInfoData;
  context?: IFeedMediaItem[];
  selectedEquipmentsName?: string;
  selectedBodyPartsName?: string;
  level?: WorkoutLevel;
  calorie?: number;
  body_parts?: IExercise[];
  equipments?: IWorkoutSelectedMultiItem[];
  trainings?: IWorkoutSelectedMultiItem[];
  userId?: number;
  isExpired?: boolean;
  feedTypeId?: number
}

export interface ISelectedFeedLiveInfoData {
  isOwner?: boolean;
  availablePlacesExist?: boolean;
  isJoined?: boolean;
}
export interface ISelectedFeedTraningInfoData {
  trainingType: 'individual' | 'groupe';
  groupeMembersMaxCount?: number;
  joinMembersCount?: number;
  startDate?: string;
  duration?: string;
  price?: string;
  liveStartTime?: string;
}
export interface ISelectedFeedHashtagsData {
  hashtags?: string[];
  feedCategory?: string;
}
export interface ISelectedFeedMediaData {
  liveDuration?: string;
  mediaList?: IFeedMediaItem[];
}
export interface ISelectedFeedIngredientsData {
  title?: string;
  mass?: string;
  measurement?: string;
}
export interface ISelectedFeedRecipeChipsData {
  elements?: (ISelectedFeedRecipeChipItem | undefined)[];
  cookingTime?: string;
  apportionment?: number;
}
export interface ISelectedFeedRecipeChipItem {
  type?: string;
  title?: string;
  icon?: React.ReactNode;
}
export interface ISelectedFeedProgressData {
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
}
export interface ISelectedFeedCommentData {
  id?: number;
  userImageURL?: string;
  userName?: string;
  comentDate?: string;
  comment?: string;
  repliesCount?: number;
  isLiked?: boolean;
  likesCount?: number;
}
export type FeedListFilterTypes =
  | 'feed'
  | 'package'
  | 'workout'
  | 'article'
  | 'live'
  | 'recipe'
  | 'coaches';
export interface getFeedListPayload {
  filterBy: FeedListFilterTypes;
  page: number;
  geo: string;
}
export interface IError {
  title: string;
  text: string;
  buttonTitle: string;
}
export interface ILanguage {
  id: number;
  name: string;
  code: string;
  flag: string;
  label?: string;
  value?: string;
}

export interface ISpeciality {
  id: number;
  name: string;
  label?: string;
  value?: string;
}

export interface IUploadedFile {
  name?: string;
  uri: string;
  type?: string;
  size?: number | null;
}

export interface ICertificate {
  description: string;
  certificate?: string;
  file?: string;
  title: string;
  year: number;
  file_type: string;
  id?: number;
}

export interface IImage {
  name: string;
  uri: string;
  type: string;
  size: number | null;
}

export interface IUploadImage {
  height: number;
  mime: string;
  modificationDate?: string;
  path: string;
  size: number;
  width: number;
}

export interface IUserFeeds {
  filterBy: string;
  id: string;
  page?: number;
  geo?: string;
  params?: any;
  showPrivate?: boolean;
}

export interface IUploadImage {
  height: number;
  mime: string;
  modificationDate?: string;
  path: string;
  size: number;
  width: number;
}
export interface IRegion {
  id: number;
  name: string;
  title: string;
  title_hy: string;
  title_en: string;
  title_ru: string;
  title_fr: string;
  image?: string;
}
export interface ICreateFeed {
  feed_id?: number;
  creator?: number;
  title?: string;
  is_public?: boolean;
  media?: IFeedMediaItem[];
  start_day?: Date | string;
  duration?: number;
  user_count?: number;
  price?: number;
  currency?: number; //?
  wallet?: number; //?
  measurement?: number[]; //?
  coach_question?: IFeedCoachQuestionItem[];
  feed_category?: number[]; //?
  tag?: number[]; //?
  language?: number | null;
  context?: IFeedMediaItem[];
  chat_type?: 'channel' | 'group';
  feedType?: IFeedTypes;
  text?: string;
  datetime?: Date | string;
  link?: string;
  kcal_measurement?: IMeasurmentsType;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  apportionment?: number;
  serving_size?: number;
  components?: IFeedMultiItem[];
  preparation_steps?: IFeedPreparationSteps[];
  unit_of_measurement?: number | null;
  is_more?: boolean;
  ingredients_string?: string;
  total_kcal?: number;
  measurementSelectedUnit?: IFeedMultiItem;
  categoriesList?: IFeedCategoryItem[];
  selectedCategories?: IFeedCategoryItem[];
  selectedMeasurements?: IFeedCategoryItem[];
  selectedCurrency?: IFeedMultiItem;
  userWalletsList?: IWallet[];
  is_individual?: boolean;
  errorMessages?: ICreateFeedErrorMessage;
  packageType?: ITrainingType;
  feedPaymentType?: IFeedPaymentType;
  workoutType?: IWorkoutType;
  level?: WorkoutLevel;
  calorie?: number;
  body_parts?: number[];
  equipments?: number[];
  selectedEquipments?: IWorkoutSelectedMultiItem[];
  selectedBodyParts?: IExercise[];
  type?: IFeedTypes;
  trainings?: ITraning[];
  selectedExercises?: IWorkoutSelectedMultiItem[];
  selectedExeciseItem?: IWorkoutSelectedMultiItem;
  is_protected?: boolean;
  is_completed?: boolean;
  is_draft?: boolean;
  isEditing?: boolean;
  geolocation?: string;
  compressingProgress?: number;
  uploadingProgress?: number;
}
export interface IFeedContext {
  id?: number;
  type: IFeedMediaTypes;
  value?: string;
  localLink?: string;
  thumbnail?: string;
  size: IMediaSize;
}

export type IFeedTypes =
  | 'live'
  | 'article'
  | 'package'
  | 'recipe'
  | 'basic'
  | 'workout'
  | 'exercise'
  | 'feed'
  | 'profile';
export type IWorkoutType = 'singleVideo' | 'manyVideos';
export type ITrainingType = 'individual' | 'groupe';
export type IFeedPaymentType = 'paid' | 'free';
export type IFeedMediaTypes = 'text' | 'video' | 'image' | 'videoLink';
export type IMeasurmentsType = 'per-serving' | 'for-100-grams';
export type IRequestStatusType = 'success' | 'reject';
export interface IWalletValues {
  key: string;
  value: string;
}
export interface IWallet {
  id: number;
  user: number;
  values: IWalletValues[];
  meta: string;
  currency_type: ICurrency;
  is_active: true;
  is_verified: true;
  location: string;
  stripe_login_url: null;
  withdraw_method: IWithdrawMethod;
  available_sum?: number;
  wallet_sum?: number;
  requested_withdraw_sum: number;
  payed_sum: number
}

export interface IWithdraw {
  id?: number;
  coach?: number;
  amount?: number;
  user_wallet?: number;
  user_wallet_details?: IWallet;
  comment?: string | null;
  admin_comment?: string;
  status?: string;
  created_at?: string;
}

export interface ITranstaction {
  id: number;
  transaction_type: string;
  money: number;
  payment_id: string;
  date: string;
  comment: string;
  status: string;
  user: number;
  feed: number;
  user_wallet: number;
  receipt_file: null;
  fee: number;
  allow_refund: boolean;
  user_wallet_details: IWallet;
}

export interface ICurrency {
  id: number;
  sign: string;
  code: string;
  digital_code: string;
}
export interface IWithdrawMethod {
  id: number;
  name: string;
  icon: string;
  currency_type: number;
  currency_type_details: ICurrency;
  dynamic_fields: IDinamicFields[];
}
export interface IDinamicFields {
  key: IDinamicFieldKeys;
  type: string;
  title: string;
  options: {};
}
export type IDinamicFieldKeys = 'stripe' | 'phone_number' | ' idram_id';
export interface ICreateFeedErrorMessage {
  coverMedia?: string;
  title?: string;
  category?: string;
  language?: string;
  datetime?: string;
  duration?: string;
  user_count?: string;
  price?: string;
  currency?: string;
  ingredients?: string;
  preparation_steps?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  exercises?: string;
  body_parts?: string;
}
export interface ICreateExerciseErrorMessage {
  coverMedia?: string;
  title?: string;
  duration?: string;
  body_parts?: string;
}
export interface IFeedPaymantSendInfo {
  money?: number;
  feed?: number;
  user?: number;
  coach?: number;
  comment?: string;
  user_wallet?: number;
  device?: string;
}
export interface IFeedPaymantInfo {
  error: boolean;
  errorCode: number;
  errorCodeString: string;
  formUrl: string;
  orderId: string;
  errorMessage: string;
}
export interface IFeedPaymantSendInfo {
  money?: number;
  feed?: number;
  user?: number;
  coach?: number;
  comment?: string;
  user_wallet?: number;
}
export interface IFeedPaymantInfo {
  error: boolean;
  errorCode: number;
  errorCodeString: string;
  formUrl: string;
  orderId: string;
}
export interface getCoachFeedPayload {
  feedType: string;
  id: number | undefined;
}

export interface IWorkoutMultiItem {
  id: number;
  slug?: string;
  name?: string;
  image?: string;
  name_en?: string;
  name_fr?: string;
  name_hy?: string;
  name_ru?: string;
}
export interface ICreateExercise {
  media?: IFeedMediaItem[];
  title?: string;
  errorMessages?: ICreateExerciseErrorMessage;
  duration?: string;
  level?: WorkoutLevel;
  description?: string;
  body_parts?: IExercise[];
  equipments?: IWorkoutSelectedMultiItem[];
}
export interface ICreateExercise {
  media?: IFeedMediaItem[];
  title?: string;
  errorMessages?: ICreateExerciseErrorMessage;
}

export interface ITraning {
  rest_time?: string;
  time?: string;
  exercise_id?: number | null;
}
export interface ITraningItem {
  rest_time?: string;
  time?: string;
  id: number;
  exercise?: IExerciseItem;
}
export interface IExerciseItem {
  id: number;
  creator?: number;
  title?: string;
  video?: string | null;
  time?: number;
  description?: string | null;
  body_parts?: IExercise[];
  equipments?: IWorkoutMultiItem[];
  level?: WorkoutLevel;
  size?: IMediaSize;
}
export interface IWorkoutSelectedMultiItem {
  name?: string;
  url?: string;
  id: number;
  time?: string;
  rest_time?: string;
  description?: string;
  body_parts?: IExercise[];
  equipments?: IWorkoutMultiItem[];
  videoUrl?: string;
  title?: string;
  level?: WorkoutLevel;
  trainings?: ITraningItem[];
  duration?: number;
  calories?: number;
}
export interface IEditExerciseItem {
  title?: string;
  video?: string | null;
  time?: number;
  description?: string | null;
  body_parts?: number[];
  equipments?: number[];
  level?: WorkoutLevel;
  size?: IMediaSize;
}
export interface IPostFirebaseToken {
  user: number;
  token: string;
}
export interface IPrivateWorkout {
  feed?: number;
  channel_id?: string;
}
export interface IFeedListItem {
  id: number;
  creator: number;
  title?: string;
  is_public: boolean;
  created_at?: string;
  geolocation?: string;
  is_protected: boolean;
  article: IFeedItemInfo | undefined;
  live: IFeedItemInfo | undefined;
  recipe: IFeedItemInfo | undefined;
  package: IFeedItemInfo | undefined;
  workout: IFeedItemInfo | undefined;
  basic: IFeedItemInfo | undefined;
  members: IFeedJoinMember[];
  media: IFeedMediaItem[];
  type: IFeedTypes;
  coach: IUser;
  am_i_follow: boolean;
  likecount: number;
  commentcount: number;
  liked: boolean;
  exercise?: any;
  feed?: any;
  is_finished?: boolean
}
export interface IFeedItemInfo {
  price?: number;
  id: number;
  start_day?: string;
  duration?: number;
  user_count: number;
  currency_id?: number;
  wallet_id?: number;
  is_finished: boolean;
  is_individual: boolean;
  language?: number;
  context?: IFeedContext[];
  measurement?: IFeedCategoryItem[];
  coach_question?: IFeedCoachQuestionItem[];
  category?: IFeedCategoryItem[];
  tags?: IFeedMultiItem[];
  text?: string;
  datetime: Date;
  link?: string;
  level: WorkoutLevel;
  calorie?: number;
  body_parts?: IExercise[];
  equipments: IWorkoutMultiItem[];
  trainings?: ITraning[];
  kcal_measurement: IMeasurmentsType;
  carbohydrates?: number;
  protein?: number;
  fat?: number;
  apportionment?: number;
  serving_size?: number;
  is_more: boolean;
  channel_id?: string;
  chat_type?: string;
}
export interface IFeedJoinMember {
  id: number;
  user: IUser;
  measurement_answer?: string | null;
  created_at: Date;
  status: string;
  feed_id: number;
}
export interface IAnswerItem {
  coach_questions: IAnswerDetails[];
  measurements: IAnswerDetails[];
}
interface IAnswerDetails {
  id: number;
  answer: string;
}
export interface IMeasurementAnswer {
  id: number;
  answer: string;
}
export interface IPostAnswer {
  user: number;
  feed: number;
  measurement_answer?: string;
}
export interface IVideoProgressItem {
  type: 'cover' | 'context';
  progress: number;
  public_key: string;
  height?: number;
  width?: number;
}

export interface IAddedMember {
  user: number;
  channel_id: string;
}
export interface ILikedUsersListItem {
  created_at: Date;
  feed: number;
  id: number;
  user: IUser;
}
export interface IMyCreationsCardData {
  id?: number;
  title?: string;
  descriptionOne?: string;
  descriptionTwo?: string;
  trainingType?: 'individual' | 'groupe';
  type: IFeedTypes;
  mediaType?: IFeedMediaTypes;
  mediaUrl?: string;
  is_protected?: boolean;
  start_day: string;
  start_time: any
}
export type IMediaSize = '1:1' | '16:9' | '4:5';
export interface IFeedListFilter {
  index: number | undefined;
  name: IFeedFilterTypes;
}
type IFeedFilterTypes =
  | 'live'
  | 'article'
  | 'package'
  | 'recipe'
  | 'workout'
  | 'coaches'
  | 'feed';
export interface IComment {
  feed: string;
  comment: string;
}
export interface ICommentItem {
  comment?: string;
  created_at: string;
  feed: string;
  id: string;
  reply_comment: [];
  user: IUser;
  like_count: number;
}
export interface ICommentReply {
  feed_comment: string;
  comment: string;
}
export interface IHideFeed {
  feed?: string;
  user?: string;
}
export interface IReportFeedCategory {
  id: string;
  name: string;
}
export interface IReportFeed {
  feed: string;
  report_category: number;
  text: string;
  user: number;
}

export type IMandatoryFields = 'gender' | 'language' | 'speciality' | 'status' | 'image';

export interface ICheckStripeResponseData {
  created_at: Date;
  currency_type: number;
  id: number;
  info: any; //--------------?
  user: number;
  stripe_login_url: string;
}
export interface ICheckIsQuetstinsExist {
  user: number;
  feed: number;
}
export type IQuestioneRequestStatus =
  | 'questions exist'
  | 'no questions'
  | IRequestStatusType;
export type IMediaForTypes = 'media' | 'context';
export interface ILocation {
  address_components: Array<ILocationAddressComponents>;
  formatted_address: string;
  geometry: ILocationGeometry;
  place_id: string;
  types: string[];
}
interface ILocationAddressComponents {
  long_name: string;
  short_name: string;
  types: Array<string>;
}
interface ILocationGeometry {
  bounds: {
    northeast: ILocationLatLng;
    southwest: ILocationLatLng;
  };
  location: ILocationLatLng;
  location_type: string;
  viewport: {
    northeast: ILocationLatLng;
    southwest: ILocationLatLng;
  };
}
interface ILocationLatLng {
  lat: number;
  lng: number;
}
export interface IShare {
  type: string,
  id?: number,
  lang?: string,
  username?: string,
  feedTypeId?: number
}
export interface ICoachIdsPayload {
  coaches: number[]
}
export interface IAssistantChannels {
   id: number,
   title: string,
   type: string,
   messages: {
    results: IAssistantChannelMessagesResultItem[]
   }
}
export interface IAssistantChannelMessagesResultItem {
  id: number,
  message: string,
  created_at: string,
  me: boolean,
}
export interface IAssistantPostMessagePayloadData {
  message: string
}
export interface IAssistantPostImageMessagePayloadData {
  file_url: string,
  text?: string
}
export interface IAssistantPostMessagePayload {
  assistantId?: number, 
  data: IAssistantPostMessagePayloadData,
  cb: () => void
}
export interface IAssistantPostImageMessagePayload {
  assistantId?: number, 
  data: IAssistantPostImageMessagePayloadData,
  cb: () => void
}
export interface ICreateAssistantChannelPayload {
  data: IAssistantPostMessagePayloadData,
  cb: () => void
}
