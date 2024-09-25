import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MeasurementItem from '../../../../components/measurementItem/MeasurementItem';
import MeasureByDay from '../../../../components/measureByDay/MeasureByDay';
import ChartMeasure from '../../../../components/chartMeasure/ChartMeasure';
import {EmployerNavigationParamList} from '../..';
import MeasurementsChartHook from './MeasurementsChart-hook';
import styles from './MeasurementsChart.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'MeasurementsChart'
>;

const MeasurementsChart: React.FC<Props> = ({navigation}) => {
  const {
    leftIconPress,
    isMeasure,
    setIsMeasure,
    indexTab,
    setIndexTab,
    data,
    dates,
    dailyMeasure,
  } = MeasurementsChartHook(navigation);

  const categories = [
    {
      title: 'Weight',
      icon: <Icons.Weight fill={primaryBlack} />,
      selectedIcon: <Icons.Weight fill={primaryWhite} />,
    },
    {title: 'BMI', name: 'BMI'},
    {title: 'Body Fat', name: '%'},
    {
      title: 'Neck',
      icon: <Icons.Neck fill={primaryBlack} />,
      selectedIcon: <Icons.Neck fill={primaryWhite} />,
    },
    {
      title: 'Shoulder',
      icon: <Icons.Shoulder fill={primaryBlack} />,
      selectedIcon: <Icons.Shoulder fill={primaryWhite} />,
    },
    {
      title: 'Bust',
      icon: <Icons.Bust fill={primaryBlack} />,
      selectedIcon: <Icons.Bust fill={primaryWhite} />,
    },
    {
      title: 'Weist',
      icon: <Icons.Waist fill={primaryBlack} />,
      selectedIcon: <Icons.Waist fill={primaryWhite} />,
    },
    {
      title: 'Abdomen',
      icon: <Icons.Abdomen fill={primaryBlack} />,
      selectedIcon: <Icons.Abdomen fill={primaryWhite} />,
    },
    {
      title: 'Hip',
      icon: <Icons.Hip fill={primaryBlack} />,
      selectedIcon: <Icons.Hip fill={primaryWhite} />,
    },
    {
      title: 'Biceps L',
      icon: <Icons.BicepsL fill={primaryBlack} />,
      selectedIcon: <Icons.BicepsL fill={primaryWhite} />,
    },
    {
      title: 'Biceps R',
      icon: <Icons.BicepsR fill={primaryBlack} />,
      selectedIcon: <Icons.BicepsR fill={primaryWhite} />,
    },
    {
      title: 'Thigh L',
      icon: <Icons.ThighL fill={primaryBlack} />,
      selectedIcon: <Icons.ThighL fill={primaryWhite} />,
    },
    {
      title: 'Thigh R',
      icon: <Icons.ThighR fill={primaryBlack} />,
      selectedIcon: <Icons.ThighR fill={primaryWhite} />,
    },
    {
      title: 'Calf L',
      icon: <Icons.CalfL fill={primaryBlack} />,
      selectedIcon: <Icons.CalfL fill={primaryWhite} />,
    },
    {
      title: 'Calf R',
      icon: <Icons.CalfR fill={primaryBlack} />,
      selectedIcon: <Icons.CalfR fill={primaryWhite} />,
    },
  ];
  const renderComponent = () => {
    switch (indexTab) {
      case 0:
        return <MeasureByDay days={dailyMeasure} />;
      case 1:
        return <MeasureByDay days={dailyMeasure} />;
      case 2:
        return <MeasureByDay days={dailyMeasure} />;
      case 3:
        return <MeasureByDay days={dailyMeasure} />;
      case 4:
        return <MeasureByDay days={dailyMeasure} />;
      default:
    }
  };

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Measurements'}
        leftComponent={
          <Icons.EllipsisIcon fill={primaryBlack} onPress={() => {}} />
        }
        leftComponentStyle={styles.leftComponentStyle}
      />
      <View>
        {isMeasure ? (
          <View style={styles.goalConatiner}>
            <Text style={styles.title}>Goal 68 kg</Text>
            <TouchableOpacity>
              <Icons.Calendar fill={primaryBlack} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inVisibleGoal}></View>
        )}
        <ChartMeasure data={data} dates={dates} />
        <View style={styles.tabContainer}>
          <MeasurementItem
            data={categories}
            index={indexTab}
            setIndex={index => setIndexTab(index)}
          />
        </View>
      </View>
      {renderComponent()}
    </View>
  );
};

export default MeasurementsChart;
