import { useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { emailVerify, setIsLogin, setLogin } from '../../../store/actions/registration-action';
import { changeProfileInfo, getProfileInfo } from '../../../store/actions/profile-action';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { NavigationParamList } from '../../../navigation/AuthNavigation';
import { ILogin } from '../../../types/types';
import { getData } from '../../../utils/local_storage';
import { useForm } from 'react-hook-form';

type Props = NativeStackScreenProps<NavigationParamList, 'LOGIN'>;

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data: ILogin) => {
    if (!data.password) {
      onVerify(data);
    } else {
      onLogin(data)
    }
  };
  const onVerify = useCallback((data: ILogin) => {
    const payload = {
      "email": data.email?.toLowerCase()
    };
    dispatch(emailVerify(payload, (type: string) => {
      if (type === "sended") {
        navigation.navigate("SUCCESS_SCREEN", { email: data.email?.toLowerCase(), type: "Registration" })
      } else {
        setShowPass(true);
      }
    }))
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    if (!text) {
      setShowPass(false);
      setValue("password", "")
    }
  }, []);

  const onLogin = useCallback((data: ILogin) => {
    const payload = {
      "email": data.email?.toLowerCase(),
      "password": data.password,
    }
    dispatch(setLogin(payload,
      () => {
        AnalyticService.userLogin('email')
        dispatch(setIsLogin(false))
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
  }, []);

  const goForgetPasswordScreen = () => {
    navigation.navigate('FORGOT_PASSWORD')
  }

  const goSignUpScreen = () => {
    navigation.navigate('SELECT_ROLE')
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        dispatch(setIsLogin(false))
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleCloase = () => {
    dispatch(setIsLogin(false))
  }

  return {
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
  };
};
