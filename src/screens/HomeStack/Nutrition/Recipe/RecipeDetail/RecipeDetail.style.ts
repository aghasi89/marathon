import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  primaryBlack,
  primaryLightBlue,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcWidth(20),
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: primaryBlack,
  },
  paragraphTitle: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color: primaryLightBlue,
    textAlign: 'left',
    width: '100%',
    marginVertical: calcHeight(30),
  },
  numberInputContainer: {
    width: calcWidth(85),
  },
  dropDownContainer: {
    width: calcWidth(230),
  },
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: calcHeight(27),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: calcHeight(17),
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  elipsIcon: {
    paddingHorizontal: calcWidth(15),
  },
  chpsGroup: {
    height: calcHeight(60),
  },
  steps: {
    marginBottom: calcHeight(30),
  },
});
export default styles;
