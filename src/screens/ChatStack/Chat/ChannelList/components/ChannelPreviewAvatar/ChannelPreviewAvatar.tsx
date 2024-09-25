import {Image, View} from 'react-native';
import Icons from '../../../../../../assets/icons/svg';
import style from './ChannelPreviewAvatar.style';

interface Props {
  channel: any;
}
const ChannelPreviewAvatar: React.FC<Props> = ({channel}) => {
  const isDirect = channel?.type === 'messaging';
  const otherUser = Object.values(channel?.state?.members || {}).find(
    member => member?.user?.id !== channel?._client?.user?.id,
  )?.user;
  return (
    <View style={style.imageContainer}>
      {channel?.data?.image ? (
        <Image
          style={style.image}
          source={{
            uri: channel?.data?.image,
          }}
        />
      ) : isDirect && otherUser ? (
        otherUser?.image ? (
          <Image style={style.image} source={{uri: otherUser?.image}} />
        ) : (
          <Icons.ChatPersonIcon {...style.image} />
        )
      ) : channel.data?.type === 'group' ? (
        <Icons.ChatGroupIcon {...style.image} />
      ) : (
        <Icons.ChatChannelIcon {...style.image} />
      )}
    </View>
  );
};

export default ChannelPreviewAvatar;