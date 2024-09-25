import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DefaultButton from '../../../components/buttons/default/DefaultButton';
import {
  borderGrey,
  lighBlack,
  primaryBlack,
  primaryBlue,
  primaryGrey,
  primaryWhite,
  red,
} from '../../../assets/styles/colors.styles';
import LoginInput from '../../AuthStack/components/loginInput';
import Icons from '../../../assets/icons/svg/index';
import { downloadMediaFromBunny } from '../../../utils/bunny.net';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { ISpeciality, IUploadImage } from '../../../types/types';
import { PrimeryButton } from '../../../components/buttons';
import Toaster from '../../../components/toester/Toester';
import UpploadButton from '../../../components/uploadbutton/UploadButton';
import ErrorMessageModal from '../../../components/errorMessageModal/ErrorMessageModal';
import keys from '../../../services/Keys';
import MultiSelectModal from '../../FeedStack/CreateFeed/components/MultiSelectModal/MultiSelectModal';
import EditProfileHook from './EditProfile-hook';
import Header from './Header/Header';
import styles from './EditProfile.style';

const EditProfileScreen: React.FC = () => {
  const {
    t,
    user,
    handleChangePassword,
    handleChangeEmail,
    handleChangeGender,
    gender,
    isVisibleLanguages,
    setIsVisibleLanguages,
    handleSave,
    changeLocation,
    phoneInput,
    handleChangeImage,
    avatar,
    backgroundAvatar,
    setIsVisibleSpecialities,
    specialitiesModalCloseHandle,
    specialitiesSelectHandle,
    isVisibleSpecialities,
    loader,
    languagesModalCloseHandle,
    languages,
    languagesSelectHandle,
    mandatoryFieldsValueChangeHandle,
    filteredLanguages,
    specialities,
    filteredSpecialities,
    emptyMandatoryFields,
    mandatoryErrorMessage,
    openDocumentModal,
    showDocumentModal,
    handleAddFile,
    handleSetFiles,
    certificates,
    addCertificateLine,
    deleteCertificateItem,
    handleChangeDescription,
    showModal,
    setShowModal,
    handleLayout,
    scrollToComponent,
    showPhoneNumber,
    scrollViewRef,
    phoneNumber
  } = EditProfileHook();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstName: user?.user?.first_name ?? '',
      lastName: user?.user?.last_name ?? '',
      userName: user?.user?.username ?? '',
      aboutYourself: user?.status ?? '',
      linkedinLink: user?.linkedin ?? '',
      facebookLink: user?.facebook ?? '',
      instagramLink: user?.instagram ?? '',
      phone_number: user?.phone_number ?? '',
    },
  });

  const onSubmit = (data: any) => {
    handleSave(data);
  };

  // const deleteAccount = useMemo(() => {
  //   if (user)
  //     return (
  //       <ErrorMessageModal
  //         isVisible={showModal}
  //         title={t('deleteAccount')}
  //         text={t('deleteAccountText')}
  //         secondButtonPress={() => setShowModal(false)}
  //         secondButtonTitle={t('no') ?? ''}
  //         showSecondButton={true}
  //         buttonTitle={t('yes')}
  //         onClose={handleDeleteAccount}
  //       />
  //     );
  // }, [user, showModal]);

  if (loader || !user) {
    return <ActivityIndicator size={'large'} style={{ flex: 1 }} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: primaryWhite }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View>
              <Header
                imageUrl={
                  avatar
                    ? avatar
                    : user?.image
                      ? downloadMediaFromBunny({
                        public_key: user?.image,
                        mediaType: 'image',
                        userDir: user?.id,
                        imageDir: 'profile',
                      })?.url ?? ''
                      : ''
                }
                backgroundImageUrl={
                  backgroundAvatar
                    ? backgroundAvatar
                    : user?.background_image
                      ? downloadMediaFromBunny({
                        public_key: user?.background_image,
                        mediaType: 'image',
                        aspectRatio: '16:9',
                        userDir: user?.id,
                        imageDir: 'profile',
                      })?.url
                      : ''
                }
                getImage={handleChangeImage}
                required={user.role_mode == 'coach' && emptyMandatoryFields.includes('image')}
              />
              {!!emptyMandatoryFields.length && (user.role_mode == 'coach' || showPhoneNumber) && (
                <View style={styles.mandatoryMessageContainer}>
                  <Text style={styles.mandatoryMessage}>
                    {mandatoryErrorMessage}
                  </Text>
                </View>
              )}
              <View style={styles.contentContainer}>
                <Text style={styles.lable}>{t('firstName')}</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={errors.firstName?.message ? true : false}
                      value={value}
                      onChangeValue={onChange}
                      placeholderText={t('firstName') ?? ''}
                      style={[
                        styles.margin,
                        { marginBottom: errors.firstName ? 0 : calcHeight(25) },
                      ]}
                    />
                  )}
                  name="firstName"
                  rules={{
                    required: {
                      value: true,
                      message: t('firstNameValidationEmptyText'),
                    },
                    minLength: {
                      value: 3,
                      message: t('firstNameValidationText'),
                    },
                  }}
                />
                {errors.firstName && (
                  <Text style={styles.errorMesageText}>
                    {errors.firstName.message?.toString()}
                  </Text>
                )}
                <Text style={styles.lable}>{t('lastName')}</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={errors.lastName?.message ? true : false}
                      value={value}
                      onChangeValue={onChange}
                      placeholderText={t('lastName') ?? ''}
                      style={[
                        styles.margin,
                        { marginBottom: errors.lastName ? 0 : calcHeight(25) },
                      ]}
                    />
                  )}
                  name="lastName"
                  rules={{
                    required: {
                      value: true,
                      message: t('lastNameValidationEmptyText'),
                    },
                    minLength: {
                      value: 3,
                      message: t('lastNameValidationText'),
                    },
                  }}
                />
                {errors.lastName && (
                  <Text style={styles.errorMesageText}>
                    {errors.lastName.message?.toString()}
                  </Text>
                )}
                <Text style={styles.lable}>{t('userName')}</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={false}
                      value={value}
                      onChangeValue={onChange}
                      placeholderText={t('userName') ?? ''}
                      style={[
                        styles.margin,
                        { marginBottom: errors.userName ? 0 : calcHeight(25) },
                      ]}
                    />
                  )}
                  name="userName"
                />
                <Text style={styles.lable}>{t('email')}</Text>
                <LoginInput
                  valid={false}
                  value={user?.user?.email ?? ''}
                  onChangeValue={() => { }}
                  placeholderText={t('email') ?? ''}
                  style={styles.input}
                  editable={false}
                />
                <DefaultButton
                  style={styles.button}
                  title={t('changeEmail') ?? ''}
                  onPress={handleChangeEmail}
                />
                <DefaultButton
                  style={styles.button}
                  title={
                    (!user?.password_is_null
                      ? t('changePassword')
                      : t('setPassword')) ?? ''
                  }
                  onPress={handleChangePassword}
                />
                <View onLayout={handleLayout}>
                  {(user?.role_mode == 'coach' || showPhoneNumber) && (
                    <Controller
                      name="phone_number"
                      control={control}
                      rules={{
                        validate: value =>
                          phoneInput.current?.isValidNumber(value) ||
                          (t('phoneNumberValidationText') ?? ''),
                        required: {
                          value: true,
                          message: t('phoneNumberValidationEmptyText'),
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          ref={phoneInput}
                          placeholder={t('phoneNumber') ?? ''}
                          value={phoneNumber ? phoneNumber.number : value}
                          onChangeText={text => {
                            onChange(text);
                          }}
                          layout="second"
                          defaultCode={phoneNumber ? phoneNumber.country : 'AM'}
                          containerStyle={[
                            styles.containerStyle,
                            {
                              borderColor: (errors.phone_number || (showPhoneNumber && value.length < 1)) ? red : borderGrey,
                              marginBottom: errors.phone_number
                                ? 0
                                : calcHeight(25),
                            },
                          ]}
                          textInputStyle={styles.textInputStyle}
                          textContainerStyle={styles.textContainerStyle}
                          codeTextStyle={styles.codeTextStyle}
                        />
                      )}
                    />
                  )}
                  {(errors.phone_number) && (
                    <Text style={styles.errorMesageText}>
                      {errors.phone_number.message?.toString()}
                    </Text>
                  )}
                </View>
                <Text style={styles.lable}>{t('gender')}</Text>
                <View style={styles.genderButtonsContainer}>
                  <DefaultButton
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          gender == 2 ? primaryWhite : primaryBlue,
                      },
                      emptyMandatoryFields.includes('gender') &&
                        (user.role_mode == 'coach' || showPhoneNumber)
                        ? { borderWidth: calcWidth(1), borderColor: 'red' }
                        : {},
                    ]}
                    textStyle={{
                      color: gender == 1 ? primaryWhite : primaryGrey,
                    }}
                    title={t('male') ?? ''}
                    onPress={handleChangeGender}
                  />
                  <DefaultButton
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          gender == 1 ? primaryWhite : primaryBlue,
                        marginLeft: calcWidth(20),
                      },
                      emptyMandatoryFields.includes('gender') &&
                        (user.role_mode == 'coach' || showPhoneNumber)
                        ? { borderWidth: calcWidth(1), borderColor: 'red' }
                        : {},
                    ]}
                    textStyle={{
                      color: gender == 2 ? primaryWhite : primaryGrey,
                    }}
                    title={t('female') ?? ''}
                    onPress={handleChangeGender}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.lable}>{t('languages')}</Text>
                  <TouchableOpacity
                    onPress={() => setIsVisibleLanguages(true)}
                    style={styles.padding}>
                    <Icons.Plus
                      fill={
                        emptyMandatoryFields.includes('language') &&
                          (user.role_mode == 'coach' || showPhoneNumber)
                          ? red
                          : primaryBlue
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapContainer}>
                  {languages &&
                    languages.map((el, index) => {
                      if (filteredLanguages?.includes(el.id)) {
                        return (
                          <PrimeryButton
                            key={index}
                            title={el.name}
                            type="outline"
                            onPress={() => languagesSelectHandle(el)}
                            style={styles.outLineButton}
                            textStyle={styles.outLineButtonText}
                            rightIcon={<Icons.Close fill={primaryGrey} />}
                          />
                        );
                      }
                    })}
                </View>
                <MultiSelectModal
                  isVisible={isVisibleLanguages || isVisibleSpecialities}
                  onClose={
                    isVisibleLanguages
                      ? languagesModalCloseHandle
                      : specialitiesModalCloseHandle
                  }
                  onSelect={
                    isVisibleLanguages
                      ? languagesSelectHandle
                      : specialitiesSelectHandle
                  }
                  dataList={isVisibleLanguages ? languages : specialities}
                  selectedList={
                    isVisibleLanguages
                      ? filteredLanguages
                      : filteredSpecialities
                  }
                />
                <Text style={[styles.lable, styles.margin]}>
                  {t('location')}
                </Text>
                <GooglePlacesAutocomplete
                  placeholder={
                    user?.googleLocation ? user?.googleLocation : t('location')
                  }
                  listViewDisplayed={false}
                  textInputProps={{
                    placeholderTextColor: lighBlack,
                  }}
                  styles={{
                    textInput: styles.textInput,
                    row: styles.row,
                    description: styles.description,
                  }}
                  onPress={data => {
                    changeLocation(data.place_id);
                  }}
                  query={{
                    key: '',
                    language: 'en',
                  }}
                />
                <View style={[styles.margin, styles.rowContainer]}>
                  <Text style={[styles.lable]}>{(user.role_mode == 'coach' || showPhoneNumber) ? t('specialities') : t('interests')}</Text>
                  <TouchableOpacity
                    onPress={() => setIsVisibleSpecialities(true)}
                    style={styles.padding}>
                    <Icons.Plus
                      fill={
                        emptyMandatoryFields.includes('speciality') &&
                          (user.role_mode == 'coach' || showPhoneNumber)
                          ? red
                          : primaryBlue
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.rowWrapContainer}>
                  {specialities &&
                    specialities.map((el: ISpeciality, index) => {
                      if (filteredSpecialities?.includes(el.id)) {
                        return (
                          <PrimeryButton
                            key={index}
                            title={el.name}
                            type="outline"
                            onPress={() => specialitiesSelectHandle(el)}
                            style={styles.outLineButton}
                            textStyle={styles.outLineButtonText}
                            rightIcon={<Icons.Close fill={primaryGrey} />}
                          />
                        );
                      }
                    })}
                </View>
                <Text style={[styles.lable, styles.margin]}>
                  {t('aboutYourself')}
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={
                        errors.aboutYourself?.message ||
                          (emptyMandatoryFields.includes('status') &&
                            (user.role_mode == 'coach' || showPhoneNumber))
                          ? true
                          : false
                      }
                      value={value}
                      onChangeValue={(value: string) => {
                        mandatoryFieldsValueChangeHandle('status');
                        onChange(value);
                      }}
                      multiline={true}
                      placeholderText={t('aboutYourself') ?? ''}
                      style={styles.textArea}
                    />
                  )}
                  name="aboutYourself"
                />
                {(user?.role_mode == 'coach' || showPhoneNumber) && (
                  <View>
                    <View style={styles.certificateContainer}>
                      {certificates.map((el, index) => {
                        return (
                          <View
                            style={styles.certificateRow}
                            key={'certificates' + index}>
                            {el.file ? (
                              <Image
                                source={{ uri: `${keys.API_URL}${el.file}` }}
                                style={styles.image}
                                resizeMode="cover"
                              />
                            ) : (
                              <Pressable onPress={() => handleAddFile(index)}>
                                <Icons.AddFile />
                              </Pressable>
                            )}
                            <LoginInput
                              valid={errors.lastName?.message ? true : false}
                              value={el.description}
                              onChangeValue={(value: string) => {
                                handleChangeDescription(value, index);
                              }}
                              placeholderText={t('description') ?? ''}
                              style={styles.certificateInput}
                            />
                            <TouchableOpacity
                              style={styles.removeButton}
                              onPress={() => deleteCertificateItem(index)}>
                              <Icons.Close fill={primaryBlack} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      onPress={addCertificateLine}
                      style={styles.addCertificateButton}>
                      <Icons.Plus fill={primaryBlack} />
                      <Text style={styles.addCertificateText}>
                        {t('addCertificate')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={[styles.lable, styles.margin]}>
                  {t('socialAccounts')}
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={errors.facebookLink?.message ? true : false}
                      value={value.toLowerCase()}
                      onChangeValue={onChange}
                      placeholderText={t('facebookLink') ?? ''}
                      style={styles.margin}
                    />
                  )}
                  name="facebookLink"
                  rules={{
                    pattern: {
                      value:
                        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                      message: t('linkValidationText'),
                    },
                  }}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={errors.instagramLink?.message ? true : false}
                      value={value.toLowerCase()}
                      onChangeValue={onChange}
                      placeholderText={t('instagramLink') ?? ''}
                      style={styles.margin}
                    />
                  )}
                  name="instagramLink"
                  rules={{
                    pattern: {
                      value:
                        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                      message: t('linkValidationText'),
                    },
                  }}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LoginInput
                      valid={errors.linkedinLink?.message ? true : false}
                      value={value.toLowerCase()}
                      onChangeValue={onChange}
                      placeholderText={t('linkedinLink') ?? ''}
                      style={styles.input}
                    />
                  )}
                  name="linkedinLink"
                  rules={{
                    pattern: {
                      value:
                        /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                      message: t('linkValidationText'),
                    },
                  }}
                />
                <View
                  style={[
                    styles.genderButtonsContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <DefaultButton
                    style={[
                      styles.button,
                      {
                        backgroundColor: primaryBlue,
                        marginBottom: calcHeight(90),
                      },
                    ]}
                    title={t('save') ?? ''}
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
                {
                  user.role_mode == 'client' && <DefaultButton
                    style={[
                      styles.button,
                      {
                        backgroundColor: primaryBlue,
                      },
                    ]}
                    title={'Become a trainer'}
                    onPress={scrollToComponent}
                  />
                }
                {/* <DefaultButton
                  style={[
                    styles.button,
                    {
                      backgroundColor: red,
                      marginBottom: calcHeight(90),
                    },
                  ]}
                  title={t('deleteAccount') ?? ''}
                  onPress={() => setShowModal(true)}
                /> */}
              </View>
              <Toaster
                height={calcHeight(150)}
                isVisible={showDocumentModal}
                onClose={() => openDocumentModal(false)}
                Screen={
                  <View style={styles.shhetContainer}>
                    <UpploadButton
                      imageSizeType={['16:9']}
                      showCropperSizeConfig={false}
                      goBackImage={(image: IUploadImage[]) => {
                        handleSetFiles(image);
                        openDocumentModal(false);
                      }}
                      uploadMediaType="Photos">
                      <View style={styles.sheetButtons}>
                        <Icons.BlackImage />
                        <Text style={styles.sheetButtonText}>
                          {t('chooseMedia')}
                        </Text>
                      </View>
                    </UpploadButton>
                    <View style={styles.emptyView} />
                    <UpploadButton
                      goBackImage={(image: IUploadImage[]) => {
                        handleSetFiles(image);
                        openDocumentModal(false);
                      }}
                      fileButtonAvailability={true}>
                      <View style={styles.sheetButtons}>
                        <Icons.File />
                        <Text style={styles.sheetButtonText}>
                          {t('chooseFile')}
                        </Text>
                      </View>
                    </UpploadButton>
                  </View>
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* {deleteAccount} */}
    </View>
  );
};
export default EditProfileScreen;
