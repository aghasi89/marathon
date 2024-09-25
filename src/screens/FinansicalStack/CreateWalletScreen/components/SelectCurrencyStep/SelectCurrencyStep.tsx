import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ICurrency } from '../../../../../types/types';
import { aliceBlueBackground, lightPeriwinkles } from '../../../../../assets/styles/colors.styles';
import { PrimeryButton } from '../../../../../components/buttons';
import styles from './SelectCurrencyStep.style';

interface IProps {
  data: ICurrency[],
  onSelect: (id: number) => void,
  handleSave: () => void,
  disabled: boolean,
  selectedItemId: number | undefined
}

const SelectCurrencyStep: React.FC<IProps> = (props) => {

  const { data, onSelect, handleSave, disabled, selectedItemId } = props
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <FlatList renderItem={({ item }) => {
        return <TouchableOpacity onPress={() => onSelect(item.id)}
          style={[styles.element, { backgroundColor: item.id == selectedItemId ? lightPeriwinkles : aliceBlueBackground }]}>
          <Text style={styles.text}>{item.code}</Text>
        </TouchableOpacity>
      }} data={data} />
      <View style={styles.button}>
        <PrimeryButton
          title={t('next') ?? ""}
          disable={disabled}
          type="default"
          onPress={handleSave}
          style={styles.applyButton}
        />
      </View>
    </View>
  );
};
export default SelectCurrencyStep;
