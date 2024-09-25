import React from 'react';
import {View, Text, Pressable, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './SelectButtonsWithLabel.style';
type Props = {
  title?: string;
  buttons?: string[];
  onSelect?: (index: number) => void;
  selected?: number;
  containerStyle?: ViewStyle | ViewStyle[];
};
const SelectButtonsWithLabel: React.VFC<Props> = ({
  title,
  buttons,
  onSelect,
  selected,
  containerStyle,
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {buttons?.map((el, index) => (
          <Pressable
            key={el + index}
            onPress={() => onSelect && onSelect(index)}
            style={[
              styles.button,
              selected === index ? styles.buttonSelected : undefined,
            ]}>
            <Text
              style={[
                styles.buttonText,
                selected === index ? styles.buttonTextSelected : undefined,
              ]}>
              {t(el)}
            </Text>
            {index !== (buttons || []).length - 1 ? (
              <View style={styles.emptyView} />
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SelectButtonsWithLabel;
