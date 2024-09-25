import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { setIsLogin, setLogin, setToken } from '../../../store/actions/registration-action';
import { roleModeSelector, tokenSelector } from '../../../store/selectors/registration-selector';
import { IRegister } from '../../../types/types';
import { changeProfileInfo, getProfileInfo, setCoachPassword } from '../../../store/actions/profile-action';
import { profileSelector } from '../../../store/selectors/profile-selector';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { getData } from '../../../utils/local_storage';
import { setMarathonApiAuthorizationHeader } from '../../../services/api/mainInstance';

type Props = NativeStackScreenProps<NavigationParamList, 'ASSIGN_COACH_INFORMATION'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const roleMode = useSelector(roleModeSelector)
  const phoneInput = useRef<PhoneInput>(null);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const token = useSelector(tokenSelector);
  const user = useSelector(profileSelector)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (token) {
      setLoading(true)
      setMarathonApiAuthorizationHeader(token)
      dispatch(getProfileInfo(() => {
        setLoading(false)
      }))
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setValue('first_name', user.user.first_name)
      setValue('last_name', user.user.last_name)
      setValue('email', user.user.email)
      setValue('phone_number', user.phone_number)
    }
  }, [user])

  const onSubmit = (data: IRegister) => {
    handleSignUp(data)
  };

  const handleBack = () => {
    dispatch(setToken(undefined, false));
  }

  const handleSignUp = useCallback((data: any) => {
    if (user) {
      const payload = { ...data }
      delete payload.password;
      delete payload.email;
      dispatch(changeProfileInfo(user.id, payload, () => {
        dispatch(getProfileInfo())
      }))
      const newPayload = {
        token: token,
        email: data.email,
        password: data.password
      }
      dispatch(setCoachPassword(newPayload, () => {
        const obj = {
          "email": data.email?.toLowerCase(),
          "password": data.password,
        }
        dispatch(setLogin(obj,
          () => {
            AnalyticService.userLogin('email')
            dispatch(setIsLogin(false))
            dispatch(setToken(undefined, false));
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
      }))
    }
  }, [user])

  return {
    t,
    secureTextEntry,
    setSecureTextEntry,
    handleBack,
    handleSignUp,
    phoneInput,
    roleMode,
    handleSubmit,
    onSubmit,
    control,
    errors,
    loading
  };
};
