import * as React from 'react';
import {View, Text, Modal} from 'react-native';
import {PrimeryButton} from '../buttons';
import styles from './ActionModal.style';

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  description?: string;
  submitButtonText?: string;
  closeButtonText?: string;
  title?: string;
}

const ActionModal: React.FC<Props> = ({
  onClose,
  onSubmit,
  visible,
  title,
  description,
  closeButtonText,
  submitButtonText,
}) => {
  return (
  
      <Modal visible={visible} onRequestClose={onClose} transparent={true} >
        <View style={styles.container}>
        <View style={styles.contentContainer}>
          {title && (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          {description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          )}
          <PrimeryButton
            type="default"
            onPress={() => onSubmit && onSubmit()}
            title={submitButtonText}
            shadow={false}
            textStyle={styles.submitButtonText}
          />
          <PrimeryButton
            type="outline"
            onPress={() => onClose && onClose()}
            title={closeButtonText}
            shadow={false}
            style={styles.closeButton}
            textStyle={styles.closeButtonText}
          />
        </View>
        </View>
      </Modal>
  );
};

export default ActionModal;
