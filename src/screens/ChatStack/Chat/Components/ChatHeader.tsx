import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {primaryGrey} from '../../../../assets/styles/colors.styles';
import styles from './ChatHeader.style';

interface IProps {
  goBack?: () => void;
  title: string;
}

const ChatHeader: React.FC<IProps> = ({goBack, title}) => {
  return (
    <View style={styles.container}>
      {goBack && (
        <TouchableOpacity onPress={goBack}>
          <Icons.ArrowIcon fill={primaryGrey} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};
export default ChatHeader;
