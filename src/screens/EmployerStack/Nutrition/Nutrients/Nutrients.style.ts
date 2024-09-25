import {StyleSheet} from 'react-native';
import {borderGrey, primaryBlack, primaryGrey, primaryWhite } from '../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer:{
    backgroundColor:primaryWhite,
    shadowColor: primaryGrey,
    shadowOffset: {
      width: calcWidth(0),
      height: calcHeight(7),
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  titleContainer:{ 
    width:calcWidth(400),
    height:calcHeight(65),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:calcWidth(26),
    paddingRight:calcWidth(19),
    marginTop:calcHeight(23)
  },
  titleText:{
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color:primaryBlack
  },
  categoriesButtonsContainer:{
    marginTop:calcHeight(11),
  },
  infoItemContainer:{
    borderBottomColor:borderGrey,
    borderBottomWidth:calcHeight(2),
  },
});

export default styles;
