import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import PlusButton from '../../../../components/plusButton/plusButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../components/recentInfoCard/RecentInfoCard';
import {mealListSelector} from '../../../../store/selectors/meal-selector';
import styles from './Meal.style';

const Meal: React.FC<any> = ({navigation}) => {
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const mealList = useSelector(mealListSelector);
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
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
  return (
    <>
      <ScrollView style={styles.container}>
        {mealList.map((elem, index) => {
          return (
            <View key={index}>
              <RecentInfoCard
                onPress={() => {
                  navigation.navigate('MealDetail');
                }}
                info={{
                  title: elem.title,
                  imageUrl: elem.imageUrl,
                  amount: elem.amount,
                  saleType: elem.saleType,
                  type: elem.type,
                }}
                onLongPress={() => {
                  setIsOpenedEditSheet(true);
                }}
                isDisabled={true}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateMeal');
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
export default Meal;
