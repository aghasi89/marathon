import {StyleSheet} from 'react-native';
import {
  borderGrey,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    paddingLeft: calcWidth(12),
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(10),
  },
  closeTouch: {
    height: calcHeight(50),
    width: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: calcHeight(38),
    width: calcHeight(38),
    borderRadius: calcHeight(38),
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'medium'}),
    color: primaryBlack,
    width: '70%',
  },
  select: {
    width: calcWidth(166),
  },
  numberInput: {
    width: calcWidth(85),
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: calcHeight(14),
  },
  selectStyle: {
    height: calcHeight(50),
  },
  kcalText: {
    width: '20%',
  },
  textInpuContainer: {
    paddingVertical: calcHeight(8),
    borderRadius: calcHeight(25),
    borderColor: borderGrey,
    opacity: 1,
    borderWidth: 1,
    paddingHorizontal: calcWidth(19),
    flexDirection: 'row',
  },
  count: {
    paddingHorizontal: calcWidth(10),
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: calcWidth(8),
  },
});
export default styles;
