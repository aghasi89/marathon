import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PrimeryButton } from '../../../components/buttons';
import SelectedDropDown from '../../../components/selectedDropDown/SelectedDropDown';
import Header from '../../ProfileStack/components/Header/Header';
import SelectRegionHook from './SelectRegion-hook';
import styles from './SelectRegion.style';

const SelectRegionScreen: React.FC = () => {
  const {
    t,
    handleSave,
    selectedRegion,
    regionSelectButtonPressHandle,
    showHeader,
    closeSelectRegionModal
  } = SelectRegionHook();

  if (!selectedRegion)
    return <ActivityIndicator size={'large'} style={styles.loading} />;
  return (
    <View style={styles.container}>
      {
        showHeader && <View style={styles.header}>
          <Header title='' goBack={() => closeSelectRegionModal()} />
        </View>
      }
      <View style={styles.subConatiner}>
        <SelectedDropDown
          title={t('detectedRegion')}
          selectButtonPressHandle={regionSelectButtonPressHandle}
          value={selectedRegion ? selectedRegion.title_en : t('selectRegion')}
          image={selectedRegion?.image}
        />
        <PrimeryButton
          title={t('save') ?? ''}
          disable={!selectedRegion}
          type="default"
          onPress={handleSave}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};
export default SelectRegionScreen;
