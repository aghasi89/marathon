import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';
import {EnCodeSans} from '../../../../../../../assets/styles/fonts.styles';
import {
  lightPeriwinkles,
  primaryBlack,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
  },
  sectionTitles: {
    marginTop: calcHeight(24),
    marginBottom: calcHeight(16),
  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coloriesTitleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightPeriwinkles,
  },
  coloriesInputContainer: {
    backgroundColor: primaryWhite,
    borderRadius: calcHeight(10),
    paddingVertical: calcHeight(7),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
  },
  coloriesInput: {
    padding: 0,
    margin: 0,
    marginLeft: calcWidth(8),
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
  },
  iconStyle: {
    height: calcHeight(17),
    width: calcWidth(14),
    fill: lightPeriwinkles,
  },
  customSwitchContainer: {
    marginBottom: calcHeight(24),
  },
  permissioInfoContainer:{
    flexDirection:'row',
    paddinHorizontal:calcWidth(24),
    alignItems:'center',
    marginBottom: calcHeight(16),
  },
  permissioText:{
    ...EnCodeSans({
      size: 'legal',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft:calcWidth(10)
  },
  eyeIcons:{
    height:calcHeight(14),
    width:calcWidth(22)
  }
});
export default styles;
