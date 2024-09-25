import {StyleSheet} from 'react-native';
import {
  aliceBlue,
  lightPeriwinkles,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: calcWidth(8),
    borderRadius: calcHeight(16),
    backgroundColor: aliceBlue,
  },
  imageContainer: {
    width: calcWidth(120),
    height: calcHeight(75),
    borderRadius: calcHeight(10),
    marginVertical: calcHeight(8),
  },
  image: {
    width: calcWidth(120),
    height: calcHeight(75),
    borderRadius: calcHeight(10),
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  playIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%",
    width:'100%'  
  },
  playIconBackground: {
    width: calcWidth(24),
    height: calcHeight(24),
    borderRadius: calcHeight(12),
    backgroundColor: primaryWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    height: calcHeight(10),
    width: calcWidth(12),
    fill:primaryBlue
  },
  contentContainer: {
    justifyContent: 'center',
    marginHorizontal: calcWidth(11),
  },
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  timesContainer: {
    flexDirection: 'row',
    marginTop: calcHeight(12),
  },
  timeItemContainer: {
    flexDirection: 'row',
    marginRight: calcWidth(17),
    alignItems:'center'
  },
  time: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'regular',
    }),
    marginLeft: calcWidth(6),
  },
  closeIconTouchContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: calcWidth(36),
    height: calcHeight(36),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:100
  },
  closeIcon: {
    height: calcHeight(12),
    width: calcWidth(12),
    fill: lightPeriwinkles,
  },
  hourglassIcon:{
    width: calcWidth(14),
    height:calcHeight(14),
    fill: lightPeriwinkles,
  }
});

export default styles;
