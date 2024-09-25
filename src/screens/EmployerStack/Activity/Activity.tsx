import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import ProgramDays from '../../../components/programDays/ProgramDays';
import {EmployerNavigationParamList} from '..';
import AvaibleActivity from './AvaibleActivity';
import hook from './Activity-hook';
import styles from './Activity.style';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'Activity'>;

const Activity: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {leftIconPress, days, dayIndex,onChartIconPress} = hook(navigation);
  const activitys=[
    {
    imageUrl: 'https://www.citypng.com/public/uploads/preview/hd-blue-stickman-silhouette-running-png-31628249673rmvxerown5.png',
    title: 'Running',
    kcal: 250,
    rightIcon: <Icons.User  fill={primaryBlue}/>,
    percent: 20,
    restTime: 15,
    time: 20
  },
    {
    imageUrl: 'https://www.citypng.com/public/uploads/preview/hd-blue-stickman-silhouette-running-png-31628249673rmvxerown5.png',
    title: 'Running',
    kcal: 250,
    rightIcon: <Icons.User  fill={primaryBlue}/>,
    percent: 60,
    restTime: 15,
    time: 20
  },
    {
    imageUrl: 'https://www.citypng.com/public/uploads/preview/hd-blue-stickman-silhouette-running-png-31628249673rmvxerown5.png',
    title: 'Running',
    kcal: 250,
    rightIcon: <Icons.User  fill={primaryBlue}/>,
    percent: 15,
    restTime: 15,
    time: 20
  },
]
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Activity'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <View style={styles.leftCompomemtContainer}>
            <Icons.ChartBlack style={styles.iconStyle} onPress={onChartIconPress} />
            <Icons.EllipsisIcon
              fill={primaryBlack}
              style={styles.iconStyle}
              onPress={() => {}}
            />
          </View>
        }
      />
      <View>
        <ProgramDays days={days} dayIndex={dayIndex} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalTitleText}>Total</Text>
          <View style={styles.totalTimeAndKcalContainer}>
            <Text style={styles.totalText}> 45/45 min</Text>
            <Text style={styles.totalText}>750/750 kcal</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <AvaibleActivity title='Activity' days={activitys} onPress={()=>{}}/>
            <AvaibleActivity title='Workout' onPress={()=>{}}/>
          </ScrollView>
      </View>
    </View>
  );
};
export default Activity;
