import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Icons from '../../../../../../assets/icons/svg';
import { PrimeryButton } from '../../../../../../components/buttons';
import CustomSwitchWithInput from '../../../components/CustomSwitchWithInput/CustomSwitchWithInput';
import MultiSelectModal from '../../../components/MultiSelectModal/MultiSelectModal';
import InputComponent from '../../../components/InputComponent/InputComponent';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import hook from './RecipeFourthStep.hook';
import styles from './RecipeFourthStep.style';

const RecipeFourthStep: React.FC = () => {
  const {
    t,
    state,
    proteinValueChange,
    carbsValueChange,
    fatValueChange,
    modalVisibility,
    modalCloseHandle,
    measurementSelectHandle,
    measurmentsList,
    measurementButtonPressHandle,
    selectedMeasurment,
    portionValueChangeHandle,
    servingSizeValueChangeHandle,
    measurementUnitSelectButtonPressHandle,
    measurementModalVisibility,
    measurementUnitModalCloseHandle,
    measurementUnitSelectHandle,
    measurementUnitsList,
    moreInfoButtonPressHandle,
    durationChangeHandle,
    permissionSwitchOptons,
    permissionValueChangeHandle
  } = hook();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <SectionTitle
          title={t('calories')}
          containerStyle={styles.sectionTitles}
        />
        <View style={styles.rowContainer}>
          <View style={styles.inputContainer}>
            <InputComponent
              inputStyle={styles.input}
              isInvalid={!!state.errorMessages?.protein?.length}
              label={`${t('protein')} (${t('gram')})`}
              onChange={proteinValueChange}
              value={`${state.protein ?? ''}`}
              inputType="number-pad"
            />
          </View>
          <View style={styles.emptyView} />
          <View style={styles.inputContainer}>
            <InputComponent
              inputStyle={styles.input}
              isInvalid={!!state.errorMessages?.carbohydrates?.length}
              label={`${t('carbs')} (${t('gram')})`}
              onChange={carbsValueChange}
              value={`${state.carbohydrates ?? ''}`}
              inputType="number-pad"
            />
          </View>
          <View style={styles.emptyView} />
          <View style={styles.inputContainer}>
            <InputComponent
              isInvalid={!!state.errorMessages?.fat?.length}
              inputStyle={styles.input}
              label={`${t('fat')} (${t('gram')})`}
              onChange={fatValueChange}
              value={`${state.fat ?? ''}`}
              inputType="number-pad"
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.totalKcal}>
            {`Total: ${state.total_kcal ?? '0'} Kcal`}
          </Text>
          <PrimeryButton
            type="default"
            style={styles.buttonStyle}
            title={t(`${state.kcal_measurement}`) ?? ''}
            Icon={<Icons.Portion {...styles.IconStyle} />}
            rightIcon={<Icons.ArrowDowm {...styles.arrowIcon} />}
            onPress={measurementButtonPressHandle}
            textStyle={styles.buttonTextSelected}
          />
        </View>
        {state?.is_more && (
          <View style={styles.rowContainer}>
            <View style={styles.inputContainer}>
              <InputComponent
                inputStyle={styles.input}
                label={`${t('portion')}`}
                onChange={portionValueChangeHandle}
                value={`${state.apportionment ?? ''}`}
                inputType="number-pad"
              />
            </View>
            <View style={styles.emptyView} />
            <View style={styles.inputContainer}>
              <InputComponent
                inputStyle={styles.input}
                label={`${t('servingSize')}`}
                onChange={servingSizeValueChangeHandle}
                value={`${state.serving_size ?? ''}`}
                inputType="number-pad"
              />
            </View>
            <View style={styles.emptyView} />
            <View style={styles.inputContainer}>
              <Pressable onPress={measurementUnitSelectButtonPressHandle}>
                <InputComponent
                  disabled
                  inputStyle={styles.input}
                  label={`${t('servingMethod')}`}
                  onChange={() => { }}
                  value={`${state.measurementSelectedUnit?.name ?? ''}`}
                  inputType="number-pad"
                  rightIcon={<Icons.ArrowDowm {...styles.arrowIcon} />}
                />
              </Pressable>
            </View>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <PrimeryButton
            style={styles.button}
            textStyle={styles.buttonText}
            type="default"
            onPress={moreInfoButtonPressHandle}
            title={`${!state.is_more ? t('addMoreInformation') : t('hideInformation')
              }`}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.totalKcal}>{`${t('cookingTime')}`}</Text>
          <InputComponent
            isInvalid={!!state.errorMessages?.duration?.length}
            onChange={durationChangeHandle}
            placeholder={t('durationInMinutes') ?? ''}
            icon={<Icons.Hourglass {...styles.hourglassIcon} />}
            inputStyle={styles.durationInput}
            containerStyle={styles.durationInputContainer}
            inputType="number-pad"
            value={`${state.duration ?? ''}`}
          />
        </View>
        <SectionTitle
          containerStyle={styles.permissionTitles}
          title={t('permission')}
        />
        <CustomSwitchWithInput
          initial={state.is_protected ? 1 : 0}
          containerStyle={styles.customSwitchContainer}
          switchOptions={permissionSwitchOptons}
          titleStyle={styles.coloriesTitleText}
          onSwitchPress={permissionValueChangeHandle}
          inputShow={false}
          title={t('recipeType') ?? ''}
        />
        <View style={styles.permissioInfoContainer}>
          <Icons.CloseEye {...styles.eyeIcons} />
          <Text style={styles.permissioText}>{t('privateRecipesAre')}</Text>
        </View>
        <View style={styles.permissioInfoContainer}>
          <Icons.Eye {...styles.eyeIcons} />
          <Text style={styles.permissioText}>{t('publicRecipesAre')}</Text>
        </View>
      </ScrollView>
      <MultiSelectModal
        isVisible={measurementModalVisibility}
        onClose={measurementUnitModalCloseHandle}
        onSelect={measurementUnitSelectHandle}
        dataList={measurementUnitsList}
        selectedList={
          state.unit_of_measurement ? [state.unit_of_measurement] : []
        }
      />
      <MultiSelectModal
        isVisible={modalVisibility}
        onClose={modalCloseHandle}
        onSelect={measurementSelectHandle}
        dataList={measurmentsList}
        selectedList={selectedMeasurment}
      />
    </View>
  );
};

export default RecipeFourthStep;
