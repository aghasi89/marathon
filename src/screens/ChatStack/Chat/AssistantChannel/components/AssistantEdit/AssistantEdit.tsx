import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../../../../../assets/icons/svg/index';
import styles from './AssistantEdit.style';
import AssistantEditHook from './AssistantEdit-hook';
import GroupeChatInfo from '../../../AddMembers/components/groupChatInfo/groupeChatInfo';
import { downloadMediaFromBunny } from '../../../../../../utils/bunny.net';
import { primaryBlue } from '../../../../../../assets/styles/colors.styles';
import SwipeView from '../../../AddMembers/components/swipeView/swipeView';
import { PrimeryButton } from '../../../../../../components/buttons';

const EditAssistantScreen: React.FC = () => {
  const {
    t,
    inputValue,
    onChangeGroupName,
    loading,
    handleCancel,
    handleEditAssistant
  } = AssistantEditHook();
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} color={primaryBlue} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('editAssistant')}</Text>
      <View style={styles.editInfo}>
        <GroupeChatInfo
          inputValue={inputValue}
          onSelectImage={() => null}
          onChangeText={onChangeGroupName}
          isAssistant
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>{t(`cancel`)}</Text>
        </TouchableOpacity>
        <PrimeryButton
          disable={!inputValue.trim().length}
          title={t(`save`) ?? ''}
          type="default"
          onPress={handleEditAssistant}
        />
      </View>
    </View>
  );
};

export default EditAssistantScreen;
