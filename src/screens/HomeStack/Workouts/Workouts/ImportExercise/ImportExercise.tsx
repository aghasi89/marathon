import React, {useCallback, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg/index';
import {calcHeight} from '../../../../../assets/dimensions';
import BottomBar from '../../../../../components/bottomBar/BottomBar';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import TabBadges from '../../../../../components/TabBadges/TabBadges';
import {IExecise} from '../../../../../store/reducers/execises-reducer';
import VideoInfoCard from '../../../../../components/videoInfoCard/VideoInfoCard';
import styles from './ImportExercise.style';
import ImportExerciseList from './ImportExerciseList';
import ImportExerciseHook from './ImortExercise-hook';

const ImportExercise: React.FC<any> = ({navigation}) => {
  const {
    badges,
    addExercise,
    state,
    checkIsSubmitedExercise,
    exerciseSelectedFilterList,
    deleteItem,
    exerciseList,
    isFocus,
    setIsfocus,
    searchText,
    filterText,
    indexTab,
    setIndexTab,
  } = ImportExerciseHook(navigation);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(0);

  // variables
  const snapPoints = useMemo(() => ['10%', '40%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const leftIconPress = () => navigation.goBack();

  return (
    <View style={{flex: 1, backgroundColor: primaryWhite}}>
      <View style={styles.container}>
        <MainHeader
          title={'Import Exercise'}
          search={true}
          open={isFocus}
          onFocus={() => setIsfocus(true)}
          onBlur={() => setIsfocus(false)}
          onChangeText={filterText}
          inputValue={searchText}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FilterWorkout', {index: 1});
              }}>
              <Icons.Filter fill={primaryBlack} />
            </TouchableOpacity>
          }
          leftIcon={true}
          leftIconPress={leftIconPress}
        />
        {exerciseSelectedFilterList.length > 0 ? (
          <View style={{marginVertical: calcHeight(15)}}>
            <MultiSelectSelectedChips
              list={exerciseSelectedFilterList}
              onDelete={deleteItem}
            />
          </View>
        ) : (
          <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
        )}
        <ImportExerciseList
          exerciseList={exerciseList}
          onPress={index => {
            navigation.navigate('ImportExerciseDetail', {
              index: index,
            });
          }}
          addExercise={(exercise: IExecise) => addExercise(exercise)}
          checkIsSubmited={(id: number) => checkIsSubmitedExercise(id)}
        />
      </View>
      {sheetIndex ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.listContainer}>
            <BottomBar
              count={state.isSubmitedExercises.length}
              onImport={() => {}}
              onPressMenu={() => {
                handleSheetChanges(0);
              }}
              buttonType={'close'}
              isAddToDay
            />
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              {state.isSubmitedExercises.map(
                (element: IExecise, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      style={styles.submited}>
                      <VideoInfoCard
                        image={element.imageUrl}
                        title={element.title}
                        time={element.count}
                        deleteVisable={true}
                        onPressDelete={() => {
                          checkIsSubmitedExercise(element.id);
                          addExercise(element);
                        }}
                      />
                    </TouchableOpacity>
                  );
                },
              )}
            </BottomSheetScrollView>
          </View>
        </BottomSheet>
      ) : (
        <BottomBar
          count={state.isSubmitedExercises.length}
          onImport={() => {
            navigation.navigate('CreateWorkout', {
              exercises: state.isSubmitedExercises,
            });
          }}
          onPressMenu={() => {
            handleSheetChanges(1);
          }}
          buttonType={'menu'}
        />
      )}
    </View>
  );
};
export default ImportExercise;
