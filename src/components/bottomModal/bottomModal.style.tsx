import {StyleSheet} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import {primaryWhite} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcHeight(15),
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  iconContainer: {
    paddingTop: calcHeight(15),
    alignItems: 'center',
  },
});

export default styles;
