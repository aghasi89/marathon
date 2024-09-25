import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
import Icons from '../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../../../components/textWithicon/TextWithIcon';
import UpploadButton from '../../../../../components/uploadbutton/UploadButton';
import NumberInput from '../../../../../components/numberInput/NumberInput';
import TextInputComponent from '../../../../../components/textInput/TextInputComponent';
import HeaderWithImage from '../../../../../components/headerWithImage/HeaderWithImage';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import { PrimeryButton } from '../../../../../components/buttons';
import VideoExerciseCard from '../../../../../components/videoExerciseCard/VideoExerciseCard';
import RestCard from '../../../../../components/restCard/RestCard';
import { IExercise, IRest } from '../../../../../types/types';
import styles from './CreateWorkout.style';
import hook from './CreateWorkout-hook';
import { changeWorkout, createWorkout } from '../../../../../store/actions/workout-action';

const CreateWorkout: React.FC<any> = ({ navigation }) => {
  const {
    state,
    dispatchState,
    isOpen,
    setIsOpen,
    deleteEquipementItem,
    deleteMusclesItem,
    deleteTagsItem,
    setValue,
    setSelectedLevel,
    deleteRestItem,
    deleteExercise,
    addRest,
    setKcal,
    dispatch,
    setImageUrl,
    setName,
    setType,
    workoutDetail
  } = hook();
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
        state.isNew ?dispatch(createWorkout({
          imageUrl: state.exerciseImageUrl,
          name: state.exerciseName,
          count: state.exercisesCount,
          duration: state.duration,
          exercises: state.exercises,
          rests: state.rest,
          kcal: state.valueKcal,
          level: state.selectedLevel,
          equipents: state.selectedEquipement,
          muscules: state.selectedMuscles,
          tags: state.selectedTags,
          type: state.typeValue,
        })):
        dispatch(changeWorkout({
          workout: {
            imageUrl: state.exerciseImageUrl,
          name: state.exerciseName,
          count: state.exercisesCount,
          duration: state.duration,
          exercises: state.exercises,
          rests: state.rest,
          kcal: state.valueKcal,
          level: state.selectedLevel,
          equipents: state.selectedEquipement,
          muscules: state.selectedMuscles,
          tags: state.selectedTags,
          type: state.typeValue,
          },
          id: workoutDetail.id
        }))
        setIsOpen(false);
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
          {state.exerciseImageUrl ? (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{ uri: state.exerciseImageUrl }}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={() =>setImageUrl('')}
              />
            </View>
          ) : (
            <UpploadButton
              goBackImage={image => setImageUrl(image)}
            />
          )}
        </View>
        <View style={styles.recipeName}>
          <Text style={styles.title}>Exercise Name</Text>
          <TextInputComponent
            value={state.exerciseName}
            onChangetext={(value: string) => setName(value)}
            close={() => { }}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Trainer fill={formFieldGrey} />}
            text={'Exercises'}
          />
          <Text style={styles.text}>{state.exercises.length} Exersises</Text>
          <Text style={styles.text}>{state.duration} min</Text>
        </View>
        {state.exercises.length > 0 && (
          <View style={styles.restContainer}>
            {state.exercises.map(
              (
                exercise: IExercise,
                index: number,
              ): JSX.Element => {
                return (
                  <View key={index} style={styles.mealItem}>
                    <VideoExerciseCard
                      image={exercise.videoUrl}
                      title={exercise.name}
                      time={exercise.time}
                      exerciseCount={state.exercisesCount}
                      onPressDelete={() => {
                        deleteExercise(index);
                      }}
                      onPressCopy={() => { }}
                    />
                  </View>
                );
              },
            )}
          </View>
        )}
        {state.rest.length > 0 && (
          <View style={styles.restContainer}>
            {state.rest.map((restItem: IRest, index: number) => {
              return (
                <View key={index} style={styles.mealItem}>
                  <RestCard
                    restCount={restItem.restCount}
                    restTime={restItem.restTime}
                    value={restItem.value}
                    setValue={setValue}
                    onPressDelete={() => {
                      deleteRestItem(index);
                    }}
                    onPressCopy={() => { }}
                  />
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.rowContainer}>
          <PrimeryButton
            title="Exercise"
            type="outline"
            onPress={() => {
              navigation.navigate('ImportExercise');
            }}
            style={styles.button}
            Icon={<Icons.Trainer fill={formFieldGrey} />}
          />
          <PrimeryButton
            title="Rest"
            type="outline"
            onPress={addRest}
            style={styles.button}
            Icon={<Icons.Rest />}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Calories fill={formFieldGrey} />}
            text={'Calories (kcal)'}
          />
          <View style={styles.numberInputContainer}>
            <NumberInput value={state.valueKcal} onChangeValue={setKcal} />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Calories fill={formFieldGrey} />}
            text={'Level'}
          />
        </View>
        <View style={styles.exercisRowContainer}>
          {state.levelList.map((elem, index) => {
            return (
              <PrimeryButton
                key={index}
                title={elem.title}
                type={elem.title.includes(state.selectedLevel) ? 'default' : 'outline'}
                onPress={() => {
                  setSelectedLevel(elem);
                }}
                textStyle={styles.textStyle}
                style={styles.levelItem}
              />
            );
          })}
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.EquipementIcon fill={formFieldGrey} />}
            text={'Equipement'}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('ImportEquipement', { type: 'workout',equipments:state.selectedEquipement  });
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
              navigation.navigate('ImportMuscles', { type: 'workout',muscles:state.selectedMuscles });
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedMuscles.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedMuscles}
              onDelete={deleteMusclesItem}
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
              navigation.navigate('ImportTags', { type: 'workout',tags:state.selectedTags });
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedTags.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedTags}
              onDelete={deleteTagsItem}
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
            onChangetext={(value: string) =>setType(value)}
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
export default CreateWorkout;
