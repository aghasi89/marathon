import { Platform, StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginBottom: calcHeight(70),
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
    }),
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
    marginTop: Platform.OS === "ios" ? 0 : calcHeight(-40)
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    position: 'absolute',
    top: calcHeight(140),
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
    marginTop: calcHeight(30)
  },
  sectionList: {
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  horizonatal: {
    paddingHorizontal: calcWidth(24),
  },
});
export default styles;