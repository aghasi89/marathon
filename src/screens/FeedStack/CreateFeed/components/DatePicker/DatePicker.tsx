import * as React from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import Icons from '../../../../../assets/icons/svg';
import styles from './DatePicker.style';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';
import InputComponent from '../InputComponent/InputComponent';

type Props = {
  date?: Date;
  isOpen: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  onPress: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  value?: string;
  mode?: 'date' | 'time' | 'datetime' | undefined;
  isInvalid?:boolean,
  minimumDate?:Date
};

const DatePickerComponent: React.VFC<Props> = ({
  date,
  isOpen,
  onConfirm,
  onCancel,
  onPress,
  containerStyle,
  value,
  mode,
  isInvalid,
  minimumDate
}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable  onPress={onPress}>
        <InputComponent
          isInvalid={isInvalid}
          onChange={() => {}}
          placeholder={t('setDateAndTime') ?? ''}
          icon={<Icons.FeedCalendarIcon {...styles.calendarIcon} />}
          rightIcon={<Icons.ArrowDowm {...styles.arrowIcon} />}
          inputStyle={!value ? styles.buttonText : styles.buttonTextSelected}
          containerStyle={styles.buttonStyle}
          value={value ?? ''}
          disabled
        />
      </Pressable>
      <DatePicker
        minimumDate={minimumDate}
        modal
        open={isOpen}
        date={date ?? new Date()}
        onConfirm={onConfirm}
        onCancel={onCancel}
        is24hourSource={'device'}
        androidVariant="iosClone"
        confirmText={t('confirm') ?? ''}
        cancelText={t('cancel') ?? ''}
        title={t('selectDate')}
        mode={mode}
      />
    </View>
  );
};

export default DatePickerComponent;
