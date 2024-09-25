import axios from 'axios';
import bunnyConfig from './bunnyConfig';

export default async (videoName: string, collectionName?: number) => {
  const {stream} = bunnyConfig;
  const headers = {
    AccessKey: stream.authKey,
    'Content-Type': 'application/json',
  };
  try {
    if (collectionName) {
      const response = await axios(
        `${stream.baseUrl}${stream.libraryId}/collections?search=${collectionName}`,
        {headers},
      ).then((res: any) => {
        const [id] = res.data.items;
        return id;
      });
      if (!response?.guid) {
        const newCollectionId = await axios
          .post(
            `${stream.baseUrl}${stream.libraryId}/collections`,
            {name: collectionName.toString()},
            {headers},
          )
          .then(res => {
            return res.data.guid;
          });
        return {
          title: videoName,
          collectionId: newCollectionId,
        };
      }
      return {
        title: videoName,
        collectionId: response?.guid,
      };
    } else {
      return {
        title: videoName,
      };
    }
  } catch (error) {
    throw error;
  }
};
