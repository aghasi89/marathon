import {StyleSheet} from 'react-native';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { primaryBlack, primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingTop:calcHeight(16),
    zIndex: 1,
    opacity: 0.7,
    justifyContent:'space-between',
    
  },
  topIconContainer:{
    alignItems:'flex-end',
    width:'100%',
    paddingHorizontal:calcWidth(16)
  },
  iconContainer: {
    backgroundColor: primaryWhite,
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveIconContainer: {
    // position: 'absolute',
    // top: calcHeight(16),
    // right: calcWidth(16),
    backgroundColor: primaryWhite,
    // zIndex: 1,
    borderRadius: calcWidth(40),
    // opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: calcWidth(6),
    paddingVertical: calcHeight(11),
  },
  iconStyle: {
    height: calcHeight(20),
    width: calcWidth(20),
  },
  liveDurationText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlue,
    marginLeft: calcWidth(4),
  },
  imageStyle16X9: {
    width: '100%',
    height: calcHeight(195),
    resizeMode: 'cover',
  },
  imageStyle4x5: {
    width: '100%',
    height: calcHeight(500),
    resizeMode: 'cover',
  },
  imageStyle1X1: {
    width: '100%',
    height: calcHeight(400),
    resizeMode: 'cover',
  },
  smallCard: {
    width: '100%',
    height: calcHeight(110),
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recipeContainer: {
    width:"100%",
    // position: 'absolute',
    // bottom: 0,
    zIndex: 1,
    backgroundColor: primaryBlack,
    opacity: 0.8,
  },
});
export default styles;
