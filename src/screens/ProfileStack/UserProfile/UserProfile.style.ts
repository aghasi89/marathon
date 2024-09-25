import { Platform, StyleSheet } from 'react-native';
import { primaryBlack, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: primaryWhite,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  stretchContainer: {
    alignSelf: 'stretch',
    flex: 1,
  },
  nameText: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'headline',
      weight: 'medium',
    })
  },
  status: {
    color: primaryBlack,
    marginTop: calcHeight(20),
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
  },
  location: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'subText',
      weight: 'medium',
    }),
    marginLeft: calcWidth(10)
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: Platform.OS === "android" ? calcHeight(-20) : 0
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    position: 'absolute',
    top: calcHeight(110),
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 3,
    backgroundColor: "white",
    borderRadius: 24,
    marginTop: calcHeight(40)
  },
  safeArea: {
    alignSelf: 'stretch',
    marginTop: calcHeight(-30)
  },
  image: {
    height: calcWidth(24),
    width: calcWidth(24),
    borderRadius: calcWidth(147),
  },
  languagesContainer: {
    flexDirection: "row",
    marginTop: calcHeight(5)
  },
  rowItems: {
    flexDirection: "row",
    marginLeft: calcWidth(12)
  },
  sectionTitle: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    marginTop: calcHeight(16)
  },
  sectionList: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  horizonatal: {
    paddingHorizontal: calcWidth(24)
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: calcHeight(22)
  },
  followingButton: {
    paddingVertical: calcHeight(6),
    justifyContent: "center",
    paddingHorizontal: calcWidth(14),
    borderWidth: 1,
    borderColor: primaryBlue,
    borderRadius: calcWidth(15)
  },
  socailIcon: {
    marginRight: calcWidth(10)
  },
  row: {
    flexDirection: "row"
  },
  listItemContainer: {
    paddingHorizontal: calcWidth(8)
  },
  icon: {
    marginRight: calcWidth(7),
    marginTop: calcHeight(5)
  },
  iconStyle: {
    height: calcHeight(22),
    width: calcWidth(22),
    fill: primaryBlue,
    marginHorizontal: calcWidth(25)
  },
  smallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primaryBlue,
    marginLeft: calcWidth(16)
  },
  defaultButton: {
    backgroundColor: primaryBlue,
    flex: 1,
    paddingVertical: calcHeight(10),
    minHeight: calcHeight(45)
  },
  defaultButtonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryWhite,
  },
});
export default styles;