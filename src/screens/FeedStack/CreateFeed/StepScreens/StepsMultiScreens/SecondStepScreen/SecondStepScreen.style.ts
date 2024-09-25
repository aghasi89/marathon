import {StyleSheet} from 'react-native';
import {
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
  },
  sectionTitles: {
    marginVertical: calcHeight(24),
  },
  dateAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  datePickerContainer: {
    flexGrow:1,
    paddingRight:calcWidth(16)
  },
  durationInputContainer: {
    backgroundColor: primaryWhite,
    borderRadius: calcWidth(10),
    paddingLeft: calcWidth(16),
    paddingRight: calcWidth(10),
    paddingVertical: calcHeight(3),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  durationInput: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    padding: calcHeight(0),
    paddingHorizontal: calcWidth(10),
    flexBasis:'37%'
  },
  hourglassIcon: {
    height: calcHeight(15),
    width: calcWidth(15),
    fill: lightSteelBlue,
  },
  personIcon: {
    height: calcHeight(16),
    width: calcWidth(16),
    fill: lightSteelBlue,
  },
  customSwitchContainer: {
    marginBottom: calcHeight(24),
  },
  currencySelect: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: calcWidth(15),
    height: '100%',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  currencyText: {
    ...EnCodeSans({
      size: 'subLittle',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginRight: calcWidth(8),
  },
  currncyArrow: {
    height: calcHeight(6),
    width: calcWidth(8),
    fill: lightSteelBlue,
  },
});
export default styles;
