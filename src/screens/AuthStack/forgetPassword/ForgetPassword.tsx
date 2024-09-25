import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icons from '../../../assets/icons/svg/index';
import { PrimeryButton } from '../../../components/buttons';
import ForgetPasswordHook from './ForgetPassword-hook';
import { ILogin } from '../../../types/types';
import { primaryBlack, primaryBlue } from '../../../assets/styles/colors.styles';
import LoginInput from '../components/loginInput';
import styles from './ForgetPassword.styles';

type Props = {};

const ForgetPassword: React.FC<Props> = (props) => {
  const {
    t,
    onSend,
    goSignUpScreen,
    handleBack
  } = ForgetPasswordHook()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: ILogin) => {
    if (data && data.email)
      onSend(data.email?.toLowerCase())
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <Icons.Marathon />
          <View style={styles.middleComponent}>
            <Text style={styles.resetPasspordDescription}>{t('resetPasspordDescription')}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <LoginInput
                  type='email-address'
                  valid={errors.email?.message ? true : false}
                  value={value}
                  onChangeValue={onChange}
                  placeholderText={t('email') ?? ""}
                  style={{ marginBottom: 0 }}
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
            <PrimeryButton
              title={t('reset') ?? ""}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
            <View style={styles.rowContainer}>
              <Text style={styles.signInText}>{t('returnTo')}</Text>
              <TouchableOpacity onPress={goSignUpScreen} style={styles.signInButton}>
                <Text style={[styles.signInText, { color: primaryBlue }]}>{t('signIn')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ForgetPassword;
