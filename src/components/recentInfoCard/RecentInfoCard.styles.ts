import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudLightGrey,
  formFieldGrey,
  green,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    backgroundColor: primaryWhite,
    marginBottom: calcHeight(11),
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'medium'}),
    color: primaryBlack,
    marginTop: calcHeight(19),
    marginBottom: calcHeight(10),
  },
  image: {
    width: calcWidth(97),
    borderTopRightRadius: calcHeight(25),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: calcWidth(18),
  },
  textStyle: {
    color: formFieldGrey,
  },
  greenText: {
    color: green,
  },
  bottomSheet: {
    borderTopWidth: calcWidth(1),
    borderColor: backgroudLightGrey,
    flexDirection: 'row',
    paddingHorizontal: calcWidth(110),
    justifyContent: 'space-between',
    paddingVertical: calcHeight(17),
    marginTop: calcHeight(5),
  },
  bottomSheetTags:{
    borderTopWidth: calcWidth(1),
    borderColor: backgroudLightGrey,
    flexDirection: 'row',
    paddingHorizontal: calcWidth(20),
    justifyContent: 'space-between',
    paddingVertical: calcHeight(17),
    marginTop: calcHeight(5),
  },
  bottomSheet1: {
    borderTopWidth: calcWidth(1),
    borderColor: backgroudLightGrey,
    flexDirection: 'row',
    paddingVertical: calcHeight(17),
    marginTop: calcHeight(5),
    justifyContent: 'center',
  },
  text: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: formFieldGrey,
  },
  check: {
    position: 'absolute',
    right: 0,
  },
  closeTouch: {
    height: calcHeight(50),
    width: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  infoText1: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: formFieldGrey,
    marginRight: calcWidth(15),
  },
  infoText: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: formFieldGrey,
    marginRight: 0,
  },
});
export default styles;
