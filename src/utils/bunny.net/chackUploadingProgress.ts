import {IFeedMediaItem, IVideoProgressItem} from '../../types/types';

const chackUploadingProgress = (
  arr: IFeedMediaItem[],
  progressArr: IVideoProgressItem[],
  cb: (index: number, mediaArr: IFeedMediaItem[]) => void,
) => {
  if (!!progressArr.length) {
    const newCovers = arr?.map((el, elIndex) => {
      const index = progressArr.findIndex(
        item => item.public_key === (el.url ? el.url : el.value),
      );
      if (index > -1) {
        if (
          progressArr[index].progress <= 100 &&
          (el.inProgress === undefined || el.inProgress)
        ) {
          //callback function need to end animation successfuly
          if (progressArr[index].progress === 100) cb(elIndex, arr);
          return {
            ...el,
            uploadingProgress: progressArr[index].progress,
            height:progressArr[index].height,
            width:progressArr[index].width,
            inProgress: true,
          };
        }
      }
      return el;
    });
    newCovers && cb(-1, newCovers);
  }
};
export default chackUploadingProgress