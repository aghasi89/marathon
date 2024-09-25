import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { primaryBlack } from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import EditSheet from '../../../../components/editSheet/EditSheet';
import FoodCard from '../../../../components/foodCard/FoodCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import { foodListSelector } from '../../../../store/selectors/food-selector';
import styles from './Food.style';
import { getFoods, selectedFoodItem } from '../../../../store/actions/food-action';
import { IFood } from '../../../../types/types';

const Food: React.FC<any> = ({ navigation }) => {
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const foodList = useSelector(foodListSelector);
  const dispatch = useDispatch()
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Diplicate',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
  ];
  useEffect(() => {
    dispatch(getFoods())
  }, [])
  if (!foodList) return <ActivityIndicator style={{ flex: 1 }} size={'large'} />
  return (
    <>
      <ScrollView style={styles.container}>
        {foodList.map((elem: IFood, index) => {
          return (
            <View key={index}>
              <FoodCard
                onPress={() => {
                  navigation.navigate('FoodDetail');
                  dispatch(selectedFoodItem(elem))
                }}
                title={elem.food_name}
                image={elem.image}
                weight={elem.amount.lable}
                kcal={elem.kcal}
                isDisabled={true}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateFood', { isNew: true });
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </>
  );
};
export default Food;
