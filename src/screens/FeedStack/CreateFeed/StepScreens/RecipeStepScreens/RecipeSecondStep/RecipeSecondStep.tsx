import React from 'react';
import {ScrollView, View} from 'react-native';
import InputComponent from '../../../components/InputComponent/InputComponent';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import {PrimeryButton} from '../../../../../../components/buttons';
import hook from './RecipeSecondStep.hook';
import styles from './RecipeSecondStep.style';

const RecipeSecondStep: React.FC = () => {
  const {
    t,
    state,
    ingridientsValueChangeHandle,
    buttonPressHandle,
    ingredientDeleteHandle,
  } = hook();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <SectionTitle
          title={t('ingredients')}
          containerStyle={styles.sectionTitles}
        />
        {state?.components?.length === 0 ? (
          <InputComponent
            textAlignVertical="top"
            onChange={ingridientsValueChangeHandle}
            value={state?.ingredients_string}
            placeholder={t('typeInformationHere') ?? ''}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            multiline={true}
            isInvalid={!!state.errorMessages?.ingredients?.length}
          />
        ) : (
          state?.components?.map((item, index) => (
            <InputComponent
              key={index}
              onChange={text => ingridientsValueChangeHandle(text, index)}
              value={item.name}
              placeholder={t('ingredient') ?? ''}
              containerStyle={styles.ingridientItemInputContainer}
              inputStyle={styles.ingridientItemInput}
              closeIconAvailability={true}
              closeIconPress={() => ingredientDeleteHandle(index)}
            />
          ))
        )}
        <View style={styles.buttonContainer}>
          <PrimeryButton
            style={styles.button}
            textStyle={styles.buttonText}
            type="default"
            onPress={buttonPressHandle}
            title={
              state?.components?.length === 0
                ? `+ ${t('addIngrediants')}` ?? ''
                : `+ ${t('addIngrediant')}`
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default RecipeSecondStep;
