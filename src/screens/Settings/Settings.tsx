import React, {useMemo} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import ErrorMessageModal from '../../components/errorMessageModal/ErrorMessageModal';
import Header from '../ProfileStack/components/Header/Header';
import {calcHeight} from '../../assets/dimensions';
import Icons from '../../assets/icons/svg/index';
import LanguageSelectModal from '../FeedStack/CreateFeed/components/LanguageSelectModal/LanguageSelectModal';
import Hook from './Settings-hook';
import styles from './Settings.style';

const Settings: React.FC = () => {
  const {
    t,
    user,
    languagesList,
    goBack,
    selectedLanguage,
    handleSelectLanguage,
    languageModalVisibility,
    languageModalCloseHandle,
    languageSelectButtonPressHandle,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteAccount,
  } = Hook();

  const deleteAccount = useMemo(() => {
    if (user)
      return (
        <ErrorMessageModal
          isVisible={showDeleteModal}
          title={t('deleteAccount')}
          text={t('deleteAccountText')}
          secondButtonPress={() => setShowDeleteModal(false)}
          secondButtonTitle={t('no') ?? ''}
          showSecondButton={true}
          buttonTitle={t('yes')}
          onClose={handleDeleteAccount}
        />
      );
  }, [user, showDeleteModal]);

  return (
    <View style={styles.container}>
      <Header goBack={goBack} title={t('settings')} />
      <View style={styles.contentContainer}>
        <Pressable
          onPress={languageSelectButtonPressHandle}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: calcHeight(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons.Globus />
            <Text style={styles.lable}>{t('language')}</Text>
          </View>
          <Text style={styles.value}>{selectedLanguage?.name}</Text>
        </Pressable>
        <TouchableOpacity style={styles.delContainer} onPress={() => setShowDeleteModal(true)}>
          <Icons.DeleteIcon width="20" height="24" />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <LanguageSelectModal
        isVisible={languageModalVisibility}
        onClose={languageModalCloseHandle}
        onSelect={handleSelectLanguage}
        languageList={languagesList ?? []}
        selected={selectedLanguage?.id}
      />
      {deleteAccount}
    </View>
  );
};
export default Settings;
