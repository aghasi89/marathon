import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  primaryBlack,
  borderGrey,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(14),
    marginBottom: calcHeight(12),
  },
  image: {
    height: calcHeight(50),
    width: calcHeight(50),
    borderRadius: calcHeight(50),
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'medium'}),
    color: primaryBlack,
    width: calcWidth(240),
    textAlign: 'left',
  },
  selectedButton: {
    height: calcHeight(30),
    width: calcHeight(30),
    borderRadius: calcHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: primaryBlue,
  },
  disSelectedTouch: {
    borderColor: borderGrey,
    borderWidth: 1,
  },
  touch: {
    height: calcHeight(50),
    width: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    height: calcHeight(65),
    width: calcWidth(40),
    alignItems: 'center',
    paddingTop: calcHeight(12),
  },
});
export default styles;
