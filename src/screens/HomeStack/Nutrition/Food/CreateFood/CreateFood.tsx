import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { calcHeight } from '../../../../../assets/dimensions';
import Icons from '../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../../../components/textWithicon/TextWithIcon';
import UpploadButton from '../../../../../components/uploadbutton/UploadButton';
import DropDownComponent from '../../../../../components/dropDown/DropDown';
import NumberInput from '../../../../../components/numberInput/NumberInput';
import SwitchComponenet from '../../../../../components/switch/SwitchComponenet';
import TextInputComponent from '../../../../../components/textInput/TextInputComponent';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import MultiSelectChips from '../../../../../components/multiSelect/MultiSelectChips';
import ModalComponent from '../../../../../components/modal/ModalComponent';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import styles from './CreateFood.style';
import CreateFoodHook from './CreateFood-hook';

const CreateFood: React.FC<any> = ({ navigation }) => {
  const {
    foodsCategories,
    listForMultiSelect,
    foodsTags,
    foodsAmounts,
    state,
    dispatchState,
    isVisibleCategory,
    setIsVisibleCategory,
    deleteCategoriesItem,
    isVisibleTag,
    setIsVisibleTag,
    deleteTagsItem,
    checksetSelectedCategories,
    checksetSelectedTags,
    isOpen,
    setIsOpen,
    handleCreateFood
  } = CreateFoodHook(navigation);
  const leftIconPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Food'}
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
          {!state.foodImageUrl ? (
            <UpploadButton
              goBackImage={image => {
                dispatchState({ type: 'SET_FOOD_IMAGE_URL', payload: image });
              }}
            />
          ) : (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{ uri: state.foodImageUrl }}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={() => {
                  dispatchState({ type: 'SET_FOOD_IMAGE_URL', payload: '' });
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.foodName}>
          <Text style={styles.title}>Food Name</Text>
          <TextInputComponent
            value={state.foodName}
            onChangetext={(value: string) => {
              dispatchState({ type: 'SET_FOOD_NAME', payload: value });
            }}
            close={() => { }}
          />
        </View>
        <View style={styles.rowContainer}>
          <Icons.Portion />
          <View style={styles.dropDownContainer}>
            {foodsAmounts && <DropDownComponent
              list={foodsAmounts}
              selected={state.selectedGram}
              setSelected={value => {
                dispatchState({ type: 'SET_SELECTED_ITEMS', payload: value });
              }}
            />}
          </View>
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={state.valueNumber}
              onChangeValue={(val: string) => {
                dispatchState({ type: 'SET_VALUE_NUMBER', payload: val });
              }}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Calories fill={formFieldGrey} />}
            text={'Calories (kcal)'}
          />
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={state.valueKcal}
              onChangeValue={(val: string) => {
                dispatchState({ type: 'SET_VALUE_KCAL', payload: val });
              }}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Macro fill={formFieldGrey} />}
            text={'Macronutrients'}
          />
          <SwitchComponenet
            checked={state.checked}
            setChecked={(value: boolean) => {
              dispatchState({ type: 'SET_VALUE_CHECKED', payload: value });
            }}
          />
        </View>
        {state.checked && (
          <View style={styles.caloriesContainer}>
            <View style={styles.caloriesItem}>
              <View style={styles.numberInputContainer}>
                <Text style={styles.text}>
                  Carbs ({state.measurement.name === 'Gram' ? 'g' : '%'})
                </Text>
                <NumberInput
                  value={state.carbsValue}
                  onChangeValue={(val: string) => {
                    dispatchState({ type: 'SET_CARBS_VALUE', payload: val });
                  }}
                />
              </View>
              <View style={styles.numberInputContainer}>
                <Text style={styles.text}>
                  Protein ({state.measurement.name === 'Gram' ? 'g' : '%'}
                  )
                </Text>
                <NumberInput
                  value={state.proteinValue}
                  onChangeValue={(val: string) => {
                    dispatchState({ type: 'SET_PROTEIN_VALUE', payload: val });
                  }}
                />
              </View>
              <View style={styles.numberInputContainer}>
                <Text style={styles.text}>
                  Fat ({state.measurement.name === 'Gram' ? 'g' : '%'})
                </Text>
                <NumberInput
                  value={state.fatValue}
                  onChangeValue={(val: string) => {
                    dispatchState({ type: 'SET_FAT_VALUE', payload: val });
                  }}
                />
              </View>
            </View>
            <View style={styles.multiSelect}>
              <MultiSelectChips
                list={listForMultiSelect}
                selectedItems={[state.measurement]}
                onPressItem={value => {
                  dispatchState({ type: 'SET_MEASUREMENT', payload: value });
                }}
              />
            </View>
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Categories'}
          />
          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() => {
              setIsVisibleCategory(true);
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedCategories.length > 0 && (
          <View style={styles.selectedCategories}>
            <MultiSelectSelectedChips
              list={state.selectedCategories}
              onDelete={deleteCategoriesItem}
            />
          </View>
        )}
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
              onDelete={deleteTagsItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Info fill={formFieldGrey} />}
            text={'Recipe Info'}
          />
        </View>
        <View style={styles.typeHere}>
          <Text style={styles.title}>Type Here</Text>
          <TextInputComponent
            value={state.typeValue}
            onChangetext={(value: string) => {
              dispatchState({ type: 'SET_TYPE_VALUE', payload: value });
            }}
            close={() => { }}
          />
        </View>
        <ModalComponent
          isVisible={isVisibleCategory || isVisibleTag}
          onClose={() => {
            setIsVisibleCategory(false);
            setIsVisibleTag(false);
          }}
          content={
            <View style={styles.modalContent}>
              <MultiSelectChips
                list={isVisibleCategory ? foodsCategories : foodsTags}
                selectedItems={
                  isVisibleCategory
                    ? state.selectedCategories
                    : state.selectedTags
                }
                onPressItem={value => {
                  isVisibleCategory
                    ? checksetSelectedCategories(value)
                    : checksetSelectedTags(value);
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
        list={[
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
              handleCreateFood()
            },
            Icon: <Icons.CheckIcon fill={primaryBlack} />,
          },
        ]}
      />
    </View>
  );
};
export default CreateFood;
