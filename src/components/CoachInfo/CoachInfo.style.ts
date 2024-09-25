import { StyleSheet } from 'react-native';
import {
  lightPeriwinkles,
  platinum,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    borderWidth: calcWidth(1),
    borderColor: platinum,
    borderRadius: calcHeight(10),
    width: calcWidth(290),
    height: calcHeight(330),
    overflow: 'hidden',
  },
  titleContainer: {
    flex: 2
  },
  image: {
    width: '100%',
    height: calcHeight(160),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: calcWidth(10),
    paddingVertical: calcHeight(10),
    justifyContent: 'space-between',
  },
  text: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryWhite,
  },
  headerText: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'regular',
    }),
    color: primaryBlack,
  },
  emptyView: {
    marginHorizontal: calcHeight(5),
  },
  reatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: calcWidth(10),
    paddingVertical: calcHeight(10),
  },
  statusText: {
    paddingHorizontal: calcWidth(10),
  },
  flagsContainer: {
    position: 'absolute',
    top: calcHeight(5),
    left: calcWidth(5),
  },
  flagIcon: {
    height: calcHeight(30),
    width: calcWidth(30),
    borderRadius: calcHeight(15),
    resizeMode: 'cover',
    marginBottom: calcHeight(10),
  },
  verifiedText: {
    ...EnCodeSans({
      size: 'subText',
      weight: 'regular',
    }),
    color: primaryBlue,
  },
  altBackgroundImage: {
    height: calcHeight(65),
    width: calcWidth(65),
    fill: lightPeriwinkles,
  },
});
export default styles;