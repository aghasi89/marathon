import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';

const style = StyleSheet.create({
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(8)
  },
  container: {
    flex: 1,
    marginTop: calcHeight(60),
    marginBottom: calcHeight(90),
  },
  userInfoBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: calcWidth(16)
  },
  image: {
    height: calcWidth(48),
    width: calcWidth(48),
    borderRadius: calcWidth(48),
  },
  label: {
    // marginLeft: calcWidth(-20)
  },
  contentContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  exit: {
    marginLeft: calcWidth(32),
    marginTop: calcHeight(-15)
  },
  drawerItem: {
    borderRadius: 16,
    paddingHorizontal: calcWidth(14),
    marginTop: calcHeight(15),
    marginHorizontal: calcWidth(16),
    flexDirection: "row",
    alignItems: "center",
  },
  drawerLabel: {
    marginLeft: calcWidth(20),
    color: primaryBlack
  },
  loginLable: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(20)
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end"
  }
});

export default style;
