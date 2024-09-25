import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {
  gardenGlow,
  primaryBlue,
  red,
} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg';
import {mediaSizeStyle} from '../../../../assets/styles/global.styles';
import {IFeedMediaTypes, IFeedTypes, IMediaSize} from '../../../../types/types';
import FeedCardImageRecipe from './recipe/FeedCardImageRecipe';
import styles from './FeedCardImage.style';

type Props = {
  type: IFeedTypes;
  imageURL?: string;
  liveDuration?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  prepTime?: number;
  mediaTypes?: IFeedMediaTypes;
  hide?: boolean;
  size: IMediaSize;
  onPress?:()=>void
};
const FeedCardImage: React.FC<Props> = ({
  type,
  imageURL,
  liveDuration,
  calories,
  protein,
  fat,
  carbs,
  prepTime,
  mediaTypes,
  hide,
  size,
  onPress
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'article':
        return <Icons.Articles {...styles.iconStyle} />;
      case 'recipe':
        return <Icons.Recipe fill={gardenGlow} {...styles.iconStyle} />;
      case 'package':
        return (
          <Icons.FeedCardPacksIcon fill={primaryBlue} {...styles.iconStyle} />
        );
      case 'workout':
        return <Icons.Dumbbells fill={primaryBlue} {...styles.iconStyle} />;
      default:
        return null;
    }
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {mediaTypes === 'image' && type !== 'live' ? (
        type !== 'basic' ? (
          <View style={styles.iconContainer}>{renderIcon()}</View>
        ) : null
      ) : (
        <View style={styles.liveIconContainer}>
          <Icons.Live fill={red} {...styles.iconStyle} />
          <Text style={styles.liveDurationText}>{liveDuration}</Text>
        </View>
      )}
      <Image
        style={[styles.smallCard, {...mediaSizeStyle({type: size})}]}
        source={{uri: imageURL}}
      />
      {type === 'recipe' && !hide && (
        <FeedCardImageRecipe
          containerStyle={styles.recipeContainer}
          calories={calories}
          fat={fat}
          carbs={carbs}
          prepTime={prepTime}
          protein={protein}
        />
      )}
    </Pressable>
  );
};
export default FeedCardImage;
