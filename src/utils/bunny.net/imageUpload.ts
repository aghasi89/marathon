import { ImageDirectoryType } from '.';
import {IUploadImage} from '../../types/types';
import bunnyConfig from './bunnyConfig';

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

type Props = {
  image: IUploadImage;
  userDir?:number,
  imageDir?:ImageDirectoryType
};
const uploadImageToBunny = async ({
  image,
  userDir,
  imageDir
}: Props) => {
  const {storage} = bunnyConfig,
    pathArr = image.path.split('/'),
    imageName = pathArr[pathArr.length - 1],
    public_key = `${generateUUID()}_${imageName}`,
    imageData = await fetch(image.path),
    imageBlob = await imageData.blob(),
    myHeaders = new Headers();
  myHeaders.append('accept', 'application/octet-stream');
  myHeaders.append('AccessKey', storage.authKey);
  myHeaders.append('Content-Type', image.mime);
  const uploadOptions: any = {
    url: `${storage.baseUrl}/${storage.storageZoneName}/${storage.directoryName}${userDir?'/'+userDir:''}${imageDir?'/'+imageDir:''}/${public_key}`,
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
    body: imageBlob,
  };
  try {
    const response = await fetch(uploadOptions?.url, uploadOptions);
    if (response.status === 201) return public_key;
  } catch (error) {
    throw error;
  }
};

export default uploadImageToBunny;
