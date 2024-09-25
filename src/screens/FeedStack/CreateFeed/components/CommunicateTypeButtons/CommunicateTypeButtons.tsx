import * as React from 'react';
import { Pressable, View, Text, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg';
import styles from './CommunicateTypeButtons.style';

type Props = {
  onPress: (selectedTyep: 'channel' | 'group') => void;
  selectedType: 'channel' | 'group';
  containerStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

const CommunicateTypeButtons: React.VFC<Props> = ({
  onPress,
  selectedType,
  containerStyle,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <View style={{ justifyContent: "flex-start" }}>
      <View style={[styles.container, containerStyle]}>
        <Pressable
          disabled={disabled}
          onPress={() => onPress('group')}
          style={[
            styles.button,
            selectedType !== 'group'
              ? styles.buttonBg
              : styles.selectedButtonBg,
          ]}>
          <Icons.FeedGroupTraningIcon
            {...styles.iconStyle}
            fill={selectedType === 'group' ? primaryWhite : primaryBlue}
          />
          <Text
            style={[
              styles.buttonText,
              selectedType === 'group'
                ? styles.selectedTextColor
                : styles.textColor,
            ]}>
            {t('group')}
          </Text>
        </Pressable>
        <Pressable
          disabled={disabled}
          onPress={() => onPress('channel')}
          style={[
            styles.button,
            selectedType !== 'channel'
              ? styles.buttonBg
              : styles.selectedButtonBg,
          ]}>
          <Icons.MouthpieceIcon
            {...styles.iconStyle}
            fill={selectedType === 'channel' ? primaryWhite : primaryBlue}
          />
          <Text
            style={[
              styles.buttonText,
              selectedType === 'channel'
                ? styles.selectedTextColor
                : styles.textColor,
            ]}>
            {t('channel')}
          </Text>
        </Pressable>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{t('aboutGroup')}</Text>
        <Text style={styles.infoText}>{t('aboutChannel')}</Text>
      </View>
    </View>
  );
};
export default CommunicateTypeButtons;
