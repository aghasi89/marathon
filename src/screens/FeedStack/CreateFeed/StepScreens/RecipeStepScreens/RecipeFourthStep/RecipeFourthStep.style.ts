import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  borderGrey,
  circleBorder,
  columbiaBlue,
  lightPeriwinkles,
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: calcWidth(16),
  },
  sectionTitles: {
    marginVertical: calcHeight(16),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: calcHeight(24),
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    color: primaryBlack,
  },
  emptyView: {
    width: calcWidth(19),
  },
  dropDownContainerStyle: {
    borderRadius: 0,
    borderColor: borderGrey,
    borderWidth: 1,
  },
  selectedItemContainerStyle: {
    backgroundColor: circleBorder,
  },
  dropDown: {
    borderRadius: calcWidth(10),
    borderColor: borderGrey,
    borderWidth: 1,
    paddingHorizontal: calcWidth(25),
    marginTop: calcHeight(16),
    marginBottom: calcHeight(80),
  },
  IconStyle: {
    height: calcHeight(14),
    width: calcWidth(14),
    fill: lightSteelBlue,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: lightSteelBlue,
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(9),
    borderRadius: calcHeight(10),
  },
  buttonTextSelected: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginLeft: calcWidth(10),
    marginRight: calcWidth(40),
  },
  arrowIcon: {
    height: calcHeight(6),
    width: calcWidth(8),
    fill: lightSteelBlue,
  },
  totalKcal: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightSteelBlue,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: calcWidth(1),
    marginBottom: calcHeight(24),
    borderRadius: calcHeight(10),
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(24),
    paddingVertical: calcHeight(7),
    borderColor: columbiaBlue,
  },
  buttonText: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    margin: 0,
  },
  durationInputContainer: {
    backgroundColor: primaryWhite,
    borderRadius: calcWidth(10),
    paddingLeft: calcWidth(16),
    paddingRight: calcWidth(10),
    maxWidth: calcWidth(150),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  durationInput: {
    paddingHorizontal: calcWidth(8),
    paddingVertical: calcHeight(8),
  },
  hourglassIcon: {
    height: calcHeight(15),
    width: calcWidth(15),
    fill: lightSteelBlue,
  },
  customSwitchContainer: {
    marginBottom: calcHeight(24),
  },
  coloriesTitleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: lightPeriwinkles,
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
  permissionTitles:{
    marginBottom:calcHeight(24)
  },
  eyeIcons:{
    height:calcHeight(14),
    width:calcWidth(22)
  }
});

export default styles;
