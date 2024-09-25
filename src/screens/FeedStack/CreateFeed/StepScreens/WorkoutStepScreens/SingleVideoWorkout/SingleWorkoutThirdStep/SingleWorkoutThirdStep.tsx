import * as React from 'react';
import { ScrollView, View } from 'react-native';
import SelectMuscles from '../../../../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import Toaster from '../../../../../../../components/toester/Toester';
import { BodyParts } from '../../../../../../../datas/bodyParts';
import { IExercise } from '../../../../../../../types/types';
import Icons from '../../../../../../../assets/icons/svg';
import { calcHeight } from '../../../../../../../assets/dimensions';
import MultiSelectModalWithImageCards from '../../../../components/MultiSelectModalWithImageCards/MultiSelectModalWithImageCards';
import SelectInputComponent from '../../../../components/SelectInputComponent/SelectInputComponent';
import SelectedCardsView from '../../../../components/SelectedCardsView/SelectedCardsView';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import hook from './SingleWorkoutThirdStep.hook';
import styles from './SingleWorkoutThirdStep.style';

const SingleWorkoutThirdStep: React.FC = () => {
  const {
    t,
    state,
    bodyPartButtonPressHandle,
    equipmentButtonPressHandle,
    equipmentModalVisibility,
    equipmentsModalCloseHandle,
    equipmentsSearchValueChange,
    equipmentSelectHandle,
    equipmentDeletHandle,
    getDifference,
    handleChooseBodyParts,
    bodyPartModalVisibility,
    bodyPartsList,
    bodyPartModalCloseHandle,
    equipmentModalData,
    selectAllBodyParts
  } = hook();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <SelectInputComponent
          buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
          onButtonPress={bodyPartButtonPressHandle}
          disabled
          placeholder={t('selectBodyParts') ?? ''}
          value={''}
          conatienStyle={styles.selectInputContainer}
        />
        <View style={styles.musclesContainer}>
          <SelectMuscles
            showSelectedMuscles={true}
            isRightIcon={true}
            selectedMuscles={state.selectedBodyParts ?? []}
            dataList={getDifference(BodyParts, state.selectedBodyParts)}
            onSelect={(data: IExercise) => handleChooseBodyParts(data)}
            data={state.selectedBodyParts ?? []}
          />
        </View>
        <SectionTitle
          containerStyle={styles.equipmentSectionTitles}
          title={t('equipment')}
        />
        <SelectInputComponent
          buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
          onButtonPress={equipmentButtonPressHandle}
          disabled
          placeholder={t('chooseEquipments') ?? ''}
          value={''}
          conatienStyle={styles.selectInputContainer}
        />
        {state.selectedEquipments && state.selectedEquipments.length > 0 && (
          <SelectedCardsView
            rowElementsCount={3}
            onCloseIconPress={equipmentDeletHandle}
            dataList={state.selectedEquipments}
          />
        )}
      </ScrollView>
      <MultiSelectModalWithImageCards
        dataList={equipmentModalData}
        onSearchInputValueChange={equipmentsSearchValueChange}
        isVisible={equipmentModalVisibility}
        onClose={equipmentsModalCloseHandle}
        onSelect={equipmentSelectHandle}
        cardSize="small"
        rowElementsCount={3}
        searchInputPlaceholder={t('equipment') ?? ''}
        selectedList={state?.selectedEquipments?.map(el => el.id)}
      />
      <Toaster
        height={calcHeight(700)}
        isVisible={bodyPartModalVisibility}
        onClose={bodyPartModalCloseHandle}
        Screen={
          <SelectMuscles
            showTitle={true}
            selectedMuscles={state.selectedBodyParts ?? []}
            dataList={getDifference(BodyParts, state.selectedBodyParts)}
            onSelect={(data: IExercise) => handleChooseBodyParts(data)}
            selectAll={selectAllBodyParts}
            data={bodyPartsList ?? []}
          />
        }
      />
    </View>
  );
};
export default SingleWorkoutThirdStep;
