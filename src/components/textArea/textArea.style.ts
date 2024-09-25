import { StyleSheet } from 'react-native';
import { calcHeight } from '../../assets/dimensions';


const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    textAlignVertical: 'top',
    paddingHorizontal: calcHeight(12)
  },
});

export default style;
