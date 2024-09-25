import {StyleSheet} from 'react-native';
import {
  formFieldGrey,
  primaryBlue,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingBottom: calcHeight(260),
    paddingHorizontal: calcWidth(10),
  },
  contentContainerBody: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: calcHeight(37),
  },
  progressCardStyle: {
    paddingVertical: calcHeight(10),
  },
  leftComponentStyle: {
    paddingRight: calcWidth(35),
  },
  leftComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: calcWidth(90),
  },
  iconStyle: {
    marginRight: calcWidth(23),
  },
  headerContainer: {
    borderBottomWidth: calcWidth(1),
    borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  touch: {
    height: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(23),
  },
  activeTouch: {
    height: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(23),
    borderBottomWidth: calcWidth(3),
    borderBottomColor: primaryBlue,
  },
  labelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: formFieldGrey,
    paddingVertical: calcHeight(15),
  },
  activeLabelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: primaryBlue,
    paddingVertical: calcHeight(15),
  },
  plusButton: {
    position: 'absolute',
    right: calcWidth(17),
    bottom: calcHeight(26),
  },
  text: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: formFieldGrey,
  },
  measureItem: {
    marginVertical: calcHeight(7),
  },
  bottomPart: {
    margin: calcWidth(24),
  },
  bottomPartItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
