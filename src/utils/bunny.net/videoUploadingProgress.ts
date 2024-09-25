import axios from 'axios';
import {IUploadImage} from '../../types/types';
import bunnyConfig from './bunnyConfig';

type Props = {
  video?: IUploadImage;
  authKey?: string;
  libraryId?: number;
  public_key?: string;
};

const uploadingProgress = async ({
  public_key,
  authKey = bunnyConfig.stream.authKey,
  libraryId = bunnyConfig.stream.libraryId,
}: Props) => {
  try {
    const baseUrl = `https://video.bunnycdn.com/library/${libraryId}/videos/${public_key}`;
    const response = await axios.get(baseUrl, {
      headers: {
        accept: 'application/json',
        AccessKey: authKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default uploadingProgress;
