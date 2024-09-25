import {StyleSheet} from 'react-native';
import {
  lightGray,
  primaryBlue,
  primaryGrey,
} from '../../../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

export const styles = StyleSheet.create({
  icon: {
    width: calcWidth(36),
    height: calcHeight(36),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    width: '76%',
    height: calcHeight(10),
    backgroundColor: primaryGrey,
    borderRadius: calcHeight(5),
  },
  progressBar: {
    height: calcHeight(10),
    backgroundColor: primaryBlue,
    borderRadius: calcHeight(5),
  },
});
