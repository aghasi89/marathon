import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import ProgressStepper from '../../../components/ProgressStepper/ProgressStepper';
import ActionModal from '../../../components/actionModal/ActionModal';
import {PrimeryButton} from '../../../components/buttons';
import Header from '../../ProfileStack/components/Header/Header';
import CreateExerciseHook from './CreateExercise-hook';
import FirstStepScreen from './Steps/FirstStep/FirstStepScreen';
import SecondStepScreen from './Steps/SecondStep/SecondStepScreen';
import ThirdStepScreen from './Steps/ThirdStep/ThirdStepScreen';
import OverViewScreen from './Steps/OverViewStepScreen/OverViewScreen';
import styles from './CreateExercise.style';

const CreateExercise: React.FC = () => {
  const {
    t,
    handleBackIconPress,
    selectedStepIndex,
    staticData,
    handelPrevius,
    handelNext,
    handleCreateExercise,
    loader,
    selectedExercise,
    handleEditExercise,
    actionModalVisibility,
    handleGoBack,
    actionModalCancleHandle,
  } = CreateExerciseHook();

  const renderExerciseSteps = () => {
    switch (selectedStepIndex) {
      case 1:
        return <FirstStepScreen />;
      case 2:
        return <SecondStepScreen />;
      case 3:
        return <ThirdStepScreen />;
      case 4:
        return <OverViewScreen />;
      default:
        return null;
    }
  };

  if (loader) return <ActivityIndicator style={{flex: 1}} size={'large'} />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <Header goBack={handleBackIconPress} title={t('createExercise')} />
        {selectedStepIndex !== 4 && (
          <View style={styles.body}>
            <ProgressStepper
              steps={staticData.wallet.steps}
              containerStyle={styles.progressStepsContainer}
              selectedStepIndex={selectedStepIndex}
            />
          </View>
        )}
        {renderExerciseSteps()}
        <View style={styles.buttons}>
          <PrimeryButton
            title={t('previous') ?? ''}
            type="outline"
            onPress={handelPrevius}
            style={styles.backButton}
          />
          <View style={styles.emptyView} />
          <PrimeryButton
            title={
              (selectedStepIndex === 4 && selectedExercise
                ? t('save')
                : selectedStepIndex !== 4
                ? t('next')
                : t('create')) ?? ''
            }
            type="default"
            onPress={() =>
              selectedStepIndex == 4 && selectedExercise
                ? handleEditExercise()
                : selectedStepIndex !== 4
                ? handelNext()
                : handleCreateExercise()
            }
            style={styles.applyButton}
          />
        </View>
      </ScrollView>
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
export default CreateExercise;
