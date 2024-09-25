import {Dimensions} from 'react-native';
import {IMediaSize, IRequestStatusType, IUploadImage} from '../../types/types';
import bunnyConfig from './bunnyConfig';
import uploadImageToBunny from './imageUpload';
import uploadVideoToBunny from './videoUpload';
import { put } from 'redux-saga/effects';

interface IDownloadMediaPayload{
  public_key?: string,
  mediaType?: string,
  aspectRatio?: IMediaSize,
  userDir?:number,
  imageDir?:ImageDirectoryType,
  customDir?:string
}
export type IBunnyDownloadMediaType = {
  url?: string;
  previewAnimationURL?: string;
  thumbnailURL?: string;
};

export type ImageDirectoryType = 'profile'|'feed'
type DispatchType = typeof put;


export const uploadMediaToBunny= (
  file: IUploadImage,
  mediaType?: 'image' | 'video',
  userDir?:number,
  imageDir?:ImageDirectoryType,
  dispatch?:DispatchType
):Promise<string|undefined> => {
  if (mediaType === 'image') {
    return uploadImageToBunny({image: file,userDir,imageDir});
  } else {    
    return uploadVideoToBunny({video: file,collectionName:userDir, dispatch});
  }
};
  
export const downloadMediaFromBunny = (
  {
    aspectRatio,
    imageDir,
    mediaType,
    public_key,
    userDir,
    customDir
  }:IDownloadMediaPayload
) => {
  try {
    if (public_key) {
      if (mediaType === 'video') {
        const baseUrl = `https://${bunnyConfig.stream.hostname}/${public_key}/`;
        return {
          url: `${baseUrl}playlist.m3u8?v=1689676821`,
          previewAnimationURL: `${baseUrl}preview.webp?v=1689677127`,
          thumbnailURL: `${baseUrl}/thumbnail.jpg?v=1689677127`,
        };
      } else if (mediaType === 'image') {
        const width = aspectRatio ? Dimensions.get('window').width : 350;
        const optimizeConfig = `?width=${width}&aspect_ratio=${
          aspectRatio ?? '1:1'.split(' / ').join(':')
        }`;
        return {
          url: public_key
            ? `https://${bunnyConfig.storage.hostname}${!customDir?'/'+bunnyConfig.storage.directoryName:customDir}${userDir?'/'+userDir:''}${imageDir?'/'+imageDir:''}/${public_key}${optimizeConfig}`
            : undefined,
        };
      }
    }
    return {
      url: ``,
      previewAnimationURL: ``,
      thumbnailURL: ``,
    };
  } catch (err) {
    console.log(err, '!!');
  }
};
