import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
import {primaryBlue, primaryWhite} from '../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    paddingHorizontal: calcWidth(16),
  },
  listContainer: {
    flex: 1,
    paddingTop: calcHeight(24),
  },
  listItemContainer: {
    marginBottom: calcHeight(16),
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: calcHeight(16),
    paddingHorizontal: calcWidth(10),
  },
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlue,
  },
  datePickerContainer: {
    minWidth: calcWidth(200),
  },
  packageTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: calcHeight(16),
  },
  genderButtonsContainer:{
    paddingLeft:calcWidth(10),
    marginBottom:calcHeight(16)
  }
});

export default styles;
