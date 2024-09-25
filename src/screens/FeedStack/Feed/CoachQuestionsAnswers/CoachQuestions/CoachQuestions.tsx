import * as React from 'react';
import {Text, View,FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import InputComponent from '../../../CreateFeed/components/InputComponent/InputComponent';
import SectionTitle from '../../../CreateFeed/components/SectionTitle/SectionTitle';
import hook from './CoachQuestions.hook';
import styles from './CoachQuestions.style';

const CoachQuestions: React.FC = () => {
  const {t, inputValueChangeHandle,inputFocusHandle,state,listRef} = hook();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView  style={{flexGrow:1}}>
      <FlatList
        ref={listRef}
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{paddingBottom:Platform.OS==='ios'?0:90}}
        data={state.coach_question}
        ListHeaderComponent={() => (
          <SectionTitle
            containerStyle={styles.sectionTitles}
            title={t('questions')}
          />
        )}
        keyExtractor={(item, index) =>(item.text||'')+ index.toString()}
        renderItem={({item, index}) => (
          <View key = {item.text+index.toString()} style={styles.itemContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            <InputComponent
              onFocus={()=>inputFocusHandle(index)}
              multiline
              onChange={text => inputValueChangeHandle(text, item)}
              containerStyle={[
                styles.inputContainer,
                state?.coach_question &&
                index === state?.coach_question?.length - 1
                  ? styles.listLastElement
                  : {},
              ]}
              value={item?.answer?.answer ?? ''}
            />
          </View>
        )}
        />
        </KeyboardAvoidingView>
    </View>
  );
};
export default CoachQuestions;
