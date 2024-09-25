import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/fr';
import 'moment/locale/hy-am';
import {
  ICurrency,
  IFeedCardData,
  IFeedListItem,
  IFeedMediaItem,
  IUser,
} from '../../types/types';
import {downloadMediaFromBunny} from '../bunny.net';
import calculateCalories from '../calculateCalories';
import {formatTimeDuration} from '../formatTimeDuration';

const transformFeedListData = (
  t: (key: string) => string | null,
  feedList?: IFeedListItem[],
  currencyList?: ICurrency[],
  user?: IUser,
  myInfo?: IUser,
) => {
  const newList = feedList ? [...feedList] : [];
  const transformedData: IFeedCardData[] = newList.map((item, index) => {
    let workoutDuration = '00:00';
    const newMediaList: IFeedMediaItem[] = (item.media || [])?.map(el => {
      const coverMedia = downloadMediaFromBunny({
        public_key: el.url,
        mediaType: el.type,
        aspectRatio: el.size,
        userDir: item?.creator,
        imageDir: 'feed',
      });
      return {
        url:
          el?.type !== 'videoLink'
            ? !el?.inProgress
              ? coverMedia?.url
              : ''
            : el?.url,
        thumbnail: !el?.inProgress ? coverMedia?.thumbnailURL : el.url,
        animationURL: !el?.inProgress ? coverMedia?.previewAnimationURL : '',
        size: el.size,
        type: el.type,
        uploadingProgress: el.uploadingProgress,
        inProgress: el.inProgress,
      };
    });
    if (item.type === 'workout') {
      if (!item[item.type]?.trainings?.length) {
        workoutDuration =
          formatTimeDuration(item[item.type]?.duration?.toString()) || '';
      } else {
        let time: number = 0;
        item[item.type]?.trainings?.forEach(el => {
          time += (Number(el.rest_time) || 0) + (Number(el.time) || 0);
        });
        workoutDuration = formatTimeDuration(time.toString()) || '';
      }
    }
    let isExpired = false;
    if (item.type === 'package' && item.package?.start_day && item.package.duration) {
      const newDate = new Date();
      const expiredDate = new Date(item.package?.start_day);
      expiredDate.setDate(expiredDate.getDate() + item.package.duration);
      if(expiredDate < newDate) {
        isExpired = true;
      }
    } else if (item.type === 'live' && item.live?.datetime && item.live?.duration) {
      const newDate = new Date();
      const expiredDate = new Date(item.live?.datetime);
      expiredDate.setMinutes(expiredDate.getMinutes() + item.live?.duration);
      if(expiredDate < newDate) {
        isExpired = true;
      }
    }
    
    return {
      id: item.id,
      mediaList: newMediaList,
      am_i_follow: item.am_i_follow,
      wallet_id: item[item.type]?.wallet_id,
      creatorId: item?.creator,
      price: `${
        !!item[item.type]?.price ? item[item.type]?.price : t('free')
      } ${
        currencyList?.find(el => el.id === item[item.type]?.currency_id)
          ?.code ?? ''
      }`,
      feedDate: moment(item.created_at).fromNow(),
      feedTypeId: item[item?.type]?.id,
      followButtonShow: item.creator !== user?.id,
      userName:
        item.coach?.user?.first_name || item.coach?.user?.last_name
          ? `${item?.coach?.user?.first_name ?? ''} ${
              item?.coach?.user?.last_name ?? ''
            }`
          : '',
      type: item.type,
      description: item?.title,
      workoutInfo:
        item.type === 'workout' && !!item[item.type]?.trainings?.length
          ? `${item[item.type]?.trainings?.length} ${t('exercises')}`
          : t('workout') ?? '',
      workoutLevel: item[item.type]?.level,
      duration:
        item.type !== 'live' && item.type !== 'workout'
          ? `${item[item.type]?.duration} ${t('days')}`
          : item.type === 'live'
          ? moment(item[item.type]?.datetime).format('kk:mm')
          : item.type === 'workout'
          ? workoutDuration
          : '00:00',
      placeCount: item[item.type]?.user_count,
      trainingType: item[item.type]?.is_individual ? 'individual' : 'groupe',
      hashtags: item[item.type]?.tags,
      startDate:
        item.type !== 'live'
          ? moment(item[item.type]?.start_day).format('DD MMMM')
          : moment(item[item.type]?.datetime).format('DD MMMM'),
      recipe: {
        calories: calculateCalories(
          item[item.type]?.protein,
          item[item.type]?.fat,
          item[item.type]?.carbohydrates,
        ),
        carbs: item[item.type]?.carbohydrates,
        fat: item[item.type]?.fat,
        protein: item[item.type]?.protein,
        prepTime: item[item.type]?.duration,
      },
      liveDuration: `${item[item.type]?.duration} ${t('min')}`,
      isOwner: !myInfo
        ? user && user.id === item.creator
        : myInfo.id === item.creator,
      isPublic: item.is_public,
      commentsCount: item.commentcount,
      userCount: item.members?.length ?? 0,
      userImage: item.coach?.image
        ? downloadMediaFromBunny({
            public_key: item.coach?.image,
            mediaType: 'image',
            userDir: item?.coach?.id,
            imageDir: 'profile',
          })?.url
        : undefined,
      availablePlacesExist: item.members
        ? item.members?.length < (item[item.type]?.user_count ?? 0)
        : true,
      isJoined:
        (myInfo || user) && item.members
          ? item.members?.findIndex(
              el => el.user.id === (myInfo?.id || user?.id),
            ) > -1
          : false,
      likesCount: item.likecount, //---------------------?
      videoTitle: '', //-------------?
      isLiked: item.liked, //---------?
      isBookmarked: false, //=----------?,
      traningCount: item[item.type]?.trainings?.length,
      channel_id: item[item.type]?.channel_id,
      chat_type: item[item.type]?.chat_type,
      is_protected: item.is_protected,
      coach_question: item[item.type]?.coach_question,
      measurement: item[item.type]?.measurement,
      exercisesCount:
        item.type == 'workout' && item[item.type]?.trainings
          ? item[item.type]?.trainings?.length
          : 0,
      mediaSize: item.media ? item.media[0]?.size : '16:9',
      get_stream_id: item?.coach?.get_stream_id,
      role_mode: item.coach?.role_mode === 'coach' ? 'coach' : 'user',
      isExpired:  isExpired,
    };
  });
  return transformedData;
};
export default transformFeedListData;
