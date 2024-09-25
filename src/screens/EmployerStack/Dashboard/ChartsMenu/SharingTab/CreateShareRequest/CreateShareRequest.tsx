import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../assets/icons/svg/index';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import {
  inputBorder,
  primaryGrey,
} from '../../../../../../assets/styles/colors.styles';
import SharingSwitchListComponent from '../../../../../../components/sharingSwitchListComponent/SharingSwitchListComponent';
import ContainerWithIcon from '../../../../../../components/containerWithIcone/ContainerWithIcon';
import Toaster from '../../../../../../components/toester/Toester';
import {PrimeryButton} from '../../../../../../components/buttons';
import {calcHeight} from '../../../../../../assets/dimensions';
import {EmployerNavigationParamList} from '../../../..';
import hook from './CreateShareRequest-hook';
import styles from './CreateShareRequest.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'CreateShareRequest'
>;

const CreateShareRequest: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    onSwitch,
    data,
    isSelectUserOpen,
    onSelectUserPress,
    onSelectUserClose,
    searchText,
    search,
    userList,
    onUserSelect,
    onUnselectUser,
    selectedUser,
    isCalendarOpen,
    onCoustomDatePress,
    onPeriodSelect,
    onCalendarCancel,
    onUnselectPeriod,
  } = hook(navigation);

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Shared by me'}
      />
      <View style={styles.contentContainer}>
         {!selectedUser?
         (<PrimeryButton 
            type='outline'
            style={styles.selectUserButton}
            title='Select User'
            onPress={onSelectUserPress}
            Icon={
                <Icons.UserIcon fill={primaryGrey}/>
            }
            />):(
              <ContainerWithIcon
                styleGenegalContainer={styles.selectedUserGeneralContainer}
                onClose={onUnselectUser}
                value={
                    <View style={styles.selectedUserContainer}>
                    <Image style={styles.selectedUserImage} source={{uri:selectedUser.image}}/>
                    <Text style={styles.titleText}>{selectedUser.name}</Text>
                    </View>
                }
              />
            )}
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
            title='Send Request' 
            onPress={()=>{}} 
            type={data.periodFrom&&selectedUser?'default':'outline'}/>
        </View>
      <Toaster
        isVisible={isSelectUserOpen}
        onClose={onSelectUserClose}
        height={calcHeight(348)}
        Screen={
          <View style={styles.toasterContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={search}
                value={searchText}
                placeholder={'Search user or add email'}
              />
              <TouchableOpacity style={styles.findeUserIconTouch}>
                <Icons.SearchIcon fill={inputBorder} {...styles.iconsStyle} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.userListContainer}>
              {userList.map(user => {
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.userListRowContainer}
                    onPress={() => onUserSelect(user.id)}>
                    <Image
                      style={styles.userImage}
                      source={{uri: user.image}}
                    />
                    <Text style={styles.titleText}>{user.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
      />
       </View>
    </View>
  );
};

export default CreateShareRequest;
