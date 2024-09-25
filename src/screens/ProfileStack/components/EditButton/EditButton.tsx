import * as React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {primaryBlue, red} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import ChipItem from '../ChipsList/ChipItem/ChipItem';
import styles from './EditButton.style';

type props = {
  incomplete?: boolean;
  onPress: () => void;
};

const EditButton = ({incomplete, onPress}: props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <ChipItem
        icon={
          <Icons.Edit fill={!incomplete ? primaryBlue : red} {...styles.icon} />
        }
        onPress={onPress}
        description={t('editProfile') ?? ''}
        color={!incomplete ? primaryBlue : red}
      />
    </View>
  );
};
export default EditButton;
