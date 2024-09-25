import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {lightSteelBlue} from '../../../../../../assets/styles/colors.styles';
import {PrimeryButton} from '../../../../../../components/buttons';
import AddCardWithoutContent from '../../../components/AddContentItemCard/AddCardWithoutContent/AddCardWithoutContent';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import hook from './RecipeThirdStep.hook';
import styles from './RecipeThirdStep.style';

const RecipeThirdStep: React.FC = () => {
  const {
    t,
    state,
    stepDeleteHandle,
    inputValueChangeHandle,
    buttonPressHandle,
    inputFocusHandle,
    listRef,
  } = hook();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flexGrow: 1}} >
        <FlatList
          ref={listRef}
          data={state.preparation_steps}
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode="never"
          ListHeaderComponent={
            <SectionTitle
              title={t('preparationSteps')}
              containerStyle={styles.sectionTitles}
            />
          }
          ListFooterComponent={
            <View style={styles.buttonContainer}>
              <PrimeryButton
                style={styles.button}
                textStyle={styles.buttonText}
                type="default"
                onPress={buttonPressHandle}
                title={`+ ${t('addStep')}`}
              />
            </View>
          }
          renderItem={({item, index}) => (
            <AddCardWithoutContent
              customStyles={{
                childrenContainer: styles.stepContentContainer,
                container: [
                  styles.itemContainer,
                  !!state.errorMessages?.preparation_steps?.length
                    ? styles.itemborderInvalid
                    : {},
                ],
              }}
              key={index}
              onCloseIconPress={() => stepDeleteHandle(index)}
              title={`${t('step')} ${index + 1}`}>
              <TextInput
                onFocus={() => inputFocusHandle(index)}
                textAlignVertical="top"
                style={styles.input}
                onChangeText={text => inputValueChangeHandle(text, index)}
                multiline={true}
                value={item.text}
                placeholder={t('typeText') ?? ''}
                placeholderTextColor={lightSteelBlue}
              />
            </AddCardWithoutContent>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default RecipeThirdStep;
