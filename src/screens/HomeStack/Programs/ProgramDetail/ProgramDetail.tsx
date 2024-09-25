import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import HeaderWithImage from '../../../../components/headerWithImage/HeaderWithImage';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import ParagraphComponenet from '../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../components/editSheet/EditSheet';
import ChipsGroup from '../../../../components/chipsGroup/ChipsGroup';
import SegmentedHeader from '../../../../components/headers/segmentedHeader/SegmentedHeader';
import Timeline from '../CreateProgramDetail/Timeline';
import Weekley from '../CreateProgramDetail/Weekley';
import ProgramDetailHook from './ProgramDetail-hook';
import styles from './ProgramDetail.style';

const ProgramDetail: React.FC<any> = ({navigation}) => {
  const {
    programDetail,
    sheetIndex,
    setSheetIndex,
    index,
    setIndex,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
  } = ProgramDetailHook();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const leftIconPress = () => {
    navigation.goBack();
  };
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateProgram');
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
  const renderComponent = () => {
    switch (index) {
      case 0:
        return <Weekley navigation={navigation} />;
      case 1:
        return <Timeline navigation={navigation} />;
      default:
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{uri: programDetail.imageUrl}}
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
            title={programDetail.title}
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
          <>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{programDetail.title}</Text>
              <View style={styles.paragraphContainer}>
                <ParagraphComponenet
                  title=""
                  text={programDetail.description}
                />
              </View>
            </View>
            <View style={styles.chips}>
              <ChipsGroup elements={programDetail.list} type={'bottomSheet'} />
            </View>
          </>
        )}
        <View style={styles.segmentedHeaderContainer}>
          <SegmentedHeader
            selectedIndex={index}
            lebalList={['Weekley', 'Timeline']}
            onChange={(item: any) => {
              setIndex(item);
            }}
          />
          <Icons.Article />
        </View>
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          nestedScrollEnabled={true}>
          <View style={styles.scrollViewHeaderContainer}>
            <View style={styles.scroloViewHeaderItem}>
              <Icons.Article />
              <Text style={styles.title}>7</Text>
            </View>
            <View style={styles.scroloViewHeaderItem}>
              <Icons.Edit />
              <Text style={styles.title}>0</Text>
            </View>
            <View style={styles.scroloViewHeaderItem}>
              <Icons.Article />
              <Text style={styles.title}>0</Text>
            </View>
            <View style={styles.scroloViewHeaderItem}>
              <Icons.Rest />
              <Text style={styles.title}>0</Text>
            </View>
          </View>
          {renderComponent()}
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
export default ProgramDetail;
