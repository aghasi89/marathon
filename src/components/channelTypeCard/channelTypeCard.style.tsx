import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {primaryBlue} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16)
  },
  itemCard: {
    flexDirection: 'row',
    paddingVertical: calcHeight(10),
    alignItems: 'center',
    marginTop: calcHeight(15),
  },
  cardType: {
    color: primaryBlue,
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: calcWidth(12),
  },
});
export default styles;
