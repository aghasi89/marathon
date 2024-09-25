import React from 'react';
import {ScrollView, View} from 'react-native';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import {IDayPlan} from '../../../../../store/reducers/dayPlan-reducer';
import styles from './ImportDayPlan.style';

const ImportDayPlanList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.dayPlanList.map((dayPlan: IDayPlan, index: number) => {
        return (
          <View key={index}>
            <RecentInfoCard
              info={{
                title: dayPlan.title,
                imageUrl: dayPlan.imageUrl,
                amount: dayPlan.amount,
                saleType: dayPlan.saleType,
                type: dayPlan.type,
              }}
              isDisabled={false}
              isSubmited={props.checkIsSubmited(dayPlan.id)}
              onPress={() => props.addDayPlan(dayPlan)}
              onPressCheck={() => props.addDayPlan(dayPlan)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default ImportDayPlanList;
