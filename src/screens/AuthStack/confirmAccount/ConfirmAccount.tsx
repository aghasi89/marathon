import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {ILogin} from '../../../types/types';
import Icons from '../../../assets/icons/svg';
import {PrimeryButton} from '../../../components/buttons';
import {calcHeight} from '../../../assets/dimensions';
import {primaryBlue, primaryGrey} from '../../../assets/styles/colors.styles';
import {downloadMediaFromBunny} from '../../../utils/bunny.net';
import LoginInput from '../components/loginInput';
import ConfirmAccountHook from './ConfirmAccount-hook';
import styles from './ConfirmAccount.style';

const ConfirmAccountScreen: React.FC = () => {
  const {
    setSecureTextEntry,
    secureTextEntry,
    t,
    handleBack,
    response,
    handleLogin,
    goForgetPasswordScreen,
  } = ConfirmAccountHook();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: ILogin) => {
    handleLogin(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Icons.Marathon />
          <View style={styles.middleComponent}>
            <Image
              source={{
                uri: response.image
                  ? downloadMediaFromBunny({
                      public_key: response.image,
                      mediaType: 'image',
                      userDir: response.id,
                      imageDir: 'profile',
                    })?.url
                  : 'https://uat.marathon.me/assets/icons/banner_placeholder.jpg',
              }}
              style={styles.image}
              resizeMode={'contain'}
            />
            <Text style={styles.loginAs}>
              {t('loginAs')} {response.first_name} {response.last_name}
            </Text>
            <Text style={styles.notYouContainer}>
              <Text style={[styles.notYou, {color: primaryGrey}]}>
                {response.first_name} {response.last_name}{' '}
              </Text>
              <Text
                onPress={handleBack}
                style={[styles.notYou, {color: primaryBlue}]}>
                {t('notYou')}
              </Text>
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <LoginInput
                  value={value}
                  leftIcon={<Icons.KeyIcon />}
                  valid={errors.password?.message ? true : false}
                  style={{
                    marginBottom: errors.password ? 0 : calcHeight(25),
                    marginTop: calcHeight(16),
                  }}
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
            <PrimeryButton
              title={t('login') ?? ''}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
            <TouchableOpacity
              style={styles.inlineButton}
              onPress={goForgetPasswordScreen}>
              <Text style={styles.inlineButtonText}>
                {t('forgotPassword')} ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ConfirmAccountScreen;
