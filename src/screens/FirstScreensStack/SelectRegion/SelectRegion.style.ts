import { StyleSheet } from 'react-native';
import { primaryWhite } from '../../../assets/styles/colors.styles';
import { calcHeight } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  subConatiner: {
    flex: 1,
    paddingHorizontal: calcHeight(32),
    justifyContent: "center"
  },
  buttonStyle: {
    paddingVertical: calcHeight(10)
  },
  loading: {
    flex: 1
  },
  header:{
    paddingTop: calcHeight(35)
  }
});
export default styles;
