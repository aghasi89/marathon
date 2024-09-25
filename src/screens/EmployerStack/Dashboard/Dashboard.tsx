import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProgressCircle} from 'react-native-svg-charts';
import {
  darkBlue,
  green,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {calcHeight} from '../../../assets/dimensions';
import Icons from '../../../assets/icons/svg';
import ProgressCard from '../../../components/progressCardEmployer/progressCard';
import PlusButton from '../../../components/plusButton/plusButton';
import ProgramDays from '../../../components/programDays/ProgramDays';
import EditSheet from '../../../components/editSheet/EditSheet';
import {EmployerNavigationParamList} from '..';
import styles from './Dashboard.styles';
import DashboardHook from './Dashboard-hook';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'Dashboard'>;

const Dashboard: React.FC<Props> = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    days, 
    dayIndex, 
    waterCups, 
    isOpen, 
    setIsOpen,
    nutritionPressHandler,
    activityPressHandler,
    measurementsPressHandler,
  } =
    DashboardHook(navigation);

  const editSheet = [
    {
      title: 'Breakfast',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Lunch',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Dinner',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Snacks',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Activity',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Measurements',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Water',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: 'Notes',
      onSelect: () => {
        setIsOpen(false);
      },
    },
    {
      title: '',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.PlusX fill={primaryBlack} />,
    },
  ];
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Icons.BgHeader />
          <View style={styles.headerContent}>
            <View style={styles.headerPart}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <View>
                <Text style={styles.headerCountTextLeft}>0</Text>
                <Text style={styles.headerTextLeft}>Consumed</Text>
              </View>
            </View>
            <View style={styles.progtess}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={50 / 100} //percent / 100
                progressColor={primaryWhite}
                backgroundColor={darkBlue}
                strokeWidth={9}>
                <View style={styles.progressText}>
                  <Text style={styles.percentText}>1800</Text>
                  <Text style={styles.headerTextLeft}>Cals left</Text>
                </View>
              </ProgressCircle>
            </View>
            <View style={styles.headerPart}>
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.icons}>
                  <Icons.Chart
                    fill={primaryWhite}
                    onPress={() => navigation.navigate('ChartsMenu')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons}>
                  <Icons.Calendar fill={primaryWhite} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headerCountTextRight}>0</Text>
                <Text style={styles.headerTextRight}>Burned</Text>
              </View>
            </View>
          </View>
          <ProgramDays days={days} dayIndex={dayIndex} />
          <View style={styles.processItem}>
            <ProgressCard
              title={'Marathon'}
              icon={<Icons.M />}
              isMarathonCard
              coachImageUrl="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
              coachName={'Maya Crouch'}
              marathonText={'30 Day Weight Loss Challenge'}
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              onPress={nutritionPressHandler}
              title={'Nutrition'}
              progress={0.3}
              icon={<Icons.Apple fill={green} />}
              kcal={0}
              sumKcal={0}
              isDoing={false}
              isSubmited={false}
              isNutrition
              list={[
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
              ]}
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              title={'Activity'}
              onPress={activityPressHandler}
              progress={0.3}
              icon={<Icons.Trainer fill={primaryBlue} />}
              kcal={0}
              sumKcal={0}
              isDoing={false}
              isSubmited={false}
              list={
                [
                  // 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                  // 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                  // 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                ]
              }
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              onPress={measurementsPressHandler}
              title={'Mesurement'}
              icon={<Icons.HeightLine />}
              isDoing={false}
              isSubmited={false}
              mesure={'70.0'}
              text={'Last log 15 June'}
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              onPress={() => navigation.navigate('Notes')}
              title={'Notes'}
              icon={<Icons.NotesEdit />}
              isDoing={false}
              isSubmited={false}
              noteText={
                'Lorem Ipsum is Ipsum is simply dumm simply dummy text of the printing and typesetting in...'
              }
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              title={'Water'}
              icon={<Icons.Droped />}
              isDoing={false}
              isSubmited={false}
              cups={waterCups}
            />
          </View>
          <View style={styles.processItem}>
            <ProgressCard
              onPress={() => navigation.navigate('Files')}
              title={'Files'}
              icon={<Icons.File />}
              isDoing={false}
              isSubmited={false}
              files={[
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
                'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
              ]}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            setIsOpen(true);
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(800)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
        isEmployer
      />
    </>
  );
};
export default Dashboard;
