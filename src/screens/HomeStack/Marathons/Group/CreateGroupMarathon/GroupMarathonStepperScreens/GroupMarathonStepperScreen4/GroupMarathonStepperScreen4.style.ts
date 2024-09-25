import {StyleSheet} from 'react-native';
import {primaryWhite} from '../../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcHeight(15),
  },
  textInputContainer: {
    width: '100%',
    alignItems:'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(25),
    alignItems: 'center',
  },
  buttnConteiner:{
    width:'100%',
    alignItems:'center',
    marginVertical:calcHeight(50),
  },
  button: {
    height: calcHeight(50),
    width: calcWidth(270),
  },
});
export default styles;
