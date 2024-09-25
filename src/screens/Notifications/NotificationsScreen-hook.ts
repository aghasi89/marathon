import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationParamList } from '../../navigation/MainNavigation';
import { getNotifications, readNotification } from '../../store/actions/notifications-action';
import { profileSelector } from '../../store/selectors/profile-selector';
import { notificationsSelector } from '../../store/selectors/notifications-selector';

type Props = NativeStackScreenProps<MainNavigationParamList, 'NOTIFICATIONS'>;

export default () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const user = useSelector(profileSelector);
  const notifications = useSelector(notificationsSelector)

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (user) {
      dispatch(getNotifications(user.id))
    }
  }, [user])

  const handleNavigateToFeedScreen = useCallback((id: number, type: string, is_read: boolean, notificationId: number) => {
    if (!is_read) {
      dispatch(readNotification(notificationId, () => {
        user && dispatch(getNotifications(user.id))
      }))
    }
    if (type !== 'basic') {
      navigation.navigate('ABOUT_FEED', { id, type: 'feed' });
    } else {
      navigation.navigate('ABOUT_FEED', { id, type: 'basic' });
    }
  }, [user])


  return {
    t,
    goBack,
    notifications,
    handleNavigateToFeedScreen
  };
};
