import React, {useCallback, useRef, useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {RichEditor} from 'react-native-pell-rich-editor';
import {useTranslation} from 'react-i18next';
import SelectMuscles from '../../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import VideoPlayerComponent from '../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import SliderComponent from '../../../../../components/sliderComponent/SliderComponent';
import {primaryBlue} from '../../../../../assets/styles/colors.styles';
import {IWorkoutSelectedMultiItem} from '../../../../../types/types';
import {calcHeight} from '../../../../../assets/dimensions';
import getSelectedBodyParts from '../../../../../utils/getSelectedBodyParts';
import {BodyParts} from '../../../../../datas/bodyParts';
import {WorkoutLevel} from '../../../../../types/enums';
import Icons from '../../../../../assets/icons/svg';
import {downloadMediaFromBunny} from '../../../../../utils/bunny.net';
import {formatTimeDuration} from '../../../../../utils/formatTimeDuration';
import RecipesChipsGroup from '../../../Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import SelectedCardsView from '../../components/SelectedCardsView/SelectedCardsView';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './ChangeExeciseModal.style';
import {BunnyAdministrativeDirectories} from '../../../../../utils/bunny.net/bunnyConfig';

type Props = {
  exercise: IWorkoutSelectedMultiItem;
  onSave: (value?: IWorkoutSelectedMultiItem) => void;
};

const ChangeExeciseModal = ({sheetId, payload}: SheetProps<Props>) => {
  const {t} = useTranslation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const [state, setState] = useState<IWorkoutSelectedMultiItem | undefined>();

  if (!payload) return <></>;

  const exerciseDurationChangeHandle = useCallback(
    (value: number) => {
      const exercise = {...payload?.exercise};
      setState({
        ...exercise,
        time: value.toString(),
        id: exercise.id ?? 0,
      });
    },
    [payload.exercise],
  );

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      indicatorStyle={{marginVertical: calcHeight(15)}}
      defaultOverlayOpacity={0.3}>
      <View>
        <ScrollView
          overScrollMode="never"
          {...scrollHandlers}
          style={styles.scrollContainer}>
          <VideoPlayerComponent
            thumbnail={payload?.exercise?.url}
            videoUrl={payload?.exercise?.videoUrl}
          />
          {payload?.exercise?.title && (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{payload?.exercise?.title}</Text>
            </View>
          )}
          <RecipesChipsGroup
            data={{
              elements: [
                {
                  title: t(`${payload?.exercise?.level}`) ?? '',
                  icon:
                    payload?.exercise?.level === WorkoutLevel.Beginner ? (
                      <Icons.BegginerLevel fill={primaryBlue} />
                    ) : payload?.exercise?.level ===
                      WorkoutLevel.Intermediate ? (
                      <Icons.IntermediadLevel fill={primaryBlue} />
                    ) : payload?.exercise?.level === WorkoutLevel.Advanced ? (
                      <Icons.AdvancedLevel fill={primaryBlue} />
                    ) : null,
                },
              ],
            }}
            onChipPress={() => {}}
            containerStyle={styles.chipsContainer}
            itemContainerStyle={styles.chipItem}
          />
          <RichEditor
            initialContentHTML={payload?.exercise?.description}
            androidHardwareAccelerationDisabled={true}
            disabled
            containerStyle={styles.descriptionContainer}
          />
          <SectionTitle
            containerStyle={styles.sectionTitles}
            title={t('duration')}
          />
          <View style={styles.padding}>
            <SliderComponent
              lable={t('exersiceDuration')}
              value={
                state?.time
                  ? state.time.toString() ?? ''
                  : payload?.exercise?.time?.toString() ?? ''
              }
              minCount={0}
              sliderValue={payload?.exercise?.time}
              maxCount={600}
              progressCount={0}
              onValueChange={value => {
                exerciseDurationChangeHandle(value);
              }}
            />
          </View>
          <SelectMuscles
            disabled
            showTitle={true}
            showSelectedMuscles={true}
            selectedMuscles={payload?.exercise?.body_parts ?? []}
            dataList={getSelectedBodyParts(
              BodyParts,
              payload?.exercise?.body_parts,
            )}
            data={payload?.exercise?.body_parts ?? []}
          />
          {payload?.exercise?.equipments &&
            payload?.exercise?.equipments.length > 0 && (
              <View style={styles.equipmentContainer}>
                <View style={styles.equipmentTitleContainer}>
                  <Text style={styles.equipmentTitle}>{t('equipment')}</Text>
                </View>
                <SelectedCardsView
                  iconsExist={false}
                  cardSize="large"
                  rowElementsCount={2}
                  dataList={payload?.exercise?.equipments.map(item => ({
                    id: item.id,
                    name: item.name_en,
                    url: downloadMediaFromBunny({
                      public_key: item.image,
                      mediaType: 'image',
                      customDir: BunnyAdministrativeDirectories.EQUIPMENT,
                    })?.url,
                  }))}
                />
              </View>
            )}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                payload.onSave(state);
                SheetManager.hide('changeExeciseSheet');
              }}
              style={styles.saveButton}>
              <Text style={styles.saveButtonTitle}>{t('saveChanges')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
};
export default ChangeExeciseModal;
