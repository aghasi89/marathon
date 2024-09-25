import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import FeedCard from '../../../../components/feedCard/FeedCard';
import MyCreationsFeedCard from '../../../../components/myCreationsFeedCard/MyCreationsFeedCard';
import CoachInfoCard from '../../../../components/CoachInfoCard/CoachInfoCard';
import FeedListHook from './FeedListItem-hook';
import styles from './FeedListItem.style';
import { calcWidth } from '../../../../assets/dimensions';
interface IProps {
  item: any;
  globalType?: 'profilePage' | 'feedList';
  autoplay?: boolean;
  handleThreeDots: () => void;
  followButtonShow?: boolean;
  onPlayerStateChange?: (curr: 'playing' | 'pause') => void;
  cardType?: 'default' | 'coach' | 'imageCard';
  numColumns?: number;
}
const FeedList: React.FC<IProps> = props => {
  const {
    item,
    globalType,
    autoplay,
    followButtonShow,
    cardType = 'default',
  } = props;

  const {
    commentIconPressHandle,
    energyIconPressHandle,
    joinButtonPressHandle,
    openChannelButtonPressHandle,
    openChatButtonPressHandle,
    openGroupeButtonPressHandle,
    shareIconPressHandle,
    threeDotsIconPressHandle,
    bookmarkIconPressHandle,
    followButtonPressHandle,
    onHehashtagPressHandle,
    navigateUserPage,
    startWorkoutButtonPressHandle,
    cardPressHandle,
    loading,
    youtubePlayerRef,
    cardWidth
  } = FeedListHook(props);

  const renderCard = () => {
    switch (cardType) {
      case 'default':
        return (<View>
          <FeedCard
            youtubePlayerRef={youtubePlayerRef}
            buttonLoading={loading}
            onStartWorkoutButtonPress={startWorkoutButtonPressHandle}
            navigateUserPage={navigateUserPage}
            onCardPress={cardPressHandle}
            customStyle={{ cardContainerStyle: styles.cardStyle }}
            commentIconPress={() => commentIconPressHandle(item.id)}
            energyIconPress={action =>
              energyIconPressHandle(item, action, globalType)
            }
            joinButtonPress={() => joinButtonPressHandle(item)}
            openChannelButtonPress={() => openChannelButtonPressHandle(item)}
            openChatButtonPress={() => openChatButtonPressHandle(item)}
            openGroupeButtonPress={() => openGroupeButtonPressHandle(item.id)}
            shareIconPress={() => shareIconPressHandle(item)}
            threeDotsIconPress={threeDotsIconPressHandle}
            bookmarkIconPress={bookmarkIconPressHandle}
            followButtonPress={followButtonPressHandle}
            onHehashtagPress={onHehashtagPressHandle}
            data={item}
            autoplay={autoplay}
            followButtonShow={followButtonShow}
          />
        </View>
        );
      case 'imageCard':
        return (
          <MyCreationsFeedCard
            containerStyle={[
              styles.cardContainer,
              { minWidth: cardWidth, maxWidth: cardWidth },
            ]}
            onPress={cardPressHandle}
            data={item}
          />
        );
      case 'coach':
        return (
          <View style={styles.coachCardContainer}>
            <CoachInfoCard
              componentStyles={{
                containerStyle: [
                  styles.cardContainer,
                  {
                    minWidth: cardWidth - calcWidth(32),
                    maxWidth: cardWidth - calcWidth(32),
                  },
                ],
                follwButtonTextStyle: styles.followButtonText,
                headerTextStyle: styles.cardHeaderText,
                statusText: styles.statusText,
              }}
              data={item}
              onPressToFollow={followButtonPressHandle}
              onPresstoNavigate={cardPressHandle}
            />
          </View>
        );
      default:
        return null;
    }
  };
  return renderCard();
};
export default FeedList;
