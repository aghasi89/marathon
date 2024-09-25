import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from '../../../types/types';
import AssignInformationHook from './AssignInformation-hook';
import styles from './AssignInformation.style'
import LoginInput from '../components/loginInput';
import Icons from '../../../assets/icons/svg'
import { PrimeryButton } from '../../../components/buttons';
import { borderGrey, primaryBlack, red } from '../../../assets/styles/colors.styles';
import PhoneInput from 'react-native-phone-number-input';
import { calcHeight } from '../../../assets/dimensions';

const AssignInformationScreen: React.FC = () => {

  const {
    t,
    handleBack,
    phoneInput,
    response,
    handleConfirm
  } = AssignInformationHook()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: ILogin) => {
    handleConfirm(data)
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
            <Text style={styles.resetPasspordDescription}>{t('assignInformation')}</Text>
            {
              response.message.toLowerCase().includes('no phone_number') &&
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
            }
            {
              errors.phone_number && <Text style={styles.errorMesageText}>{errors.phone_number.message?.toString()}</Text>
            }
            {
              response.message.toLowerCase().includes('no email') && <Controller
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
            }
            {
              errors.email && <Text style={styles.errorMesageText}>{errors.email.message?.toString()}</Text>
            }
            <PrimeryButton
              title={t('confirm') ?? ""}
              onPress={handleSubmit(onSubmit)}
              type={'default'}
              style={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default AssignInformationScreen;
