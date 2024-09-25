import React from 'react';
import { View, Pressable, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import FeedCardContentButtonsGroup from '../../../../../../components/feedCard/content/buttonsGroup/FeedCardContentButtonsGroup';
import FeedCardTrainingInfo from '../../../../../../components/feedCard/content/trainingInfo/FeedCardTrainingInfo';
import HeaderWithUserInfo from '../../../../../../components/headers/headerWithUserInfo/HeaderWithUserInfo';
import FeedCardFooter from '../../../../../../components/feedCard/footer/FeedCardFooter';
import {
  formFieldGrey,
  inputBorder,
  lightPeriwinkle,
} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import { ISelectedFeedData } from '../../../../../../types/types';
import MediaComponent from '../../components/MediaComponent/MediaComponent';
import CommentMessage from '../../components/CommentMessage/CommentMessage';
import CommentInput from '../../components/CommentInput/CommentInput';
import ContextList from '../../components/ContextList/ContextList';
import HashtagsComponent from '../../components/Hashtags/Hashtags';
import styles from './MultiTypeFeed.style';

type Props = {
  onImagePress: (imageUrl?: string) => void;
  backIconPress: () => void;
  onDotsIconPress: (id?: number) => void;
  commentIconPress: (id?: number) => void;
  energyIconPress: (actionType: 'press' | 'longPress') => void;
  shareIconPress: (data: ISelectedFeedData) => void;
  bookmarkIconPress: () => void;
  onInputValueChange: (text: string) => void;
  onSendIconPress: () => void;
  onCommentViewRepliesPress: () => void;
  onCommentReplyPress: (id?: number) => void;
  onCommentLikePress: (id?: number) => void;
  joinButtonPress: () => void;
  openChannelButtonPress: () => void;
  openGroupeButtonPress: () => void;
  openChatButtonPress: () => void;
  isLoading?: boolean;
  data: ISelectedFeedData;
  navigateToUserPage?: (id?: number) => void;
};

const MultiTypeFeed: React.FC<Props> = ({
  onImagePress,
  backIconPress,
  onDotsIconPress,
  commentIconPress,
  energyIconPress,
  shareIconPress,
  bookmarkIconPress,
  onInputValueChange,
  onSendIconPress,
  onCommentViewRepliesPress,
  onCommentReplyPress,
  onCommentLikePress,
  joinButtonPress,
  openChannelButtonPress,
  openGroupeButtonPress,
  openChatButtonPress,
  isLoading,
  data,
  navigateToUserPage,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <HeaderWithUserInfo
        onPressToNavigate={() => {
          navigateToUserPage && navigateToUserPage(data?.userId);
        }}
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
      <ScrollView overScrollMode="never" removeClippedSubviews={true}>
        <MediaComponent
          {...data.mediaData}
          type={data.type}
          onImagePress={imageUrl => onImagePress(imageUrl)}
        />
        <FeedCardFooter
          commentIconPress={() => commentIconPress(data?.id)}
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
        {(data.type === 'package' || data.type === 'live') && (
          <View style={styles.liveAndPackageInfoContainer}>
            {data.traningInfoData ? (
              <FeedCardTrainingInfo
                {...data.traningInfoData}
                isOwner={data.liveInfoData?.isOwner}
                type={data.type}
              />
            ) : null}
            {data.liveInfoData && (
              <FeedCardContentButtonsGroup
                isLoading={isLoading}
                containerStyle={styles.buttonsGroupContainer}
                joinButtonPress={joinButtonPress}
                openChannelButtonPress={openChannelButtonPress}
                openGroupeButtonPress={openGroupeButtonPress}
                openChatButtonPress={openChatButtonPress}
                isExpired={data.isExpired}
                {...data.liveInfoData}
              />
            )}
          </View>
        )}
        {data.hashtagsData && (
          <HashtagsComponent
            containerStyle={styles.hashtagsContainer}
            data={data.hashtagsData}
          />
        )}
        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        )}
        {data.context && <ContextList context={data.context} />}
        {/* <CommentInput
          onChange={onInputValueChange}
          value={data.inputValue}
          disable={data.inputDisable}
          placeholder={t('addComment') ?? ''}
          onSendIconPress={onSendIconPress}
          placeholderTextColor={formFieldGrey}
          customStyle={{
            containerStyle: styles.inputContainer,
            inputStyle: styles.inputStyle,
          }}
        /> */}
        <View>
          {data.commentData?.map((el, index) => {
            return (
              <CommentMessage
                onLikePress={() => onCommentLikePress(el?.id)}
                onReply={() => onCommentReplyPress(el.id)}
                onViewRepliesPress={onCommentViewRepliesPress}
                comment={el.comment}
                isLiked={el.isLiked}
                likesCount={el.likesCount}
                repliesCount={el.repliesCount}
                userImageURL={el.userImageURL}
                userName={el.userName}
                comentDate={el.comentDate}
                containerStyle={styles.commentItemContainer}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default MultiTypeFeed;
