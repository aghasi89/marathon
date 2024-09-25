import {Text, View} from 'react-native';
import {PinHeader} from 'stream-chat-react-native';
import styles from './PinnedHeader.style';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';

type Props = {
  pinnedMessage: any;
};

const PinnedHeader: React.FC<Props> = (props: Props) => {
  const {pinnedMessage} = props;
  return (
    <View>
      {pinnedMessage ? (
        <View style={styles.header}>
          <Text
            style={styles.text}>{`Pinned header\n${pinnedMessage.text}`}</Text>
          <PinHeader
            style={{backgroundColor: primaryWhite, alignSelf: 'center'}}
          />
        </View>
      ) : null}
    </View>
  );
};

export default PinnedHeader;
