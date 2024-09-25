import moment from 'moment';
import {
  ICurrency,
  IFeedListItem,
  IMyCreationsCardData,
  IUser,
} from '../../types/types';
import {downloadMediaFromBunny} from '../bunny.net';
import calculateCalories from '../calculateCalories';
import {formatTimeDuration} from '../formatTimeDuration';
import videoLink from '../videoLink';

const transformFeedListDataToMyCreationsListData = (
  t: (value: string) => string,
  list: IFeedListItem[] | undefined,
  currencyList: ICurrency[] | undefined,
  user?: IUser,
) => {
  const newlist: IMyCreationsCardData[] | undefined = list?.map((item, _) => {
    const currency = currencyList?.find(
      el => el.id === item[item.type]?.currency_id,
    );
    const mediaUrl =
      item?.media &&
      (item?.media[0]?.type === 'video' || item?.media[0]?.type === 'image')
        ? downloadMediaFromBunny({
            public_key: item?.media[0]?.url,
            mediaType: item?.media[0]?.type,
            aspectRatio: item?.media[0]?.size,
            userDir:item?.creator,
            imageDir:'feed'
          })
        : undefined;
    if (!item.type) return item;
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      descriptionOne:
        item.type === 'package' || item.type === 'live'
          ? item[item.type]?.is_individual && item.creator !== user?.id
            ? t('individual') ?? ''
            : `${item.members ? item.members.length : 0}/${
                item[item.type]?.user_count ?? 0
              }`
          : item.type === 'recipe'
          ? `${item[item.type]?.duration ?? '0'} ${t('min')}`
          : item.type === 'workout'
          ? !!item[item.type]?.trainings?.length
            ? `${formatTimeDuration(
                item[item.type]?.trainings
                  ?.map(el => el.time)
                  .reduce((a, b) => (a ?? '0') + (b ?? '0')),
              )}`
            : `${
                formatTimeDuration(item[item.type]?.duration?.toString()) ?? ''
              } `
          : '',
      is_protected:
        (item.type === 'workout' || item.type === 'recipe') &&
        item.is_protected,
      mediaType: item.media && item.media[0]?.type,
      mediaUrl:
        item.media && item.media[0]?.type === 'image'
          ? mediaUrl?.url
          : item.media && item.media[0]?.type === 'video'
          ? mediaUrl?.thumbnailURL
          : item.media && videoLink(item.media[0]?.url),
      descriptionTwo:
        item.type === 'workout'
          ? !!item[item.type]?.trainings?.length
            ? `${item[item.type]?.trainings?.length}`
            : `${t('workout')}`
          : item.type === 'package'
          ? item[item.type]?.price
            ? `${item[item.type]?.price} ${currency?.sign}`
            : `${t('free')}`
          : item.type === 'live'
          ? moment(item[item.type]?.datetime).format('DD MMMM')
          : item.type === 'recipe'
          ? `${calculateCalories(
              item[item.type]?.protein,
              item[item.type]?.fat,
              item[item.type]?.carbohydrates,
            )} ${t('kcal')}`
          : '',
      trainingType: item[item.type]?.is_individual ? 'individual' : 'groupe',
    };
  });
  return newlist;
};
export default transformFeedListDataToMyCreationsListData;
