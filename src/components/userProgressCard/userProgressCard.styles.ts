import {StyleSheet} from 'react-native';
import {borderStyle} from '../../assets/styles/global.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryBlack, primaryWhite} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    backgroundColor: primaryWhite,
    minWidth: calcWidth(185),
    minHeight: calcHeight(120),
    paddingVertical: calcHeight(11),
    paddingHorizontal: calcWidth(18),
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryBlack,
    marginLeft: calcWidth(17),
  },
  amountText: {
    ...EnCodeSans({size: 'headline', weight: 'medium'}),
    color: primaryBlack,
    marginTop: calcHeight(35),
    alignItems: 'center',
    marginLeft: calcWidth(5),
  },
  currencyText: {
    ...EnCodeSans({size: 'legal', weight: 'medium'}),
    marginLeft: calcWidth(5),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: calcHeight(40),
    width: calcHeight(40),
    backgroundColor: '#589CFE12',
    borderRadius: calcHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: calcHeight(40),
    width: calcHeight(45),
    borderRadius: calcHeight(14),
    marginTop: calcHeight(35),
    marginRight: calcWidth(7),
  },
});
export default styles;
