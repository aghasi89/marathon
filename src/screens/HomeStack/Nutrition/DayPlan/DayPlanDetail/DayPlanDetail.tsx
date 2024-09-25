import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import Icons from '../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import Progress from '../../../../../components/progress/Progress';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import {
  dayPlanDetailSelector,
  dayPlanListSelector,
} from '../../../../../store/selectors/dayPlan-selector';
import styles from './DayPlanDetail.style';

//@ts-ignore
const DayPlanDetail: React.FC = ({navigation}) => {
  const detailDayPlan = useSelector(dayPlanDetailSelector);
  const dayPlanList = useSelector(dayPlanListSelector);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState(1);
  // variables
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateDayPlan');
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
          source={{uri: detailDayPlan.imageUrl}}
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
            title={detailDayPlan.title}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <Icons.EllipsisIcon
                fill={primaryBlack}
                style={{paddingHorizontal: calcWidth(15)}}
                onPress={() => setIsOpenedEditSheet(true)}
              />
            }
          />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{detailDayPlan.title}</Text>
          </View>
        )}
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.progressContainer}>
            <Progress
              title="Calories"
              percent={detailDayPlan.calories}
              point={'kcal'}
            />
            <Progress
              title="Carbs"
              percent={detailDayPlan.carbs}
              point={'gm'}
            />
            <Progress
              title="Protein"
              percent={detailDayPlan.protein}
              point={'gm'}
            />
            <Progress title="Fat" percent={detailDayPlan.fat} point={'gm'} />
          </View>
          <View style={styles.chipsGroup}>
            <ChipsGroup elements={detailDayPlan.list} />
          </View>
          <ParagraphComponenet title="" text={detailDayPlan.description} />
          <View style={styles.dropContainer}>
            <Text style={styles.title}>Breakfast</Text>
            <Text>430 kcal</Text>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icons.Plus fill={formFieldGrey} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayPlanList}>
            <BottomSheetScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {dayPlanList.map((elem, index) => {
                return (
                  <View key={index} style={styles.dayPlanItem}>
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
          <View style={styles.dropContainer}>
            <Text style={styles.title}>Lunch</Text>
            <Text>430 kcal</Text>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icons.Plus fill={formFieldGrey} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayPlanList}>
            <BottomSheetScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {dayPlanList.map((elem, index) => {
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
          <View style={styles.dropContainer}>
            <Text style={styles.title}>Dinner</Text>
            <Text>430 kcal</Text>
            <TouchableOpacity style={styles.icon} onPress={() => {}}>
              <Icons.Plus fill={formFieldGrey} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayPlanList}>
            <BottomSheetScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {dayPlanList.map((elem, index) => {
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
export default DayPlanDetail;
