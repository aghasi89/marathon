import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import Icons from '../../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import HeaderWithImage from '../../../../../../components/headerWithImage/HeaderWithImage';
import ChipsGroup from '../../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import BottomBar from '../../../../../../components/bottomBar/BottomBar';
import {workoutDetailSelector} from '../../../../../../store/selectors/workout-selector';
import {exerciseListSelector} from '../../../../../../store/selectors/execise-selector';
import ImportExerciseHook from './../ImortExercise-hook';
import styles from './ImportExerciseDetail.style';

const ImportExerciseDetail: React.FC<any> = ({navigation}) => {
  const {state, checkIsSubmitedExercise, addExercise} =
    ImportExerciseHook(navigation);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const workoutDetail = useSelector(workoutDetailSelector);
  const [sheetIndex, setSheetIndex] = useState(1);
  // variables
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);

  const route = useRoute<any>();
  const index = route.params?.index ?? null;
  const exerciseList = useSelector(exerciseListSelector);
  const exercises = useSelector(exerciseListSelector);
  const leftIconPress = () => {
    navigation.goBack();
  };
  const onImport = () => {
    navigation.navigate('CreateWorkout', {
      exercises: state.isSubmitedExercises,
    });
  };
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateWorkout', {isNew: false});
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
    {
      title: 'Delete',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
  ];

  const list = [
    {title: exercises[index].count, id: 1, iconType: 'clock'},
    {title: exercises[index].type, id: 2},
    {title: exercises[index].saleType, id: 3},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{uri: workoutDetail.imageUrl}}
          leftIcon={<Icons.ArrowIcon fill={primaryWhite} />}
          rightIcon={<Icons.EllipsisIcon fill={primaryWhite} />}
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => setIsOpenedEditSheet(true)}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {sheetIndex ? (
          <MainHeader
            leftIconPress={leftIconPress}
            leftIcon={true}
            title={exerciseList[index].title}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <>
                <View style={styles.headerStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      checkIsSubmitedExercise(index);
                      addExercise(exercises[index]);
                    }}
                    style={styles.touch}>
                    <View
                      style={[
                        styles.selectedButton,
                        checkIsSubmitedExercise(index)
                          ? styles.selectedStyle
                          : styles.disSelectedTouch,
                      ]}>
                      {checkIsSubmitedExercise(index) && (
                        <Icons.Ceck
                          fill={primaryWhite}
                          heigth={calcHeight(9)}
                          width={calcWidth(11)}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Icons.EllipsisIcon
                    fill={primaryBlack}
                    style={styles.iconStyle}
                    onPress={() => setIsOpenedEditSheet(true)}
                  />
                </View>
              </>
            }
          />
        ) : (
          <View style={styles.headerContainer}>
            <View style={styles.titleText}>
              <Text style={styles.title}>{exerciseList[index].title}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  checkIsSubmitedExercise(index);
                  addExercise(exercises[index]);
                }}
                style={styles.touch}>
                <View
                  style={[
                    styles.selectedButton,
                    checkIsSubmitedExercise(index)
                      ? styles.selectedStyle
                      : styles.disSelectedTouch,
                  ]}>
                  {checkIsSubmitedExercise(index) && (
                    <Icons.Ceck
                      fill={primaryWhite}
                      heigth={calcHeight(9)}
                      width={calcWidth(11)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.chipsgroup}>
            <ChipsGroup elements={list} />
          </View>
          <ParagraphComponenet title="" text={workoutDetail.description} />

          <View style={styles.bottomStyle}>
            <View>
              <Text style={styles.bottomText}>Abs</Text>
              <Text style={styles.bottomText}>Quadricepts</Text>
              <Text style={styles.bottomText}>Chest</Text>
            </View>
            <View
              style={{
                width: calcWidth(124),
                height: calcHeight(154),
                backgroundColor: '#589CFE',
              }}></View>
          </View>
        </BottomSheetScrollView>
        <BottomBar
          count={state.isSubmitedExercises.length}
          onImport={onImport}
          onPressMenu={() => {}}
          buttonType={'menu'}
        />
      </BottomSheet>

      <EditSheet
        isVisible={isOpenedEditSheet}
        height={calcHeight(400)}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </View>
  );
};
export default ImportExerciseDetail;
