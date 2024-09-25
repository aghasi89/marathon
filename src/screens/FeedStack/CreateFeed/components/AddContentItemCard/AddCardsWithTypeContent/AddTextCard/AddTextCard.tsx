import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
} from '../../../../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../../../../assets/dimensions';
import AddCardWithoutContent from '../../AddCardWithoutContent/AddCardWithoutContent';
import styles from './AddTextCard.style';
import useEditerKeyboard from '../../../../../../../context/useEditerKeyboard';

type Props = {
  value?: string;
  onChange?: (text: string) => void;
  onCloseIconPress?: () => void;
  closeIconExist?: boolean;
  title?: string;
};

const AddTextCard: React.VFC<Props> = ({
  title,
  closeIconExist,
  value,
  onChange,
  onCloseIconPress,
}) => {
  const richText = useRef<RichEditor>(null);
  const {t} = useTranslation();
  const {isClose, reset} = useEditerKeyboard();
  useEffect(() => {
    if (isClose) {
      if (richText.current) {
        if (richText.current.isKeyboardOpen) richText.current.dismissKeyboard();
      }
    }
  }, [isClose]);
  return (
    <AddCardWithoutContent
      closeIconExist={closeIconExist}
      onCloseIconPress={onCloseIconPress}
      title={title ?? t('text')}
      customStyles={{childrenContainer: styles.container}}>
      <RichToolbar
        editor={richText}
        selectedIconTint={primaryBlue}
        iconTint={primaryBlack}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertOrderedList,
          actions.insertBulletsList,
          actions.alignCenter,
          actions.alignRight,
          actions.alignLeft,
          actions.insertLink,
        ]}
        style={styles.richTextToolbarStyle}
      />
      <RichEditor
        onBlur={() => {
          reset();
        }}
        scrollEnabled={true}
        ref={richText}
        initialContentHTML={value}
        onChange={onChange}
        placeholder={t('typeText') ?? ''}
        androidHardwareAccelerationDisabled={true}
        style={styles.richTextEditorStyle}
        initialHeight={calcHeight(100)}
        editorStyle={{
          caretColor: primaryBlue,
          backgroundColor: 'transparent',
          placeholderColor: lightSteelBlue,
        }}
        containerStyle={styles.editorContainer}
      />
    </AddCardWithoutContent>
  );
};
export default AddTextCard;
