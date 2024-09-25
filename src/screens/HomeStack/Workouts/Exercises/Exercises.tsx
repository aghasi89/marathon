import React, {Dispatch, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import EditSheet from '../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../components/recentInfoCard/RecentInfoCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import {exerciseListSelector} from '../../../../store/selectors/execise-selector';
import styles from './Exercises.style';
import { deleteExercise, getExercises } from '../../../../store/actions/exercises-action';

const Exercises: React.FC<any> = ({navigation}) => {
  const dispatch=useDispatch<Dispatch<any>>()
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [selectedId,setSelectedId]=useState<number>()
  const exerciseList = useSelector(exerciseListSelector);
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
        dispatch(deleteExercise(selectedId));
        setSelectedId(undefined)
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
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
    dispatch(getExercises())
  },[]);
  return (
    <>
      <ScrollView style={styles.container}>
        {exerciseList.length>0?exerciseList.map((elem, index) => {
          return (
            <View key={index}>
              <RecentInfoCard
                onPress={() => {
                  navigation.navigate('ExerciseDetail',{id:elem.id});
                }}
                info={{
                  title: elem.name,
                  imageUrl: elem.videoUrl,
                  amount: `${elem.kcal} kcal`,
                  count:elem.time,
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
        }):<Text style={styles.noDataText}>No data</Text>}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateExercise',{isNew:true});
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
export default Exercises;
