import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 25,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(15),
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textRowContainer: {
    flexDirection: 'row',
    marginRight: calcWidth(35),
    alignItems: 'center',
  },
  image: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(21),
    marginTop: calcHeight(10),
  },
  textName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  textDate: {
    ...EnCodeSans({
      size: 'little',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(31),
  },
  textContainer: {
    paddingLeft: calcWidth(17),
  },
  text: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlack,
    maxWidth: '90%',
  },
  icon: {
    marginTop: calcHeight(20),
    height: calcHeight(11),
    width: calcWidth(11),
    borderRadius: calcHeight(5),
    backgroundColor: primaryBlue,
  },
});
export default styles;
