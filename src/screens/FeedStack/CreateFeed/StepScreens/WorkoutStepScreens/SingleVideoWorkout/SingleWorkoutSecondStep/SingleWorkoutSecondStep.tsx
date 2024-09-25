import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Icons from '../../../../../../../assets/icons/svg';
import CustomSwitchWithInput from '../../../../components/CustomSwitchWithInput/CustomSwitchWithInput';
import LevelSelectComponent from '../../../../components/LevelSelectComponent/LevelSelectComponent';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import hook from './SingleWorkoutSecondStep.hook';
import styles from './SingleWorkoutSecondStep.style';

const SingleWorkoutSecondStep: React.FC = () => {
  const {
    t,
    caloriesValueChangeHandle,
    levelSelectHandle,
    state,
    permissionSwitchOptons,
    permissionValueChangeHandle,
  } = hook();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <SectionTitle
          containerStyle={styles.sectionTitles}
          title={t('calories')}
        />
        <View style={styles.caloriesContainer}>
          <Text style={styles.coloriesTitleText}>{t('caloriesBurned')}</Text>
          <InputComponent
            onChange={caloriesValueChangeHandle}
            value={`${!!state.calorie ? state.calorie : ''}`}
            icon={<Icons.Fier {...styles.iconStyle} />}
            placeholder={t('amountOfCalories') ?? ''}
            containerStyle={styles.coloriesInputContainer}
            inputStyle={styles.coloriesInput}
            multiline={true}
            inputType="number-pad"
          />
        </View>
        <SectionTitle
          containerStyle={styles.sectionTitles}
          title={t('level')}
        />
        <LevelSelectComponent
          onSelect={levelSelectHandle}
          selected={state.level}
        />
        <SectionTitle
          containerStyle={styles.sectionTitles}
          title={t('permission')}
        />
        <CustomSwitchWithInput
          initial={state.is_protected ? 1 : 0}
          containerStyle={styles.customSwitchContainer}
          switchOptions={permissionSwitchOptons}
          titleStyle={styles.coloriesTitleText}
          onSwitchPress={permissionValueChangeHandle}
          inputShow={false}
          title={t('workoutType') ?? ''}
        />
        <View style={styles.permissioInfoContainer}>
          <Icons.CloseEye {...styles.eyeIcons} />
          <Text style={styles.permissioText}>{t('privateWorkoutsAre')}</Text>
        </View>
        <View style={styles.permissioInfoContainer}>
          <Icons.Eye {...styles.eyeIcons} />
          <Text style={styles.permissioText}>{t('publicWorkoutsAre')}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default SingleWorkoutSecondStep;
