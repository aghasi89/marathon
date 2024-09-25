import React from 'react';
import {Image} from 'react-native';
import {useMessageContext} from 'stream-chat-react-native';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';
import Icons from '../../../../../../assets/icons/svg';
import style from './MessageAvatar.style';

const MessageAvatarWithContext = (props: any) => {
  const {message} = props;
  const avatar = message.user.image;
  return avatar ? (
    <Image
      source={{
        uri: downloadMediaFromBunny({
          public_key: message?.user?.image,
          mediaType: 'image',
          imageDir: 'profile',
          userDir: message?.user?.id,
        })?.url,
      }}
      style={style.image}
    />
  ) : (
    <Icons.NewGroup />
  );
};

const MemoizedMessageAvatar = React.memo(MessageAvatarWithContext);
export const MessageAvatar = () => {
  const {groupStyles, message} = useMessageContext();

  return <MemoizedMessageAvatar groupStyles={groupStyles} message={message} />;
};
