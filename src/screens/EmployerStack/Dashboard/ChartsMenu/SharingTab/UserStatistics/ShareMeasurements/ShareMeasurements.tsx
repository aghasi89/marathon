import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../../assets/icons/svg/index';
import MeasurementItem from '../../../../../../../components/measurementItem/MeasurementItem';
import ChartMeasure from '../../../../../../../components/chartMeasure/ChartMeasure';
import MeasureByDay from '../../../../../../../components/measureByDay/MeasureByDay';
import styles from './ShareMeasurements.style';
import ShareMeasurementsHook from './ShareMeasurements-hook';

const ShareMeasurements: React.FC = () => {
  const {indexTab, setIndexTab, data, dates, dailyMeasure} =
    ShareMeasurementsHook();

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
      default:
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.goalConatiner}>
        <Text style={styles.title}>Goal 68 kg</Text>
        <TouchableOpacity>
          <Icons.Calendar fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      <View>
        <ChartMeasure data={data} dates={dates} />
      </View>
      <View style={styles.tabContainer}>
        <MeasurementItem
          data={categories}
          index={indexTab}
          setIndex={index => setIndexTab(index)}
        />
      </View>
      {renderComponent()}
    </View>
  );
};

export default ShareMeasurements;
