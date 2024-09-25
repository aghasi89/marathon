import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {calcHeight} from '../../../../../assets/dimensions';
import Icons from '../../../../../assets/icons/svg/index';
import {
  backgroundGreen,
  formFieldGrey,
  lightGreen,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../../../components/textWithicon/TextWithIcon';
import UpploadButton from '../../../../../components/uploadbutton/UploadButton';
import TextInputComponent from '../../../../../components/textInput/TextInputComponent';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import MultiSelectChips from '../../../../../components/multiSelect/MultiSelectChips';
import ModalComponent from '../../../../../components/modal/ModalComponent';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import SelectedItems from './SelectedItems';
import styles from './CreateDayPlan.style';
import CreateDayPlanHook from './CreateDayPlan-hook';

const CreateDayPlan: React.FC<any> = ({navigation}) => {
  const {
    multiSelectList,
    state,
    dispatchState,
    isVisibleTag,
    setIsVisibleTag,
    deleteTagsItem,
    checksetSelectedTags,
    isOpen,
    setIsOpen,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    deleteFood,
    deleteRecipe,
    deleteMeal,
  } = CreateDayPlanHook(navigation);
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader
        title={'Day Plan'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
        leftComponent={
          <Text
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.save}>
            Save
          </Text>
        }
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {!state.dayPlanImageUrl ? (
            <UpploadButton
              goBackImage={image => {
                dispatchState({type: 'SET_DAY_PLAN_IMAGE_URL', payload: image});
              }}
            />
          ) : (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{uri: state.dayPlanImageUrl}}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={() => {
                  dispatchState({type: 'SET_DAY_PLAN_IMAGE_URL', payload: ''});
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.dayPlanName}>
          <View style={styles.dayPlanNameInput}>
            <Text style={styles.title}>Day Plan Name</Text>
          </View>
          <TextInputComponent
            value={state.dayPlanName}
            onChangetext={(value: string) => {
              dispatchState({type: 'SET_DAY_PLAN_NAME', payload: value});
            }}
            close={() => {}}
          />
        </View>
        <SelectedItems
          navigate={() => {
            navigation.navigate('ImportRecipeFoodMeal', {index: 0});
          }}
          foods={state.brackfast.foods}
          meals={state.brackfast.mealList}
          repipes={state.brackfast.recipeList}
          deleteFood={value => {
            deleteFood(value, 0);
          }}
          deleteRecipe={value => {
            deleteRecipe(value, 0);
          }}
          deleteMeal={value => {
            deleteMeal(value, 0);
          }}
          selectedText={selectedText}
          valueNumber={valueNumber}
          setSelectedText={val => setSelectedText(val)}
          setValueNumber={val => setValueNumber(val)}
          caloreis={0}
          title="BreakFast"
        />
        <SelectedItems
          navigate={() => {
            navigation.navigate('ImportRecipeFoodMeal', {index: 1});
          }}
          foods={state.lunch.foods}
          meals={state.lunch.mealList}
          repipes={state.lunch.recipeList}
          deleteFood={value => {
            deleteFood(value, 1);
          }}
          deleteRecipe={value => {
            deleteRecipe(value, 1);
          }}
          deleteMeal={value => {
            deleteMeal(value, 1);
          }}
          selectedText={selectedText}
          valueNumber={valueNumber}
          setSelectedText={val => setSelectedText(val)}
          setValueNumber={val => setValueNumber(val)}
          caloreis={0}
          title="Lunch"
        />
        <SelectedItems
          navigate={() => {
            navigation.navigate('ImportRecipeFoodMeal', {index: 2});
          }}
          foods={state.dinner.foods}
          meals={state.dinner.mealList}
          repipes={state.dinner.recipeList}
          deleteFood={value => {
            deleteFood(value, 2);
          }}
          deleteRecipe={value => {
            deleteRecipe(value, 2);
          }}
          deleteMeal={value => {
            deleteMeal(value, 2);
          }}
          selectedText={selectedText}
          valueNumber={valueNumber}
          setSelectedText={val => setSelectedText(val)}
          setValueNumber={val => setValueNumber(val)}
          caloreis={0}
          title="Dinner"
        />
        <SelectedItems
          navigate={() => {
            navigation.navigate('ImportRecipeFoodMeal', {index: 3});
          }}
          foods={state.snacks.foods}
          meals={state.snacks.mealList}
          repipes={state.snacks.recipeList}
          deleteFood={value => {
            deleteFood(value, 3);
          }}
          deleteRecipe={value => {
            deleteRecipe(value, 3);
          }}
          deleteMeal={value => {
            deleteMeal(value, 3);
          }}
          selectedText={selectedText}
          valueNumber={valueNumber}
          setSelectedText={val => setSelectedText(val)}
          setValueNumber={val => setValueNumber(val)}
          caloreis={0}
          title="Snacks"
        />
        <View style={styles.caloriesContainer}>
          <View style={styles.calories}>
            <View style={styles.caloryItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={state.carbsValue / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.caloryCount}>
                <Text style={styles.text}>Carbs</Text>
                <Text style={styles.text}>
                  {state.carbsValue}
                  {state.selectedItems[0].title === 'Gram' ? ' g' : ' %'}
                </Text>
              </View>
            </View>
            <View style={styles.caloryItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={state.proteinValue / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.caloryCount}>
                <Text style={styles.text}>Protein</Text>
                <Text style={styles.text}>
                  {state.proteinValue}
                  {state.selectedItems[0].title === 'Gram' ? ' g' : ' %'}
                </Text>
              </View>
            </View>
            <View style={styles.caloryItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={state.fatValue / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.caloryCount}>
                <Text style={styles.text}>Fat</Text>
                <Text style={styles.text}>
                  {state.fatValue}
                  {state.selectedItems[0].title === 'Gram' ? ' g' : ' %'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Tags'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setIsVisibleTag(true);
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedTags.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedTags}
              onDelete={(value: any) => {
                deleteTagsItem(value);
              }}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Info fill={formFieldGrey} />}
            text={'Info'}
          />
        </View>
        <View style={styles.typeHere}>
          <Text style={styles.title}>Type Here</Text>
          <TextInputComponent
            value={state.typeValue}
            onChangetext={(value: string) => {
              dispatchState({type: 'SET_TYPE_VALUE', payload: value});
            }}
            close={() => {}}
          />
        </View>
        <ModalComponent
          isVisible={isVisibleTag}
          onClose={() => {
            setIsVisibleTag(false);
          }}
          content={
            <View style={styles.modalContent}>
              <MultiSelectChips
                list={multiSelectList}
                selectedItems={state.selectedTags}
                onPressItem={value => {
                  checksetSelectedTags(value);
                }}
              />
            </View>
          }
        />
      </ScrollView>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default CreateDayPlan;
