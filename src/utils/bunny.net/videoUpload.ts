import axios from 'axios';
import {IUploadImage} from '../../types/types';
import bunnyConfig from './bunnyConfig';
import getVideoCollection from './getVideoCollection';
import {setVideoUploadingProgressAction} from '../../store/actions/createFeed-action';
import {put} from 'redux-saga/effects';
import store from '../../store';
import {Platform} from 'react-native';

type Props = {
  video?: IUploadImage;
  collectionName?: number;
  dispatch?: typeof put;
};
type Create_Video_Response_Type = {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  rotation: any | null;
  width: number;
  height: number;
  availableResolutions: null;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: any[];
  hasMP4Fallback: boolean;
  collectionId: string;
  thumbnailFileName: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
  chapters: any[];
  moments: any[];
  metaTags: any[];
  transcodingMessages: any[];
};

const uploadVideoToBunny = async ({video, collectionName, dispatch}: Props) => {
  const {stream} = bunnyConfig;
  const headers = {
    AccessKey: stream.authKey,
    'Content-Type': 'application/json',
  };
  const pathArr = video?.path.split('/'),
    videoName = pathArr ? pathArr[pathArr.length - 1] : '',
    data = await getVideoCollection(videoName, collectionName);
  const createOptions = {
    url: `${stream.baseUrl}${stream.libraryId}/videos`,
    data,
    headers,
  };
  try {
    const response: {status: number; data: Create_Video_Response_Type} =
      await axios.post(createOptions.url, createOptions.data, {
        headers: createOptions.headers,
      });
    if (response.status === 200) {
      const videoKey = response.data.guid;
      let videoBlob;
      if (Platform.OS === 'android') {
        let videoData = await fetch(video?.path ?? '');
        videoBlob = await videoData.blob();
      } else {
        const res = await axios.get(video?.path ?? '', {
          responseType: 'arraybuffer',
          onDownloadProgress: event => {
            // console.log("Download",event.progress,event.total,event.download);
          },
        });
        videoBlob = res.data;
      }
      const myHeaders = new Headers();
      myHeaders.append('accept', 'application/json');
      myHeaders.append('AccessKey', stream.authKey);
      myHeaders.append('Content-Type', video?.mime ?? '');
      const uploadOptions: any = {
        url: `${stream.baseUrl}${stream.libraryId}/videos/${response.data.guid}`,
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow',
        body: videoBlob,
      };
      console.log(
        videoBlob,
        'REQUEST',
        `${stream.baseUrl}${stream.libraryId}/videos/${response.data.guid}`,
      );
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${stream.baseUrl}${stream.libraryId}/videos/${response.data.guid}`,
        headers: {
          accept: 'application/json',
          accesskey: stream.authKey,
          'content-type': video?.mime,
        },
        data: videoBlob,
      };
      let percent: any = undefined;
      await axios
        .request({
          ...config,
          onUploadProgress: event => {
            if (event.progress) {
              let percentage = +(event.progress * 100).toFixed(0);
              console.log(percentage, 'PERRRR');

              if (percentage != percent) {
                store.dispatch(setVideoUploadingProgressAction(percentage));
                percent = percentage;
              }
            }
          },
        })
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log('error');

          console.log(error.response);
        });
      store.dispatch(setVideoUploadingProgressAction(100));
      return videoKey;

      // const result = await fetch(uploadOptions.url, uploadOptions);
      // if (result.status === 200) {
      //   return videoKey;
      // }
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};
export default uploadVideoToBunny;
