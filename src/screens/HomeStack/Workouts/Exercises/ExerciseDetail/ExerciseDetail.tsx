import React, { Dispatch, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import { execiseDetailSelector } from '../../../../../store/selectors/execise-selector';
import styles from './ExerciseDetail.style';
import { getExerciseById } from '../../../../../store/actions/exercises-action';
import { useRoute } from '@react-navigation/core';

const ExerciseDetail: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch<Dispatch<any>>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const exerciseDetail = useSelector(execiseDetailSelector);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [sheetIndex, setSheetIndex] = useState<number>(1);
  const route = useRoute<any>();
  const id = route.params?.id ?? null;
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
        navigation.navigate('CreateExercise', { isNew: false });
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
  useEffect(() => {
    dispatch(getExerciseById(id))
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.headerWithImageContainer}>
        <HeaderWithImage
          source={{ uri: exerciseDetail?.videoUrl }}
          leftIcon={<Icons.ArrowIcon fill={primaryWhite} />}
          rightIcon={<Icons.EllipsisIcon fill={primaryWhite} />}
          leftIconPress={() => navigation.goBack()}
          rightIconPress={() => setIsOpenedEditSheet(true)}
        />
      </View>
      {exerciseDetail && <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {sheetIndex ? (
          <MainHeader
            leftIconPress={leftIconPress}
            leftIcon={true}
            title={exerciseDetail?.name}
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
            <Text style={styles.title}>{exerciseDetail.name}</Text>
          </View>
        )}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.chipsgroup}>

            {exerciseDetail?.time && exerciseDetail?.tags ? <ChipsGroup elements={[{ title: exerciseDetail?.time, iconType: "clock" }, ...exerciseDetail?.tags]} />
              : <></>}
          </View>
          <ParagraphComponenet title="" text={exerciseDetail?.type} />
          <View style={styles.bottomStyle}>
            <View>
              {exerciseDetail?.muscules && exerciseDetail?.muscules.map((elem, index) => {
                return <Text key={index} style={styles.bottomText}>{elem.title}</Text>
              })}
            </View>
            <View
              style={styles.block}></View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>}

      <EditSheet
        isVisible={isOpenedEditSheet}
        height={calcHeight(400)}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </View>
  );
};
export default ExerciseDetail;
