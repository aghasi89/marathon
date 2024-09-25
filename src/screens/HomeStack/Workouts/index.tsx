import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import MultiSelectSelectedChips from '../../../components/multiSelect/MultiSelectSelectedChips';
import TabBadges from '../../../components/TabBadges/TabBadges';
import Exercises from './Exercises/Exercises';
import Workout from './Workouts/Workout';
import indexHook from './index-hook';
import styles from './index.style';

const Workouts: React.FC<any> = ({navigation}) => {
  const {
    isFocus,
    setIsfocus,
    searchText,
    index,
    setIndex,
    indexTab,
    setIndexTab,
    filterText,
    badges,
    selectedData,
    deleteItem,
  } = indexHook(navigation);

  const chipsGroupItems = [
    {
      title: 'Exercises',
      icon: <Icons.Trainer fill={primaryBlack} />,
      selectedIcon: <Icons.Trainer fill={primaryBlue} />,
    },
    {
      title: 'Workouts',
      icon: <Icons.Trainer fill={primaryBlack} />,
      selectedIcon: <Icons.Trainer fill={primaryBlue} />,
    },
  ];

  const renderComponent = () => {
    switch (index) {
      case 0:
        return <Exercises navigation={navigation} />;
      case 1:
        return <Workout navigation={navigation} />;
      default:
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Workouts'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FilterWorkout', {index: index});
            }}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={() => navigation.goBack()}
      />
      <TabNavigationHeader
        data={chipsGroupItems}
        index={index}
        setIndex={value => {
          setIndex(value);
        }}
      />
      {selectedData.length > 0 ? (
        <View style={styles.chipItem}>
          <MultiSelectSelectedChips
            list={selectedData}
            onDelete={(value: any) => {
              deleteItem(value);
            }}
          />
        </View>
      ) : (
        <TabBadges
          data={badges}
          index={indexTab}
          setIndex={value => {
            setIndexTab(value);
          }}
        />
      )}
      {renderComponent()}
    </View>
  );
};
export default Workouts;
