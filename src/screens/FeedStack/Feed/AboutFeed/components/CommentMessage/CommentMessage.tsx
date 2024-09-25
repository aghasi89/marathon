import React, {useState} from 'react';
import {View, Image, Text, Pressable, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import styles from './CommentMessage.style';

type Props = {
  userImageURL?: string;
  userName?: string;
  comentDate?: string;
  comment?: string;
  repliesCount?: number;
  onViewRepliesPress: () => void;
  onReply: () => void;
  onLikePress: () => void;
  isLiked?: boolean;
  likesCount?: number;
  containerStyle?: ViewStyle;
};

const CommentMessage: React.VFC<Props> = ({
  userImageURL,
  userName,
  comentDate,
  comment,
  repliesCount = 0,
  onViewRepliesPress,
  onReply,
  onLikePress,
  isLiked,
  likesCount = 0,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const [moreInfoShow, setMoreInfoShow] = useState<boolean>(false);
  const shortText = comment?.slice(0, 140);
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          {userImageURL ? (
            <Image style={styles.imageStyle} source={{uri: userImageURL}} />
          ) : (
            <Icons.AltImageIcon style={styles.imageStyle} />
          )}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.nameAndDateContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.comentDate}>{comentDate}</Text>
        </View>
        <Text style={styles.text}>{!moreInfoShow ? shortText : comment}</Text>
        {comment && comment?.length > 140 && (
          <Pressable
            style={styles.moreInfoShowContainer}
            onPress={() => setMoreInfoShow(!moreInfoShow)}>
            <Text style={[styles.text,styles.moreInfoShowtext]}> {!moreInfoShow ? t('seeMore') : t('seeLess')}</Text>
          </Pressable>
        )}
        <View style={styles.footer}>
          {repliesCount > 0 ? (
            <Pressable onPress={onViewRepliesPress}>
              <Text>{`${t('viewReplies')} ${repliesCount}`}</Text>
            </Pressable>
          ) : (
            <View />
          )}
          <View style={styles.likeAndReplyButtonContainer}>
            <Pressable onPress={onReply}>
              <Text style={styles.replyText}>{t('reply')}</Text>
            </Pressable>
            <Pressable style={styles.likeContainer} onPress={onLikePress}>
              {!isLiked ? (
                <Icons.Like {...styles.likeIcon} fill={primaryBlack} />
              ) : (
                <Icons.LikeSelected {...styles.likeIcon} fill={primaryBlue} />
              )}
              <Text style={styles.text}>{likesCount}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CommentMessage;
