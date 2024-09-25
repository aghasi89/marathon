import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {
  primaryBlack,
  backgroundligthBlue,
  borderGrey,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerIcon: {
    width: calcWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcWidth(60),
  },
  touch: {
    padding: calcWidth(20),
    borderBottomColor: borderGrey,
    borderBottomWidth: calcHeight(1),
  },
  iconContainer: {
    height: calcHeight(50),
    width: calcHeight(50),
    backgroundColor: backgroundligthBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcHeight(40),
    marginRight: calcWidth(23),
  },
  titleText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
  },
  text: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
  },
  touchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll:{
    borderTopColor: borderGrey,
    borderTopWidth: calcHeight(1),
  }
});
export default styles;
