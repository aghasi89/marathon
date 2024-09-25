import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import styles from './MyCreationsFeedCard.style';
import Icons from '../../assets/icons/svg/index';
import { IMyCreationsCardData } from '../../types/types';
import MyCreationsImageComponent from './MyCreationsImageComponent/MyCreationsImageComponent';
import CardFooter from './CardFooter/CardFooter';
import moment from 'moment';

type Props = {
  data: IMyCreationsCardData;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress?: (id: number) => void
};
const MyCreationsFeedCard: React.FC<Props> = ({ data, containerStyle, onPress }) => {
  const imageIcons = {
    live: <Icons.Live {...styles.icon} />,
    article: <Icons.Articles {...styles.icon} />,
    package: <Icons.FeedCardPacksIcon {...styles.icon} />,
    recipe: <Icons.Recipe {...styles.icon} />,
    basic: null,
    workout: <Icons.Dumbbells {...styles.icon} />,
    exercise: <Icons.Trainer {...styles.icon} />,
    feed: null,
  };
  const footerIcons = {
    live: {
      left:
        data.trainingType === 'individual' ? (
          <Icons.Person {...styles.icon} />
        ) : (
          <Icons.FeedGroupTraningIcon {...styles.icon} />
        ),
      right: <Icons.FeedCalendarIcon {...styles.icon} />,
    },
    article: null,
    package: {
      left:
        data.trainingType === 'individual' ? (
          <Icons.Person {...styles.icon} />
        ) : (
          <Icons.FeedGroupTraningIcon {...styles.icon} />
        ),
      right: <Icons.Price {...styles.icon} />,
    },
    recipe: {
      left: <Icons.Hourglass {...styles.icon} />,
      right: <Icons.Fier {...styles.icon} />,
    },
    workout: {
      left: <Icons.Hourglass {...styles.icon} />,
      right: <Icons.Boots {...styles.icon} />,
    },
    exercise: {
      left: <Icons.Hourglass {...styles.icon} />,
      right: null,
    },
    feed: null,
    basic: null,
  };

  return (
    <Pressable onPress={() => onPress && onPress(data.id ?? 0)} style={[styles.container, containerStyle]}>
      <MyCreationsImageComponent
        url={data.mediaUrl}
        playIconShow={
          data.mediaType === 'video' || data.mediaType === 'videoLink'
        }
        topIcon={imageIcons[data.type]}
        bottomIcon={
          data.is_protected ? (
            <Icons.LockIcon />
          ) : null
        }
      />
      <CardFooter
        title={data.title}
        leftIcon={footerIcons[data.type]?.left}
        leftContainerText={data.descriptionOne}
        rightContainerText={data.descriptionTwo}
        rightIcon={footerIcons[data.type]?.right}
        showStartDate={data.type == 'package' ?? true}
        startDate={moment(data.start_day).format('DD MMM')}
        showStartTime={data.type == 'live' ?? true}
        startTime={moment(data.start_time).format('HH:mm')}
      />
    </Pressable>
  );
};
export default MyCreationsFeedCard;
