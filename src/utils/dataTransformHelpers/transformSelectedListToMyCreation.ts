import moment from "moment";
import { ICurrency, IFeedItem, IMyCreationsCardData } from "../../types/types";
import { downloadMediaFromBunny } from "../bunny.net";
import videoLink from "../videoLink";

const transformeSelectedItemsListDataToMyCreationsListData = (
  t: (value: string) => string,
  list?: IFeedItem[] | undefined,
  currencyList?: ICurrency[]
) => {

  const newList: IMyCreationsCardData[] | undefined = list?.map(item => {
    const currency = currencyList?.find(el => el.id === item.currency_id)
    const mediaUrl =
      item.feed?.media[0]?.type === 'video' ||
        item.feed?.media[0]?.type === 'image'
        ? downloadMediaFromBunny({
          public_key: item.feed?.media[0]?.url,
          mediaType: item.feed?.media[0]?.type,
          aspectRatio: item.feed?.media[0]?.size,
          userDir: item?.feed?.creator,
          imageDir: 'feed'
        })
        : undefined;
    return {
      id: item.feed?.id,
      title: item.feed?.title,
      type: item.feed?.type ?? 'feed',
      descriptionOne:
        item.feed?.type === 'package' || item.feed?.type === 'live'
          ? item.is_individual
            ? t('individual') ?? ''
            : `${item.members ? item.members.length : 0}/${item?.user_count}`
          : '',
      is_protected: item.feed?.is_protected,
      mediaType: item.feed?.media[0]?.type,
      mediaUrl:
        item.feed?.media[0]?.type === 'image'
          ? mediaUrl?.url
          : item.feed?.media[0]?.type === 'video'
            ? mediaUrl?.thumbnailURL
            : videoLink(item.feed?.media[0]?.url),
      descriptionTwo:
        item.feed?.type === 'package'
          ? item?.price
            ? `${item?.price} ${currency?.sign ?? ''}`
            : `${t('free')}`
          : item.feed?.type === 'live'
            ? moment(item?.datetime).format('DD MMMM')
            : '',
      trainingType: item?.is_individual ? 'individual' : 'groupe',
      start_day: item?.start_day ?? "",
      start_time: item?.datetime ?? ""
    };
  });
  return newList ?? [];
};

export default transformeSelectedItemsListDataToMyCreationsListData