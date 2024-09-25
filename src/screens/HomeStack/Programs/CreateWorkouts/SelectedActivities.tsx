import React from 'react';
import {View} from 'react-native';
import {formFieldGrey} from '../../../../assets/styles/colors.styles';
import MealPlan from '../../../../components/mealPlan/MealPlan';
import MealCard from '../../../../components/mealCard/MealCard';
import {IActivity} from '../../../../store/reducers/activity-reducer';
import styles from './CreateWorkouts.style';

type Props = {
  navigate: () => void;
  activities: Array<IActivity>;
  deleteActivity: (value) => void;
  selectedText: string;
  valueNumber: string;
  setSelectedText: (value: string) => void;
  setValueNumber: (value: string) => void;
  caloreis: number;
  time: string;
  title: string;
};
const SelectedActivities: React.FC<Props> = ({
  navigate,
  activities,
  deleteActivity,
  selectedText,
  valueNumber,
  setSelectedText,
  setValueNumber,
  caloreis,
  title,
  time,
}) => {
  const list = [
    {
      value: '1',
      lable: 'Time (min)',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
    {
      value: '2',
      lable: 'Distance (km)',
      image: {
        uri: 'https://c8.alamy.com/zooms/9/4d76e5d5579640bcb9300af816a2c771/2acmw09.jpg',
      },
    },
  ];

  return (
    <View style={styles.container}>
      <MealPlan
        title={title}
        caloreis={caloreis}
        time={time}
        onPress={navigate}
      />
      {activities.length !== 0 && (
        <View style={styles.mealContainer}>
          {activities.map((activity, index) => {
            return (
              <View key={index} style={styles.mealItem}>
                <MealCard
                  imageUrl={activity.imageUrl}
                  title={activity.title}
                  selectedTypesList={list}
                  selectedTypeText={selectedText}
                  setSelectedTypeText={value => {
                    setSelectedText(value);
                  }}
                  valueNumber={valueNumber}
                  onChangeNumberValue={(val: string) => {
                    setValueNumber(val);
                  }}
                  kcalSize={250}
                  kcalSizeStyle={{color: formFieldGrey}}
                  onClose={() => deleteActivity(index)}
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default SelectedActivities;
