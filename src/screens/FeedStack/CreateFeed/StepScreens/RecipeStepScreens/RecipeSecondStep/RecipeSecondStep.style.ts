import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  columbiaBlue,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
   flex:1
  },
  scrollContainer:{
    paddingTop: calcHeight(8),
    paddingHorizontal: calcWidth(16)
  },
  sectionTitles: {
    marginVertical: calcHeight(16),
  },
  inputContainer: {
    minHeight: calcHeight(90),
    maxHeight: calcHeight(180),
    alignItems: 'flex-start',
    marginBottom:calcHeight(16)
  },
  input: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    color:primaryBlack
  },
  ingridientItemInputContainer: {
    alignItems: 'flex-start',
    marginBottom: calcHeight(16),
  },
  ingridientItemInput: {
    color: primaryBlue,
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: calcWidth(1),
    marginBottom: calcHeight(16),
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
});
export default styles;
