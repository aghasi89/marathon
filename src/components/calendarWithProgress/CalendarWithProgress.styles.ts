import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  disable,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: primaryWhite,
  },
  calendarStyle:{
    backgroundColor: primaryWhite
  },
  arrowsConteiner: {
    height: calcHeight(35),
    width: calcWidth(55),
    ...borderStyle({size: 25, type: 'outline'}),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: disable,
  },
  arrows: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  calendarConteiner: {
    width: '100%',
  },
  calendarItemContainer:{
    height:calcHeight(60),                                  
    justifyContent:'space-between',                                                      
  },
  dateText:{
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    textAlign: 'center', 
  },
  progressStyle:{
    height: calcHeight(30),
    width: calcWidth(30),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;
