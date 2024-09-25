import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './CreatePackTab.style';

interface Props {
  activeTab?: 'upcoming' | 'finished' | 'inprogress';
  handleTabPress: (text: 'upcoming' | 'finished' | 'inprogress') => void;
}

const CreatePackTab: React.FC<Props> = (props: Props) => {
  const { activeTab, handleTabPress } = props;
  const { t } = useTranslation();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'inprogress' && styles.activeTab]}
        onPress={() => handleTabPress('inprogress')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'inprogress' && styles.activeTabText,
          ]}>
          {t`inprogress`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'finished' && styles.activeTab]}
        onPress={() => handleTabPress('finished')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'finished' && styles.activeTabText,
          ]}>
          {t`finished`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
        onPress={() => handleTabPress('upcoming')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText,
          ]}>
          {t`upcoming`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePackTab;
