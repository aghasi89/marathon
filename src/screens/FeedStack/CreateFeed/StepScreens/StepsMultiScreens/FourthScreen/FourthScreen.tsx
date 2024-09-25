import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PrimeryButton} from '../../../../../../components/buttons';
import SelectInputComponent from '../../../components/SelectInputComponent/SelectInputComponent';
import MultiSelectModal from '../../../components/MultiSelectModal/MultiSelectModal';
import InputComponent from '../../../components/InputComponent/InputComponent';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import hook from './FourthScreen.hook';
import styles from './FourthScreen.style';

const FourthScreen: React.FC = () => {
  const {
    t,
    measurmentsSelectButtonPressHandle,
    questionInputValuChangeHandle,
    addquestionButtonPressHandle,
    questionDeleteHandle,
    state,
    measurementModalVisibility,
    measurementModalCloseHandle,
    measurementSelectHandle,
    measurementData,
    questionInputRef,
  } = hook();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never">
        <SectionTitle
          title={t('measurments')}
          containerStyle={styles.sectionTitle}
        />
        <SelectInputComponent
          buttonIcon={
            <Text style={styles.measurmentsButtonText}>{t('suggestions')}</Text>
          }
          onButtonPress={measurmentsSelectButtonPressHandle}
          disabled
          placeholder={t('measurments') ?? ''}
          value={state.selectedMeasurements
            ?.map(item => `${item.name}`)
            .join(', ')}
        />
        <SectionTitle
          title={t('questions')}
          containerStyle={styles.sectionTitle}
        />
        {state?.coach_question?.map((item, index) => {
          return (
              <InputComponent
                forwardedRef={
                  state?.coach_question &&
                  index !== state?.coach_question?.length - 1
                    ? questionInputRef
                    : null
                }
                onChange={text => questionInputValuChangeHandle(text, index)}
                value={item.text}
                inputStyle={[
                  styles.inputStyle,
                  state?.coach_question &&
                  index !== state?.coach_question?.length - 1
                    ? styles.inputTextColor
                    : {},
                ]}
                autoFocus={state?.coach_question&&state?.coach_question.length>1}
                containerStyle={styles.questionCardContainer}
                placeholder={t('insertYourQuestion') ?? ''}
                closeIconAvailability={
                  state?.coach_question &&
                  index !== state?.coach_question?.length - 1
                }
                closeIconPress={() => questionDeleteHandle(index)}
              />
          );
        })}
        <View style={styles.buttonContainer}>
          <PrimeryButton
            type="default"
            onPress={addquestionButtonPressHandle}
            title={`+ ${t('addQuestion')}`}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
        <MultiSelectModal
          isVisible={measurementModalVisibility}
          onClose={measurementModalCloseHandle}
          onSelect={measurementSelectHandle}
          dataList={measurementData}
          selectedList={state.selectedMeasurements?.map(el => el?.id)}
        />
      </ScrollView>
    </View>
  );
};

export default FourthScreen;
