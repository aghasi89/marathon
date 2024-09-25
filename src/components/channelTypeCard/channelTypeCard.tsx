import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import styles from './channelTypeCard.style';

type Props = {
  groupeType: TItem[];
  customStyles?: {
    containerStyle?: ViewStyle;
  };
  handleItemPress: (type: string) => void;
};

type TItem = {
  icon: ReactNode;
  type: string;
};

const ChannelTypeCard: React.FC<Props> = props => {
  const {groupeType, customStyles, handleItemPress} = props;
  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      {groupeType.map((item: TItem, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => handleItemPress(item.type)}
            style={styles.itemCard}
            key={index}>
            <View>{item.icon}</View>
            <Text style={styles.cardType}>{item.type}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default ChannelTypeCard;
