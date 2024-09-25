import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import HeaderWithImage from '../../../../../../components/headerWithImage/HeaderWithImage';
import Icons from '../../../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../../../assets/styles/colors.styles';
import ChipsGroup from '../../../../../../components/chipsGroup/ChipsGroup';
import ParagraphComponenet from '../../../../../../components/paragraph/Paragraph';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import EditSheet from '../../../../../../components/editSheet/EditSheet';
import {execiseDetailSelector} from '../../../../../../store/selectors/execise-selector';
import MainHeader from '../../../../../../components/headers/mainHeader/MainHeader';
import {
  workoutDetailSelector,
  workoutListSelector,
} from '../../../../../../store/selectors/workout-selector';
import BottomBarLeftAndRight from '../../../../../../components/bottomBar/BottomBarLeftAndRight/BottomBarLeftAndRight';
import styles from './WorkoutVideo.style';

const WorkoutVideo: React.FC<any> = ({navigation}) => {
  const exerciseDetail = useSelector(execiseDetailSelector);
  const workouts = useSelector(workoutListSelector);
  const workoutDetail = useSelector(workoutDetailSelector);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const leftIconPress = () => navigation.goBack();
  const route = useRoute<any>();
  const index = route.params?.indexItem ?? null;
  const indexWorkout = route.params?.indexWorkout ?? null;

  const list = [
    {title: workouts[indexWorkout].count, id: 1, iconType: 'clock'},
    {title: workouts[indexWorkout].type, id: 2},
    {title: workouts[indexWorkout].saleType, id: 3},
  ];
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        navigation.navigate('CreateWorkout', {isNew: false});
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
    <>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={workouts[indexWorkout].title}
        leftComponentStyle={styles.leftComponentStyle}
        leftComponent={
          <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={() => setIsOpenedEditSheet(true)}
          />
        }
      />
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.headerWithImageContainer}>
            <HeaderWithImage source={{uri: exerciseDetail.imageUrl}} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {workoutDetail.workoutItemList[index].title}
          </Text>
          <View style={styles.chipsgroup}>
            <ChipsGroup elements={list} />
          </View>
          <ParagraphComponenet title="" text={exerciseDetail.description} />
          <View style={styles.bottomStyle}>
            <View>
              <Text style={styles.bottomText}>Abs</Text>
              <Text style={styles.bottomText}>Quadricepts</Text>
              <Text style={styles.bottomText}>Chest</Text>
            </View>
            <View
              style={{
                width: calcWidth(124),
                height: calcHeight(154),
                backgroundColor: '#589CFE',
              }}></View>
          </View>
        </View>
      </ScrollView>
      {workoutDetail.workoutItemList.length > 1 && (
        <View style={styles.bottomBar}>
          <BottomBarLeftAndRight
            count={index + 1}
            total={workoutDetail.workoutItemList.length}
            onPressBack={() => {}}
            onPressNext={() => {}}
          />
        </View>
      )}
      <EditSheet
        isVisible={isOpenedEditSheet}
        height={calcHeight(400)}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </>
  );
};
export default WorkoutVideo;
