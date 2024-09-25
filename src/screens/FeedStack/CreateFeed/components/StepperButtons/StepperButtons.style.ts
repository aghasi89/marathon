import { Platform, StyleSheet } from 'react-native';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { lightSteelBlue, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(16),
    paddingBottom:Platform.OS == 'android' ? calcHeight(10) : calcHeight(20)
  },
  previousButton: {
    borderColor: primaryBlue,
    marginRight: calcWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: calcWidth(16),
    borderRadius: 8,
    paddingVertical: calcHeight(12),
    flex: 1
  },
  previousButtonDisabled: {
    borderColor: lightSteelBlue,
    marginRight: calcWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: calcWidth(16),
    flex: 1,
    paddingVertical: calcHeight(12),
    borderRadius: 8,
  },
  previousButtonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
  previousButtonTextDisabled: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: lightSteelBlue,
  },
  nextButton: {
    backgroundColor: primaryBlue,
    paddingHorizontal: calcWidth(7),
    flex: 1,
    borderRadius: 8,
    paddingVertical: calcHeight(12),
  },
  nextButtonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryWhite,
  },
});

export default styles;
