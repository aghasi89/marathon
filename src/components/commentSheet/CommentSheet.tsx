import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import { useTranslation } from 'react-i18next';
import {
  createComment,
  deleteComment,
  deleteRepliedComment,
  getComments,
  likeComment,
  likeReplyComment,
  postCommentReply,
  setComments,
  setFeedListAction,
  setSelectedFeedAction,
} from '../../store/actions/feed-action';
import {
  commentListSelector,
  feedListSelector,
  selectedFeedSelector,
} from '../../store/selectors/feed-selector';
import { IFeedItem, IFeedListItem } from '../../types/types';
import { primaryBlue } from '../../assets/styles/colors.styles';
import {
  feedsSelector,
  followersSelector,
  profileSelector,
} from '../../store/selectors/profile-selector';
import {
  getFollowers,
  getFollowings,
  getPersonInfo,
  setFeeds,
} from '../../store/actions/profile-action';
import AnalyticService from '../../utils/analytics/AnalyticService';
import MentionInput from '../MentionInput/MentionInput';
import CommentDeleteSwipeView from '../commentDeleteSwiper/CommentDeleteSwiper';
import styles from './CommentSheet.style';

const CommentSheet = ({ sheetId, payload }: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const inputRef = useRef<TextInput | null>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const comments = useSelector(commentListSelector);
  const feedList = useSelector(feedListSelector);
  const userFeedsList = useSelector(feedsSelector);
  const selectedFeed = useSelector(selectedFeedSelector);
  const user = useSelector(profileSelector);
  const followers = useSelector(followersSelector);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedComments, setSelectedComments] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openReplies, setOpenReplies] = useState<string[]>([]);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [showMentions, setShowMentions] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getComments(payload?.feedId, status => {
        if (status === 'success') {
          setIsLoading(false);
        }
      }),
    );
    return () => {
      dispatch(setComments(undefined));
    };
  }, []);



  useEffect(() => {
    if (user) {
      dispatch(getFollowers(user?.id));
      dispatch(getFollowings(user?.id));
    }
  }, [user]);

  const onChangeValue = useCallback(
    (text: string) => {      
      setInputValue(text);
      if (text.charAt(text.length - 1) === '@') {
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    },
    [inputValue],
  );

  const handleSelectUser = (user: any) => {
    setInputValue(
      `${inputValue.slice(0, inputValue.lastIndexOf('@'))}@${user.who_user.user.first_name
      } `,
    );
    setShowMentions(false);
    setSelectedUser(user);
  };

  const deleteCommentHandler = useCallback((commentId: number) => {
    setLoader(true);
    dispatch(
      deleteComment(commentId, () => {
        dispatch(getComments(payload?.feedId));
        setLoader(false);
      }),
    );
    setIsReply(false);
    changeCommentsCount('delete');
  }, []);

  const deleteReplyComment = useCallback((commentId: number) => {
    setLoader(true);
    dispatch(
      deleteRepliedComment(commentId, () => {
        dispatch(getComments(payload?.feedId));
        setLoader(false);
      }),
    );
    setIsReply(false);
    changeCommentsCount('delete');
  }, [])

  const toggleSelectItem = useCallback(
    (commentId: string, isReplied: boolean) => {
      isReplied && setIsReply(true);
      setSelectedComments((prevSelected: any) => {
        if (prevSelected.includes(commentId)) {
          return prevSelected.filter((id: string) => id !== commentId);
        } else {
          return [...prevSelected, commentId];
        }
      });
    },
    [],
  );

  const onPressToReply = useCallback((commentId: string,firstName: string, lastName:string) => {
    setInputValue(`@${firstName} ${lastName} `);
    setIsReply(true);
    setCommentId(commentId);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const postComment = useCallback(() => {
    setLoader(true);
    const value = inputValue[0] === "@" ? inputValue.slice(1) : inputValue;
    if (value.trim().length) {
      if (isReply) {
        const replydata = {
          feed_comment: commentId,
          comment: value,
        };
        dispatch(
          postCommentReply(replydata, () => {
            dispatch(getComments(payload?.feedId));
            setLoader(false);
            setIsReply(false);
            setCommentId('');
            AnalyticService.commentFeed(payload?.feedId);
          }),
        );
      } else {
        const data = {
          feed: payload?.feedId,
          comment: value,
        };
        dispatch(
          createComment(data, () => {
            dispatch(getComments(payload?.feedId));
            setLoader(false);
            AnalyticService.commentFeed(payload?.feedId);
          }),
        );
      }
    }
    changeCommentsCount('add');
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.blur();
    };
  }, [inputValue, isReply, commentId, inputRef.current]);

  const openRepliesList = useCallback((id: string) => {
    setOpenReplies(prevOpenReplies => {
      if (prevOpenReplies?.includes(id)) {
        return prevOpenReplies.filter(commentId => commentId !== id);
      } else {
        return [...prevOpenReplies, id];
      }
    });
  }, []);

  const onPressToLike = useCallback(
    (id: number) => {
      dispatch(
        likeComment(id, () => {
          dispatch(getComments(payload?.feedId));
          setLoader(false);
        }),
      );
    },
    [isReply],
  );

  const onPressToReplyLike = useCallback((id: number) => {
    dispatch(
      likeReplyComment(id, () => {
        dispatch(getComments(payload?.feedId));
        setLoader(false);
      }),
    );
  }, []);
  const changeCommentsCount = useCallback(
    (type: 'add' | 'delete') => {
      dispatch(
        setFeedListAction(
          filterFeedList(
            feedList,
            payload?.feedId,
            type,
            selectedComments.length,
          ),
        ),
      );
      if (userFeedsList) {
        dispatch(
          setFeeds(
            filterFeedList(
              userFeedsList,
              payload?.feedId,
              type,
              selectedComments.length,
            ),
          ),
        );
      }
      if (selectedFeed) {
        const newFeed: IFeedItem = {
          ...selectedFeed,
          feed: {
            ...selectedFeed?.feed,
            id: selectedFeed?.feed?.id ?? 0,
            media: selectedFeed?.feed?.media ?? [],
            like_count: selectedFeed?.feed?.like_count ?? 0,
            type: selectedFeed?.feed?.type ?? 'feed',
            get_stream_id: selectedFeed?.feed?.get_stream_id ?? '',
            comment_count:
              (selectedFeed?.feed?.comment_count ?? 0) +
              (type === 'add' ? 1 : -1),
          },
        };
        dispatch(setSelectedFeedAction(newFeed));
      }
    },
    [feedList, selectedFeed, userFeedsList, payload, selectedComments],
  );
  const filterFeedList = useCallback(
    (
      list: IFeedListItem[],
      selected: number,
      type: 'add' | 'delete',
      deletedItemsCount?: number,
    ): IFeedListItem[] => {
      return list.map(el => {
        if (el.id !== selected) return el;
        return {
          ...el,
          commentcount:
            el.commentcount + (type === 'add' ? 1 : -(deletedItemsCount ?? 0)),
        };
      });
    },
    [],
  );
  const goToUserProfilePage = (id: number) => {
    dispatch(
      getPersonInfo(id, () => {
        SheetManager.hide('commentSheet')
        // @ts-ignore
        navigation.navigate('USER_PROFILE');
      }),
    );
  }

  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t(`comments`)}</Text>
      </View>
      {loader && <ActivityIndicator color={primaryBlue} />}
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        {comments?.length && user ? (
          <CommentDeleteSwipeView
            comments={comments}
            onPressToLike={onPressToLike}
            openRepliesList={openRepliesList}
            onPressToReply={onPressToReply}
            openReplies={openReplies}
            goToUserProfilePage={(id: number) => goToUserProfilePage(id)}
            onPressToReplyLike={(id: string) => onPressToReplyLike(parseInt(id))}
            onDeleteComment={deleteCommentHandler}
            onDeleteCommentReply={deleteReplyComment}
            user={user}
          />
        ) : isLoading ? (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size={'large'} color={primaryBlue} />
          </View>
        ) : (
          <Text
            style={{
              textAlign: 'center',
            }}>
            {t('noComments')}
          </Text>
        )}
      </ScrollView>
      <View>
        <MentionInput
          showMentions={showMentions}
          placeholder="type a comment"
          value={inputValue}
          onChange={onChangeValue}
          sendCommentHandler={postComment}
          mentionedUsers={followers}
          handleSelectUser={handleSelectUser}
          forwardRef={inputRef}
        />
      </View>
    </ActionSheet>
  );
};
export default CommentSheet;