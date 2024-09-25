import * as React from 'react';
import { View, FlatList, Text, ViewStyle, Dimensions, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import MyCreationsFeedCard from '../../../../components/myCreationsFeedCard/MyCreationsFeedCard';
import CoachInfoCard from '../../../../components/CoachInfoCard/CoachInfoCard';
import { IMyCreationsCardData, IUser } from '../../../../types/types';
import CoachSmallCard from '../CoachSmallCard/CoachSmallCard';
import styles from './HorizontalFeedList.style';
import { primaryBlue } from '../../../../assets/styles/colors.styles';

type Props = {
  type?: string;
  feedList?: IMyCreationsCardData[];
  coachesList?: IUser[];
  containerStyle?: ViewStyle | ViewStyle[];
  visibleItemsCount?: number;
  cardPressHandle?: (id?: IMyCreationsCardData, type?: string) => void;
  handleSeeAll?: () => void
};
const HorizontalFeedList: React.VFC<Props> = ({
  type,
  feedList,
  coachesList,
  containerStyle,
  visibleItemsCount = 2,
  cardPressHandle,
  handleSeeAll
}) => {
  const { t } = useTranslation();
  const width = Dimensions.get('screen').width;
  const cardItemWidth =
    (width - (visibleItemsCount + 1) * 16) / visibleItemsCount;
  const renderList = React.useMemo(() => {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
      switch (type) {
        case 'coaches':
          return (<CoachSmallCard
            user={item}
            containerStyle={[
              styles.cardItemContainer,
              { minWidth: cardItemWidth, maxWidth: cardItemWidth },
            ]}
            onCardPress={() => cardPressHandle && cardPressHandle(item, type)}
          />
          );
        default:
          return (
            <MyCreationsFeedCard
              containerStyle={[
                styles.cardItemContainer,
                { minWidth: cardItemWidth, maxWidth: cardItemWidth },
              ]}
              onPress={() => cardPressHandle && cardPressHandle(item, type)}
              data={item}
            />
          );
      }
    };
    return (
      <FlatList
        keyExtractor={item => `${item?.id}`}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={type !== 'coaches' ? feedList : coachesList}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
    );
  }, [type, cardItemWidth]);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t(`${type}`)}</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={[styles.title, { color: primaryBlue }]}>{t(`seeAll`)}</Text>
        </TouchableOpacity>
      </View>
      {renderList}
    </View>
  );
};
export default HorizontalFeedList;
