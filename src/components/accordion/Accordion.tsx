import React, { ReactNode } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icons from '../../assets/icons/svg/index';
import {
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../assets/styles/colors.styles';
import { styles } from './Accordion.style';

type Props = {
  title: string;
  child?: ReactNode;
  isExpanded?: boolean;
  image?: string;
  toggleAccordion?: () => void;
};
const Accordion = (props: Props) => {
  const { title, child, image, isExpanded, toggleAccordion } = props;  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.titleContainer,
          {
            backgroundColor: isExpanded ? robinEggBlue : primaryWhite,
          },
        ]}
        onPress={toggleAccordion}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Icons.ChatPackageIcon fill={primaryBlue} {...styles.image} />
        )}
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{child}</View>}
    </View>
  );
};

export default Accordion;
