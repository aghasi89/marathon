import React, {ReactNode} from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {formFieldGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import styles from './ModalComponent.style';

type Props = {
  isVisible: boolean;
  content: any;
  onClose?: () => void;
  icon?: ReactNode;
  isNoneContainerStyle?: boolean;
};

const ModalComponent: React.FC<Props> = ({
  isVisible,
  content,
  onClose,
  icon,
  isNoneContainerStyle
}) => {
  return (
    <View>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        useNativeDriverForBackdrop>
        <View style={isNoneContainerStyle ? undefined : styles.modalConent}>
          {icon && (
            <TouchableOpacity
              onPress={() => {
                onClose && onClose();
              }}
              style={styles.icon}>
              <Icons.Close fill={formFieldGrey} />
            </TouchableOpacity>
          )}
          {content}
        </View>
      </Modal>
    </View>
  );
};
export default ModalComponent;
