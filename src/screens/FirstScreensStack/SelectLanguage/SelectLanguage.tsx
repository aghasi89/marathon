import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import SelectedDropDown from '../../../components/selectedDropDown/SelectedDropDown';
import { PrimeryButton } from '../../../components/buttons';
import LanguageSelectModal from '../../FeedStack/CreateFeed/components/LanguageSelectModal/LanguageSelectModal';
import SelectLanguageScreenHook from './SelectLanguage-hook';
import styles from './SelectLanguage.style';

const SelectLanguageScreen: React.FC = () => {

  const {
    t,
    handleSave,
    languagesList,
    selectedLanguage,
    languageModalCloseHandle,
    languageSelectHandle,
    languageModalVisibility,
    languageSelectButtonPressHandle
  } = SelectLanguageScreenHook()

  if (!selectedLanguage) return <ActivityIndicator size={'large'} style={styles.loading} />
  return (
    <View style={styles.container}>
      <SelectedDropDown
        title={t('detectedLanguage')}
        selectButtonPressHandle={languageSelectButtonPressHandle}
        image={selectedLanguage?.flag}
        value={selectedLanguage?.name ? selectedLanguage.name : t('selectLanguage')} />
      <PrimeryButton
        title={t('save') ?? ""}
        disable={!selectedLanguage}
        type="default"
        onPress={handleSave}
        style={styles.buttonStyle}
      />
      <LanguageSelectModal
        isVisible={languageModalVisibility}
        onClose={languageModalCloseHandle}
        onSelect={languageSelectHandle}
        languageList={languagesList ?? []}
        selected={selectedLanguage?.id}
      />
    </View>
  );
};
export default SelectLanguageScreen;
