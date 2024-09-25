import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './FollowersFollowingsTab.style';

interface Props {
  activeTab?: 'followers' | 'followings';
  handleTabPress: (text: 'followers' | 'followings') => void;
  followersCount: number
  followingsCount: number
}

const FollowersFollowingsTab: React.FC<Props> = (props: Props) => {
  const { activeTab, handleTabPress, followersCount, followingsCount } = props;
  const { t } = useTranslation();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'followers' && styles.activeTab]}
        onPress={() => handleTabPress('followers')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'followers' && styles.activeTabText,
          ]}>
          {t`followers`} {followersCount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'followings' && styles.activeTab]}
        onPress={() => handleTabPress('followings')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'followings' && styles.activeTabText,
          ]}>
          {t`following`} {followingsCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowersFollowingsTab;
