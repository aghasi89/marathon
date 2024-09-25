import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import { primaryBlue, primaryWhite } from '../../../../assets/styles/colors.styles';
import HeaderComponent from '../../CreateFeed/components/Header/Header';
import {PrimeryButton} from '../../../../components/buttons';
import MeasurmentQuestions from './MeasurmentQuestions/MeasurmentQuestions';
import CoachQuestions from './CoachQuestions/CoachQuestions';
import {AnswersContext} from './context/cotnext';
import hook from './CoachQuestionsAnswers.hook';
import styles from './CoachQuestionsAnswers.style';

const CoachQuestionsAnswers: React.FC = () => {
  const {
    t,
    dispatchState,
    state,
    selectedStepIndex,
    loading,
    backIconPressHandle,
    selectedFeed,
    stepButtonPressHandle,
    saveButtonPressHandle,
    inProgress
  } = hook();

  const renderItem = () => {
    if (!!selectedFeed.measurement?.length) {
      switch (selectedStepIndex) {
        case 0:
          return <MeasurmentQuestions />;
        case 1:
          return <CoachQuestions />;
        default:
          return null;
      }
    }else if(!!!selectedFeed.measurement?.length&&!!selectedFeed.coach_question?.length){
      return <CoachQuestions />;
    }
    return null
  };
  return (
    <View style={styles.container}>
      <HeaderComponent
        leftIconPressHandler={backIconPressHandle}
        title={t('questionsFromCoach') ?? ''}
        containerStyle={styles.headerContainer}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{t('pleaseAnswerTheQuestions')}</Text>
      </View>
      <AnswersContext.Provider value={{state, dispatchState}}>
        {renderItem()}
      </AnswersContext.Provider>
      <View style={styles.buttons}>
        {!!selectedFeed?.coach_question?.length && selectedStepIndex === 1 && (
          <>
            <PrimeryButton
              title={t('previous') ?? ''}
              type="outline"
              onPress={()=>stepButtonPressHandle('previous')}
              style={styles.backButton}
              textStyle={styles.backButtonText}
            />
            <View style={styles.emptyView} />
          </>
        )}
        <PrimeryButton
          title={
            !inProgress?((!!!selectedFeed?.coach_question?.length || selectedStepIndex === 1)||
            (!!!selectedFeed?.measurement?.length&&!!selectedFeed?.coach_question?.length))
              ? t('save') ?? ''
              : t('next') ?? '':undefined
          }
          type="default"
          onPress={()=>
            (!!!selectedFeed?.coach_question?.length || selectedStepIndex === 1)||
            (!!!selectedFeed?.measurement?.length&&!!selectedFeed?.coach_question?.length)
              ? saveButtonPressHandle()
              : stepButtonPressHandle('next')
          }
          style={styles.applyButton}
          Icon={inProgress&&<ActivityIndicator size={'small'} color={primaryWhite}/>}
        />
      </View>
      </>)}
    </View>
  );
};
export default CoachQuestionsAnswers;
