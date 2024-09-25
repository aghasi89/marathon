import * as React from 'react';
import { FlatList, ViewStyle, Dimensions, View } from 'react-native';
import HorizontalFeedList from '../HorizontalFeedList/HorizontalFeedList';
import { IMyCreationsCardData, IUser } from '../../../../types/types';
import { IFeedListSortedByTypes } from '../../../../types/feedFilterTypes';
import MyCreationsFeedCard from '../../../../components/myCreationsFeedCard/MyCreationsFeedCard';
import styles from './FeedSearchListComponent.style';
import CoachInfoCard from '../../../../components/CoachInfoCard/CoachInfoCard';
import { calcWidth } from '../../../../assets/dimensions';

type Props = {
  cardPressHandle?: (item?: any, type?: string) => void;
  data?: IMyCreationsCardData[];
  sortedData?: IFeedListSortedByTypes[];
  coachesData?: IUser[];
  dataType: 'all' | 'coaches' | 'default';
  rowItemsCount?: number;
  horizontalListContainerStyle?: ViewStyle | ViewStyle[];
  listContainerStyle?: ViewStyle | ViewStyle[];
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
  onFollowButtonPress: (id: number) => void;
  onCoachCardPress?: () => void,
  amIFollowList: any,
  handleSeeAll: (name: string) => void
};
const FeedSearchListComponent: React.VFC<Props> = ({
  cardPressHandle,
  onEndReached,
  listContainerStyle,
  horizontalListContainerStyle,
  data,
  sortedData,
  dataType,
  rowItemsCount = 2,
  coachesData,
  onCoachCardPress,
  onFollowButtonPress,
  amIFollowList,
  handleSeeAll,
}) => {
  const width = Dimensions.get('screen').width;
  const cardItemWidth = (width - (rowItemsCount + 1) * 16) / rowItemsCount;
  const renderList = (type: 'all' | 'coaches' | 'default') => {
    switch (type) {
      case 'all':
        return (
          <FlatList
            key={`#${type}`}
            removeClippedSubviews={true}
            contentContainerStyle={[
              styles.listContentContainer,
              listContainerStyle,
            ]}
            overScrollMode="never"
            data={sortedData}
            keyExtractor={(item, index) => `${item?.title}` + index.toString()}
            renderItem={({ item, index }) => (
              <HorizontalFeedList
                cardPressHandle={cardPressHandle}
                visibleItemsCount={rowItemsCount}
                containerStyle={horizontalListContainerStyle}
                type={item.title}
                feedList={item.feed}
                coachesList={item.feed}
                handleSeeAll={() => handleSeeAll(item.title)}
              />
            )}
          />
        );
      case 'coaches':
        return (
          <FlatList
            key={`#${type}`}
            removeClippedSubviews={true}
            contentContainerStyle={[
              styles.listContentContainer,
              listContainerStyle,
            ]}
            overScrollMode="never"
            data={coachesData}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => `${item?.id}` + index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.coachCardContainer}>
                <CoachInfoCard
                  componentStyles={{
                    containerStyle: [
                      styles.cardContainer,
                      {
                        minWidth: width - calcWidth(32),
                        maxWidth: width - calcWidth(32),
                      },
                    ],
                    follwButtonTextStyle: styles.followButtonText,
                    headerTextStyle: styles.cardHeaderText,
                    statusText: styles.statusText,
                  }}
                  data={item}
                  amIFollowList={amIFollowList?.[item.id] ? amIFollowList[item.id] : false}
                  onPressToFollow={() => onFollowButtonPress(item.id)}
                  onPresstoNavigate={() => cardPressHandle && cardPressHandle(item, type)}
                />
              </View>
            )}
          />
        );
      case 'default':
        return (
          <FlatList
            key={`#${type}`}
            numColumns={rowItemsCount}
            removeClippedSubviews={true}
            contentContainerStyle={[
              styles.listContentContainer,
              listContainerStyle,
            ]}
            onEndReached={onEndReached}
            overScrollMode="never"
            data={data}
            keyExtractor={(item, index) => `${item?.title}` + index.toString()}
            renderItem={({ item, index }) => (
              <MyCreationsFeedCard
                containerStyle={[
                  styles.cardItemContainer,
                  { minWidth: cardItemWidth, maxWidth: cardItemWidth },
                ]}
                onPress={() => cardPressHandle && cardPressHandle(item)}
                data={item}
              />
            )}
          />
        );
    }
  };
  return renderList(dataType);
};

export default FeedSearchListComponent;
