import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import TabBadges from '../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../components/multiSelect/MultiSelectSelectedChips';
import Recipe from './Recipe/Recipe';
import styles from './index.style';
import Food from './Food/Food';
import Meal from './Meal/Meal';
import DayPlan from './DayPlan/DayPlan';
import indexHook from './index-hook';

const Nutrition: React.FC<any> = ({navigation}) => {
  const {
    isFocus,
    setIsfocus,
    searchText,
    index,
    setIndex,
    indexTab,
    setIndexTab,
    filterText,
    deleteItem,
    selectedData,
  } = indexHook(navigation);

  const chiprGroupItems = [
    {
      title: 'Recipe',
      icon: <Icons.Recipe fill={primaryBlack} />,
      selectedIcon: <Icons.Recipe fill={primaryBlue} />,
    },
    {
      title: 'Food',
      icon: <Icons.Food fill={primaryBlack} />,
      selectedIcon: <Icons.Food fill={primaryBlue} />,
    },
    {
      title: 'Meal',
      icon: <Icons.Meal fill={primaryBlack} />,
      selectedIcon: <Icons.Meal fill={primaryBlue} />,
    },
    {
      title: 'Day Plan',
      icon: <Icons.DayPlan fill={primaryBlack} />,
      selectedIcon: <Icons.DayPlan fill={primaryBlue} />,
    },
  ];
  const badges = [
    {
      title: 'Recent',
    },
    {
      title: 'Library',
    },
    {
      title: 'Bookmarks',
    },
  ];

  const renderComponent = () => {
    switch (index) {
      case 0:
        return <Recipe navigation={navigation} />;
      case 1:
        return <Food navigation={navigation} />;
      case 2:
        return <Meal navigation={navigation} />;
      case 3:
        return <DayPlan navigation={navigation} />;
      default:
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Nutritions'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FilterNutrition', {index: index});
            }}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={() => {
          navigation.goBack();
        }}
      />
      <TabNavigationHeader
        data={chiprGroupItems}
        index={index}
        setIndex={setIndex}
      />
      {selectedData.length > 0 ? (
        <View style={styles.dataItem}>
          <MultiSelectSelectedChips list={selectedData} onDelete={deleteItem} />
        </View>
      ) : (
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
      )}
      {renderComponent()}
    </View>
  );
};
export default Nutrition;
