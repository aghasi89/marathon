import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { columbiaBlue, lightSteelBlue, primaryBlack, primaryBlue } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(350) : calcHeight(350),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    marginTop: calcWidth(10),
    paddingHorizontal: calcHeight(10),
  },
  containerStyle: {
    paddingBottom: Platform.OS === 'ios' ? calcHeight(15) : calcHeight(50),
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(16),
  },
  flagContainer: {
    marginVertical: calcHeight(16),
    height: calcHeight(36),
    width: calcWidth(36),
    borderRadius: calcHeight(25),
    backgroundColor: columbiaBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcWidth(16),
  },
  flag: {
    height: calcHeight(36),
    width: calcWidth(36),
    borderRadius: calcHeight(25),
    resizeMode: 'cover',
  },
  altImage: {
    height: calcHeight(20),
    width: calcWidth(20),
    fill: lightSteelBlue,
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  selectedText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
  mainContainer: {
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  }
});

export default styles;
