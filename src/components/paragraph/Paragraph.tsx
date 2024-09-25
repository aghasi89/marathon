import React from 'react';
import {View, Text} from 'react-native';
import styles from './Paragraph.style';
type Props = {
  title: string;
  text: string;
};
const ParagraphComponenet: React.FC<Props> = ({title, text}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default ParagraphComponenet;
