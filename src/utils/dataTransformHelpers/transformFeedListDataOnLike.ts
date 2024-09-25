import {IFeedListItem} from '../../types/types';

const transformFeedListDataOnLike = (
  selectedId: number,
  feedList?: IFeedListItem[],
) => {
  const newList = feedList ? [...feedList] : [];
  const index = newList.findIndex(el => el.id === selectedId);
  if (index > -1) {
    newList[index] = {
      ...newList[index],
      liked: !newList[index].liked,
      likecount: newList[index].likecount + (newList[index].liked ? -1 : 1),
    };
  }
  return newList;
};

export default transformFeedListDataOnLike;
