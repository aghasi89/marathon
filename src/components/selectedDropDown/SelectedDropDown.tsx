import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Icons from '../../assets/icons/svg'
import { primaryBlue } from '../../assets/styles/colors.styles';
import styles from './SelectedDropDown.style'

interface IProps {
  selectButtonPressHandle: () => void,
  value: string,
  title: string,
  image?: string | undefined
}

const SelectedDropDown: React.FC<IProps> = (props) => {

  const { selectButtonPressHandle, title, value, image } = props

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={selectButtonPressHandle} style={styles.container}>
        <View style={styles.leftPart}>
          <View style={styles.flag}>
            {image ? (
              <Image source={{ uri: image }} style={styles.flag} />
            ) : (
              <Icons.FlagIcon {...styles.altImage} />
            )}
          </View>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Icons.ArrowDowm fill={primaryBlue} />
      </Pressable>
    </View>
  );
};
export default SelectedDropDown;
