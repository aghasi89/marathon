import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../assets/icons/svg/index';
import OutLineButton from '../../../components/buttons/outline/OutLineButton';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../components/textWithicon/TextWithIcon';
import {NavigationParamList} from '..';
import hook from './index.hook';
import styles from './index.style';

type Props = NativeStackScreenProps<NavigationParamList, 'Settings'>;

const Settings: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {leftIconPress, onPress,logOut} = hook(navigation);
  const menuItems = [
    {
      title: 'Account',
      icon: <Icons.Account />,
      onPress: onPress,
    },
    {
      title: 'Language',
      icon: <Icons.Language />,
      onPress: onPress,
    },
    {
      title: 'Units',
      icon: <Icons.Units />,
      onPress: onPress,
    },
    {
      title: 'Subscription',
      icon: <Icons.Subscription />,
      onPress: onPress,
    },
    {
      title: 'Notifications',
      icon: <Icons.Notifications />,
      onPress: onPress,
    },
    {
      title: 'Support',
      icon: <Icons.HelpAndSupport />,
      onPress: onPress,
    },
    {
      title: 'Privacy and Terms',
      icon: <Icons.Privacy />,
      onPress: onPress,
    },
  ];
  
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Settings'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      <View style={styles.contentContainer}>
        {menuItems.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.rowContainer}
              key={index}
              onPress={() => {
                item.onPress(index);
              }}>
              <TextWithIcon
                icon={item.icon}
                text={item.title}
                textStyle={styles.text}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <OutLineButton
            title="Log Out"
            onPress={logOut}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
        <View style={styles.logoContainer}>
          <Icons.Marathon />
          <Text style={styles.versionText}>v 1.0.1</Text>
        </View>
      </View>
    </View>
  );
};
export default Settings;
