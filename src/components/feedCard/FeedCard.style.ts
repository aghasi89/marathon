import {StyleSheet} from 'react-native';
import { primaryBlack } from '../../assets/styles/colors.styles';
import {calcHeight} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: calcHeight(15),
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
});

export default styles;
