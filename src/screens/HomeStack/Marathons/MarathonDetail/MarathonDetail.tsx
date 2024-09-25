import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import SegmentedHeader from '../../../../components/headers/segmentedHeader/SegmentedHeader';
import HeaderWithImage from '../../../../components/headerWithImage/HeaderWithImage';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {NavigationParamList} from '../..';
import styles from './MarathonDetail.style';
import MarathonDetailHook from './MarathonDetail-hook';
import Users from './Users';
import Notifications from './Notifications';
import Payments from './Payments';

type Props = NativeStackScreenProps<NavigationParamList, 'MarathonDetail'>;

const MarathonDetail: React.FC<Props> = ({navigation}) => {
  const [seletedSegmentIndex, setSelectedSegmentIndex] = useState<number>(0);
  const {
    marathonsDetail,
    sheetIndex,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    snapPoints,
    handleSheetChanges,
    leftIconPress,
  } = MarathonDetailHook(navigation);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateGroupMarathon', {isNew: false});
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
    switch (seletedSegmentIndex) {
      case 0:
        return <Users navigation={navigation} />;
      case 1:
        return <Notifications navigation={navigation} />;
      case 2:
        return <Payments navigation={navigation} />;
      default:
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{uri: marathonsDetail.imageUrl}}
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
            title={marathonsDetail && marathonsDetail.name}
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
          <View style={styles.titleContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {marathonsDetail && marathonsDetail?.name}
              </Text>
            </View>
            <View style={styles.dayContainer}>
              <Text style={styles.days}>
                {`
              ${
                marathonsDetail.calendarRange
                  ? marathonsDetail.calendarRange[0]
                  : ''
              } - ${
                  marathonsDetail.calendarRange
                    ? marathonsDetail.calendarRange[1]
                    : ''
                }
              `}
              </Text>
              <Text style={styles.dayCount}>{marathonsDetail.time} Days</Text>
            </View>
            <TouchableOpacity style={styles.programsContainer}>
              <View style={styles.iconContainer}>
                <Icons.Programs />
              </View>
              <Text style={styles.days}>Marathon Programs</Text>
            </TouchableOpacity>
          </View>
        )}
        <BottomSheetScrollView
          contentContainerStyle={styles.contentContainer}
          nestedScrollEnabled={true}>
          <SegmentedHeader
            selectedIndex={seletedSegmentIndex}
            lebalList={['Users', 'Notifications', 'Payments']}
            onChange={(item: any) => {
              setSelectedSegmentIndex(item);
            }}
          />
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
export default MarathonDetail;
