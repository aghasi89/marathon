import chat from '../services/api/routes/chat';
import { chatClient } from '../services/chatConfig';
import { IUser } from '../types/types';
import { downloadMediaFromBunny } from './bunny.net';

export const setupClient = async (
  user: IUser,
  updateUnreadCount?: (initialUnreadCount: number) => void,
) => {
  const token = await chat.getChatUserToken(user.get_stream_id);
  const userinfo = {
    id: user?.get_stream_id,
    name: user?.user.first_name,
    image: downloadMediaFromBunny({
      public_key: user?.image || '',
      mediaType: 'image',
      userDir: user?.id,
      imageDir: 'profile',
    })?.url,
    userName: user?.user.username
  };
  try {
    const user = await chatClient.connectUser(userinfo, token);
    const initialUnreadCount = user?.me?.total_unread_count;
    updateUnreadCount && updateUnreadCount(initialUnreadCount ?? 0);
    chatClient?.on(event => {
      if (event.total_unread_count !== undefined) {
        updateUnreadCount && updateUnreadCount(event.total_unread_count);
      }
    });
  } catch (error: any) {
    console.error(
      `An error occurred while connecting the user: ${error.message}`,
    );
  }
};
