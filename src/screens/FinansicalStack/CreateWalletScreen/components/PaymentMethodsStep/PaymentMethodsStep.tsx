import React, {useCallback} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SheetManager} from 'react-native-actions-sheet';
import {PrimeryButton} from '../../../../../components/buttons';
import {
  aliceBlueBackground,
  lightPeriwinkles,
} from '../../../../../assets/styles/colors.styles';
import SelectedDropDown from '../../../../../components/selectedDropDown/SelectedDropDown';
import {IRegion, IWithdrawMethod} from '../../../../../types/types';
import styles from './PaymentMethodsStep.style';
import {calcHeight} from '../../../../../assets/dimensions';

interface IProps {
  data: IWithdrawMethod[];
  onSelect: (id: IWithdrawMethod) => void;
  handleSave: () => void;
  disabled: boolean;
  selectedItem: IWithdrawMethod | undefined;
  habldeBack?: () => void;
  showBackButton?: boolean;
  regionsList: IRegion[];
  selectedRegion?: IRegion;
  changeRegion: (region: IRegion) => void;
}

const PaymentMethodsStep: React.FC<IProps> = props => {
  const {
    data,
    onSelect,
    handleSave,
    disabled,
    selectedItem,
    habldeBack,
    showBackButton = true,
    regionsList,
    selectedRegion,
    changeRegion,
  } = props;

  const {t} = useTranslation();

  const regionSelectHandle = useCallback((region: IRegion) => {
    changeRegion(region);
    SheetManager.hide('regionsSheet');
  }, []);

  const regionSelectButtonPressHandle = useCallback(() => {
    SheetManager.show('regionsSheet', {
      payload: {
        data: regionsList,
        onSelect: regionSelectHandle,
        selected: selectedRegion?.id,
      },
    });
  }, [regionsList, regionSelectHandle, selectedRegion]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>{t('chooseWithdrawalMethods')}</Text>
      </View>
      <SelectedDropDown
        title={''}
        selectButtonPressHandle={regionSelectButtonPressHandle}
        value={selectedRegion ? selectedRegion.title_en : t('selectRegion')}
        image={selectedRegion?.image}
      />
      <FlatList
        style={{maxHeight: calcHeight(300)}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={[
                styles.element,
                {
                  backgroundColor:
                    item.id == selectedItem?.id
                      ? lightPeriwinkles
                      : aliceBlueBackground,
                },
              ]}>
              <Image
                resizeMode="contain"
                source={{uri: item.icon}}
                style={styles.image}
              />
              <Text style={styles.text}>{item.name}</Text>
              {/* <Text style={styles.text}>{item.currency_type_details.sign}</Text> */}
            </TouchableOpacity>
          );
        }}
        data={data}
      />
      {!data.length && (
        <View>
          <Text style={styles.description}>{t("emptyWithdrawal")}</Text>
        </View>
      )}
      <View style={styles.button}>
        {showBackButton && (
          <PrimeryButton
            title={t('back') ?? ''}
            type="outline"
            onPress={habldeBack ? habldeBack : () => null}
            style={styles.backButton}
          />
        )}
        <PrimeryButton
          title={t('next') ?? ''}
          disable={disabled}
          type="default"
          onPress={handleSave}
          style={styles.applyButton}
        />
      </View>
    </View>
  );
};
export default PaymentMethodsStep;
