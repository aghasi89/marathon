import React, {useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../assets/icons/svg/index';
import HeaderWithUserInfo from '../../../../../../components/headers/headerWithUserInfo/HeaderWithUserInfo';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import TabBar from '../../../../../../components/tabBar/TabBar';
import {EmployerNavigationParamList} from '../../../..';
import Calories from './SharingNutrients/SharingNutrients';
import Activity from './ShareingActivity/ShareingActivity';
import Measurements from './ShareMeasurements/ShareMeasurements';
import Photo from './ShareingPhotoProgress/ShareingPhotoProgress';
import hook from './UserStatistics-hook';
import styles from './UserStatistics.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'UserStatistics'
>;

const UserStatistics: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    tabChangeHandler,
    tabIndex,
    tabCategories,
    selectedUser,
  } = hook(navigation);
  const renderItem = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <Calories />;
      case 1:
        return <Activity />;
      case 2:
        return <Photo/>
      case 3:
        return <Measurements />;
      default:
        break;
    }
  }, [tabIndex]);
  return (
    <View style={styles.container}>
      <HeaderWithUserInfo
        leftIcon={true}
        leftIconPress={leftIconPress}
        rightComponent={
          <TouchableOpacity style={styles.headerRightIconTouch}>
            <Icons.EllipsisIcon fill={primaryBlack} />
          </TouchableOpacity>
        }
        image={selectedUser?.image}
        imageAlt={
          <Icons.UserIcon fill={primaryBlue} {...styles.userImageAltIcon} />
        }
        title={selectedUser?.name}
        subText={`${selectedUser?.period.start} - ${selectedUser?.period.end}`}
        subTextColor={primaryBlue}
      />
      <TabBar
        data={tabCategories}
        selectedIndex={tabIndex}
        setSelectedIndex={tabChangeHandler}
        textColor={primaryBlack}
        textColorOnSelect={primaryBlue}
      />
      {renderItem}
    </View>
  );
};
export default UserStatistics;
