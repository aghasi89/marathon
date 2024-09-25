import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import LottieView from 'lottie-react-native';
import styles from './ChannelHeader.style';
import Icons from '../../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import {DefaultTFuncReturn} from 'i18next';

type Props = {
  imageUrl?: string | undefined;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  userName?: string;
  handlerOpenMenu?: () => void;
  isDirectChat?: boolean;
  hanlderLeaveChannel?: () => void;
  handlerGoBack?: () => void;
  handlerOpenLive: (isCreated: boolean) => void;
  showLiveStream?: boolean;
  showOpenAi?: boolean;
  handlerOpenAi?: () => void;
  isOnline?: boolean;
  handlerGoToProfile?: () => void;
  id?: number | undefined;
  isPublisher?: boolean;
  lastVisit: DefaultTFuncReturn | string;
  membersCount?: string
};

const ChannelHeader: React.FC<Props> = (props: Props) => {
  const {
    imageUrl,
    customStyles,
    userName,
    handlerOpenMenu,
    isDirectChat,
    handlerGoBack,
    handlerOpenLive,
    showLiveStream,
    showOpenAi,
    isOnline,
    handlerOpenAi,
    handlerGoToProfile,
    id,
    isPublisher,
    lastVisit,
    membersCount
  } = props;
  const {t} = useTranslation();

  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.menu} onPress={handlerGoBack}>
          <Icons.ArrowIcon fill={formFieldGrey} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userInfoTwo}
          onPress={handlerGoToProfile}>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <>
                <Image
                  resizeMode="contain"
                  style={styles.userAvatar}
                  source={{
                    uri: imageUrl,
                  }}
                />
              </>
            ) : (
              <>
                <Icons.GroupChatAvatar {...styles.userAvatar} />
              </>
            )}
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {userName ? (
              <Text numberOfLines={1} style={styles.userName}>
                {userName}
              </Text>
            ) : (
              <Text style={styles.userName}>{t(`groupName`)}</Text>
            )}
            {isDirectChat && isOnline ? (
              <View style={styles.onlineContainer}>
                <View style={styles.onlineStatus} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            ) : isDirectChat ? (
              <Text>{lastVisit}</Text>
            ) : (
              <Text>{membersCount + " " + t("members")}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        {showLiveStream && (
          <TouchableOpacity
            style={styles.editMenu}
            onPress={() => handlerOpenLive(isPublisher ? isPublisher : false)}>
            {isPublisher ? (
              <Icons.newChatCamera {...styles.liveIcon} fill={primaryBlue} />
            ) : (
              <LottieView
                speed={3}
                style={styles.lottieView}
                resizeMode="cover"
                autoPlay
                loop
                source={require('../../../../../../assets/lottie/livestream.json')}
              />
            )}
          </TouchableOpacity>
        )}
        {showOpenAi && (
          <TouchableOpacity style={styles.editMenu} onPress={handlerOpenAi}>
            <Icons.Robot {...styles.liveIcon} fill={primaryBlue} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.editMenu} onPress={handlerOpenMenu}>
          <Icons.chatFreeDots/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChannelHeader;
