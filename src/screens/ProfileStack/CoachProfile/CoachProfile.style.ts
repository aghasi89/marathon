import { Platform, StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite, red } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: calcHeight(70),
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
      size: 'headline2',
      weight: 'semibold',
    })
  },
  message: {
    color: red,
    fontSize: 12,
    fontWeight: "400",
    marginTop: calcWidth(8)
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
    marginTop: Platform.OS === "ios" ? calcHeight(-30) : calcHeight(-50)
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    position: 'absolute',
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
  infoTextContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: calcWidth(7),
    marginTop: calcHeight(5)
  },
  listItemContainer: {
    paddingHorizontal: calcWidth(8),
  },
  horizontalListItemContainer: {
    height: calcHeight(70),
    paddingHorizontal: calcWidth(8),
  }
});
export default styles;