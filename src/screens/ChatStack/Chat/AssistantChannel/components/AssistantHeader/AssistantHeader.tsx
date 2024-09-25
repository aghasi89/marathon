import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg/index';
import {formFieldGrey} from '../../../../../../assets/styles/colors.styles';
import styles from './AssistantHeader.style';

type Props = {
  handlerGoBack: () => void;
  title: string;
  isCoach: boolean;
  handlerOpenMenu?: () => void;
};

const AssistantHeader: React.FC<Props> = (props: Props) => {
  const {handlerGoBack, title, isCoach, handlerOpenMenu} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity style={styles.menu} onPress={handlerGoBack}>
          <Icons.ArrowIcon fill={formFieldGrey} />
        </TouchableOpacity>
        <View style={styles.userInfoTwo}>
          <View style={styles.imageContainer}>
            {<Icons.AssistantInChannel {...styles.userAvatar} />}
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.userName} numberOfLines={1}>
              {title
                ? title
                : isCoach
                ? t('marketingAssistant')
                : t('nutritionAssistant')}
            </Text>
            <View style={styles.onlineContainer}>
              <View style={styles.onlineStatus} />
              <Text style={styles.onlineText}>{t('online')}</Text>
            </View>
          </View>
        </View>
      </View>
      {handlerOpenMenu && (
        <TouchableOpacity style={styles.editMenu} onPress={handlerOpenMenu}>
          <Icons.chatFreeDots />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AssistantHeader;
