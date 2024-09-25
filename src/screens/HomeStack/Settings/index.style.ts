import {StyleSheet} from 'react-native';
import {backgroudWhiteShadeGray,primaryBlack,primaryWhite} from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    flex: 1,
  },
  contentContainer:{
    backgroundColor:backgroudWhiteShadeGray
  },
  rowContainer: {
    flexDirection:'row',
    width:calcWidth(400),
    height:calcHeight(60),
    paddingLeft:calcWidth(22.5),
    alignItems:'center',
  },
  text: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold'
    }),
    color: primaryBlack,
    marginLeft: calcWidth(24.5)
  },
  footerContainer:{
    flex:1,
    justifyContent:'flex-end',
  },
  buttonContainer:{
    justifyContent:'flex-start',
    alignItems:'center',
    height:calcHeight(104.5)
  },
  button:{
    width:calcWidth(188),
    height:calcHeight(55)
  },
  buttonText:{
    ...EnCodeSans({
        size: 'headline',
        weight: 'semibold'
      }),
      color: primaryBlack,
  },
  logoContainer:{
    height:calcHeight(80),
    alignItems:'center',
    justifyContent:'flex-start'
  },
  versionText:{
    marginVertical:calcHeight(20),
    ...EnCodeSans({
        size: 'form-field',
      weight: 'semibold'
    })
  },
});

export default styles;
