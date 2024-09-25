import React from 'react';
import {View, ScrollView} from 'react-native';
import {primaryBlue} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import DashBoardItem from '../../../components/dashboardItem/DashBoardItem';
import styles from './Menu.styles';

const Menu: React.FC<any> = ({navigation}) => {
  const listMenu = [
    {
      icon: <Icons.Apple fill={primaryBlue} />,
      title: 'Nutrition',
      description: 'Recipes / Foods / Meals / Day plans',
    },
    {
      icon: <Icons.Trainer fill={primaryBlue} />,
      title: 'Workouts',
      description: 'Exercises / Workouts',
    },
    {
      icon: <Icons.Programs />,
      title: 'Programs',
      description: 'Meal Plans / Workouts',
    },
    {
      icon: <Icons.Packages />,
      title: 'Packages',
      description: 'Meal Plans / Workouts',
    },
    {
      icon: <Icons.M />,
      title: 'Marathons',
      description: 'Meal Plans / Workouts',
    },
    {
      icon: <Icons.Live fill={primaryBlue} />,
      title: 'Live',
      description: 'Individual / Group',
    },
    {
      icon: <Icons.User />,
      title: 'Users',
      description: 'All Users',
    },
    {
      icon: <Icons.Payments />,
      title: 'Payments',
      description: 'All Payments',
    },
  ];
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Dashboard'}
        open={false}
        onFocus={() => {}}
        onBlur={() => {}}
        leftComponent={
          <View style={styles.headerIcon}>
            <Icons.EllipsisIcon />
          </View>
        }
      />
      <ScrollView style={styles.scroll}>
        {listMenu.map((item, index) => {
          return (
            <View key={index}>
              <DashBoardItem
                icon={item.icon}
                title={item.title}
                description={item.description}
                onPress={() => navigation.navigate(item.title)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Menu;
