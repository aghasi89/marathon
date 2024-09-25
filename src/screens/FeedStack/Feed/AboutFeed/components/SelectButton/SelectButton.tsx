import * as React from 'react';
import {View, Text, Pressable, ViewStyle} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg';
import InputComponent from '../../../../CreateFeed/components/InputComponent/InputComponent';
import styles from './SelectButton.style'

type Props = {
  title?: string;
  subTitle?: string;
  onPress?: () => void;
  containerStyle?:ViewStyle|ViewStyle[]
  moreItemsCount?:number
};

const SelectButton: React.VFC<Props> = ({title, onPress, subTitle,moreItemsCount,containerStyle}) => {
  const {t} = useTranslation()
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <InputComponent
        icon={<Text style={styles.title}>{title}</Text>}
        disabled
        rightIcon={
          <View style={styles.subtitleAndIconContainer}>
            <Text  style={styles.subtitle}>{subTitle??''}</Text>
           {moreItemsCount&& <Text  style={styles.moreItemsText}>{`${moreItemsCount} ${t('more')} `}</Text>}
            <Icons.ArrowRight {...styles.iconStyle} />
          </View>
        }
      />
    </Pressable>
  );
};
export default SelectButton;
