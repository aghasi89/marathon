import React, {Dispatch, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import EditSheet from '../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../components/recentInfoCard/RecentInfoCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import {workoutListSelector} from '../../../../store/selectors/workout-selector';
import styles from './Workout.style';
import { deleteWorkout, getWorkouts } from '../../../../store/actions/workout-action';

const Workout: React.FC<any> = ({navigation}) => {
  const dispatch=useDispatch<Dispatch<any>>()
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const workoutList = useSelector(workoutListSelector);
  const [selectedId,setSelectedId]=useState<number>();

  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Delete',
      onSelect: () => {
        setIsOpenedEditSheet(false);
        dispatch(deleteWorkout(selectedId));
        setSelectedId(undefined)
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
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
  ];
  useEffect(()=>{
    dispatch(getWorkouts())
  },[]);
  return (
    <>
      <ScrollView style={styles.container}>
        {workoutList.map((elem, index) => {
          return (
            <View key={index}>
              <RecentInfoCard
                onPress={() => {
                  navigation.navigate('WorkoutDetail', {id: elem.id});
                }}
                info={{
                  title: elem.name,
                  imageUrl: elem.imageUrl,
                  amount: `${elem.kcal} kcal`,
                  count: elem.duration,
                  tags:elem.tags
                }}
                onLongPress={() => {
                  setIsOpenedEditSheet(true);
                  setSelectedId(elem.id)
                }}
                isDisabled={true}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateWorkout', {isNew: true});
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </>
  );
};
export default Workout;
