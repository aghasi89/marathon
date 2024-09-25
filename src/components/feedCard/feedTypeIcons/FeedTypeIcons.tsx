import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './FeedTypeIcons.style';
import Icons from '../../../assets/icons/svg';
import { IFeedTypes} from '../../../types/types';
import {
  gardenGlow,
  primaryBlue,
  red,
} from '../../../assets/styles/colors.styles';
import FeedCardImageRecipe from '../content/image/recipe/FeedCardImageRecipe';
interface props {
  type?: IFeedTypes;
  liveDuration?: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  prepTime?: number;
  onPress?:()=>void
}

const FeedTypeIcons = ({
  type,
  liveDuration,
  calories,
  carbs,
  fat,
  prepTime,
  protein,
  onPress
}: props) => {
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
      <View style={styles.topIconContainer}>
      {type !== 'live' ? (
        type !== 'basic' ? (
          <View style={styles.iconContainer}>{renderIcon()}</View>
        ) : null
      ) : (
        <View style={styles.liveIconContainer}>
          <Icons.Live fill={red} {...styles.iconStyle} />
          <Text style={styles.liveDurationText}>{liveDuration}</Text>
        </View>
      )}
      </View>
      {type === 'recipe'&&(calories||fat||carbs||prepTime||protein) && (
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

export default FeedTypeIcons;
