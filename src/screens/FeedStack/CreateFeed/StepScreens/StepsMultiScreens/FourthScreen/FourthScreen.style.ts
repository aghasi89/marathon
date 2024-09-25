import {StyleSheet} from 'react-native';
import {
  lightSteelBlue,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  scrollContainer:{
    paddingHorizontal: calcWidth(16)
  },
  sectionTitle: {
    marginVertical: calcHeight(24),
  },
  measurmentsButtonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: lightSteelBlue,
  },
  inputStyle: {
    flexGrow: 1
  },
  inputTextColor: {
    color: primaryBlue, 
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: calcHeight(8),
  },
  button: {
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(22),
    paddingVertical: calcHeight(7),
  },
  buttonText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
  questionCardContainer: {
    marginBottom: calcHeight(16),
  },
});

export default styles;
