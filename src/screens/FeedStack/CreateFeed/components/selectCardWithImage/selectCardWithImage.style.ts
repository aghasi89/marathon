import { StyleSheet } from 'react-native';
import { aliceBlue, backgroudGrayVeryLight, lightPeriwinkles, paleCornflowerBlue, primaryBlack, primaryBlue, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderRadius: calcHeight(16),
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1
  },
  imageContainerSmall: {
    width: '100%',
    borderTopLeftRadius: calcHeight(16),
    borderTopRightRadius: calcHeight(16),
    height: calcHeight(76),
    overflow: 'hidden',
    backgroundColor: backgroudGrayVeryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainerLarge: {
    borderTopLeftRadius: calcHeight(16),
    borderTopRightRadius: calcHeight(16),
    height: calcHeight(111),
    overflow: 'hidden',
    backgroundColor: backgroudGrayVeryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageSmall: {
    borderTopLeftRadius: calcHeight(16),
    borderTopRighteRadius: calcHeight(16),
    height: calcHeight(76),
    width: '100%',
    resizeMode: 'cover'
  },
  imageLarge: {
    borderTopLeftRadius: calcHeight(16),
    borderTopRighteRadius: calcHeight(16),
    height: calcHeight(111),
    width: '100%',
    resizeMode: 'cover'
  },
  iconContainerSmall: {
    position: 'absolute',
    right: calcWidth(6),
    top: calcHeight(6),
    height: calcWidth(16),
    width: calcWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryWhite,
    borderRadius: calcHeight(8),
    zIndex: 2,
  },
  iconContainerLarge: {
    height: calcWidth(18),
    width: calcWidth(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryWhite,
    borderRadius: calcHeight(9),
    zIndex: 2,
  },
  closeIconTouch: {
    position: 'absolute',
    right: calcWidth(0),
    top: calcHeight(0),
    paddingVertical: calcHeight(10),
    paddingHorizontal: calcWidth(10),
    zIndex: 2,
  },
  iconContainerBackground: {
    opacity: 0.5
  },
  iconContainerSelectedBackground: {
    backgroundColor: paleCornflowerBlue
  },
  altImageIcon: {
    height: calcHeight(60),
    width: calcWidth(60),
    fill: lightPeriwinkles
  },
  closeIconStyleSmall: {
    height: calcHeight(7),
    width: calcWidth(7),
    fill: lightPeriwinkles
  },
  closeIconStyleLarge: {
    height: calcHeight(10),
    width: calcWidth(10),
    fill: lightPeriwinkles
  },
  checkIcon: {
    height: calcHeight(10),
    width: calcWidth(10),
    fill: primaryWhite
  },
  titleContainer: {
    borderBottomLeftRadius: calcHeight(16),
    borderBottomRightRadius: calcHeight(16),
    alignItems: 'center',
    backgroundColor: aliceBlue,
    paddingLeft: calcHeight(5)
  },
  titleContainerSelected: {
    backgroundColor: paleCornflowerBlue,
  },
  titleSmall: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular'
    }),
    color: primaryBlack,
    marginVertical: calcHeight(8)
  },
  titleLarge: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold'
    }),
    color: primaryBlack,
    marginVertical: calcHeight(8)
  },
  titleSelected: {
    color: primaryWhite,
  },
  footerIcon: {
    height: calcHeight(14),
    width: calcWidth(14),
    fill: lightPeriwinkles
  },
  timeIcons: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: calcWidth(5),
  },
  emptyView: {
    marginHorizontal: calcWidth(5)
  },
  timeTextStyle: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular'
    }),
    color: lightPeriwinkles,
    marginLeft: calcHeight(5)
  }
});
export default styles;
