import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  borderGrey,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: calcWidth(25),
    paddingVertical: calcHeight(16),
    elevation: 5,
    borderTopRightRadius: calcHeight(40),
    borderTopLeftRadius: calcHeight(40),
    backgroundColor: primaryWhite,
  },
  importButton: {
    height: calcHeight(50),
    width: calcWidth(233),
  },
  addButton: {
    height: calcHeight(50),
    width: calcWidth(159),
  },
  countText: {
    ...EnCodeSans({size: 'form-field', weight: 'regular'}),
    color: primaryBlack,
  },
  circles: {
    height: calcHeight(50),
    width: calcHeight(50),
    borderRadius: calcHeight(50),
    borderWidth: calcHeight(1),
    borderStyle: 'solid',
    borderColor: borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
