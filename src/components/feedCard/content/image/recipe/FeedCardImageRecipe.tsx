import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import { useTranslation } from "react-i18next";
import styles from './FeedCardImageRecipe.style';

type Props = {
  containerStyle: ViewStyle;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  prepTime?: number;
};
const FeedCardImageRecipe: React.FC<Props> = ({
  containerStyle,
  calories,
  protein,
  fat,
  carbs,
  prepTime,
}) => {
  const {t} =useTranslation()
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.recipeItemContainer}>
        <View style={styles.recipeTitleAndTextContainer}>
          <Text style={styles.title}>{t('calories')}</Text>
          <Text style={styles.text}>{calories?`${calories} ${t('kcal')}`:'-'}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.recipeItemContainer}>
        <View style={styles.recipeTitleAndTextContainer}>
          <Text style={styles.title}>{t('protein')}</Text>
          <Text style={styles.text}>{protein?`${protein} ${t('gram')}`:'-'}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.recipeItemContainer}>
        <View style={styles.recipeTitleAndTextContainer}>
          <Text style={styles.title}>{t('fat')}</Text>
          <Text style={styles.text}>{fat?`${fat} ${t('gram')}`:'-'}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.recipeItemContainer}>
        <View style={styles.recipeTitleAndTextContainer}>
          <Text style={styles.title}>{t('carbs')}</Text>
          <Text style={styles.text}>{carbs?`${carbs} ${t('gram')}`:'-'}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.recipeItemContainer}>
        <View style={styles.recipeTitleAndTextContainer}>
          <Text style={styles.title}>{t('prepTime')}</Text>
          <Text style={styles.text}>{prepTime?`${prepTime} ${t('min')}`:'-'}</Text>
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
};
export default FeedCardImageRecipe;
