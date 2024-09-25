import {StyleSheet} from 'react-native';
import {primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    alignItems:'center'
  },
  selectedPeriodGeneralContainer: {
    marginTop: calcHeight(17),
    marginBottom: calcHeight(29),
  },
  sharingPeriodContainer: {
    height: calcHeight(87),
    width: calcWidth(357),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: calcHeight(22),
  },
  titleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  sharingPeriodButtonsContainer: {
    width: calcWidth(357),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodButton: {
    width: calcWidth(170),
    height: calcHeight(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
  },
  switchListContainer: {
    flex: 1,
  },
  iconsStyle: {
    height: calcHeight(22),
    width: calcWidth(22),
  },
  percentIcon: {
    fontSize: calcHeight(30),
    color: primaryBlack,
  },
});
export default styles;