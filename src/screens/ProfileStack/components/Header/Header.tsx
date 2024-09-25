import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icons from '../../../../assets/icons/svg/index'
import { primaryGrey } from '../../../../assets/styles/colors.styles';
import styles from './Header.style';

interface IProps {
  title: string,
  Icon?: ReactNode,
  onPress?: () => void,
  goBack?: () => void,
  RightComponent?: ReactNode
}

const Header: React.FC<IProps> = (props) => {

  const { title, Icon, onPress, goBack, RightComponent } = props

  return (
    <View style={styles.container}>
      {
        goBack && <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icons.ArrowIcon fill={primaryGrey} />
        </TouchableOpacity>
      }
      <View style={{ flex: 1, alignItems: goBack ? "center" : "flex-start" }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* {
        Icon ? <TouchableOpacity onPress={onPress}>
          {Icon}
        </TouchableOpacity> : <View></View>
      }
      {
        RightComponent && RightComponent
      } */}
    </View>
  );
};
export default Header;

