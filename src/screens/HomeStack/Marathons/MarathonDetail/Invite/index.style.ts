import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  borderGrey,
  formFieldGrey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  dataItem: {
    marginVertical: calcHeight(15),
  },
  tabNavigator: {
    paddingHorizontal: calcWidth(10),
    borderBottomColor: borderGrey,
    borderBottomWidth: calcWidth(1),
    borderTopColor: borderGrey,
    borderTopWidth: calcWidth(1),
  },
  item: {
    marginHorizontal: calcWidth(10),
    marginVertical: calcHeight(7),
  },
  listContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(17),
  },
  elipsIcon: {
    paddingHorizontal: calcWidth(15),
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTop: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: primaryBlack,
    margin: calcHeight(10),
    textAlign: 'center',
  },
  textTop1: {
    color: primaryBlue,
  },
  text: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'form-field',
    }),
    color: formFieldGrey,
    margin: calcHeight(10),
    textAlign: 'center',
  },
});
export default styles;
