import {StyleSheet} from 'react-native';
import { primaryBlack } from '../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
percentIcon:{
    fontSize:calcHeight(30),
    color:primaryBlack
},
cardContainer:{
    width:calcWidth(180),
    marginTop:calcHeight(11),
    marginLeft:calcWidth(11)
}
});

export default styles;
