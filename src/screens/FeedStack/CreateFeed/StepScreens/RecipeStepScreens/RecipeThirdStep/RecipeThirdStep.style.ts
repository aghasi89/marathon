import {StyleSheet} from 'react-native';
import { columbiaBlue, primaryBlack, primaryBlue, primaryWhite, red } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

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
  input:{
    flexGrow:1,
    color:primaryBlack,
    ...EnCodeSans({
      size:'legal',
      weight:'regular'
    }),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  stepContentContainer:{
    paddingHorizontal:calcWidth(16),
    backgroundColor:primaryWhite
  },
  itemContainer:{
    marginBottom:calcHeight(24)
  },
  itemborderInvalid:{
    borderWidth:calcWidth(1),
    borderColor:red
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
    borderColor: columbiaBlue
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
