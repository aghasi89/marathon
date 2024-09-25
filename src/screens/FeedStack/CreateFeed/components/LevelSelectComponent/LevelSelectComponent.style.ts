import { StyleSheet } from 'react-native';
import { primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGlobalStyle: {
    paddingHorizontal: calcWidth(12),
    paddingVertical: calcHeight(10),
    borderRadius: calcHeight(10),
    backgroundColor: primaryBlue,
    flexDirection: 'row'
  },
  button: {
    opacity: 0.5,
  },
  selectedButton: {

  },
  buttonTitle: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'semibold'
    }),
    color: primaryWhite,
    marginLeft: calcWidth(8)
  }
});

export default styles;
