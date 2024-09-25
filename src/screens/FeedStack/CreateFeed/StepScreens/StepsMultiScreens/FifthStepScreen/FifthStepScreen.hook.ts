import {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {IFeedMediaItem, ISelectedFeedData} from '../../../../../../types/types';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import {profileSelector} from '../../../../../../store/selectors/profile-selector';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const user = useSelector(profileSelector);
  const [images, setImages] = useState<{url: string}[]>([]);
  const [imageViewModalVisibility, setImageViewModalVisibility] =
    useState<boolean>(false);

  const imagePressHandler = useCallback((url?: string) => {
    url && setImages([{url}]);
    setImageViewModalVisibility(true);
  }, []);
  const imageViewModalCloseHandle = useCallback(() => {
    setImageViewModalVisibility(false);
  }, []);
  const data = useMemo(() => {
    const newMediaList: IFeedMediaItem[] = (state?.media || [])?.map(item => {
      const coverMedia = downloadMediaFromBunny({
        public_key: item.url,
        mediaType: item.type,
        aspectRatio: item.size,
        userDir: user?.id,
        imageDir: 'feed',
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
    });
    const feedData: ISelectedFeedData = {
      mediaData: {
        liveDuration: `${state?.duration} ${t('min')} `,
        mediaList: newMediaList,
      },
      title: state.title,
      traningInfoData: {
        trainingType:
          state?.user_count && state?.user_count === 1
            ? 'individual'
            : 'groupe',
        duration:
          state.feedType === 'package'
            ? state?.duration
              ? `${state?.duration} ${t('days')}`
              : t('notIndicated') ?? ''
            : state.start_day
            ? moment(state?.start_day).format('HH:mm')
            : t('notIndicated') ?? '',
        groupeMembersMaxCount: state.user_count,
        joinMembersCount: 0,
        price: state.price ? state.price?.toString() : t('free') ?? '',
        startDate: moment(state.start_day)?.format('DD MMMM'),
      },
      commentsCount: 0,
      isBookmarked: false,
      isLiked: false,
      likesCount: 0,
      type: state.feedType,
      liveInfoData: {
        availablePlacesExist: true,
        isJoined: true,
        isOwner: true,
      },
      hashtagsData: {
        feedCategory:
          state?.selectedCategories && state?.selectedCategories[0]?.category
            ? state?.selectedCategories[0]?.category[0].name
            : undefined,
        hashtags: state.tag?.map(el => el.toString()), //?
      },
      description: state.text,
      context: state?.context?.map(el => {
        const mediaUrls = !el.inProgress
          ? downloadMediaFromBunny({
              public_key: el.value,
              mediaType: el.type,
              aspectRatio: el.size,
              userDir: user?.id,
              imageDir: 'feed',
            })
          : undefined;
        if (el.type !== 'text' && el.type !== 'videoLink') {
          return {
            ...el,
            value: mediaUrls?.url ?? '',
            thumbnail: mediaUrls?.thumbnailURL ?? '',
          };
        }
        return el;
      }),
    };
    return feedData;
  }, [state, user]);
  return {
    t,
    imagePressHandler,
    imageViewModalCloseHandle,
    imageViewModalVisibility,
    images,
    data,
    state,
  };
};
