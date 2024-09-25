import {StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: calcWidth(11),
    paddingLeft: calcWidth(20),
  },
  image: {
    height: calcHeight(40),
    width: calcHeight(40),
    borderRadius: calcHeight(40),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    ...EnCodeSans({size: 'form-field', weight: 'medium'}),
    color: primaryBlack,
    marginLeft: calcWidth(25),
  },
  importButton: {
    height: calcHeight(38),
    width: calcWidth(95),
    borderColor: primaryBlue,
    // paddingRight: calcWidth(15),
  },
  buttonFollow: {
    color: primaryBlue,
    ...EnCodeSans({size: 'legal', weight: 'medium'}),
  },
  buttonFollowing: {
    color: primaryWhite,
    ...EnCodeSans({size: 'legal', weight: 'medium'}),
  },
});
export default styles;
