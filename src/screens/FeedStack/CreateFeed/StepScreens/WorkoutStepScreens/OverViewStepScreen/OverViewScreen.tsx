import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import SelectMuscles from '../../../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import {BodyParts} from '../../../../../../datas/bodyParts';
import Toaster from '../../../../../../components/toester/Toester';
import Icons from '../../../../../../assets/icons/svg';
import MultiSelectModalWithImageCards from '../../../components/MultiSelectModalWithImageCards/MultiSelectModalWithImageCards';
import RecipesChipsGroup from '../../../../Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import MediaComponent from '../../../../Feed/AboutFeed/components/MediaComponent/MediaComponent';
import SelectButton from '../../../../Feed/AboutFeed/components/SelectButton/SelectButton';
import ExerciseItemCard from '../../../../Feed/AboutFeed/components/ExerciseItemCard/ExerciseItemCard';
import {ISelectedFeedRecipeChipsData} from '../../../../../../types/types';
import {PrimeryButton} from '../../../../../../components/buttons';
import {calcHeight} from '../../../../../../assets/dimensions';
import {WorkoutLevel} from '../../../../../../types/enums';
import hook from './OverViewScreen.hook';
import styles from './OverViewScreen.style';
import ProgressBar from '../../../../../../components/progressBar/ProgressBar';

const OverViewScreen: React.FC = () => {
  const {
    state,
    t,
    data,
    bodyPartsButtonPressHandle,
    equipentsButtonPressHandle,
    bodyPartsModalVisibility,
    equipmentsModalVisibility,
    getDifference,
    bodyPartsModalCloseHandle,
    equipentsModalCloseHandle,
  } = hook();
  const chipsData: ISelectedFeedRecipeChipsData = {
    elements: [
      {title: data.hashtagsData?.feedCategory},
      {
        title: t(`${state.level}`) ?? '',
        icon:
          state.level === WorkoutLevel.Beginner ? (
            <Icons.BegginerLevel fill={primaryBlue} />
          ) : state.level === WorkoutLevel.Intermediate ? (
            <Icons.IntermediadLevel fill={primaryBlue} />
          ) : state.level === WorkoutLevel.Advanced ? (
            <Icons.AdvancedLevel fill={primaryBlue} />
          ) : null,
      },
      state.calorie
        ? {
            title: state.calorie?.toString(),
            icon: <Icons.Fier {...styles.fierIconStyle} />,
          }
        : undefined,
    ],
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <MediaComponent {...data.mediaData} type={data.type} />
        {data.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
        )}
        <PrimeryButton
          style={styles.buttonContainer}
          textStyle={styles.startButtonText}
          type="default"
          onPress={() => {}}
          title={t('startWorkout') ?? ''}
        />
        <RecipesChipsGroup
          data={chipsData}
          onChipPress={() => {}}
          containerStyle={styles.chipsContainer}
          itemContainerStyle={styles.chipItem}
        />
        <RichEditor
          initialContentHTML={data.description}
          androidHardwareAccelerationDisabled={true}
          disabled
          containerStyle={styles.descriptionContainer}
        />
        <View style={styles.selectButtonsContainer}>
          <SelectButton
            onPress={() =>
              !!state.selectedEquipments?.length && equipentsButtonPressHandle()
            }
            title={t('equipment') ?? ''}
            subTitle={data.selectedEquipmentsName}
          />
          {data.selectedBodyPartsName?.length !== 0 && (
            <SelectButton
              onPress={bodyPartsButtonPressHandle}
              containerStyle={styles.selectButton}
              title={t('bodyParts') ?? ''}
              subTitle={data.selectedBodyPartsName}
            />
          )}
          {state.workoutType === 'manyVideos' && state?.selectedExercises && (
            <View style={styles.exercisesListContainer}>
              <Text style={styles.exercisesTitle}>{t('exercises')}</Text>
              {state?.selectedExercises?.map(item => (
                <ExerciseItemCard
                  hideCloseIcon={true}
                  url={item.url}
                  time={item.time}
                  name={item.name}
                  restTime={`${item.rest_time ?? '0'} ${t('sec')}`}
                  containerStyle={styles.exerciseItemContainer}
                />
              ))}
            </View>
          )}
          <Toaster
            height={calcHeight(700)}
            isVisible={bodyPartsModalVisibility}
            onClose={bodyPartsModalCloseHandle}
            Screen={
              <SelectMuscles
                disabled
                showTitle={true}
                showSelectedMuscles={true}
                selectedMuscles={state.selectedBodyParts ?? []}
                dataList={getDifference(BodyParts, state.selectedBodyParts)}
                data={state.selectedBodyParts ?? []}
              />
            }
          />
          <MultiSelectModalWithImageCards
            dataList={state.selectedEquipments}
            isVisible={equipmentsModalVisibility}
            onClose={equipentsModalCloseHandle}
            searchInputExist={false}
            cardSize="large"
            rowElementsCount={2}
            selectedList={[]}
            cardsIconExist={false}
            titleExist={true}
            title={t('equipment') ?? ''}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default OverViewScreen;
