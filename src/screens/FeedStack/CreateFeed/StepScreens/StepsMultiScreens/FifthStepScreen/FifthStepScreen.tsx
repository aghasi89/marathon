import * as React from 'react';
import {Modal, Pressable, Text, View,ScrollView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FeedCardContentButtonsGroup from '../../../../../../components/feedCard/content/buttonsGroup/FeedCardContentButtonsGroup';
import FeedCardTrainingInfo from '../../../../../../components/feedCard/content/trainingInfo/FeedCardTrainingInfo';
import MediaComponent from '../../../../Feed/AboutFeed/components/MediaComponent/MediaComponent';
import FeedCardFooter from '../../../../../../components/feedCard/footer/FeedCardFooter';
import HashtagsComponent from '../../../../Feed/AboutFeed/components/Hashtags/Hashtags';
import ContextList from '../../../../Feed/AboutFeed/components/ContextList/ContextList';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import hook from './FifthStepScreen.hook';
import styles from './FifthStepScreen.style';

const FifthStepScreen: React.FC = () => {
  const {
    t,
    data,
    imagePressHandler,
    imageViewModalVisibility,
    imageViewModalCloseHandle,
    images,
    state,
  } = hook();
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <MediaComponent
        {...data.mediaData}
          type={data.type}
          onImagePress={imagePressHandler}
        />
        <FeedCardFooter
          commentIconPress={() => {}}
          energyIconPress={() => {}}
          shareIconPress={() => {}}
          bookmarkIconPress={() => {}}
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
        <View style={styles.liveAndPackageInfoContainer}>
          {data.traningInfoData && (
            <FeedCardTrainingInfo
              {...data.traningInfoData}
              type={state.feedType}
            />
          )}
          {data.liveInfoData && (
            <FeedCardContentButtonsGroup
              containerStyle={styles.buttonsGroupContainer}
              joinButtonPress={() => {}}
              openChannelButtonPress={() => {}}
              openGroupeButtonPress={() => {}}
              openChatButtonPress={() => {}}
              {...data.liveInfoData}
            />
          )}
        </View>
        <View style={styles.hashtags}>
        {data.hashtagsData && (
          <HashtagsComponent
            containerStyle={styles.hashtagsContainer}
            data={data.hashtagsData}
          />
        )}
        </View>
        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        )}
        {data.context && <ContextList context={data.context} />}
      </ScrollView>
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
    </View>
  );
};

export default FifthStepScreen;
