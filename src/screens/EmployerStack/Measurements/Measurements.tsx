import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../components/programDays/ProgramDays';
import ProgressSegmentedCard from '../../../components/progressSegmentedCard/progressSegmentedCard';
import WeightCard from '../../../components/weightCard/WeightCard';
import BodyMeasurements from '../../../components/bodyMeasurements/BodyMeasurements';
import PlusButton from '../../../components/plusButton/plusButton';
import {EmployerNavigationParamList} from '..';
import MeasurementsHook from './Measurements-hook';
import styles from './Measurements.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'Measurements'
>;

const Measurements: React.FC<Props> = ({navigation}) => {
  const {
    leftIconPress,
    days,
    dayIndex,
    index,
    setIndex,
    bodyParts,
    leftPart,
    rightPart,
    isExist,
  } = MeasurementsHook(navigation);

  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.progressCardStyle}>
              <WeightCard weight={'70'} date={'14 March'} />
            </View>
            <View style={styles.progressCardStyle}>
              <ProgressSegmentedCard
                title={'Goal'}
                progress={0.7}
                weight={'68.0 kg'}
                weightOne={'72.0 kg'}
                weightTwo={'-2.0 kg'}
                weightThree={'From March 18 2021'}
              />
            </View>
            <View style={styles.progressCardStyle}>
              <ProgressSegmentedCard
                title={'BMI'}
                progress={0.7}
                weight={'25.3'}
                overWeight={'OverWeight'}
                isSegmented
              />
            </View>
            <View style={styles.progressCardStyle}>
              <ProgressSegmentedCard
                title={'Body Fat'}
                progress={0.6}
                weight={'25 %'}
                overWeight={'Obesity'}
                isSegmented
              />
            </View>
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.contentContainerBody}>
              <View>
                {leftPart.map((item, index) => {
                  return (
                    <View key={index} style={styles.measureItem}>
                      <BodyMeasurements
                        name={item.name}
                        measure={item.measure}
                        isExist={isExist}
                      />
                    </View>
                  );
                })}
              </View>
              <Icons.BodyShape />
              <View>
                {rightPart.map((item, index) => {
                  return (
                    <View key={index} style={styles.measureItem}>
                      <BodyMeasurements
                        name={item.name}
                        measure={item.measure}
                        isRight
                        isExist={isExist}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            {!isExist && (
              <View style={styles.bottomPart}>
                <Text style={styles.labelStyle}>Last Measurements</Text>
                {bodyParts.map((item, index) => {
                  return (
                    <View key={index} style={styles.bottomPartItem}>
                      <Text style={styles.labelStyle}>{item.name}</Text>
                      <Text style={styles.labelStyle}>input {item.date}</Text>
                      <Text style={styles.labelStyle}>{item.measure}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        );
      default:
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Measurements'}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <View style={styles.leftComponentContainer}>
            <Icons.ChartBlack
              style={styles.iconStyle}
              onPress={() => {
                navigation.navigate('MeasurementsChart');
              }}
            />
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
        <View style={styles.headerContainer}>
          {['Weight', 'Body'].map((element: string, indrxTab: number) => {
            return (
              <TouchableOpacity
                key={indrxTab}
                onPress={() => {
                  setIndex(indrxTab);
                }}
                style={index === indrxTab ? styles.activeTouch : styles.touch}>
                <Text
                  style={
                    index === indrxTab
                      ? styles.activeLabelStyle
                      : styles.labelStyle
                  }>
                  {element}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {renderComponent()}
      </View>
      <View style={styles.plusButton}>
        <PlusButton onPress={() => {}} />
      </View>
    </View>
  );
};

export default Measurements;
