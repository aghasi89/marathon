import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../assets/icons/svg'
import HeaderWithUserInfo from '../../../../../../components/headers/headerWithUserInfo/HeaderWithUserInfo';
import SharingSwitchListComponent from '../../../../../../components/sharingSwitchListComponent/SharingSwitchListComponent';
import { primaryBlack, primaryBlue } from '../../../../../../assets/styles/colors.styles';
import {PrimeryButton} from '../../../../../../components/buttons';
import {EmployerNavigationParamList} from '../../../..';
import hook from './EditSharing-hook';
import styles from './EditSharing.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'CreateShareRequest'
>;

const EditSharing: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    onSwitch,
    data,
    selectedUser,
    isCalendarOpen,
    onCoustomDatePress,
    onPeriodSelect,
    onCalendarCancel,
    onUnselectPeriod,
    leftIconPress,
    isDataChanged
  } = hook(navigation);

  return (
    <View style={styles.container}>
      <HeaderWithUserInfo
        image={selectedUser?.image}
        imageAlt={
          <Icons.User fill={primaryBlue} {...styles.iconsStyle}/>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
        rightComponent={
          <TouchableOpacity onPress={()=>{}}>
            <Icons.EllipsisIcon fill={primaryBlack}/>
          </TouchableOpacity>
        }
        title={selectedUser?.name}
        subText='Shared by me'
      />
      <View style={styles.contentContainer}>
        <SharingSwitchListComponent
          data={data}
          onChange={onSwitch}
          coustomDateButtonClick={onCoustomDatePress}
          FromBeginingButtonClick={()=>{}} 
          onPeriodChange={onPeriodSelect}
          isCalendarOpen={isCalendarOpen}
          onCalendarCancel={onCalendarCancel}
          onClearPeriod={onUnselectPeriod}
        />
       <View style={styles.sendRequestButtonContainer}>
            <PrimeryButton 
            style={ styles.sendRequestButton} 
            title='Save' 
            onPress={()=>{}} 
            type={data.periodFrom&&isDataChanged?'default':'outline'}/>
        </View>
       </View>
    </View>
  );
};

export default EditSharing;
