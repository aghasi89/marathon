import {ChannelProps} from 'stream-chat-react-native';
import {Video as VideoCompressor} from 'react-native-compressor';

const chatVideoCustomUpload: NonNullable<
  ChannelProps['doDocUploadRequest']
> = async (file, channel): Promise<any> => {
  try{
  if (!file.uri) {
    throw new Error('Invalid file provided');
  }
  if (file.mimeType?.startsWith('video/')) {
    const result = await VideoCompressor.compress(file.uri, {
      compressionMethod: 'manual',
      bitrate: 4000,
      maxSize:3500,
    });
    file.uri = result;
  }  
  return await channel.sendFile(file.uri, file.name, file.mimeType);
}catch(error){
  console.log(error,"chatVideoCustomUpload error");
  
}
};
export default chatVideoCustomUpload;
