import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import Icons from '../../../assets/icons/svg'
import { primaryBlue, primaryGrey } from '../../../assets/styles/colors.styles';
import { ISelectedFeedRecipeChipsData } from '../../../types/types';
import { WorkoutLevel } from '../../../types/enums';
import { calcHeight } from '../../../assets/dimensions';
import { BodyParts } from '../../../datas/bodyParts';
import Header from '../../ProfileStack/components/Header/Header';
import RecipesChipsGroup from '../../FeedStack/Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import MediaComponent from '../../FeedStack/Feed/AboutFeed/components/MediaComponent/MediaComponent';
import SelectMuscles from '../CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import ActionSheet from '../../FeedStack/Feed/AboutFeed/components/ActionSheet/ActionSheet';
import SelectedCardsView from '../../FeedStack/CreateFeed/components/SelectedCardsView/SelectedCardsView';
import ExerciseDetailPageHook from './ExerciseDetailPage-hook';
import styles from './ExerciseDetailPage.style';

const ExerciseDetailPage: React.FC = () => {

  const {
    t,
    goBack,
    onDotsIconPress,
    data,
    selectedExercise,
    getDifference,
    actionSheetCloseHandle,
    editPressHandle,
    deletePressHandle,
    actionSheetVisibility,
    loader,
    equipmentModalData
  } = ExerciseDetailPageHook()

  if (!selectedExercise || loader) return <ActivityIndicator size={'large'} style={{ flex: 1 }} />

  const chipsData: ISelectedFeedRecipeChipsData = {
    elements: [
      {
        title: t(`${selectedExercise.time}`) ?? '',
        icon: <Icons.Clock fill={primaryBlue} />
      },
      {
        title: t(`${selectedExercise.level}`) ?? '',
        icon:
          selectedExercise.level === WorkoutLevel.Beginner ? (
            <Icons.BegginerLevel fill={primaryBlue} />
          ) : selectedExercise.level === WorkoutLevel.Intermediate ? (
            <Icons.IntermediadLevel fill={primaryBlue} />
          ) : selectedExercise.level === WorkoutLevel.Advanced ? (
            <Icons.AdvancedLevel fill={primaryBlue} />
          ) : null,
      }
    ],
  };

  const actionSheetData = [
    {
      title: t('edit'),
      Icon: <Icons.Edit {...styles.actionSheetIcon} />,
      onSelect: editPressHandle,
    },
    {
      title: t('delete'),
      Icon: <Icons.DeleteIcon {...styles.actionSheetIcon} />,
      onSelect: deletePressHandle,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        goBack={goBack}
        title={selectedExercise.title ?? ""}
        RightComponent={
          <Pressable style={styles.threeDots} onPress={onDotsIconPress}>
            <Icons.EllipsisIcon fill={primaryGrey} />
          </Pressable>
        }
      />
      <ScrollView overScrollMode='never'>
        {data && <MediaComponent mediaList={data.mediaData?.mediaList} iconsShow={false} />}
        <RecipesChipsGroup
          data={chipsData}
          onChipPress={() => { }}
          containerStyle={styles.chipsContainer}
          itemContainerStyle={styles.chipItem}
        />
        {
          data && <RichEditor
            initialContentHTML={data.description}
            androidHardwareAccelerationDisabled={true}
            disabled
            containerStyle={styles.descriptionContainer}
          />
        }
        {
          selectedExercise && selectedExercise.body_parts && <View style={styles.bodyPartsContainer}>
            <Text style={styles.bodyPartsTitle}>{t('bodyParts')}</Text>
            <SelectMuscles
              disabled
              showSelectedMuscles={true}
              selectedMuscles={selectedExercise.body_parts ?? []}
              dataList={getDifference(BodyParts, selectedExercise.body_parts)}
              data={selectedExercise.body_parts ?? []}
            />
          </View>
        }
        {
          equipmentModalData && equipmentModalData.length > 0 && <View style={{ marginTop: calcHeight(50) }}>
            <Text style={[styles.bodyPartsTitle, styles.equipmentTitle]}>{t('equipment')}</Text>
            <SelectedCardsView
              rowElementsCount={2}
              dataList={equipmentModalData}
              cardSize='large'
              iconsExist={false}
            />
          </View>
        }
      </ScrollView>
      <ActionSheet
        data={actionSheetData}
        onClose={actionSheetCloseHandle}
        visibility={actionSheetVisibility}
        height={calcHeight(230)}
      />
    </View>
  );
};
export default ExerciseDetailPage;
