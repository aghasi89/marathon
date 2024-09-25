import React from 'react';
import { View, Text, TextInput, ViewStyle, FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { lightSteelBlue } from '../../../../../assets/styles/colors.styles';
import Icons from '../../../../../assets/icons/svg';
import { PrimeryButton } from '../../../../../components/buttons';
import { IFeedTypes } from '../../../../../types/types';
import styles from './CreatePublicationCard.styles';

type Props = {
  onChangeInputValue: (text: string) => void;
  inputValue?: string;
  onPress: (type: IFeedTypes) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  isCoach?: boolean
};

const CreatePublicationCard: React.VFC<Props> = ({
  onChangeInputValue,
  onPress,
  inputValue,
  containerStyle,
  isCoach
}) => {
  const { t } = useTranslation();
  const buttons = [
    {
      title: t('package') ?? '',
      onPress: () => onPress('package'),
      icon: <Icons.FeedCardPacksIcon {...styles.icons} />,
      isShow: isCoach
    },
    {
      title: t('live') ?? '',
      onPress: () => onPress('live'),
      icon: <Icons.LiveIcon {...styles.icons} />,
      isShow: isCoach
    },
    {
      title: t('article') ?? '',
      onPress: () => onPress('article'),
      icon: <Icons.Article {...styles.icons} />,
      isShow: true
    },
    {
      title: t('recipe') ?? '',
      onPress: () => onPress('recipe'),
      icon: <Icons.Recipe {...styles.icons} />,
      isShow: true
    },
    {
      title: t('workout') ?? '',
      onPress: () => onPress('workout'),
      icon: <Icons.Dumbbells {...styles.icons} />,
      isShow: isCoach
    },
  ];
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleText}>{t('createPublication')}</Text>
      <Pressable onPress={() => onPress('basic')}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder={t('typeTextHere') ?? ''}
          placeholderTextColor={lightSteelBlue}
          onChangeText={onChangeInputValue}
          value={inputValue}
        />
      </Pressable>
      <View style={styles.buttonsContainer}>
        <FlatList
          data={buttons}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            item.isShow ?
              <PrimeryButton
                type="default"
                style={styles.button}
                textStyle={styles.buttonText}
                Icon={item.icon}
                onPress={item.onPress}
                title={item.title}
              /> : null
          )}
          keyExtractor={(_, index) => `${index.toString()}`}
        />
      </View>
    </View>
  );
};

export default CreatePublicationCard;
