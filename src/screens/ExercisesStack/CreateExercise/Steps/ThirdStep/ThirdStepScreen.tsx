import React from 'react';
import { View } from 'react-native';
import SelectInputComponent from '../../../../FeedStack/CreateFeed/components/SelectInputComponent/SelectInputComponent';
import Icons from '../../../../../assets/icons/svg'
import { calcHeight } from '../../../../../assets/dimensions';
import { IExercise } from '../../../../../types/types';
import { BodyParts } from '../../../../../datas/bodyParts';
import SectionTitle from '../../../../FeedStack/CreateFeed/components/SectionTitle/SectionTitle';
import SelectedCardsView from '../../../../FeedStack/CreateFeed/components/SelectedCardsView/SelectedCardsView';
import MultiSelectModalWithImageCards from '../../../../FeedStack/CreateFeed/components/MultiSelectModalWithImageCards/MultiSelectModalWithImageCards';
import SelectMuscles from './components/selectMuscles/SelectMuscles';
import hook from './ThirdStepScreen.hook';
import styles from './ThirdStepScreen.style';

const ThirdStepScreen: React.FC = () => {
  const {
    t,
    state,
    handleChooseBodyParts,
    openBodyPartsModal,
    getDifference,
    equipmentButtonPressHandle,
    equipmentDeletHandle,
    equipmentsSearchValueChange,
    equipmentModalVisibility,
    equipmentsModalCloseHandle,
    equipmentSelectHandle,
    equipmentModalData,
  } = hook();

  return (
    <View style={{ marginBottom: calcHeight(60), flex: 1 }}>
      <SelectInputComponent
        buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
        isInvalid={!!state.errorMessages?.body_parts?.length}
        onButtonPress={openBodyPartsModal}
        disabled
        placeholder={t('chooseMuscles') ?? ''}
        value={''}
        conatienStyle={[styles.selectInputContainer, styles.horizontal]}
      />
      <View style={styles.musclesContainer}>
        <SelectMuscles
          showSelectedMuscles={true}
          isRightIcon={true}
          selectedMuscles={state.body_parts ? state.body_parts : []}
          dataList={getDifference(BodyParts, state.body_parts)}
          onSelect={(data: IExercise) => handleChooseBodyParts(data)}
          data={state.body_parts ? state.body_parts : []} />
      </View>
      <SectionTitle
        containerStyle={styles.sectionTitles}
        title={t('equipment')}
      />
      <SelectInputComponent
        buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
        onButtonPress={equipmentButtonPressHandle}
        disabled
        placeholder={t('chooseEquipments') ?? ''}
        value={''}
        conatienStyle={[styles.selectInputContainer, styles.horizontal]}
      />
      {
        state?.equipments && state?.equipments?.length > 0 && <View style={styles.equipmentContainer}>
          <SelectedCardsView
            rowElementsCount={3}
            onCloseIconPress={equipmentDeletHandle}
            dataList={state?.equipments}
          />
        </View>
      }
      <MultiSelectModalWithImageCards
        dataList={equipmentModalData}
        onSearchInputValueChange={equipmentsSearchValueChange}
        isVisible={equipmentModalVisibility}
        onClose={equipmentsModalCloseHandle}
        onSelect={equipmentSelectHandle}
        cardSize="small"
        rowElementsCount={3}
        searchInputPlaceholder={t('equipment') ?? ''}
        selectedList={state.equipments ? state.equipments.map(el => el.id) : []}
      />
    </View>
  );
};
export default ThirdStepScreen;
