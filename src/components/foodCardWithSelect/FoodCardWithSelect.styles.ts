import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  backgroudGreen,
  backgroudLightGrey,
  green,
  lightGray,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    width: calcWidth(210),
    height:calcHeight(210),
    padding:calcWidth(3),
    borderRadius:calcWidth(25),
    alignItems:'center',
  },
  containerNotSelected:{
    backgroundColor:primaryWhite,
    ...borderStyle({size: 25, type: 'default'}),
  },
  containerSelected:{
    backgroundColor:backgroudGreen
  },
  headerContainer: {
    width: calcWidth(207),
    height:calcHeight(115),
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: calcWidth(205),
    height:calcHeight(115),
    borderTopRightRadius: calcHeight(25),
    borderTopLeftRadius: calcHeight(25),
  },
  topLeftIcone: {
    borderTopRightRadius:calcWidth(18),
    borderTopLeftRadius:calcWidth(10),
    borderBottomLeftRadius:calcWidth(18),
    borderBottomRightRadius:calcWidth(10),
    backgroundColor:primaryBlack,
    height: calcHeight(48),
    width: calcHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: calcWidth(4),
    top:calcHeight(4),
    opacity:0.7
  },
  bottomSheet: {
    width: calcWidth(210),
    paddingHorizontal:calcWidth(12)
  },
  titleTextContainer:{
    marginTop:calcHeight(23),
    marginBottom:calcHeight(10)
  },
  titleText: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryBlack,
  },
  titleText1: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryWhite,
  },
  greenText: {
    color: green,
  },
  infoTextContainer:{
    flexDirection:'row'
  },
  infoText: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: primaryBlack,
    marginRight: calcWidth(18),
  },
  infoText1: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: primaryWhite,
    marginRight: calcWidth(18),
  },
  check:{
    height:calcHeight(34),
    width:calcWidth(34),
    borderRadius:calcWidth(20),
    position:'absolute',
    bottom:calcHeight(8),
    right:calcWidth(8),
    opacity:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkSelected:{
    backgroundColor:primaryBlack,
  },
  checkNotSelected:{
    backgroundColor:backgroudLightGrey,
    borderWidth:calcWidth(1),
    borderColor:lightGray
  }
});
export default styles;
