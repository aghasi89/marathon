import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  disable,
  formFieldGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: primaryWhite,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: calcHeight(20),
    width: '100%',
    justifyContent: 'center',
  },
  startAndEndDayButtonsConteiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowsConteiner: {
    height: calcHeight(35),
    width: calcWidth(55),
    ...borderStyle({size: 25, type: 'outline'}),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: disable,
  },
  arrows: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  daysButtonConteiner: {
    alignItems: 'center',
    marginHorizontal: calcHeight(20),
    justifyContent: 'center',
  },
  buttonTitle: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: formFieldGrey,
    marginVertical: calcHeight(10),
  },
  button: {
    height: calcHeight(60),
    width: calcWidth(170),
  },
  buttonIsActive: {
    borderColor: primaryBlue,
    height: calcHeight(60),
    width: calcWidth(170),
  },
  buttonTextIsActive: {
    color: primaryBlue,
  },
  calendarConteiner: {
    width: '100%',
  },
  bottomButtonsStyle: {
    bottom: calcHeight(30),
    position: 'absolute',
  },
});
export default styles;
