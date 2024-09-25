import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons/svg/index';
import CoachInfo from '../../components/CoachInfo/CoachInfo';
import { coachInfoSelector } from '../../store/selectors/feed-selector';
import Header from '../ProfileStack/components/Header/Header';
import Hook from './NoPermissions-hook';
import styles from './NoPermissions.style';

const NoPermissions: React.FC = () => {
  const coachInfo = useSelector(coachInfoSelector)
  const { t, navigateBack, cardPressHandle } = Hook();

  return (
    <View style={styles.container}>
      <Header title={''} goBack={navigateBack} />
      <View style={styles.content}>
        <Icons.Hand />
        <Text style={styles.lable}>{t(`noPermissions`)}</Text>
        <CoachInfo
          data={coachInfo}
          onPresstoNavigate={cardPressHandle}
        />
      </View>
    </View>
  );
};
export default NoPermissions;
