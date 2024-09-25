import * as React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {primaryWhite} from '../../../../../assets/styles/colors.styles';
import {WorkoutLevel} from '../../../../../types/enums';
import Icons from '../../../../../assets/icons/svg';
import styles from './LevelSelectComponent.style';

type Props = {
  onSelect: (selected: WorkoutLevel) => void;
  selected?: WorkoutLevel;
};

const LevelSelectComponent: React.VFC<Props> = ({onSelect, selected}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onSelect(WorkoutLevel.Beginner)}
        style={[
          styles.buttonGlobalStyle,
          selected === WorkoutLevel.Beginner
            ? styles.selectedButton
            : styles.button,
        ]}>
        <Icons.BegginerLevel fill={primaryWhite} />
        <Text style={styles.buttonTitle}>{t('begginer')}</Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect(WorkoutLevel.Intermediate)}
        style={[
          styles.buttonGlobalStyle,
          selected === WorkoutLevel.Intermediate
            ? styles.selectedButton
            : styles.button,
        ]}>
        <Icons.IntermediadLevel fill={primaryWhite} />
        <Text style={styles.buttonTitle}>{t('intermediate')}</Text>
      </Pressable>
      <Pressable
        onPress={() => onSelect(WorkoutLevel.Advanced)}
        style={[
          styles.buttonGlobalStyle,
          selected === WorkoutLevel.Advanced
            ? styles.selectedButton
            : styles.button,
        ]}>
        <Icons.AdvancedLevel fill={primaryWhite} />
        <Text style={styles.buttonTitle}>{t('advanced')}</Text>
      </Pressable>
    </View>
  );
};
export default LevelSelectComponent;
