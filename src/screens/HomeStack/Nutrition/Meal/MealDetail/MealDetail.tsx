import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import Progress from '../../../../../components/progress/Progress';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import {calcHeight} from '../../../../../assets/dimensions';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import {mealDetailSelector} from '../../../../../store/selectors/meal-selector';
import styles from './MeaDetail.style';

//@ts-ignore
const MealDetail: React.FC = ({navigation}) => {
  const mealDetail = useSelector(mealDetailSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState(1);
  // variables
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState(false);
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateMeal');
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
          source={{uri: mealDetail.imageUrl}}
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
            title={mealDetail.title}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <Icons.EllipsisIcon
                fill={primaryBlack}
                style={styles.icon}
                onPress={() => setIsOpenedEditSheet(true)}
              />
            }
          />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{mealDetail.title}</Text>
          </View>
        )}
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.progressContainer}>
            <Progress
              title="Calories"
              percent={mealDetail.calories}
              point={'kcal'}
            />
            <Progress title="Carbs" percent={mealDetail.carbs} point={'gm'} />
            <Progress
              title="Protein"
              percent={mealDetail.protein}
              point={'gm'}
            />
            <Progress title="Fat" percent={mealDetail.fat} point={'gm'} />
          </View>
          <View style={styles.dropContainer}>
            <Text style={styles.title}>Nutritions</Text>
          </View>
          <View style={styles.scrollViewContainer}>
            <BottomSheetScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {mealDetail.meals.map((elem, index) => {
                return (
                  <View key={index} style={{marginHorizontal: 9}}>
                    <RecentInfoCard
                      info={{
                        title: elem.title,
                        imageUrl: elem.imageUrl,
                        amount: elem.amount,
                        //saleType: elem.saleType,
                        type: elem.type,
                      }}
                    />
                  </View>
                );
              })}
            </BottomSheetScrollView>
          </View>
          <View style={styles.chipsGroup}>
            <ChipsGroup elements={mealDetail.list} />
          </View>
          <ParagraphComponenet title="" text={mealDetail.description} />
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
export default MealDetail;
