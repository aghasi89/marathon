import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { languagesSelector, mandatoryFieldsSelector, profileSelector, specialitiesSelector } from '../../../store/selectors/profile-selector';
import { setLoadingAction, uploadImageToBunnyAction } from '../../../store/actions/administrative-action';
import { NavigationParamList } from '../../../navigation/ProfileNavigation';
import { changeProfileInfo, setFiles, setProfileInfo } from '../../../store/actions/profile-action';
import { ICertificate, IFeedMultiItem, IMandatoryFields, IUploadImage } from '../../../types/types';
import { deleteFirebasePushToken } from '../../../store/actions/registration-action';
import UnreadMessageContext from '../../ChatStack/UnreadCountContext';
import { storeData } from '../../../utils/local_storage';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { chatClient } from '../../../services/chatConfig';

type Props = NativeStackScreenProps<NavigationParamList, 'EDIT_PROFILE'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const { resetUnreadCount } = useContext(UnreadMessageContext);
  const user = useSelector(profileSelector)
  const languages = useSelector(languagesSelector)
  const specialities = useSelector(specialitiesSelector)
  const mandatoryFields = useSelector(mandatoryFieldsSelector)
  const { parsePhoneNumberFromString } = require('libphonenumber-js');
  const phoneInput = useRef<PhoneInput>(null);
  const [gender, setGender] = useState(user?.gender ? user.gender : 1)
  const [filteredLanguages, setFilteredLanguages] = useState<number[]>(user?.language ? user?.language.map((el) => { return el.language.id }) : [])
  const [filteredSpecialities, setFilteredSpecialities] = useState<number[]>(user?.speciality ? user?.speciality.map((el) => { return el.speciality.id }) : [])
  const [avatar, setAvatar] = useState('')
  const [image, setImage] = useState('')
  const [backgroundAvatar, setBackgroundAvatar] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [location, setLocation] = useState(user?.location)
  const [isVisibleLanguages, setIsVisibleLanguages] = useState<boolean>(false);
  const [isVisibleSpecialities, setIsVisibleSpecialities] = useState(false);
  const [emptyMandatoryFields, setEmptyMandatoryFields] = useState<IMandatoryFields[]>([])
  const [certificates, setCertificates] = useState<ICertificate[]>([])
  const [loader, setLoader] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number>()
  const [showModal, setShowModal] = useState(false)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)

  useEffect(() => {
    let newCertificatesList: ICertificate[] = []
    user?.certificate.map((el) => {
      newCertificatesList.push(el.certificate)
    })
    if (user)
      checkMandatoryFields()
    setCertificates(newCertificatesList)
    return () => {
      dispatch(setLoadingAction(false))
    }
  }, [user])

  const handleChangePassword = () => {
    //@ts-ignore
    navigation.navigate('CHANGE_PASSWORD', { type: !user?.password_is_null ? "change" : "set" })
  }

  const handleChangeEmail = () => {
    //@ts-ignore
    navigation.navigate('CHANGE_EMAIL')
  }

  const handleChangeGender = useCallback(() => {
    if (gender == 1) {
      setGender(2)
    } else {
      setGender(1)
    }
    mandatoryFieldsValueChangeHandle('gender')
  }, [gender])

  const changeLocation = (place_id: string) => {
    setLocation(place_id)
  }

  const handleSave = useCallback((data: any) => {
    setLoader(true)
    let newCertificatesList: ICertificate[] = []
    certificates.map((el) => {
      if (el.file && el.description) {
        newCertificatesList.push(el)
      }
    })
    if (user) {
      const payload = {
        "phone_number": data.phone_number ? data.phone_number : '',
        "first_name": data.firstName,
        "last_name": data.lastName,
        "username": data.userName,
        "role_mode": showPhoneNumber ? 'coach' : user.role_mode,
        "certificate": newCertificatesList,
        "description": data.aboutYourself,
        "image": image ? image : user.image,
        "gender": gender,
        "location": location,
        "facebook": data.facebookLink,
        "instagram": data.instagramLink,
        "linkedin": data.linkedinLink,
        "status": data.aboutYourself,
        "languages": filteredLanguages,
        "specialities": filteredSpecialities,
        "background_image": backgroundImage ? backgroundImage : user.background_image,
      }
      dispatch(changeProfileInfo(user.id, payload, () => {
        setLoader(false)
        navigation.goBack()
      }))
    }
  }, [gender, user, location, image, gender, backgroundImage, filteredLanguages, filteredSpecialities, certificates, showPhoneNumber])

  const handleChangeImage = async (media: IUploadImage[], type: string) => {
    if (type == 'image') {
      setAvatar(media[0].path)
      mandatoryFieldsValueChangeHandle('image')
    } else {
      setBackgroundAvatar(media[0].path)
    }
    dispatch(uploadImageToBunnyAction(media, 'profile', (public_id) => {
      if (type == 'image') {
        public_id && setImage(public_id)
      } else {
        public_id && setBackgroundImage(public_id)
      }
    }));
  }

  const deleteCertificateItem = useCallback((index: number) => {
    const newArr = [...certificates];
    newArr.splice(index, 1);
    setCertificates(newArr);
  }, [certificates])

  const handleChangeDescription = useCallback((text: string, index: number) => {
    let newArr: ICertificate[] = [...certificates]
    newArr.map((el: ICertificate, i: number) => {
      if (index == i) {
        el.description = text
        el.title = text
      }
    })
    setCertificates(newArr)
  }, [certificates])

  const handleSetFiles = useCallback((image: IUploadImage[]) => {
    dispatch(setFiles(image[0], (url: string) => {
      let newArr: ICertificate[] = [...certificates]
      newArr.map((el, i) => {
        if (selectedCertificateIndex == i) {
          if (image[0].mime == 'application/pdf') {
            el.file = url
            el.file_type = 'pdf'
          } else {
            el.file = url
            el.file_type = image[0].mime
          }
        }
      })
      setCertificates(newArr)
    }))
  }, [certificates, selectedCertificateIndex])

  const addCertificateLine = useCallback(() => {
    let newArr: ICertificate[] = [...certificates]
    newArr.push({
      "description": "",
      "file": "",
      "title": "",
      "year": moment().year(),
      "file_type": ""
    })
    setCertificates(newArr)
  }, [certificates])

  const languagesModalCloseHandle = useCallback(() => {
    !!filteredLanguages.length && mandatoryFieldsValueChangeHandle('language')
    setIsVisibleLanguages(false)
  }, [filteredLanguages])

  const languagesSelectHandle = useCallback((item: IFeedMultiItem) => {
    let idsList: number[] = [...filteredLanguages]
    const index = item.id ? idsList.indexOf(item.id) : -1
    if (index >= 0) {
      idsList.splice(index, 1)
    } else {
      item.id && idsList.push(item.id)
    }
    setFilteredLanguages(idsList)
  }, [filteredLanguages])

  const specialitiesModalCloseHandle = useCallback(() => {
    filteredSpecialities && mandatoryFieldsValueChangeHandle('speciality')
    setIsVisibleSpecialities(false)
  }, [filteredSpecialities])

  const specialitiesSelectHandle = useCallback((item: IFeedMultiItem) => {
    let idsList: number[] = [...filteredSpecialities]
    const index = item.id ? idsList.indexOf(item.id) : -1
    if (index >= 0) {
      idsList.splice(index, 1)
    } else {
      item.id && idsList.push(item.id)
    }
    setFilteredSpecialities(idsList)
  }, [filteredSpecialities])
  const checkMandatoryFields = useCallback(() => {
    if (user) {
      const emptyFields: IMandatoryFields[] = []
      mandatoryFields.forEach((key) => {
        if (
          (key !== 'gender' && !!!user[key]?.length) ||
          (key === 'gender' && !!!user[key])
        ) {
          emptyFields.push(key)
        }
      })
      setEmptyMandatoryFields(emptyFields)
    }
  }, [user])
  const mandatoryFieldsValueChangeHandle = useCallback((field: IMandatoryFields) => {
    if (!!emptyMandatoryFields.length) {
      const newFields = [...emptyMandatoryFields]
      const index = newFields.findIndex(el => el === field)
      if (index > -1) {
        newFields.splice(index, 1)
        setEmptyMandatoryFields(newFields)
      }
    }
  }, [emptyMandatoryFields])

  const mandatoryErrorMessage = useMemo(() => {
    return `${t('compliteYourProfile')} ${emptyMandatoryFields
      .map(el => t(`${el !== 'status' ? el : 'aboutYourself'}`))
      .join(', ')}`
  }, [emptyMandatoryFields])

  const openDocumentModal = (value: boolean) => {
    setShowDocumentModal(value)
  }

  const handleAddFile = (index: number) => {
    setShowDocumentModal(true)
    setSelectedCertificateIndex(index)
  }

  // const deleteFirebaseToken = async () => {
  //   const token = await messaging().getToken();
  //   const payload = {
  //     token: token,
  //     user: user?.id ?? 0,
  //   };
  //   user && dispatch(deleteFirebasePushToken(payload));
  // };

  // const handleDeleteAccount = useCallback(() => {
  //   if (user) {
  //     dispatch(setProfileInfo(undefined));
  //     storeData('isNew', 'no');
  //     storeData('accessToken', undefined);
  //     //@ts-ignore
  //     navigation.reset({ routes: [{ name: 'FEED_NAVIGATION_STACK' }] });
  //     resetUnreadCount();
  //     deleteFirebaseToken();
  //     chatClient.disconnectUser();
  //     AnalyticService.userLogout(user.id);
  //   }
  // }, [user])

  const scrollViewRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(0);

  const handleLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    setTargetPosition(y);
  };

  const scrollToComponent = useCallback(() => {
    setShowPhoneNumber(true)
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: targetPosition, animated: true });
    }
  }, [targetPosition, scrollViewRef])

  const phoneNumber = useMemo(() => {
    if (user?.phone_number) {
      const parsedPhoneNumber = parsePhoneNumberFromString(user?.phone_number);
      return {
        country: parsedPhoneNumber?.country,
        number: user?.phone_number?.split(parsedPhoneNumber?.countryCallingCode)?.[1]
      }
    }
  }, [user])

  return {
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
    handleSetFiles,
    certificates,
    addCertificateLine,
    deleteCertificateItem,
    handleChangeDescription,
    specialitiesModalCloseHandle,
    specialitiesSelectHandle,
    isVisibleSpecialities,
    loader,
    languages,
    languagesModalCloseHandle,
    languagesSelectHandle,
    filteredLanguages,
    specialities,
    filteredSpecialities,
    emptyMandatoryFields,
    mandatoryFieldsValueChangeHandle,
    mandatoryErrorMessage,
    openDocumentModal,
    showDocumentModal,
    selectedCertificateIndex,
    handleAddFile,
    resetUnreadCount,
    dispatch,
    navigation,
    showModal,
    setShowModal,
    showPhoneNumber,
    handleLayout,
    scrollToComponent,
    scrollViewRef,
    phoneNumber
  };
};
