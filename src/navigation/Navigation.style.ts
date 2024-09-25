import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../assets/dimensions';
import { primaryWhite, red } from '../assets/styles/colors.styles';
import { EnCodeSans } from '../assets/styles/fonts.styles';

const style = StyleSheet.create({
  tabBarStyle: {
    minHeight: calcHeight(70),
    maxHeight: calcHeight(75),
    borderTopLeftRadius: calcWidth(20),
    borderTopRightRadius: calcWidth(20),
    position: 'absolute'
  },
  unreadCount: {
    width: calcWidth(16),
    height: calcWidth(16),
    backgroundColor: red,
    borderRadius: calcHeight(10),
    position: "absolute",
    zIndex: 1,
    right: calcWidth(15),
    bottom: calcHeight(30)
  },
  count: {
    color: primaryWhite,
    textAlign: "center",
    ...EnCodeSans({
      size: "subLittle",
      weight: 'regular',
    }),
  },
  moreCount: {
    color: primaryWhite,
    textAlign: "center",
    fontSize: 8
  }
});

export default style;
