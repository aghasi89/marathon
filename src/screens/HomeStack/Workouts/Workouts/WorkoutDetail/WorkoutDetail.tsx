import React, { Dispatch, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import Icons from '../../../../../assets/icons/svg/index';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import ChipsGroup from '../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../components/paragraph/Paragraph';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import VideoInfoCard from '../../../../../components/videoInfoCard/VideoInfoCard';
import WorkoutDetailComp from '../../../../../components/workoutDetail/WorkoutDetailComponent';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import {
  workoutDetailSelector,
  workoutListSelector,
} from '../../../../../store/selectors/workout-selector';
import styles from './WorkoutDetail.style';
import { getWorkoutById } from '../../../../../store/actions/workout-action';

const WorkoutDetail: React.FC<any> = ({ navigation }) => {
  const route = useRoute<any>();
  const dispatch = useDispatch<Dispatch<any>>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const workoutDetail = useSelector(workoutDetailSelector);
  const [sheetIndex, setSheetIndex] = useState(1);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const id = route.params?.id ?? null;

  const snapPoints = useMemo(() => ['60%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);
  const leftIconPress = () => navigation.goBack();
  useEffect(() => {
    dispatch(getWorkoutById(id))
  }, [])
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateWorkout', { isNew: false });
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
          source={{ uri: workoutDetail.imageUrl }}
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
            title={workoutDetail.name}
            leftComponentStyle={styles.leftComponentStyle}
            leftComponent={
              <Icons.EllipsisIcon
                fill={primaryBlack}
                style={{ paddingHorizontal: calcWidth(15) }}
                onPress={() => setIsOpenedEditSheet(true)}
              />
            }
          />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{workoutDetail.name}</Text>
          </View>
        )}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.progressContainer}>
            <View>
              <WorkoutDetailComp
                title={"Duration"}
                time={workoutDetail.duration}
              />
            </View>
            <View style={styles.line}></View>
            <View>
              <WorkoutDetailComp
                title={"Exercises"}
                time={workoutDetail?.exercises && workoutDetail?.exercises.length.toString()}
              />
            </View>
            <View style={styles.line}></View>
            <View>
              <WorkoutDetailComp
                title={"Calories"}
                time={workoutDetail.kcal}
              />
            </View>
          </View>
          <ParagraphComponenet title="" text={workoutDetail.type} />
          <View style={styles.chipsgroup}>
            {workoutDetail.tags && <ChipsGroup elements={workoutDetail.tags} />}
          </View>
          {workoutDetail.exercises && workoutDetail.exercises.map((elem, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('WorkoutVideo', {
                    isNew: true,
                    indexItem: index,
                  });
                }}
                style={styles.workoutItem}>
                <VideoInfoCard
                  image={elem.videoUrl}
                  title={elem.name}
                  time={elem.time}
                  deleteVisable={false}
                />
              </TouchableOpacity>
            );
          })}
          <View style={styles.bottomStyle}>
            <View>
              {workoutDetail.muscules && workoutDetail.muscules.map((muscule, index) => {
                return <Text key={index} style={styles.bottomText}>{muscule.title}</Text>
              })}

            </View>
            <View
              style={styles.block}></View>
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
export default WorkoutDetail;
