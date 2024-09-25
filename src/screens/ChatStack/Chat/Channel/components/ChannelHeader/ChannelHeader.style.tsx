import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';
import {
  backgroudGreen,
  chatSearchBorder,
  lightPeriwinkle,
  primaryBlack,
  primaryWhite,
  readedGreen,
} from '../../../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: calcHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: lightPeriwinkle,
    backgroundColor: primaryWhite,
    // paddingBottom: "100%"
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: primaryBlack
  },
  onlineContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  onlineText: {
    fontSize: 14,
    fontWeight: '400',
    color: chatSearchBorder,
    marginLeft: calcWidth(5.5)
  },
  imageContainer: {
    width: calcHeight(42),
    height: calcHeight(42),
    borderRadius: calcHeight(20),
    marginRight: calcHeight(12),
  },
  userAvatar: {
    width: calcHeight(42),
    height: calcHeight(42),
    borderRadius: calcHeight(21),
    resizeMode: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
    // marginLeft: 4
    // backgroundColor: "aqua"
  },
  userInfoTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
    marginLeft: calcWidth(7)
  },
  menu: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: calcWidth(16),
  },
  editMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: calcHeight(15),
  },
  liveIcon: {
    height: calcHeight(24),
    width: calcWidth(33),
  },
  onlineStatus: {
    width: calcWidth(8),
    height: calcWidth(8),
    borderRadius: calcHeight(50),
    backgroundColor: readedGreen,
  },
  lottieView: {
    height: calcHeight(45),
  },
});
export default styles;
