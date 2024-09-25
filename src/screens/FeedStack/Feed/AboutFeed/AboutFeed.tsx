import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import { calcHeight } from '../../../../assets/dimensions';
import MultiSelectModalWithImageCards from '../../CreateFeed/components/MultiSelectModalWithImageCards/MultiSelectModalWithImageCards';
import SelectMuscles from '../../../ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import Toaster from '../../../../components/toester/Toester';
import getSelectedBodyParts from '../../../../utils/getSelectedBodyParts';
import { BodyParts } from '../../../../datas/bodyParts';
import WorkoutTypeFeed from './screenComponents/WorkoutTypeFeed/WorkoutTypeFeed';
import ExercisesListDetailsModal from './screenComponents/ExercisesListDetailsModal/ExercisesListDetailsModal';
import RecipesTypeFeed from './screenComponents/RecipesTypeFeed/RecipesTypeFeed';
import MultiTypeFeed from './screenComponents/MultiTypeFeed/MultiTypeFeed';
import ActionSheet from './components/ActionSheet/ActionSheet';
import hooks from './AboutFeed-hook';
import styles from './AboutFeed.style';
import InputComponent from '../../CreateFeed/components/InputComponent/InputComponent';
import { PrimeryButton } from '../../../../components/buttons';
import HeaderComponent from '../../CreateFeed/components/Header/Header';
import BottomModal from '../../../../components/bottomModal/bottomModal';
import ActionModal from '../../../../components/actionModal/ActionModal';

const AboutFeed: React.FC = () => {
  const {
    images,
    imageViewModalVisibility,
    imageViewModalCloseHandle,
    feedData,
    backIconPressHandler,
    imagePressHandler,
    recipeChipPressHandle,
    bookmarkIconPressHandle,
    commentIconPressHandle,
    energyIconPressHandle,
    dotsIconPressHandle,
    shareIconPressHandle,
    inputValueChangeHandle,
    sendIconPressHandle,
    commentLikePressHandle,
    commentReplyPressHandle,
    commentViewRepliesPressHandle,
    joinButtonPressHandle,
    openChannelButtonPressHandle,
    openChatButtonPressHandle,
    openGroupeButtonPressHandle,
    actionSheetCloseHandle,
    actionSheetVisibility,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    t,
    selectedFeed,
    user,
    bodyPartsModalVisibility,
    bodyPartsModalCloseHandle,
    equipmentsModalVisibility,
    equipentsModalCloseHandle,
    equipentsButtonPress,
    bodyPartsButtonPressHandle,
    exerciseItemPressHandle,
    exerciseModalCloseHandle,
    exerciseModalVisibility,
    selectedExerciseIndex,
    selectedExerciseChangeHandle,
    startButtonPressHandle,
    loading,
    joining,
    autoplay,
    navigateUserPage,
    reportModalVisible,
    repotModalCloseHandle,
    reportCategories,
    selectReportType,
    selectedStepIndex,
    reportValue,
    backIconPressHandle,
    setReportValue,
    reportHandler,
    saveHandler,
    questionsModalVisible,
    questionsModalCloseHandle,
    askQuestionsHandle,
    lang
  } = hooks();
  const actionSheetDataforUser = [
    {
      title: t('hide'),
      Icon: <Icons.Hide {...styles.actionSheetIcon} />,
      onSelect: hidePressHandle,
    },
    {
      title: t('report'),
      Icon: <Icons.ReportIcon {...styles.actionSheetIcon} />,
      onSelect: reportPressHandle,
    },
    {
      title: t('block'),
      Icon: <Icons.Block {...styles.actionSheetIcon} />,
      onSelect: blockPressHandle,
    },
    {
      title: t('cancel'),
      Icon: <Icons.Close {...styles.actionSheetIcon} />,
      onSelect: canclePressHandle,
    },
  ];

  const actionSheetData = [
    // {
    //   title: t('share'),
    //   Icon: <Icons.Repost {...styles.actionSheetIcon} />,
    //   onSelect: sharePressHandle,
    // },
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
    {
      title: t('cancel'),
      Icon: <Icons.Close {...styles.actionSheetIcon} />,
      onSelect: canclePressHandle,
    },
  ];
  const renderReports = () => {
    switch (selectedStepIndex) {
      case 1:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportReason`)}</Text>
            <FlatList
              data={reportCategories}
              keyExtractor={item => item.id?.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => selectReportType(item)}
                  style={styles.reportItem}
                  key={index}>
                  <Text style={styles.reportItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportInfo`)}</Text>
            <InputComponent
              multiline
              onChange={text => {
                setReportValue(text);
              }}
              containerStyle={styles.reportInput}
              value={reportValue}
            />
            <PrimeryButton
              onPress={reportHandler}
              title={t(`report`) ?? ''}
              type="default"
              style={styles.applyButton}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.reportQuestion}>{t(`reportAnswer`)}</Text>
            <PrimeryButton
              onPress={saveHandler}
              title={t(`save`) ?? ''}
              type="default"
              style={styles.applyButton}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderItem = () => {
    switch (feedData.type) {
      case 'basic':
      case 'live':
      case 'article':
      case 'package':
        return (
          <MultiTypeFeed
            navigateToUserPage={navigateUserPage}
            isLoading={joining}
            backIconPress={backIconPressHandler}
            bookmarkIconPress={bookmarkIconPressHandle}
            commentIconPress={commentIconPressHandle}
            energyIconPress={energyIconPressHandle}
            onCommentLikePress={commentLikePressHandle}
            joinButtonPress={joinButtonPressHandle}
            onCommentReplyPress={commentReplyPressHandle}
            onCommentViewRepliesPress={commentReplyPressHandle}
            onDotsIconPress={dotsIconPressHandle}
            onImagePress={imagePressHandler}
            onInputValueChange={inputValueChangeHandle}
            onSendIconPress={sendIconPressHandle}
            openChannelButtonPress={openChannelButtonPressHandle}
            openChatButtonPress={openChatButtonPressHandle}
            openGroupeButtonPress={openGroupeButtonPressHandle}
            shareIconPress={shareIconPressHandle}
            data={feedData}
          />
        );
      case 'recipe':
        return (
          <RecipesTypeFeed
            navigateToUserPage={navigateUserPage}
            backIconPress={backIconPressHandler}
            bookmarkIconPress={bookmarkIconPressHandle}
            commentIconPress={commentIconPressHandle}
            energyIconPress={energyIconPressHandle}
            onCommentLikePress={commentLikePressHandle}
            joinButtonPress={joinButtonPressHandle}
            onCommentReplyPress={commentReplyPressHandle}
            onCommentViewRepliesPress={commentReplyPressHandle}
            onDotsIconPress={dotsIconPressHandle}
            onImagePress={imagePressHandler}
            onInputValueChange={inputValueChangeHandle}
            onSendIconPress={sendIconPressHandle}
            openChannelButtonPress={openChannelButtonPressHandle}
            openChatButtonPress={openChatButtonPressHandle}
            openGroupeButtonPress={openGroupeButtonPressHandle}
            shareIconPress={shareIconPressHandle}
            onRecipeChipPress={recipeChipPressHandle}
            data={feedData}
          />
        );
      case 'workout':
        return (
          <WorkoutTypeFeed
            navigateToUserPage={navigateUserPage}
            autoplay={autoplay}
            backIconPress={backIconPressHandler}
            bookmarkIconPress={bookmarkIconPressHandle}
            commentIconPress={commentIconPressHandle}
            energyIconPress={energyIconPressHandle}
            onDotsIconPress={dotsIconPressHandle}
            onImagePress={imagePressHandler}
            shareIconPress={shareIconPressHandle}
            onBodyPartsButtonPress={bodyPartsButtonPressHandle}
            onEquipentsButtonPress={equipentsButtonPress}
            onExerciseItemPress={exerciseItemPressHandle}
            onStartButtonPress={startButtonPressHandle}
            data={feedData}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <>
          {renderItem()}
          <Modal
            visible={imageViewModalVisibility}
            transparent={true}
            onRequestClose={imageViewModalCloseHandle}>
            <ImageViewer
              imageUrls={images}
              renderIndicator={() => <></>}
              enableSwipeDown={true}
              enablePreload={true}
              onCancel={imageViewModalCloseHandle}
              renderHeader={() => {
                return (
                  <Pressable
                    style={styles.closeIconContainer}
                    onPress={imageViewModalCloseHandle}>
                    <Icons.Close fill={primaryWhite} {...styles.closeIcon} />
                  </Pressable>
                );
              }}
            />
          </Modal>
          <ActionSheet
            data={
              selectedFeed?.feed?.creator == user?.id
                ? actionSheetData
                : actionSheetDataforUser
            }
            onClose={actionSheetCloseHandle}
            visibility={actionSheetVisibility}
            height={
              selectedFeed?.feed?.creator == user?.id
                ? calcHeight(350)
                : calcHeight(400)
            }
          />
          <Toaster
            height={calcHeight(700)}
            isVisible={bodyPartsModalVisibility}
            onClose={bodyPartsModalCloseHandle}
            Screen={
              <SelectMuscles
                disabled
                showTitle={true}
                showSelectedMuscles={true}
                selectedMuscles={feedData.body_parts ?? []}
                dataList={getSelectedBodyParts(BodyParts, feedData.body_parts)}
                data={feedData.body_parts ?? []}
              />
            }
          />
          <MultiSelectModalWithImageCards
            dataList={feedData.equipments}
            isVisible={equipmentsModalVisibility}
            onClose={equipentsModalCloseHandle}
            searchInputExist={false}
            cardSize="large"
            rowElementsCount={2}
            selectedList={[]}
            cardsIconExist={false}
            titleExist={true}
            title={t('equipment') ?? ''}
          />
          {!!feedData?.trainings?.length &&
            selectedExerciseIndex !== undefined && (
              <ExercisesListDetailsModal
                data={feedData?.trainings[selectedExerciseIndex]}
                isVisible={exerciseModalVisibility}
                onClose={exerciseModalCloseHandle}
                onIndexChange={selectedExerciseChangeHandle}
                indexInfo={`${t('exercises')}  ${selectedExerciseIndex + 1} / ${feedData?.trainings.length
                  }`}
              />
            )}
        </>
      )}
      <BottomModal
        customStyles={{
          containerStyle: {
            backgroundColor: primaryWhite,
          },
        }}
        onClose={repotModalCloseHandle}
        onPressIndicator={repotModalCloseHandle}
        visible={reportModalVisible}>
        <>
          <HeaderComponent
            leftIconPressHandler={backIconPressHandle}
            title={t(`report`) ?? ''}
          />
          <View style={styles.wrapper}>{renderReports()}</View>
        </>
      </BottomModal>
      <ActionModal
        visible={questionsModalVisible}
        onClose={questionsModalCloseHandle}
        onSubmit={askQuestionsHandle}
        description={t('pleaseAnswerTheQuestions') ?? ''}
        closeButtonText={t('notNow') ?? ''}
        submitButtonText={t('complete') ?? ''}
      />
    </View>
  );
};
export default AboutFeed;
