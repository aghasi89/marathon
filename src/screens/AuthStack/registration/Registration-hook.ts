import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { createConfirmCode, setIsLogin, setLogin, setRegister, setToken } from '../../../store/actions/registration-action';
import { emailSelector, roleModeSelector, tokenSelector } from '../../../store/selectors/registration-selector';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { setError } from '../../../store/actions/administrative-action';
import { IError, IRegister } from '../../../types/types';
import { useForm } from 'react-hook-form';
import { changeProfileInfo, getProfileInfo } from '../../../store/actions/profile-action';
import { getData } from '../../../utils/local_storage';

type Props = NativeStackScreenProps<NavigationParamList, 'REGISTER'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const roleMode = useSelector(roleModeSelector)
  const phoneInput = useRef<PhoneInput>(null);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const token = useSelector(tokenSelector);
  const email = useSelector(emailSelector);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (email) {
      setValue("email", email)
    }
  }, [email]);

  const onSubmit = (data: IRegister) => {
    handleSignUp(data)
  };

  const goSignInScreen = () => {
    navigation.navigate('LOGIN')
  }

  const handleBack = () => {
    if (email) {
      navigation.navigate("LOGIN");
      dispatch(setToken(undefined, false, undefined));
    } else {
      navigation.goBack();
    }
  }

  const handleSignUp = useCallback((data: IRegister) => {
    if (data.email) {
      dispatch(createConfirmCode(data?.email, (confirm_code: string) => {
        const payload = {
          "first_name": data.firstName,
          "last_name": data.lastName,
          "password": data.password,
          "email": data.email?.toLowerCase(),
          "phone_number": data.phone_number,
          "confirm_code": confirm_code,
          "role": roleMode ? roleMode : "client"
        }
        dispatch(setRegister(payload, () => {
          if (email) {
            const payload = {
              "email": data.email?.toLowerCase(),
              "password": data.password,
            }
            dispatch(setLogin(payload,
              () => {
                AnalyticService.userLogin('email')
                dispatch(setIsLogin(false))
                dispatch(setToken(undefined, false, undefined));
                dispatch(getProfileInfo((user) => {
                  getData('selectedRegion').then(region => {
                    if (region && user) {
                      const payload = {
                        ...user,
                        "geolocation": region.name
                      }
                      dispatch(changeProfileInfo(user.id, payload, () => { }))
                    }
                  })
                }))
              }));
          } else {
            dispatch(setIsLogin(false))
            dispatch(setToken(undefined, false, undefined));
            AnalyticService.userSignUp('email')
            const data: IError = {
              title: t('registration'),
              text: t('registrationSuccessText'),
              buttonTitle: 'OK'
            }
            dispatch(setError(data))
          }
        }, token))
      }))
    }
  }, [roleMode, token, email])

  return {
    t,
    secureTextEntry,
    setSecureTextEntry,
    goSignInScreen,
    handleBack,
    handleSignUp,
    phoneInput,
    roleMode,
    handleSubmit,
    onSubmit,
    control,
    errors
  };
};
