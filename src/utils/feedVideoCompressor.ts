import {Video} from 'react-native-compressor';
import {IUploadImage} from '../types/types';
import {setVideoCompressingProgressAction} from '../store/actions/createFeed-action';
import store from '../store';

const videoCompressor = async (
  file: IUploadImage,
): Promise<IUploadImage | undefined> => {
  try {
    if (!file.path) {
      throw new Error('Invalid file provided');
    }
    if (file.mime?.startsWith('video')) {
      let percent:any = undefined;
      const result = await Video.compress(
        file.path,
        {
          compressionMethod: 'auto',
          // compressionMethod: 'manual',
          // bitrate: 4000,
          // maxSize:3500,
        },
        progress => {
          let percentage = +(progress * 100).toFixed(0);
          if(percent!=percentage){
            store.dispatch(setVideoCompressingProgressAction(percentage));
            percent=percentage
          }          
        },
      );
      file.path = result;
    }
    store.dispatch(setVideoCompressingProgressAction(100));
    return file;
  } catch (error) {
    console.log(error, 'videoCompressor error');
  }
};
export default videoCompressor;
