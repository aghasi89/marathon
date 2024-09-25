import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Channel, MessageAvatar, Thread} from 'stream-chat-react-native';
import {primaryBlue} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import {calcHeight} from '../../../../assets/dimensions';
import {useAppContext} from '../../AppContext';
import {CustomInput} from '../Channel/components/CustomInput/CustomInput';
import {myMessageTheme} from '../chatTheme';
import styles from './Thread.style';
import ThreadHook from './Thread-hook';
import chatVideoCustomUpload from '../../../../utils/videoCompressor';

const ThreadScreen: React.FC = () => {
  const {channel, thread} = useAppContext();
  const {handlerGoBack, t} = ThreadHook();
  if (!channel) return null;
  return (
    <View style={styles.container}>
      <Channel
       doDocUploadRequest={chatVideoCustomUpload}
        additionalKeyboardAvoidingViewProps={{
          behavior: 'padding',
          keyboardVerticalOffset:
            Platform.OS == 'ios' ? calcHeight(50) : calcHeight(-100),
        }}
        Input={(props: any) => <CustomInput openAiVisible={false} {...props} />}
        hasCommands={false}
        myMessageTheme={myMessageTheme}
        MessageAvatar={MessageAvatar}
        hideStickyDateHeader={true}
        channel={channel}
        thread={thread}
        threadList>
        <TouchableOpacity style={styles.header} onPress={handlerGoBack}>
          <Icons.ArrowIcon fill={primaryBlue} />
          <Text style={styles.headerText}>{t(`thread`)}</Text>
          <View />
        </TouchableOpacity>
        <Thread />
      </Channel>
    </View>
  );
};

export default ThreadScreen;
