import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth, } from '../../assets/dimensions';
import { primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
  },
  containerStyle: {
    paddingBottom: calcHeight(50),
  },
  rowFront: {
    minHeight: calcHeight(50),
    marginTop: calcHeight(10),
    overflow: 'hidden',
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    borderRadius: calcHeight(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(20)
  },
  userAvatar: {
    width: calcHeight(40),
    height: calcHeight(40),
    borderRadius: calcHeight(20),
  },
  name: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'bold',
    }),
    paddingLeft: calcHeight(10),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
