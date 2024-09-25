import React from 'react';
import {View, Text} from 'react-native';
import {formFieldGrey, primaryBlack} from '../../assets/styles/colors.styles';
import styles from './TabBadges.style';
type elementTypes = {
  title: string;
};
type Props = {
  data: elementTypes[];
  index: number;
  setIndex: (value: number) => void;
};
const TabBadges: React.FC<Props> = ({data, index, setIndex}) => {
  return (
    <View style={styles.container}>
      {data.map((page, id) => (
        <Text
          key={id}
          style={[
            {color: id === index ? primaryBlack : formFieldGrey},
            styles.text,
          ]}
          onPress={() => {
            setIndex(id);
          }}>
          {page.title}
        </Text>
      ))}
    </View>
  );
};

export default TabBadges;
