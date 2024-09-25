import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import HeaderWithImage from '../../../../components/headerWithImage/HeaderWithImage';
import EditSheet from '../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import BottomBar from '../../../../components/bottomBar/BottomBar';
import SliderLine from '../../../../components/sliderLine/SliderLine';
import ImportWorkoutsHook from './ImportWorkouts-hook';
import styles from './ImportWorkouts.style';

type Props = {navigation: any};
const ImportActivityDetail: React.FC<Props> = ({navigation}) => {
  const {
    state,
    dayIndex,
    activityList,
    value,
    setValue,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    leftIconPress,
    activityIndex,
    checkIsSubmitedActivity,
    addActivity,
    onImportActivity,
  } = ImportWorkoutsHook(navigation);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState<number>(1);
  const snapPoints: string[] = useMemo(() => ['60%', '100%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{uri: activityList[activityIndex].imageUrl}}
          leftIcon={<Icons.ArrowIcon fill={primaryWhite} />}
          rightIcon={<Icons.EllipsisIcon fill={primaryWhite} />}
          leftIconPress={leftIconPress}
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
            title={activityList[activityIndex].title}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <>
                <View style={styles.headerStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      checkIsSubmitedActivity(activityList[activityIndex].id);
                      addActivity(activityList[activityIndex]);
                    }}
                    style={styles.touch}>
                    <View
                      style={[
                        styles.selectedButton,
                        checkIsSubmitedActivity(activityIndex)
                          ? styles.selectedStyle
                          : styles.disSelectedTouch,
                      ]}>
                      {checkIsSubmitedActivity(activityIndex) && (
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
              <Text style={styles.title}>
                {activityList[activityIndex].title}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  checkIsSubmitedActivity(activityList[activityIndex].id);
                  addActivity(activityList[activityIndex]);
                }}
                style={styles.touch}>
                <View
                  style={[
                    styles.selectedButton,
                    checkIsSubmitedActivity(activityIndex)
                      ? styles.selectedStyle
                      : styles.disSelectedTouch,
                  ]}>
                  {checkIsSubmitedActivity(activityIndex) && (
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
          <View style={styles.timeContainer}>
            <Text style={styles.text}>Time</Text>
            <Text style={styles.text}>02:15</Text>
          </View>
          <View style={styles.sliderContainer}>
            <SliderLine
              value={value}
              setValue={(val: number) => {
                setValue(val);
              }}
              maximumValue={100}
              minimumValue={0}
              step={1}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.text}>Distance (km)</Text>
            <Text style={styles.text}>0</Text>
          </View>
          <View style={styles.sliderContainer}>
            <SliderLine
              value={value}
              setValue={(val: number) => {
                setValue(val);
              }}
              maximumValue={100}
              minimumValue={0}
              step={1}
            />
          </View>
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
          count={state.submitedActivities.length}
          onImport={onImportActivity}
          onPressMenu={() => {}}
          buttonType={'menu'}
          isAddToDay
          dayIndex={dayIndex + 1}
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
export default ImportActivityDetail;
