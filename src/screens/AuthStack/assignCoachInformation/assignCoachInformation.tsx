import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Controller } from 'react-hook-form';
import PhoneInput from "react-native-phone-number-input";
import Icons from '../../../assets/icons/svg/index';
import { borderGrey, primaryBlack, red } from '../../../assets/styles/colors.styles';
import { calcHeight } from '../../../assets/dimensions';
import { PrimeryButton } from '../../../components/buttons';
import LoginInput from '../components/loginInput';
import RegistrationHook from './assignCoachInformation-hook';
import styles from './assignCoachInformation.style';

const AssignCoachInformation: React.FC = () => {

  const {
    t,
    secureTextEntry,
    setSecureTextEntry,
    handleBack,
    phoneInput,
    roleMode,
    handleSubmit,
    onSubmit,
    control,
    errors,
    loading
  } = RegistrationHook()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size={'large'} />
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <Icons.Marathon />
          <View style={styles.middleComponent}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <LoginInput
                  valid={errors.first_name?.message ? true : false}
                  value={value}
                  onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
                  placeholderText={t('firstName') ?? ""}
                  style={{ marginBottom: errors.firstName ? 0 : calcHeight(25) }}
                />
              )}
              name="first_name"
              rules={{
                required: {
                  value: true,
                  message: t('firstNameValidationEmptyText')
                },
                minLength: {
                  value: 3,
                  message: t('firstNameValidationText')
                }
              }}
            />
            {
              errors.first_name && <Text style={styles.errorMesageText}>{errors.first_name.message?.toString()}</Text>
            }
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <LoginInput
                  valid={errors.last_name?.message ? true : false}
                  value={value}
                  onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
                  placeholderText={t('lastName') ?? ""}
                  style={{ marginBottom: errors.lastName ? 0 : calcHeight(25) }}
                />
              )}
              name="last_name"
              rules={{
                required: {
                  value: true,
                  message: t('lastNameValidationEmptyText')
                },
                minLength: {
                  value: 3,
                  message: t('lastNameValidationText')
                }
              }}
            />
            {
              errors.last_name && <Text style={styles.errorMesageText}>{errors.last_name.message?.toString()}</Text>
            }
            <Controller
              name="phone_number"
              control={control}
              rules={{
                validate: value => phoneInput.current?.isValidNumber(value) || (t('phoneNumberValidationText') ?? ""),
                required: {
                  value: true,
                  message: t('phoneNumberValidationEmptyText')
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  ref={phoneInput}
                  placeholder={t('phoneNumber') ?? ""}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  layout='second'
                  defaultCode="AM"
                  containerStyle={[styles.containerStyle, {
                    borderColor: errors.phone_number ? red : borderGrey,
                    marginBottom: errors.phone_number ? 0 : calcHeight(25)
                  }]}
                  textInputStyle={styles.textInputStyle}
                  textContainerStyle={styles.textContainerStyle}
                  codeTextStyle={styles.codeTextStyle}
                />
              )}
            />
            {
              errors.phone_number && <Text style={styles.errorMesageText}>{errors.phone_number.message?.toString()}</Text>
            }
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <LoginInput
                  valid={errors.email?.message ? true : false}
                  value={value}
                  editable={false}
                  onChangeValue={(text: string) => onChange(text.replace(/\s/g, ''))}
                  placeholderText={t('email') ?? ""}
                  type='email-address'
                  style={{ marginBottom: errors.email ? 0 : calcHeight(25) }}
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
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <LoginInput
                  value={value}
                  valid={errors.password?.message ? true : false}
                  style={{ marginBottom: errors.password ? 0 : calcHeight(25) }}
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
              title={t('signUp') ?? ""}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
export default AssignCoachInformation;
