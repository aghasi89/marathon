import { Platform, StyleSheet } from 'react-native';
import { darkWhite, primaryBlue } from '../../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    paddingBottom: calcHeight(10),
    backgroundColor: "#FFFFFF"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Platform.OS == 'ios' ? calcHeight(5) : 0,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: darkWhite,
    borderRadius: calcHeight(23),
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(10),
    marginHorizontal: calcWidth(5),
    flexGrow: 1,
    flex: 1,
    flexDirection: 'row',
  },
  audioPreview: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteIcon: {
    width: calcWidth(22),
    height: calcHeight(22),
  },
  dumb: {
    width: calcWidth(25),
    height: calcHeight(25),
    fill: primaryBlue,
    marginRight: calcWidth(7),
  },
});
