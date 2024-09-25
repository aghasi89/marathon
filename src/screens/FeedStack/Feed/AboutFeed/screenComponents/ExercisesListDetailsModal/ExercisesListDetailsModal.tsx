import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import {useTranslation} from 'react-i18next';
import SelectMuscles from '../../../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import VideoPlayerComponent from '../../../../../../components/videoPlayers/videoPlayer/videoPlayer';
import BottomModal from '../../../../../../components/bottomModal/bottomModal';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import {IWorkoutSelectedMultiItem} from '../../../../../../types/types';
import getSelectedBodyParts from '../../../../../../utils/getSelectedBodyParts';
import {BodyParts} from '../../../../../../datas/bodyParts';
import {WorkoutLevel} from '../../../../../../types/enums';
import Icons from '../../../../../../assets/icons/svg';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';
import RecipesChipsGroup from '../../../../Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import SelectedCardsView from '../../../../CreateFeed/components/SelectedCardsView/SelectedCardsView';
import styles from './ExercisesListDetailsModal.style';
import {BunnyAdministrativeDirectories} from '../../../../../../utils/bunny.net/bunnyConfig';

type Props = {
  data: IWorkoutSelectedMultiItem;
  onClose: () => void;
  isVisible: boolean;
  onIndexChange?: (action: 'next' | 'previous') => void;
  onSave?: () => void;
  indexInfo?: string;
};
const ExercisesListDetailsModal: React.VFC<Props> = ({
  data,
  onClose,
  isVisible,
  onIndexChange,
  indexInfo,
}) => {
  const {t} = useTranslation();
  const editorRef = useRef<any>();
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.webviewBridge.reload();
    }
  }, [editorRef.current, data]);

  return (
    <BottomModal
      customStyles={{
        containerStyle: styles.modalContent,
      }}
      onClose={onClose}
      onPressIndicator={onClose}
      visible={isVisible}
      children={
        <View style={styles.container}>
          <ScrollView overScrollMode="never" style={styles.scrollContainer}>
            <VideoPlayerComponent
              thumbnail={data?.url ?? ''}
              videoUrl={data.videoUrl ?? ''}
            />
            {data.title && (
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{data.title}</Text>
              </View>
            )}
            <RecipesChipsGroup
              data={{
                elements: [
                  {
                    title: t(`${data.level}`) ?? '',
                    icon:
                      data.level === WorkoutLevel.Beginner ? (
                        <Icons.BegginerLevel fill={primaryBlue} />
                      ) : data.level === WorkoutLevel.Intermediate ? (
                        <Icons.IntermediadLevel fill={primaryBlue} />
                      ) : data.level === WorkoutLevel.Advanced ? (
                        <Icons.AdvancedLevel fill={primaryBlue} />
                      ) : null,
                  },
                ],
              }}
              onChipPress={() => {}}
              containerStyle={styles.chipsContainer}
              itemContainerStyle={styles.chipItem}
            />
            {data.description && (
              <RichEditor
                ref={editorRef}
                initialContentHTML={data.description}
                contentMode="mobile"
                disabled
                containerStyle={styles.descriptionContainer}
              />
            )}
            <SelectMuscles
              disabled
              showTitle={true}
              showSelectedMuscles={true}
              selectedMuscles={data.body_parts ?? []}
              dataList={getSelectedBodyParts(BodyParts, data.body_parts)}
              data={data.body_parts ?? []}
            />
            {data.equipments && data.equipments.length > 0 && (
              <View style={styles.equipmentContainer}>
                <View style={styles.equipmentTitleContainer}>
                  <Text style={styles.equipmentTitle}>{t('equipment')}</Text>
                </View>
                <SelectedCardsView
                  iconsExist={false}
                  cardSize="large"
                  rowElementsCount={2}
                  dataList={data.equipments.map(item => ({
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
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => onIndexChange && onIndexChange('previous')}
              style={styles.saveButton}>
              <Icons.ArrowLeft {...styles.arrowIconsStyle} />
            </Pressable>
            <Text style={styles.indexInfoText}>{indexInfo}</Text>
            <Pressable
              onPress={() => onIndexChange && onIndexChange('next')}
              style={styles.saveButton}>
              <Icons.ArrowRightFill {...styles.arrowIconsStyle} />
            </Pressable>
          </View>
        </View>
      }
    />
  );
};
export default ExercisesListDetailsModal;
