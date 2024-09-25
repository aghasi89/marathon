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
import {PrimeryButton} from '../../../../../components/buttons';
import MealCard from '../../../../../components/mealCard/MealCard';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import styles from './CreateMeal.style';
import CreateMealHook from './CreateMeal-hook';

const CreateMeal: React.FC<any> = ({navigation}) => {
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
    list,
    selectedText,
    setSelectedText,
    valueNumber,
    setValueNumber,
    deleteFood,
    deleteRecipe,
  } = CreateMealHook();
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
        title={'Meal'}
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
          {!state.mealImageUrl ? (
            <UpploadButton
              goBackImage={image => {
                dispatchState({type: 'SET_MEAL_IMAGE_URL', payload: image});
              }}
            />
          ) : (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{uri: state.mealImageUrl}}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={() => {
                  dispatchState({type: 'SET_MEAL_IMAGE_URL', payload: ''});
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.mealName}>
          <Text style={styles.title}>Meal Name</Text>
          <TextInputComponent
            value={state.mealName}
            onChangetext={(value: string) => {
              dispatchState({type: 'SET_MEAL_NAME', payload: value});
            }}
            close={() => {}}
          />
        </View>
        <View style={styles.textWithIcon}>
          <TextWithIcon
            icon={<Icons.Apple fill={formFieldGrey} />}
            text={'Nutritions'}
          />
        </View>
        {state.foods.length == 0 && state.recipeList.length == 0 ? (
          <PrimeryButton
            title="Import"
            type="outline"
            onPress={() => {
              navigation.navigate('ImportFoodAndRecipe');
            }}
            style={styles.button}
            Icon={<Icons.Import />}
          />
        ) : (
          <View style={styles.mealContainer}>
            {state.foods.map((food, index) => {
              return (
                <View key={index} style={styles.mealItem}>
                  <MealCard
                    imageUrl={food.image}
                    title={food.title}
                    selectedTypesList={list}
                    selectedTypeText={selectedText}
                    setSelectedTypeText={value => {
                      setSelectedText(value);
                    }}
                    valueNumber={valueNumber}
                    onChangeNumberValue={(val: string) => {
                      setValueNumber(val);
                    }}
                    kcalSize={250}
                    kcalSizeStyle={{color: formFieldGrey}}
                    onClose={() => deleteFood(index)}
                  />
                </View>
              );
            })}
            {state.recipeList.map((recipe, index) => {
              return (
                <View key={index} style={styles.mealItem}>
                  <RecentInfoCard
                    onPress={() => {
                      navigation.navigate('RecipeDetail');
                    }}
                    info={{
                      title: recipe.title,
                      imageUrl: recipe.imageUrl,
                      count: recipe.count,
                      amount: recipe.amount,
                      time: recipe.time,
                      saleType: recipe.saleType,
                      type: recipe.type,
                    }}
                    isOnClose={true}
                    onClose={() => deleteRecipe(index)}
                    isDisabled={true}
                  />
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Calories fill={formFieldGrey} />}
            text={'Calories (kcal)'}
          />
          <View style={styles.numberInputContainer}>
            <Text style={styles.text}>{state.valueKcal}</Text>
          </View>
        </View>
        <View style={styles.calories}>
          <View style={styles.caloriesContainer}>
            <View style={styles.caloriesItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={parseInt(state.carbsValue) / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.progressItem}>
                <Text style={styles.text}>Carbs</Text>
                <Text style={styles.text}>
                  {state.carbsValue}
                  {state.selectedItems[0].title === 'Gram' ? ' g' : ' %'}
                </Text>
              </View>
            </View>
            <View style={styles.caloriesItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={parseInt(state.proteinValue) / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.progressItem}>
                <Text style={styles.text}>Protein</Text>
                <Text style={styles.text}>
                  {state.proteinValue}
                  {state.selectedItems[0].title === 'Gram' ? ' g' : ' %'}
                </Text>
              </View>
            </View>
            <View style={styles.caloriesItem}>
              <ProgressCircle
                style={styles.progressStyle}
                progress={parseInt(state.fatValue) / 100}
                progressColor={lightGreen}
                backgroundColor={backgroundGreen}
                strokeWidth={4}></ProgressCircle>
              <View style={styles.progressItem}>
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
            style={styles.plusIcon}
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
export default CreateMeal;
