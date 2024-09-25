import React from 'react';
import {Image, Pressable, Text, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../assets/icons/svg';
import styles from './selectCardWithImage.style';

type Props = {
  url?: string;
  title?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  isSelected?: boolean;
  closeIconExist?: boolean;
  onCloseIconPress?: () => void;
  cardSize?: 'small' | 'large';
  iconsExist?: boolean;
  onSelect?: () => void;
  onPress?: () => void;
  timeIcons?: boolean;
  trainings?: number;
  duration?: number;
  isRecipe?: boolean;
  calories?: number;
};

const SelectCardWithImage: React.VFC<Props> = ({
  url,
  title,
  containerStyle,
  isSelected,
  closeIconExist,
  onCloseIconPress,
  cardSize = 'small',
  iconsExist = true,
  onSelect,
  onPress,
  timeIcons,
  trainings,
  duration,
  isRecipe,
  calories,
}) => {
  const {t} = useTranslation();
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={() =>
        onPress
          ? onPress()
          : iconsExist && !closeIconExist && onSelect && onSelect()
      }>
      <View style={styles.contentContainer}>
        <View
          style={
            cardSize === 'small'
              ? styles.imageContainerSmall
              : styles.imageContainerLarge
          }>
          {iconsExist && (
            <Pressable
              style={styles.closeIconTouch}
              onPress={() =>
                closeIconExist && onCloseIconPress
                  ? onCloseIconPress()
                  : onSelect && onSelect()
              }>
              <View
                style={[
                  cardSize === 'small'
                    ? styles.iconContainerSmall
                    : styles.iconContainerLarge,
                  !closeIconExist &&
                    !isSelected &&
                    styles.iconContainerBackground,
                  !closeIconExist &&
                    isSelected &&
                    styles.iconContainerSelectedBackground,
                ]}>
                {closeIconExist ? (
                  <Icons.Close
                    {...(cardSize === 'small'
                      ? styles.closeIconStyleSmall
                      : styles.closeIconStyleLarge)}
                  />
                ) : (
                  isSelected && <Icons.Check {...styles.checkIcon} />
                )}
              </View>
            </Pressable>
          )}
          {url ? (
            <Image
              style={
                cardSize === 'small' ? styles.imageSmall : styles.imageLarge
              }
              source={{uri: url}}
            />
          ) : (
            <Icons.ImageIcon {...styles.altImageIcon} />
          )}
        </View>
        <View
          style={[
            styles.titleContainer,
            !closeIconExist && isSelected && styles.titleContainerSelected,
          ]}>
          <Text
            numberOfLines={1}
            style={[
              cardSize === 'small' ? styles.titleSmall : styles.titleLarge,
              !closeIconExist && isSelected && styles.titleSelected,
            ]}>
            {title}
          </Text>
          {timeIcons && (
            <View style={styles.timeIcons}>
              <Icons.Hourglass {...styles.footerIcon} />
              <Text style={styles.timeTextStyle}>{`${duration} ${t(
                'min',
              )}`}</Text>
              <View style={styles.emptyView} />
              {!isRecipe ? (
                <>
                  <Icons.Trainer {...styles.footerIcon} />
                  <Text style={styles.timeTextStyle}>
                    {!!trainings
                      ? `${trainings} ${t('exsercises')}`
                      : t('workout')}
                  </Text>
                </>
              ) : (
                <Text style={styles.timeTextStyle}>{`${calories} ${t(
                  `kcal`,
                )}`}</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
export default SelectCardWithImage;
