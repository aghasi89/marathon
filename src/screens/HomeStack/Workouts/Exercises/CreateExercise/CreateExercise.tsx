import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { calcHeight } from '../../../../../assets/dimensions';
import Icons from '../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
} from '../../../../../assets/styles/colors.styles';
import { changeExercise, createExercise } from '../../../../../store/actions/exercises-action';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import TextWithIcon from '../../../../../components/textWithicon/TextWithIcon';
import TextInputComponent from '../../../../../components/textInput/TextInputComponent';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import ButtonGroup from '../../../../../components/buttonGroup/ButtonGroup';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import CreateExerciseHook from './CreateExercise-hook';
import styles from './CreateExercise.style';

const CreateExercise: React.FC<any> = ({ navigation }) => {
  const {
    state,
    dispatchState,
    dispatch,
    isOpen,
    setIsOpen,
    deleteEquipementItem,
    deleteMuscleItem,
    deleteTagItem,
    setName,
    setType,
    exerciseDetail,
  } = CreateExerciseHook(navigation);
  const leftIconPress = () => navigation.goBack();
  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        setIsOpen(false);
        state.isNew ?
          dispatch(createExercise({
            name: state.exerciseName,
            videoUrl: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
            equipents: state.selectedEquipement,
            muscules: state.selectedMuscles,
            tags: state.selectedTags,
            type: state.typeValue,
            time: '20 min',
            kcal: 400
          })) : dispatch(changeExercise({
            exerciese: {
              name: state.exerciseName,
              videoUrl: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
              equipents: state.selectedEquipement,
              muscules: state.selectedMuscles,
              tags: state.selectedTags,
              type: state.typeValue,
              time: '20 min',
              kcal: 400
            },
            id: exerciseDetail.id
          }))

          ;
        navigation.navigate("Workouts")
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Exercises'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
        leftComponent={
          <Text
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.save}>
            Save
          </Text>
        }
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {state.exerciseVideoUrl ? (
            <>
              <View style={styles.editContainer}>
                <TouchableOpacity style={styles.rowContainer}>
                  <Icons.Edit />
                  <Text style={styles.title}>Edit Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rowContainer}>
                  <Icons.DeleteIcon />
                  <Text style={styles.title}>Remove Video</Text>
                </TouchableOpacity>
              </View>
              <HeaderWithImage source={{ uri: state.exerciseVideoUrl }} />
            </>
          ) : (
            <View>
              <ButtonGroup
                firstTitle="Upload"
                secondTitle="Youtube"
                onFirstButtonPress={() => {
                  navigation.navigate('EditVideo');
                }}
                onSecondButtonPress={() => {
                  navigation.navigate('YouTubeVideo');
                }}
                firstTitleColor={primaryBlack}
                secondTitleColor={primaryBlack}
              />
            </View>
          )}
        </View>
        <View style={styles.exerciseName}>
          <View style={styles.exerciseNameInput}>
            <Text style={styles.title}>Exercise Name</Text>
          </View>
          <TextInputComponent
            value={state.exerciseName}
            onChangetext={(value: string) => setName(value)}
            close={() => { }}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.EquipementIcon fill={formFieldGrey} />}
            text={'Equipement'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('ImportEquipement', { type: 'exercise',equipments:state.selectedEquipement });
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedEquipement.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedEquipement}
              onDelete={deleteEquipementItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.MusclesIcon fill={formFieldGrey} />}
            text={'Muscles'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('ImportMuscles', { type: 'exercise',muscles:state.selectedMuscles });
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedMuscles.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedMuscles}
              onDelete={deleteMuscleItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Tags'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('ImportTags', { type: 'exercise',tags:state.selectedTags });
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedTags.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedTags}
              onDelete={deleteTagItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Info fill={formFieldGrey} />}
            text={'Info'}
          />
        </View>
        <View style={styles.typeHere}>
          <Text style={styles.title}>Type Here</Text>
          <TextInputComponent
            value={state.typeValue}
            onChangetext={(value: string) => setType(value)}
            close={() => { }}
          />
        </View>
      </ScrollView>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default CreateExercise;
