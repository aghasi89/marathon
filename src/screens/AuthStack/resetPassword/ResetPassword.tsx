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
import ResetPasswordHook from './ResetPassword-hook';
import { ILogin } from '../../../types/types';
import { primaryBlack } from '../../../assets/styles/colors.styles';
import LoginInput from '../components/loginInput';
import styles from './ResetPassword.style';

type Props = {};

const ResetPassword: React.FC<Props> = (props) => {
  const {
    t,
    onSend,
    handleBack,
    secureTextEntry,
    setSecureTextEntry
  } = ResetPasswordHook()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: ILogin) => {
    onSend(data)
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
            <Text style={styles.resetPasspordDescription}>{t('newPassword')}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <LoginInput
                  value={value}
                  valid={errors.password?.message ? true : false}
                  style={{}}
                  onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
                  placeholderText={t('password') ?? ""}
                  rightIcon={!secureTextEntry ? <Icons.Eye /> : <Icons.CloseEye />}
                  onPressRightIcon={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                  secureTextEntry={secureTextEntry}
                />
              )}
              name="password"
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
              errors.password && <Text style={styles.errorMesageText}>{errors.password.message?.toString()}</Text>
            }
            <PrimeryButton
              title={t('save') ?? ""}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
            {/* <View style={styles.rowContainer}>
              <Text style={styles.signInText}>{t('returnTo')}</Text>
              <TouchableOpacity onPress={goSignUpScreen} style={styles.signInButton}>
                <Text style={[styles.signInText, { color: primaryBlue }]}>{t('signIn')}</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ResetPassword;
