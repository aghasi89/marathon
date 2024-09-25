import * as React from 'react';
import {Text, View} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import SelectMuscles from '../../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import {primaryBlue} from '../../../../../assets/styles/colors.styles';
import Toaster from '../../../../../components/toester/Toester';
import Icons from '../../../../../assets/icons/svg';
import {ISelectedFeedRecipeChipsData} from '../../../../../types/types';
import {calcHeight} from '../../../../../assets/dimensions';
import {WorkoutLevel} from '../../../../../types/enums';
import MediaComponent from '../../../../FeedStack/Feed/AboutFeed/components/MediaComponent/MediaComponent';
import RecipesChipsGroup from '../../../../FeedStack/Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import SelectButton from '../../../../FeedStack/Feed/AboutFeed/components/SelectButton/SelectButton';
import MultiSelectModalWithImageCards from '../../../../FeedStack/CreateFeed/components/MultiSelectModalWithImageCards/MultiSelectModalWithImageCards';
import hook from './OverViewScreen.hook';
import styles from './OverViewScreen.style';
import {BodyParts} from '../../../../../datas/bodyParts';
import ProgressBar from '../../../../../components/progressBar/ProgressBar';

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
      {
        title: t(`${state.duration}`) ?? '',
        icon: <Icons.Clock fill={primaryBlue} />,
      },
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
    ],
  };

  return (
    <View style={styles.container}>
      <MediaComponent
         {...data.mediaData}
          type={data.type}
          iconsShow={false}
        />
      {data.title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
        </View>
      )}
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
          onPress={equipentsButtonPressHandle}
          title={t('equipment') ?? ''}
          subTitle={data.selectedEquipmentsName}
        />
        <SelectButton
          onPress={bodyPartsButtonPressHandle}
          containerStyle={styles.selectButton}
          title={t('bodyParts') ?? ''}
          subTitle={data.selectedBodyPartsName}
        />
        <Toaster
          height={calcHeight(700)}
          isVisible={bodyPartsModalVisibility}
          onClose={bodyPartsModalCloseHandle}
          Screen={
            <SelectMuscles
              disabled
              showTitle={true}
              showSelectedMuscles={true}
              selectedMuscles={state.body_parts ?? []}
              dataList={getDifference(BodyParts, state.body_parts)}
              data={state.body_parts ?? []}
            />
          }
        />
        <MultiSelectModalWithImageCards
          dataList={state.equipments}
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
    </View>
  );
};
export default OverViewScreen;
