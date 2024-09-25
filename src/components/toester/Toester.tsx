import React from 'react';
import {View, TouchableOpacity, ViewStyle, FlexAlignType} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import Modal from 'react-native-modal';
import Icons from '../../assets/icons/svg';
import styles from './Toester.styles';
type Props = {
  height?: number;
  Screen: any;
  containerStyle?: ViewStyle;
  isVisible?: boolean;
  onClose: () => void;
  contentAlign?: FlexAlignType;
};
const Toaster: React.FC<Props> = ({
  height,
  Screen,
  containerStyle,
  isVisible,
  onClose,
  contentAlign,
}) => {
  return (
    <View style={[styles.container]}>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        useNativeDriverForBackdrop
        backdropOpacity={0.35}
        style={styles.container}
        swipeDirection={['down']}>
        <View
          style={[
            styles.contentContainer,
            {height: height && calcHeight(height)},
            {alignItems: contentAlign ?? 'center'},
            containerStyle,
          ]}>
          <TouchableOpacity onPress={onClose} style={styles.touch}>
            <Icons.Line />
          </TouchableOpacity>
          {Screen}
        </View>
      </Modal>
    </View>
  );
};
export default Toaster;
