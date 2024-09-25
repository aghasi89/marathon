import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import ProgressStepper from '../../../components/ProgressStepper/ProgressStepper';
import ActionModal from '../../../components/actionModal/ActionModal';
import StepperButtons from './components/StepperButtons/StepperButtons';
import HeaderComponent from './components/Header/Header';
import StepScreens from './StepScreens';
import hook from './CreateFeed.hook';
import styles from './CreateFeed.style';

const CreateFeed: React.FC = () => {
  const {
    t,
    backIconPressHandle,
    stepperButtonsPressHandle,
    postButtonPressHandle,
    isDisabledPrevious,
    selectedStepIndex,
    staticData,
    type,
    workoutType,
    actionModalCancleHandle,
    actionModalVisibility,
    handleGoBack,
    postButtonLoading,
    state
  } = hook();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={styles.container}>
      <HeaderComponent
        leftIconPressHandler={backIconPressHandle}
        title={type && staticData[type].headerTitle}
      />
      {type &&
        selectedStepIndex !== staticData[type].steps.length &&
        type !== 'article' &&
        type !== 'basic' && (
          <ProgressStepper
            steps={staticData[type].steps}
            containerStyle={styles.progressStepsContainer}
            selectedStepIndex={selectedStepIndex}
          />
        )}
      <View style={{flex: 1}}>
        <StepScreens
          stepIndex={selectedStepIndex}
          type={type}
          workoutType={workoutType}
        />
      </View>
      <StepperButtons
        stepperButtonsShow={type !== 'article' && type !== 'basic'}
        onPostButtonPress={postButtonPressHandle}
        postButtonShow={
          type
            ? selectedStepIndex === staticData[type].steps.length ||
              type === 'article' ||
              type === 'basic'
            : false
        }
        disablePrevious={isDisabledPrevious}
        onPress={stepperButtonsPressHandle}
        isLoading={postButtonLoading}
        disablePost={state?.media?.[0]?.type==="image" ? false : !(state.compressingProgress===100 && state.uploadingProgress===100)}
      />
      <ActionModal
        visible={actionModalVisibility}
        onClose={handleGoBack}
        onSubmit={actionModalCancleHandle}
        description={t('areYouSureYouWantToExit') ?? ''}
        closeButtonText={t('yes') ?? ''}
        submitButtonText={t('no') ?? ''}
      />
    </KeyboardAvoidingView>
  );
};
export default CreateFeed;
