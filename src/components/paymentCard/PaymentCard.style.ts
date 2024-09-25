import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  lightGrayBorder,
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
    paddingVertical: calcHeight(20.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(15),
    borderLeftWidth: calcWidth(0.5),
    borderLeftColor: lightGrayBorder,
    borderRightWidth: calcWidth(0.5),
    borderRightColor: lightGrayBorder,
    marginHorizontal: calcWidth(20),
  },
  image: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(21),
    marginRight: calcWidth(10),
  },
  textName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  textDate: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  textPrice: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  textTitle: {
    ...EnCodeSans({
      size: 'subLittle',
      weight: 'medium',
    }),
    color: primaryBlue,
  },
});
export default styles;
