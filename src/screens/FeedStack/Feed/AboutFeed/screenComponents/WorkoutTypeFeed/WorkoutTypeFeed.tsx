import React from 'react';
import {View, Pressable, ScrollView, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import HeaderWithUserInfo from '../../../../../../components/headers/headerWithUserInfo/HeaderWithUserInfo';
import FeedCardFooter from '../../../../../../components/feedCard/footer/FeedCardFooter';
import {
  inputBorder,
  lightPeriwinkle,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import {
  ISelectedFeedData,
  ISelectedFeedRecipeChipsData,
} from '../../../../../../types/types';
import Icons from '../../../../../../assets/icons/svg';
import MediaComponent from '../../components/MediaComponent/MediaComponent';
import styles from './WorkoutTypeFeed.style';
import {PrimeryButton} from '../../../../../../components/buttons';
import RecipesChipsGroup from '../../components/RecipesChipsGroup/RecipesChipsGroup';
import {RichEditor} from 'react-native-pell-rich-editor';
import SelectButton from '../../components/SelectButton/SelectButton';
import ExerciseItemCard from '../../components/ExerciseItemCard/ExerciseItemCard';
import {WorkoutLevel} from '../../../../../../types/enums';

type Props = {
  onImagePress: (imageUrl?: string) => void;
  backIconPress: () => void;
  onDotsIconPress: (id?: number) => void;
  commentIconPress: (id?: number) => void;
  energyIconPress: (actionType: 'press' | 'longPress') => void;
  shareIconPress: (data: ISelectedFeedData) => void;
  bookmarkIconPress: () => void;
  onBodyPartsButtonPress?: () => void;
  onEquipentsButtonPress?: () => void;
  onExerciseItemPress?: (index: number) => void;
  onStartButtonPress?: () => void;
  data: ISelectedFeedData;
  autoplay?: boolean;
  navigateToUserPage?: (id?: number) => void;
};

const WorkoutTypeFeed: React.VFC<Props> = ({
  onImagePress,
  backIconPress,
  onDotsIconPress,
  commentIconPress,
  energyIconPress,
  shareIconPress,
  bookmarkIconPress,
  onBodyPartsButtonPress,
  onEquipentsButtonPress,
  onExerciseItemPress,
  onStartButtonPress,
  data,
  autoplay,
  navigateToUserPage,
}) => {
  const {t} = useTranslation();
  const chipsData: ISelectedFeedRecipeChipsData = {
    elements: [
      {title: data.hashtagsData?.feedCategory},
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
      data.calorie
        ? {
            title: data.calorie?.toString(),
            icon: <Icons.Fier {...styles.fierIconStyle} />,
          }
        : undefined,
    ],
  };

  return (
    <View style={styles.container}>
      <HeaderWithUserInfo
        onPressToNavigate={() =>
          navigateToUserPage && navigateToUserPage(data?.userId)
        }
        leftIcon={true}
        rightComponent={
          <Pressable
            style={styles.threeDots}
            onPress={() => onDotsIconPress(data.id)}>
            <Icons.EllipsisIcon fill={lightPeriwinkle} />
          </Pressable>
        }
        imageAlt={<Icons.AltImageIcon />}
        image={data.userImage}
        title={data.userName}
        subText={data.feedDate}
        subTextColor={inputBorder}
        leftIconPress={backIconPress}
      />
      <ScrollView overScrollMode="never" style={styles.scrollContainer}>
        <MediaComponent
          {...data.mediaData}
          type={data.type}
          autoplay={autoplay}
          onImagePress={imageUrl => onImagePress(imageUrl)}
        />
        <FeedCardFooter
          commentIconPress={() => commentIconPress(data.id)}
          energyIconPress={energyIconPress}
          shareIconPress={() => shareIconPress(data)}
          bookmarkIconPress={bookmarkIconPress}
          commentsCount={data.commentsCount}
          isBookmarked={data.isBookmarked}
          isLiked={data.isLiked}
          likesCount={data.likesCount}
          containerStyle={styles.likesBarContainer}
        />
        {data.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
        )}
        <PrimeryButton
          style={styles.buttonContainer}
          textStyle={styles.startButtonText}
          type="default"
          onPress={() => onStartButtonPress && onStartButtonPress()}
          title={t('startWorkout') ?? ''}
        />
        <RecipesChipsGroup
          data={chipsData}
          onChipPress={() => {}}
          containerStyle={styles.chipsContainer}
          itemContainerStyle={styles.chipItem}
        />
        {data?.description && (
          <RichEditor
            initialContentHTML={data.description}
            androidHardwareAccelerationDisabled={true}
            disabled
            containerStyle={styles.descriptionContainer}
          />
        )}
        <View style={styles.selectButtonsContainer}>
          <SelectButton
            onPress={() =>
              !!data.equipments?.length &&
              onEquipentsButtonPress &&
              onEquipentsButtonPress()
            }
            title={t('equipment') ?? ''}
            subTitle={data.selectedEquipmentsName}
          />
          {data.selectedBodyPartsName?.length !== 0 && (
            <SelectButton
              onPress={onBodyPartsButtonPress}
              containerStyle={styles.selectButton}
              title={t('bodyParts') ?? ''}
              subTitle={
                data?.body_parts?.length == 15
                  ? `${t('fullBody')}`
                  : data.selectedBodyPartsName
              }
            />
          )}
          {data?.trainings && data?.trainings.length > 0 && (
            <View style={styles.exercisesListContainer}>
              <Text style={styles.exercisesTitle}>{t('exercises')}</Text>
              {data?.trainings?.map((item, index) => (
                <ExerciseItemCard
                  hideCloseIcon={true}
                  url={item.url}
                  time={item.time}
                  name={item.name}
                  restTime={`${item.rest_time ?? '0'} ${t('sec')}`}
                  containerStyle={styles.exerciseItemContainer}
                  onPress={() =>
                    onExerciseItemPress && onExerciseItemPress(index)
                  }
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default WorkoutTypeFeed;
