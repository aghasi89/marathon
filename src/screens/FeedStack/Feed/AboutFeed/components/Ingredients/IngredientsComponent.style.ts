import {StyleSheet} from 'react-native';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import { inputBorder, primaryBlack, primaryBlue } from '../../../../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const style = StyleSheet.create({
  title: {
    ...EnCodeSans({
      size: 'headline',
      weight: 'semibold',
    }),
    color:primaryBlue
  },
  ingredientsContainer:{
    marginTop:calcHeight(10)
  },
  itemContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:calcHeight(6),
  },
  lastItemContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:calcHeight(6),
  },
  itemTitleContainer:{
    flexDirection:'row',
    alignItems:'center',
    width: '100%',
  },
  iconStyle:{
    marginRight:calcWidth(12),
    height:calcHeight(10),
    width:calcHeight(10),
    stroke:inputBorder
  },
  itemInfoContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  text:{
    ...EnCodeSans({
        size:'form-field',
        weight:'regular'
    }),
    color:primaryBlack,
    marginRight:calcWidth(20)
  }
});
export default style;
