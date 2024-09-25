import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  chatSearchBorder,
  primaryBlue,
} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "flex-end"
  },
  userAvatar: {
    width: calcHeight(75),
    height: calcHeight(75),
    borderRadius: calcHeight(40),
    resizeMode: 'contain',
  },
  searchInputContainer: {
    borderWidth: 1,
    borderRadius: 23,
    borderColor: chatSearchBorder,
    maxHeight: calcHeight(40),
    marginTop: calcHeight(6),
  },
  searchInput: {
    paddingLeft: calcWidth(10),
    marginTop: calcHeight(5)
  },
  title: {
    color: primaryBlue,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: calcHeight(10),
  },
  userInfo: {
    flex: 1,
    marginLeft: calcWidth(16),
  },
});
export default styles;
