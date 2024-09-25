import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Icons from '../../../assets/icons/svg/index';
import {PrimeryButton} from '../../../components/buttons';
import {ILogin} from '../../../types/types';
import {calcHeight} from '../../../assets/dimensions';
import SocialLogin from '../../../components/socialLogin/SocialLogin';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import LoginInput from '../components/loginInput';
import LoginHook from './Login-hook';
import styles from './Login.styles';

const LoginScreen: React.FC = () => {
  const {
    setSecureTextEntry,
    secureTextEntry,
    onLogin,
    onVerify,
    showPass,
    t,
    goForgetPasswordScreen,
    goSignUpScreen,
    handleCloase,
    onChangeEmail,
    handleSubmit,
    control,
    onSubmit,
    errors
  } = LoginHook();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCloase} style={styles.closeButton}>
          <Icons.Close fill={primaryBlack} />
        </TouchableOpacity>
        <View style={[styles.body, {paddingTop: calcHeight(30)}]}>
          <Icons.Marathon />
          <View
            style={[
              styles.middleComponent,
              {
                paddingTop:
                  errors.email || errors.password
                    ? calcHeight(60)
                    : calcHeight(70),
              },
            ]}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <LoginInput
                  type="email-address"
                  leftIcon={<Icons.UserIcon />}
                  valid={errors.email?.message ? true : false}
                  value={value}
                  onChangeValue={(text: string) => {
                    onChange(text.replace(/\s/g, ''))
                    onChangeEmail(text)
                  }
                  }
                  placeholderText={t('email') ?? ''}
                  style={{
                    marginBottom: errors.email ? 0 : calcHeight(25),
                    marginTop: calcHeight(16),
                  }}
                />
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: t('emailValidationEmptyText'),
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
                  message: t('emailValidationText'),
                },
              }}
            />
            {errors.email && (
              <Text style={styles.errorMesageText}>
                {errors.email.message?.toString()}
              </Text>
            )}
            {showPass && (
              <>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <LoginInput
                      value={value}
                      style={{marginBottom: 0}}
                      valid={errors.password?.message ? true : false}
                      leftIcon={<Icons.KeyIcon />}
                      onChangeValue={(text: string) =>
                        onChange(text.replace(/\s/g, ''))
                      }
                      placeholderText={t('password') ?? ''}
                      rightIcon={
                        !secureTextEntry ? <Icons.Eye /> : <Icons.CloseEye />
                      }
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
                      message: t('passwordValidationEmptyText'),
                    },
                    minLength: {
                      value: 6,
                      message: t('passwordValidationText'),
                    },
                  }}
                />
                {errors.password && (
                  <Text style={styles.errorMesageText}>
                    {errors.password.message?.toString()}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.inlineButton}
                  onPress={goForgetPasswordScreen}>
                  <Text style={styles.inlineButtonText}>
                    {t('forgotPassword')} ?
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <PrimeryButton
              title={t('login') ?? ''}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.signInText}>{t('haventAccount')}</Text>
            <TouchableOpacity
              onPress={goSignUpScreen}
              style={styles.signInButton}>
              <Text style={[styles.signInText, {color: primaryBlue}]}>
                {t('signUp')}
              </Text>
            </TouchableOpacity>
          </View>
          <SocialLogin />
          <View style={styles.bottomSheet}>
            <Text style={[styles.inlineButtonText, styles.lighBlack]}>
              {t('accepting')}
            </Text>
            <Text style={[styles.inlineButtonText, styles.blueText]}>
              {t('privacyPolicy')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
