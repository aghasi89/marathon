import {useCallback} from 'react';

export default navigation => {
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const logOut = useCallback(() => {}, []);
  const onPressAccount = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPressLanguage = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPressUnits = useCallback(() => {
    navigation.navigate('UnitSettings');
  }, [navigation]);
  const onPressSubscription = useCallback(() => {
    navigation.navigate('Subscriptions');
  }, [navigation]);
  const onPressNotifications = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPressSupport = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPressPrivacy = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPress = useCallback((index: number) => {
    switch (index.toString()) {
      case '0':
        return onPressAccount();
      case '1':
        return onPressLanguage();
      case '2':
        return onPressUnits();
      case '3':
        return onPressSubscription();
      case '4':
        return onPressNotifications();
      case '5':
        return onPressSupport();
      case '6':
        return onPressPrivacy();
      default:
        break;
    }
  }, []);

  return {
    leftIconPress,
    onPress,
    logOut,
  };
};
