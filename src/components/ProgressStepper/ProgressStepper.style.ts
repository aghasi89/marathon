import { StyleSheet } from 'react-native';
import { lightSteelBlue, primaryBlue } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { calcHeight } from '../../assets/dimensions';

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  stepText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular'
    }),
    color: lightSteelBlue
  },
  selectedStepText: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular'
    }),
    color: primaryBlue
  },
  stepsProgressBackground: {
    height: calcHeight(8),
    backgroundColor: '#F0F6FE',
    borderRadius: calcHeight(25),
    marginTop: calcHeight(8)
  },
  stepsProgress: {
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(25),
    flex: 1
  }
});

export default styles;
