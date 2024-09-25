import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icons from '../../assets/icons/svg';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import styles from './ActivitiesCard.styles';

type Props = {
  imageUri: string;
  title: string;
  selected?: boolean;
  onSelect?: () => void;
  isClose?: boolean;
  onClose?: () => void;
  onPress?: () => void;
};
const ActivitiesCard: React.FC<Props> = ({
  imageUri,
  title,
  selected,
  onSelect,
  isClose = false,
  onClose,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{uri: imageUri}}
        style={styles.image}
        resizeMode={'contain'}
      />
      <Text style={styles.titleText} numberOfLines={1}>
        {title}
      </Text>
      {isClose ? (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icons.PlusX fill={primaryBlack} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSelect} style={styles.touch}>
          <View
            style={[
              styles.selectedButton,
              selected ? styles.selectedStyle : styles.disSelectedTouch,
            ]}>
            {selected && (
              <Icons.Ceck fill={primaryWhite} heigth={9} width={11} />
            )}
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default ActivitiesCard;
