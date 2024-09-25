import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import DropDownComponent from '../../../../../components/dropDown/DropDown';
import NumberInput from '../../../../../components/numberInput/NumberInput';
import Progress from '../../../../../components/progress/Progress';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import styles from './FoodDetail.style';
import { selectedFoodItemSelector } from '../../../../../store/selectors/food-selector';
import { deleteFood, getFoods } from '../../../../../store/actions/food-action';

//@ts-ignore
const FoodDetail: React.FC = ({ navigation }) => {
  const selectedFoodItem = useSelector(selectedFoodItemSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState(1);
  const dispatch = useDispatch()
  // variables
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const [selected, setSelected] = useState<string>('1');
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateFood', { isNew: false });
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
    {
      title: 'Delete',
      onSelect: () => {
        if (selectedFoodItem.id) {
          dispatch(deleteFood(selectedFoodItem.id, () => {
            dispatch(getFoods())
            navigation.navigate('Nutrition')
            setIsOpenedEditSheet(false);
          }))
        }
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{ uri: selectedFoodItem.image }}
          leftIcon={<Icons.ArrowIcon fill={primaryWhite} />}
          rightIcon={<Icons.EllipsisIcon fill={primaryWhite} />}
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => setIsOpenedEditSheet(true)}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {sheetIndex ? (
          <MainHeader
            leftIconPress={leftIconPress}
            leftIcon={true}
            title={selectedFoodItem.food_name}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <Icons.EllipsisIcon
                fill={primaryBlack}
                style={styles.iconStyle}
                onPress={() => setIsOpenedEditSheet(true)}
              />
            }
          />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{selectedFoodItem.food_name}</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.dropContainer}>
            <View style={styles.dropDownContainer}>
              <DropDownComponent
                list={[selectedFoodItem.amount]}
                selected={selected}
                setSelected={value => {
                  setSelected(value);
                }}
              />
            </View>
            <View style={styles.numberInputContainer}>
              <NumberInput
                editable={false}
                value={selectedFoodItem.amount.value.toString()}
              />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Progress
              title="Calories"
              percent={selectedFoodItem.kcal}
              point={'kcal'}
            />
            <Progress title="Carbs" percent={selectedFoodItem.carbs} point={selectedFoodItem.amountType.name} />
            <Progress
              title="Protein"
              percent={selectedFoodItem.protein}
              point={selectedFoodItem.amountType.name}
            />
            <Progress title="Fat" percent={selectedFoodItem.fat} point={selectedFoodItem.amountType.name} />
          </View>
          <View style={{ height: calcHeight(60) }}>
            <ChipsGroup elements={[...selectedFoodItem.categories, ...selectedFoodItem.tags]} />
          </View>
          <ParagraphComponenet title="" text={selectedFoodItem.food_info} />
        </View>
      </BottomSheet>
      <EditSheet
        isVisible={isOpenedEditSheet}
        height={calcHeight(400)}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </View>
  );
};
export default FoodDetail;
