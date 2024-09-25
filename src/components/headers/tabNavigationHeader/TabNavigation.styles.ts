import {StyleSheet} from 'react-native';
import {calcHeight} from '../../../assets/dimensions';
const styles = StyleSheet.create({
  tabs: {
    minWidth: '80%',
    height: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: calcHeight(60),
    width: '100%',
    //marginTop: calcHeight(20),
  },
  contentContainer: {
    minWidth: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
