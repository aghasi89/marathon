import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../components/bottomBar/BottomBar';
import ActivitiesCard from '../../../../components/activitiesCard/ActivitiesCard';
import {IActivity} from '../../../../store/reducers/activity-reducer';
import ProgramDates from '../PrgramDates/ProgramDates';
import ImportsHook from './ImportWorkouts-hook';
import styles from './ImportWorkouts.style';

type Props = {navigation: any};
const ImportActivities: React.FC<Props> = ({navigation}) => {
  const {
    state,
    selectedData,
    deleteItem,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    dayIndex,
    activityList,
    checkIsSubmitedActivity,
    addActivity,
    leftIconPress,
    navigateFilterWorkout,
    onImportActivity,
  } = ImportsHook(navigation);
  const [index, setIndex] = useState<number>(0);
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['15%', '50%'], []);
  const snapPointsIndex = useMemo(() => ['15%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const renderBottomBarComponent = () => {
    switch (index) {
      case 0:
        return <ProgramDates />;
      case 1:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedActivities.map((element, index) => {
              return (
                <View key={index}>
                  <ActivitiesCard
                    imageUri={element.imageUrl}
                    title={element.title}
                    isClose
                    onClose={() => {
                      checkIsSubmitedActivity(element.id);
                      addActivity(element);
                    }}
                  />
                </View>
              );
            })}
          </BottomSheetScrollView>
        );
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <MainHeader
        title={'Add Activities'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity onPress={navigateFilterWorkout}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      {selectedData.length > 0 && (
        <View style={styles.item}>
          <MultiSelectSelectedChips list={selectedData} onDelete={deleteItem} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activityList.map((activity: IActivity, index: number) => {
          return (
            <View key={index}>
              <ActivitiesCard
                imageUri={activity.imageUrl}
                title={activity.title}
                selected={checkIsSubmitedActivity(activity.id)}
                onSelect={() => {
                  checkIsSubmitedActivity(activity.id);
                  addActivity(activity);
                }}
                onPress={() =>
                  navigation.navigate('ImportActivityDetail', {
                    index: index,
                    dayIndex: dayIndex,
                  })
                }
              />
            </View>
          );
        })}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        snapPoints={index ? snapPoints : snapPointsIndex}
        onChange={handleSheetChanges}>
        <BottomBar
          count={state.submitedActivities.length}
          onImport={onImportActivity}
          onPressCalendar={() => {
            handleSheetChanges(1);
            setIndex(0);
          }}
          onPressMenu={() => {
            handleSheetChanges(sheetIndex && index ? 0 : 1);
            setIndex(1);
          }}
          buttonType={sheetIndex && index ? 'close' : 'menu'}
          isAddToDay
          dayIndex={dayIndex + 1}
        />
        {renderBottomBarComponent()}
      </BottomSheet>
    </View>
  );
};
export default ImportActivities;
