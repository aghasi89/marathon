import {StyleSheet} from 'react-native';
import {
  lightSteelBlue,
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:calcWidth(24),
    paddingRight:calcWidth(16)
  },
  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:calcHeight(1)
  },
  titleText:{
    ...EnCodeSans({
      size:'form-field',
      weight:'semibold'
    }),
    color:primaryBlue
  },
  categoriesContainer:{
    paddingLeft:calcWidth(10),
  },
  contentItemContainer:{
    marginBottom:calcHeight(12)
  },
  categoriesListContainer:{

  },
  categoryRowContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:calcHeight(4)
  },
  arrowIcon:{
    height:calcHeight(16),
    width:calcWidth(12),
    fill:lightSteelBlue
  },
  arrowIconSelected:{
    height:calcHeight(16),
    width:calcWidth(12),
    fill:primaryBlue
  },
  categoryName:{
    ...EnCodeSans({
      size:'body',
      weight:'regular',
    }),
    color:primaryBlack
  },
  checkIcon:{
    height:calcHeight(10),
    width:calcWidth(13),
    fill:primaryBlue
  }
});
export default styles;
