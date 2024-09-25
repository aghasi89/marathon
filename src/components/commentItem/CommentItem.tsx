import React, { ReactNode } from 'react';
import {
  Text,
  View,
  Image,
  ViewStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import 'moment/locale/ru';
import moment from 'moment';
import style from './CommentItem.style';
import {
  aliceBlue,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg/index';
import { ICommentItem } from '../../types/types';
import { downloadMediaFromBunny } from '../../utils/bunny.net';

interface IProps {
  data: ICommentItem;
  customStyles?: {
    container?: ViewStyle | ViewStyle[];
  };
  onPressToReply?: (id: string) => void;
  selected?: boolean;
  toggleSelectItem?: (id?: string, isReplied?: boolean) => void;
  onPressToLike?: () => void;
  openRepliesList?: (id: string) => void;
  likeCount?: number;
  isReply?: boolean;
  repliesOpen?: boolean;
  children?: ReactNode;
  goToUserProfilePage: (id: number) => void;
  liked?: boolean
}

const CommentItem: React.FC<IProps> = props => {
  const {
    data,
    customStyles,
    onPressToReply,
    selected,
    onPressToLike,
    openRepliesList,
    likeCount,
    isReply,
    repliesOpen,
    goToUserProfilePage,
    liked
  } = props;
  const { t } = useTranslation();
  return (
    <View style={[style.container, isReply && style.replyContainer]}>
      <View
        style={[
          customStyles?.container,
          {
            backgroundColor: selected ? aliceBlue : primaryWhite,
          },
        ]}>
        <View style={style.wrapper}>
          <Pressable onPress={() => goToUserProfilePage(data?.user.id)}>
            {data?.user?.image ? (
              <Image
                source={{
                  uri: downloadMediaFromBunny({
                    public_key: data?.user?.image,
                    mediaType: 'image',
                    imageDir: 'profile',
                    userDir: data?.user?.id,
                  })?.url,
                }}
                style={style.image}
                resizeMode="cover"
              />
            ) : (
              <Icons.UserIcon {...style.image} />
            )}
          </Pressable>
          <View style={style.header}>
            <View style={style.userInfo}>
              <Text style={style.userInfoText}>
                {data?.user?.user?.first_name} {data?.user?.user?.last_name}
              </Text>
              <Text style={style.dateText}>
                {moment(data?.created_at).fromNow()}
              </Text>
            </View>
            <Text numberOfLines={3}>{data?.comment}</Text>
          </View>
        </View>
      </View>
      <View style={style.footer}>
        {!isReply ? (
          <TouchableOpacity style={style.userInfo}>
            <Text
              style={style.replyText}
              onPress={() => openRepliesList && openRepliesList(data.id)}>
              {repliesOpen ? t(`closeReplies`) : t(`seeReplies`)}
            </Text>
            {data?.reply_comment && data?.reply_comment.length > 0 && (
              <Text style={style.replyText}> {data.reply_comment.length}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity style={style.userInfo}>
          {!isReply && (
            <Text
              style={style.replyText}
              onPress={() => onPressToReply && onPressToReply(data.id)}>
              {t(`reply`)}
            </Text>
          )}
          <TouchableOpacity onPress={onPressToLike}>
            {
              liked ? <Icons.LikeSelected {...style.icon} fill={primaryBlue} /> : <Icons.Like {...style.icon} fill={primaryGrey} />
            }
          </TouchableOpacity>
          <Text>{likeCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;
