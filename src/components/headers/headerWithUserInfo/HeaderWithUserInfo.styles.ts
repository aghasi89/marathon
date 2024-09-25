import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import {
  lightGray,
  primaryBlack,
} from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: calcWidth(10),
  },
  arrowButton: {
    width: '15%',
    height: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconAltView: {
    width: calcWidth(20)
  },
  userInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    height: calcHeight(40),
    width: calcWidth(40),
    backgroundColor: lightGray,
    borderRadius: calcHeight(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(20),
  },
  infoTextsContainer: {
    marginLeft: calcWidth(20)
  },
  titleText: {
    ...EnCodeSans({ size: 'body', weight: 'regular' }),
    color: primaryBlack
  },
  subText: {
    ...EnCodeSans({ size: 'subText', weight: 'regular' }),
  },
  rightComponent: {
    width: '15%',
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default styles;
