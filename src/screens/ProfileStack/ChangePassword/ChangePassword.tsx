import React from 'react';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import DefaultButton from '../../../components/buttons/default/DefaultButton';
import Icons from '../../../assets/icons/svg/index';
import { calcHeight } from '../../../assets/dimensions';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import LoginInput from '../../AuthStack/components/loginInput';
import ChangePasswordHook from './ChangePassword-hook';
import styles from './ChangePassword.style';

const ChangePasswordScreen: React.FC = () => {
  const {
    t,
    handleSave,
    handleBack,
    secureTextEntryOldPassword,
    setSecureTextEntryOldPassword,
    secureTextEntryNewPassword,
    setSecureTextEntryNewPassword,
    params
  } = ChangePasswordHook()

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
      <Text style={styles.lable}>{params?.type == 'change' ? t('oldPassword') : t('setPassword')}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <LoginInput
            value={value}
            valid={errors.password?.message ? true : false}
            style={{ marginBottom: errors.oldPassword ? 0 : calcHeight(25), marginTop: calcHeight(16) }}
            onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
            placeholderText={t('password') ?? ""}
            rightIcon={!secureTextEntryOldPassword ? <Icons.Eye /> : <Icons.CloseEye />}
            onPressRightIcon={() => {
              setSecureTextEntryOldPassword(!secureTextEntryOldPassword);
            }}
            secureTextEntry={secureTextEntryOldPassword}
          />
        )}
        name="oldPassword"
        rules={{
          required: {
            value: true,
            message: t('passwordValidationEmptyText')
          },
          minLength: {
            value: 6,
            message: t('passwordValidationText')
          }
        }}
      />
      {
        errors.oldPassword && <Text style={styles.errorMesageText}>{errors.oldPassword.message?.toString()}</Text>
      }
      {
        params?.type == 'change' && <>
          <Text style={styles.lable}>{t('newPassword')}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LoginInput
                value={value}
                valid={errors.password?.message ? true : false}
                style={{ marginBottom: 0, marginTop: calcHeight(16) }}
                onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
                placeholderText={t('password') ?? ""}
                rightIcon={!secureTextEntryNewPassword ? <Icons.Eye /> : <Icons.CloseEye />}
                onPressRightIcon={() => {
                  setSecureTextEntryNewPassword(!secureTextEntryNewPassword);
                }}
                secureTextEntry={secureTextEntryNewPassword}
              />
            )}
            name="newPassword"
            rules={{
              required: {
                value: true,
                message: t('passwordValidationEmptyText')
              },
              minLength: {
                value: 6,
                message: t('passwordValidationText')
              }
            }}
          />
          {
            errors.newPassword && <Text style={styles.errorMesageText}>{errors.newPassword.message?.toString()}</Text>
          }
        </>
      }
      <DefaultButton
        style={styles.button}
        title={t('save') ?? ""}
        onPress={handleSubmit(onSubmit)} />
    </View>
  </TouchableWithoutFeedback>
  );
};
export default ChangePasswordScreen;
