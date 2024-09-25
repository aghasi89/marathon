import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useChatContext } from 'stream-chat-react-native';
import { chatClient } from '../../../services/chatConfig';
import { NavigationParamList } from '../../../navigation/FeedNavigation';
import { setError } from '../../../store/actions/administrative-action';
import { IError } from '../../../types/types';
import { useAppContext } from '../AppContext';

type Props = NativeStackScreenProps<NavigationParamList, 'FEED'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const { client } = useChatContext();
  const { setChannel } = useAppContext();
  const onPressToChat = useCallback(
    async (userId: string) => {
      try {
        if (client?.userID !== userId) {
          //@ts-ignore
          const channel = chatClient.channel('messaging', {
            members: [client.userID, userId],
          });
          await channel.watch();
          setChannel(channel);
          navigation.navigate('CHANNEL');
        }
      } catch (error: any) {
        const data: IError = {
          title: 'Something went wrong ...',
          text: 'Direct messaging error',
          buttonTitle: 'OK',
        };
        dispatch(setError(data));
        console.error(
          `An error occurred while opening the chat with user ${userId}: ${error}`,
        );
      }
    },
    [navigation],
  );
  return {
    t,
    dispatch,
    onPressToChat,
  };
};
