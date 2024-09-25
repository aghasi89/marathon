import {IExerciseItem, IMyCreationsCardData} from '../../types/types';
import {downloadMediaFromBunny} from '../bunny.net';
import {formatTimeDuration} from '../formatTimeDuration';

const transformExerciseListDataToMyCreationsListData = (
  t: (value: string) => string,
  list: IExerciseItem[],
) => {
  const newList: IMyCreationsCardData[] = list?.map(item => {
    return {
      id: item.id,
      title: item.title,
      descriptionOne: item.time
        ? `${formatTimeDuration(item.time.toString())}`
        : ' ',
      mediaType: 'video',
      mediaUrl: item.video
        ? downloadMediaFromBunny({
            public_key: item.video,
            mediaType: 'video',
            aspectRatio: item.size,
            userDir:item?.creator,
            imageDir:'feed'
          })?.thumbnailURL
        : '',
      type: 'exercise',
    };
  });
  return newList;
};

export default transformExerciseListDataToMyCreationsListData;
