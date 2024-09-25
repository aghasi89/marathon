import React from 'react';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import Icons from '../../../../../assets/icons/svg';
import styles from './QuestionCard.style';

type Props = {
  text?: string;
  closeIconPress: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
};

const QuestionCard: React.VFC<Props> = ({
  text,
  closeIconPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={closeIconPress} style={styles.iconContainer}>
        <Icons.Close {...styles.closeIcon} />
      </Pressable>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default QuestionCard;
