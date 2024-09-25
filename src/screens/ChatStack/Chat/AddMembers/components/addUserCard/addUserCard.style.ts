import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  chatSearchBorder,
  inputBorder,
  paleCornflowerBlue,
  primaryBlack,
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    alignItems: "center",
    paddingVertical: calcHeight(4),
    marginBottom: calcHeight(8),
    borderRadius: calcHeight(5),
  },
  userAvatar: {
    width: calcHeight(52),
    height: calcHeight(52),
    borderRadius: calcHeight(100),
  },
  selectedUser: {
    backgroundColor: robinEggBlue,
  },
  nameContainer: {
    paddingLeft: calcWidth(10),
    paddingRight: calcWidth(20),
    // backgroundColor: "aqua"
  },
  name: {
    fontSize: 18,
    fontWeight: "400",
    color: primaryBlack,
    marginBottom: 5
  },
  userName: {
    fontSize: 14,
    fontWeight: "400",
    color: chatSearchBorder,
  },
  adminText: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlue,
    marginTop: 8
  }
});
export default styles;
