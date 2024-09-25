import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
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
    paddingLeft: calcWidth(28),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: calcWidth(97),
    borderTopRightRadius: calcHeight(25),
    borderBottomRightRadius: calcHeight(25),
  },
  textContainer: {marginVertical: calcHeight(20), paddingRight: calcWidth(23)},
  textTitle: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginBottom: calcHeight(15),
  },
  textCount: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    marginLeft: calcWidth(10),
    marginRight: calcWidth(25),
    color: formFieldGrey,
  },
  textIconContainer: {flexDirection: 'row', alignItems: 'center'},
  textTime: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(10),
  },
});
export default styles;
