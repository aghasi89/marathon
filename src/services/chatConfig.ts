import { StreamChat } from 'stream-chat';
import { StreamChatGenerics } from '../screens/ChatStack/AppContext';

export const chatApiKey = 'rf7zdvy4nyud';
export const chatClient = StreamChat.getInstance<StreamChatGenerics>(chatApiKey);
