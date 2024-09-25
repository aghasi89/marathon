import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {PrimeryButton} from '../../../../components/buttons';
import {downloadMediaFromBunny} from '../../../../utils/bunny.net';
import GroupeChatInfo from '../AddMembers/components/groupChatInfo/groupeChatInfo';
import SwipeView from '../AddMembers/components/swipeView/swipeView';
import styles from './EditGroupChat.style';
import EditGroupHook from './EditGroup-hook';
import {primaryBlue} from '../../../../assets/styles/colors.styles';

const EditGroupChat: React.FC = () => {
  const {
    t,
    imageURI,
    inputValue,
    onSelectImage,
    deleteItem,
    handlerOnPressSave,
    onChangeGroupName,
    handlerAddMember,
    handlerOnPressCancel,
    newmembers,
    loading,
    user,
  } = EditGroupHook();
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} color={primaryBlue} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('editGroup')}</Text>
      <View style={styles.editInfo}>
        <GroupeChatInfo
          imageUrl={
            imageURI && imageURI?.startsWith('image')
              ? downloadMediaFromBunny({
                  public_key: imageURI,
                  mediaType: 'image',
                  userDir: user?.id,
                  imageDir: 'profile',
                })?.url
              : imageURI
          }
          inputValue={inputValue}
          onSelectImage={onSelectImage}
          onChangeText={onChangeGroupName}
        />
      </View>
      <TouchableOpacity
        style={styles.addMembersView}
        onPress={handlerAddMember}>
        <Icons.Members fill={'#589CFE'} />
        <Text style={styles.addMember}>{t(`addMember`)}</Text>
      </TouchableOpacity>
      {newmembers && newmembers.length > 0 ? (
        <SwipeView listData={newmembers} deleteItem={deleteItem} />
      ) : (
        <Text style={{alignItems: 'center'}}>{t(`noUsers`)}</Text>
      )}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlerOnPressCancel}>
          <Text style={styles.cancelButton}>{t(`cancel`)}</Text>
        </TouchableOpacity>
        <PrimeryButton
          disable={!inputValue.trim().length}
          title={t(`save`) ?? ''}
          type="default"
          onPress={handlerOnPressSave}
        />
      </View>
    </View>
  );
};

export default EditGroupChat;
