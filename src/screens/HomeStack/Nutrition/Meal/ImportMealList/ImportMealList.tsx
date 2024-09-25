import React from 'react';
import {ScrollView, View} from 'react-native';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import {IMeal} from '../../../../../store/reducers/meal-reducer';
import styles from './ImportMeal.style';

const ImportMealList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.mealList.map((meal: IMeal, index: number) => {
        return (
          <View key={index}>
            <RecentInfoCard
              info={{
                title: meal.title,
                imageUrl: meal.imageUrl,
                //count: meal.count,
                amount: meal.amount,
                //time: meal.time,
                saleType: meal.saleType,
                type: meal.type,
              }}
              isDisabled={false}
              isSubmited={props.checkIsSubmited(meal.id)}
              onPress={() => props.addMeal(meal)}
              onPressCheck={() => props.addMeal(meal)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default ImportMealList;
