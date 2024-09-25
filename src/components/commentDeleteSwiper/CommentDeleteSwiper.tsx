import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icons from '../../assets/icons/svg/index'
import { ICommentItem, IUser } from '../../types/types';
import { primaryWhite } from '../../assets/styles/colors.styles';
import { calcWidth } from '../../assets/dimensions';
import CommentItem from '../commentItem/CommentItem';
import styles from './CommentDeleteSwiper.style'

interface IProps {
  comments: ICommentItem[]
  onPressToLike: (id: number) => void,
  openRepliesList: (id: string) => void
  onPressToReply: (id: string, firstName: string, lastName: string) => void
  goToUserProfilePage: (id: number) => void
  openReplies: string[]
  onPressToReplyLike: (id: string) => void
  onDeleteComment: (id: number) => void
  onDeleteCommentReply: (id: number) => void,
  user: IUser
}

const CommentSwipeListView = ({
  comments,
  onPressToLike,
  openRepliesList,
  onPressToReply,
  goToUserProfilePage,
  openReplies,
  onPressToReplyLike,
  onDeleteComment,
  onDeleteCommentReply,
  user
}: IProps) => {
  const organizedData: ICommentItem[] = [];
  comments.forEach((mainComment: ICommentItem) => {
    organizedData.push(mainComment);
    if (mainComment.reply_comment && mainComment.reply_comment.length > 0) {
      organizedData.push(...mainComment.reply_comment);
    }
  });

  const renderMainItem = ({ item }: any) => (
    <CommentItem
      likeCount={item.like_count}
      liked={item.liked}
      onPressToLike={() => onPressToLike(parseInt(item.id))}
      openRepliesList={() => openRepliesList(item.id)}
      repliesOpen={openReplies.includes(item.id)}
      onPressToReply={() => onPressToReply(item.id, item.user.user.first_name, item.user.user.last_name)}
      goToUserProfilePage={(id) => goToUserProfilePage(id)}
      data={item} />
  );

  const renderReplyItem = ({ item }: any) => {
    if (openReplies.includes(item.feed_comment)) {
      return <CommentItem
        isReply={true}
        liked={item.liked}
        likeCount={item.like_count}
        onPressToLike={() => onPressToReplyLike(item.id)}
        goToUserProfilePage={(id) => goToUserProfilePage(id)}
        data={item} />
    } else {
      return <></>
    }
  }

  const HiddenItemWithActions = (props: any) => {
    const {
      rightActionActivated,
      rowActionAnimatedValue,
      onDelete,
    } = props;
    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: calcWidth(50),
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View>
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}>
          <View style={[styles.backRightBtn]}>
            <TouchableOpacity
              style={{ padding: calcWidth(5) }}
              onPress={onDelete}>
              <Icons.DeleteIcon fill={primaryWhite} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(65);
    const rowHeightAnimatedValue = new Animated.Value(65);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => {
          if (data.reply_comment) {
            onDeleteComment(data.id)
          } else {
            onDeleteCommentReply(data.id)
          }
        }}
      />
    );
  };

  return (
    <SwipeListView
      data={organizedData}
      renderItem={({ item }: any) => (item.feed_comment ? renderReplyItem({ item }) : renderMainItem({ item }))}
      renderHiddenItem={({ item, rowMap }: any) =>
        item.user.id === user.id ? renderHiddenItem(item, rowMap) : null
      }
      leftOpenValue={60}
      rightOpenValue={-60}
      disableRightSwipe={true}
      keyExtractor={(item) => item.id.toString()}
      nestedScrollEnabled={true}
    />
  );
};

export default CommentSwipeListView;