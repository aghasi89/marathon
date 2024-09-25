import { StyleSheet } from 'react-native';
import { primaryWhite } from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: primaryWhite,
    height: calcHeight(250),
    borderTopLeftRadius: calcHeight(30),
    borderTopRightRadius: calcHeight(30),
  },
  touch: {
    height: calcHeight(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
