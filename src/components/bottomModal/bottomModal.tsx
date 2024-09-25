import React, {ReactNode} from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import Icons from '../../assets/icons/svg/index';
import styles from './bottomModal.style';

interface IProps {
  visible: boolean;
  onPressIndicator: () => void;
  onClose: () => void;
  children?: ReactNode;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
}

const BottomModal: React.FC<IProps> = props => {
  const {visible, onClose, children, onPressIndicator, customStyles} = props;

  return (
    <Modal
      style={[styles.modal]}
      isVisible={visible}
      backdropOpacity={0.1}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      onBackdropPress={onClose}>
      <View style={[styles.container, customStyles?.containerStyle]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={onPressIndicator}>
          <Icons.Line />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

export default BottomModal;
