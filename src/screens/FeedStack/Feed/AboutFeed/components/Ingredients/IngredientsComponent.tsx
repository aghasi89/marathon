import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg';
import { ISelectedFeedIngredientsData } from '../../../../../../types/types';
import styles from './IngredientsComponent.style';

type Props = {
  ingredients?:ISelectedFeedIngredientsData[];
  containerStyle?: ViewStyle;
};

const IngredientsComponent: React.VFC<Props> = ({
  containerStyle,
  ingredients,
}) => {
  const {t} = useTranslation();
  return (
    <View style={ containerStyle}>
      <Text style={styles.title}>{t('ingredients')}</Text>
      <View style={styles.ingredientsContainer}>
        {ingredients?.map((item, index) => {
          return (
            <View
             key={index}
              style={
                ingredients && index === ingredients.length - 1
                  ? styles.lastItemContainer
                  : styles.itemContainer
              }>
              <View style={styles.itemTitleContainer}>
                <Icons.Circle {...styles.iconStyle} />
                <Text style={styles.text}>{item.title}</Text>
              </View>
              <View style={styles.itemInfoContainer}>
                <Text
                  style={
                    styles.text
                  }>{`${item.mass??''} ${item.measurement??''}`}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default IngredientsComponent;
