import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../../assets/dimensions';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import DropDownComponent from '../../../../../components/dropDown/DropDown';
import NumberInput from '../../../../../components/numberInput/NumberInput';
import Progress from '../../../../../components/progress/Progress';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import IngredientsItem from '../../../../../components/IngredientsItem/IngredientsItem';
import {recipeDetailSelector} from '../../../../../store/selectors/recipe-selector';
import styles from './RecipeDetail.style';

const RecipeDetail: React.FC<any> = ({navigation}) => {
  const recipeDetail = useSelector(recipeDetailSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
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
        navigation.navigate('CreateRecipe', {isNew: false});
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
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{uri: recipeDetail.imageUrl}}
          leftIcon={<Icons.ArrowIcon fill={primaryWhite} />}
          rightIcon={<Icons.EllipsisIcon fill={primaryWhite} />}
          leftIconPress={leftIconPress}
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
            title={recipeDetail.title}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <Icons.EllipsisIcon
                fill={primaryBlack}
                style={styles.elipsIcon}
                onPress={() => setIsOpenedEditSheet(true)}
              />
            }
          />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{recipeDetail.title}</Text>
          </View>
        )}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.dropContainer}>
            <View style={styles.dropDownContainer}>
              <DropDownComponent
                list={recipeDetail.weightList}
                selected={selected}
                setSelected={value => {
                  setSelected(value);
                }}
              />
            </View>
            <View style={styles.numberInputContainer}>
              <NumberInput
                editable={false}
                value={recipeDetail.count.toString()}
              />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Progress
              title="Calories"
              percent={recipeDetail.calories}
              point={'kcal'}
            />
            <Progress title="Carbs" percent={recipeDetail.carbs} point={'gm'} />
            <Progress
              title="Protein"
              percent={recipeDetail.protein}
              point={'gm'}
            />
            <Progress title="Fat" percent={recipeDetail.fat} point={'gm'} />
          </View>
          <View style={styles.chpsGroup}>
            <ChipsGroup elements={recipeDetail.list} type={'bottomSheet'} />
          </View>
          <ParagraphComponenet title="" text={recipeDetail.description} />
          <Text style={styles.paragraphTitle}>Ingredients</Text>
          {recipeDetail.ingridients.map((elem, index) => {
            return (
              <IngredientsItem
                key={index}
                title={elem.title}
                weight={elem.weight}
              />
            );
          })}
          <Text style={styles.paragraphTitle}>Preparation</Text>
          {recipeDetail.steps.map((elem, index) => {
            return (
              <View style={styles.steps}>
                <ParagraphComponenet
                  key={index}
                  title={elem.title}
                  text={elem.text}
                />
              </View>
            );
          })}
        </BottomSheetScrollView>
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
export default RecipeDetail;
