import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { PrimeryButton } from '../../components/buttons';
import styles from './ErrorMessageModal.style';

type Props = {
  isVisible: boolean;
  text: string;
  title: string;
  onClose: () => void;
  buttonTitle: string;
  showSecondButton?: boolean;
  secondButtonTitle?: string;
  secondButtonPress?: () => void
};

const ErrorMessageModal: React.FC<Props> = ({
  isVisible,
  text,
  title,
  onClose,
  buttonTitle,
  showSecondButton,
  secondButtonTitle,
  secondButtonPress
}) => {
  return (
    <View>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        useNativeDriverForBackdrop>
        <View style={styles.modalConent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <PrimeryButton
            title={buttonTitle}
            onPress={onClose}
            type={'default'}
            style={styles.buttonStyle}
          />
          {
            showSecondButton && <PrimeryButton
              title={secondButtonTitle}
              onPress={secondButtonPress ? secondButtonPress : () => { }}
              type={'outline'}
              style={styles.secondButtonStyle}
            />
          }
        </View>
      </Modal>
    </View>
  );
};
export default ErrorMessageModal;
