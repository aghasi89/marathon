import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { primaryBlack, primaryGrey, primaryWhite, robinEggBlue, } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: calcWidth(10),
    backgroundColor: primaryWhite
  },
  wrapper: {
    flexDirection: "row",
  },
  image: {
    height: calcWidth(50),
    width: calcWidth(50),
    borderRadius: calcWidth(50),
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    width: "90%",
    paddingHorizontal: calcHeight(10),
  },
  userInfoText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: "body",
      weight: "semibold",
    }),
  },
  dateText: {
    color: primaryGrey,
    ...EnCodeSans({
      size: "subText",
      weight: "regular",
    }),
    marginLeft: calcWidth(10),
  },
  footer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: calcHeight(60),
  },
  replyText:
  {
    color: robinEggBlue,
    ...EnCodeSans({
      size: "subText",
      weight: "regular",
    }),
  },
  icon: {
    height: calcWidth(20),
    width: calcHeight(20),
    marginHorizontal: calcHeight(5)
  },
  replyContainer: {
    marginLeft: calcHeight(60),
  }
});
export default styles;
