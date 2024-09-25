import React from 'react';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import DefaultButton from '../../../components/buttons/default/DefaultButton';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import LoginInput from '../../AuthStack/components/loginInput';
import ChangeEmailHook from './ChangeEmail-hook';
import styles from './ChangeEmail.style';

const ChangeEmailScreen: React.FC = () => {

  const {
    t,
    handleSave,
    handleBack
  } = ChangeEmailHook()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: any) => {
    handleSave(data)
  };

  return (<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
        <Icons.Close fill={primaryBlack} />
      </TouchableOpacity>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <LoginInput
            valid={errors.email?.message ? true : false}
            value={value}
            onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
            placeholderText={t('email') ?? ""}
            type='email-address'
            style={styles.input}
          />
        )}
        name="email"
        rules={{
          required: {
            value: true,
            message: t('emailValidationEmptyText')
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
            message: t('emailValidationText')
          }
        }}
      />
      {
        errors.email && <Text style={styles.errorMesageText}>{errors.email.message?.toString()}</Text>
      }
      <DefaultButton
        style={styles.button}
        title={t('save') ?? ""}
        onPress={handleSubmit(onSubmit)} />
    </View>
  </TouchableWithoutFeedback>
  );
};
export default ChangeEmailScreen;
