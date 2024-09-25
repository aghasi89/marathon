import moment from 'moment';
import {
  ICurrency,
  IFeedItem,
  IFeedMediaItem,
  ISelectedFeedData,
  IUser,
} from '../../types/types';
import { downloadMediaFromBunny } from '../bunny.net';
import calculateCalories from '../calculateCalories';
import { BunnyAdministrativeDirectories } from '../bunny.net/bunnyConfig';

const transformSelectedFeedData = (
  t: (key: string) => string,
  selectedFeed?: IFeedItem,
  currencyList?: ICurrency[],
  user?: IUser,
  value?: string,
) => {  
  const newMediaList: IFeedMediaItem[] = (selectedFeed?.feed?.media || [])?.map(
    item => {      
      const coverMedia = downloadMediaFromBunny({
        public_key: item.url,
        mediaType: item.type,
        aspectRatio: item.size,
        userDir: selectedFeed?.feed?.creator,
        imageDir: 'feed'
      });
      return {
        url:
          item?.type !== 'videoLink'
            ? !item?.inProgress
              ? coverMedia?.url
              : ''
            : item?.url,
        thumbnail: !item?.inProgress ? coverMedia?.thumbnailURL : item.url,
        animationURL: !item?.inProgress ? coverMedia?.previewAnimationURL : '',
        size: item.size,
        type: item.type,
        uploadingProgress: item.uploadingProgress,
        inProgress: item.inProgress,
      };
    },
  );
  let isExpired = false;
  if (selectedFeed?.type === 'package' && selectedFeed?.start_day && selectedFeed?.duration) {
    const newDate = new Date();
    const expiredDate = new Date(selectedFeed.start_day);
    expiredDate.setDate(expiredDate.getDate() + selectedFeed.duration);
    if(expiredDate < newDate) {
      isExpired = true;
    }
  } else if (selectedFeed?.type === 'live' && selectedFeed?.datetime && selectedFeed?.duration) {
    const newDate = new Date();
    const expiredDate = new Date(selectedFeed.datetime);
    expiredDate.setMinutes(expiredDate.getMinutes() + selectedFeed.duration);
    if(expiredDate < newDate) {
      isExpired = true;
    }
  }
  const type = selectedFeed?.type
    ? selectedFeed?.type
    : selectedFeed?.feed?.type;
  const feedData: ISelectedFeedData = {
    id: selectedFeed?.feed?.id,
    feedDate: moment(selectedFeed?.feed?.created_at).fromNow(),
    description: selectedFeed?.text,
    hashtagsData: {
      feedCategory: selectedFeed?.feed_category
        ? selectedFeed?.feed_category[0]?.name
        : undefined,
      hashtags: selectedFeed?.tag?.map(el => el.name ?? ''),
    },
    mediaData: {
      liveDuration: `${selectedFeed?.duration} ${t('min')}`,
      mediaList: newMediaList,
    },
    isExpired: isExpired,
    context: selectedFeed?.context?.map(el => {
      if (el.type !== 'text' && el.type !== 'videoLink') {
        const contextMedia = downloadMediaFromBunny({
          public_key: el.value,
          mediaType: el.type,
          aspectRatio: el.size,
          userDir: selectedFeed?.feed?.creator,
          imageDir: 'feed',
        });
        return {
          ...el,
          value: contextMedia?.url,
          thumbnail: contextMedia?.thumbnailURL,
        };
      }
      return el;
    }),
    commentData: [
      // {
      //   comentDate: moment(new Date('16/03/2023')).fromNow(), //-----------------------?
      //   comment: '',
      //   id: 1, //----------------------------??
      //   isLiked: true, //----------------------------??,
      //   likesCount: 1, //--------------------??,
      //   repliesCount: 10, //-------------------??
      //   userImageURL: undefined, //-----------------------??
      //   userName: 'Name Surname', //----------------??
      // },
    ],
    userName:
      selectedFeed?.first_name || selectedFeed?.last_name
        ? `${selectedFeed?.first_name ?? ''} ${selectedFeed?.last_name ?? ''}`
        : '',
    userId: selectedFeed?.feed?.creator ?? 0,
    preparationSteps: selectedFeed?.preparation_steps?.map(
      item => item.text ?? '',
    ),
    ingredientsData: selectedFeed?.components?.map(item => {
      return {
        title: item.name,
        mass: '', //-------------------?
        measurement: '', //---------------?
      };
    }),
    userImage: selectedFeed?.image
      ? downloadMediaFromBunny({
        public_key: selectedFeed?.image,
        mediaType: 'image',
        userDir: selectedFeed?.feed?.creator,
        imageDir: 'profile',
      })?.url
      : undefined,
    inputValue: value,
    progressData: {
      carbs: selectedFeed?.carbohydrates,
      fat: selectedFeed?.fat,
      protein: selectedFeed?.protein,
      calories: calculateCalories(
        selectedFeed?.protein,
        selectedFeed?.fat,
        selectedFeed?.carbohydrates,
      ),
    },
    inputDisable: !user,
    recipeChipsData: {
      elements: [
        {
          title: `${selectedFeed?.serving_size ?? ''} ${selectedFeed?.unit_of_measurement?.name ?? ''
            }`,
        },
        { title: selectedFeed?.language?.name ?? '' },
      ], //----------------------??
      cookingTime: `${selectedFeed?.duration} ${t('min')}`,
      apportionment: selectedFeed?.apportionment,
    },
    title: selectedFeed?.feed?.title,
    traningInfoData: {
      trainingType: selectedFeed?.is_individual ? 'individual' : 'groupe',
      groupeMembersMaxCount: selectedFeed?.user_count,
      duration:
        type !== 'live'
          ? `${selectedFeed?.duration} ${t('days')}`
          : moment(selectedFeed?.datetime).format('HH:mm'),
      joinMembersCount: selectedFeed?.members?.length ?? 0,
      price: `${selectedFeed?.price && parseInt(selectedFeed?.price) > 0
        ? selectedFeed?.price
        : t('free')
        } ${currencyList?.find(el => el.id === selectedFeed?.currency_id)?.code ??
        ''
        } `,
      startDate: moment(selectedFeed?.start_day).format('DD MMMM'),
    },
    type: type,
    isLiked: selectedFeed?.liked,
    likesCount: selectedFeed?.feed?.like_count,
    feedTypeId: selectedFeed?.id,
    commentsCount: selectedFeed?.feed?.comment_count,
    isBookmarked: false, //-----------------------??
    liveInfoData: {
      isOwner: user && user.id === selectedFeed?.feed?.creator,
      availablePlacesExist: selectedFeed?.members
        ? selectedFeed?.members?.length < selectedFeed?.user_count
        : true,
      isJoined:
        user && selectedFeed?.members
          ? selectedFeed?.members?.findIndex(el => el.user.id === user?.id) >= 0
          : false,
    },
    level: selectedFeed?.level,
    calorie: selectedFeed?.calorie,
    body_parts: selectedFeed?.body_parts,
    equipments: selectedFeed?.equipments?.map(el => ({
      name: el.name_en,
      url: downloadMediaFromBunny({
        public_key: el.image,
        mediaType: 'image',
        customDir: BunnyAdministrativeDirectories.EQUIPMENT,
      })?.url,
      id: el.id,
    })),
    selectedEquipmentsName: !!selectedFeed?.equipments?.length
      ? selectedFeed?.equipments?.length === 1
        ? selectedFeed?.equipments[0]?.name
        : `${selectedFeed?.equipments?.length} ${t('equipments')}`
      : t('noEquipments') ?? '',
    selectedBodyPartsName: !!selectedFeed?.body_parts?.length
      ? selectedFeed?.body_parts?.length === 1
        ? selectedFeed?.body_parts[0]?.slug
        : `${selectedFeed?.body_parts?.length} ${t('parts')}`
      : '',
    trainings: selectedFeed?.trainings?.map(el => ({
      id: el.id,
      rest_time: el.rest_time,
      time: el.exercise?.time?.toString(),
      name: el.exercise?.title,
      url: el.exercise?.video
        ? downloadMediaFromBunny({
          public_key: el.exercise?.video,
          mediaType: 'video',
          aspectRatio: el.exercise?.size,
          userDir: el.exercise?.creator,
          imageDir: 'feed',
        })?.thumbnailURL
        : '',
      body_parts: el.exercise?.body_parts,
      description: el.exercise?.description ?? '',
      equipments: el.exercise?.equipments,
      videoUrl: el.exercise?.video
        ? downloadMediaFromBunny({
          public_key: el.exercise?.video,
          mediaType: 'video',
          aspectRatio: el.exercise?.size,
          userDir: el.exercise?.creator,
          imageDir: 'feed'
        })?.url
        : '',
      title: el.exercise?.title,
      level: el.exercise?.level,
    })),
  };
  return feedData;
};

export default transformSelectedFeedData;
