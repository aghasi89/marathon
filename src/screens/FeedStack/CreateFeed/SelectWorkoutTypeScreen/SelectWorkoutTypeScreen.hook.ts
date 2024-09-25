import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MainNavigationParamList } from '../../../../navigation/MainNavigation';
import { IWorkoutType } from '../../../../types/types';

type Props = NativeStackScreenProps<
  MainNavigationParamList,
  'WORKOUT_TYPE_SELECT'
>;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { t } = useTranslation();
  const type = route.params?.type;
  const channelId = route.params?.channelId
  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
  }, []);
  const workoutTypeSelectHandle = useCallback((workoutType: IWorkoutType) => {
    navigation.navigate('CREATE_FEED', { type, workoutType, channelId: channelId });
  }, [channelId]);
  return { t, workoutTypeSelectHandle, backIconPressHandle };
};
