import { StyleSheet } from 'react-native';
import { lightGrayishBlue, primaryBlack, primaryWhite } from '../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: calcWidth(16),
    backgroundColor: primaryWhite,
    paddingTop: calcHeight(10),
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: 'row',
  },
  backIcon: {
    height: calcHeight(12),
    width: calcWidth(6),
    fill: lightGrayishBlue,
    marginRight: calcWidth(8)
  },
  titleContainer: { 
    justifyContent: 'center',
    flex: 1,
  },
  titleAlign:{
    alignItems: 'center',
  },
  titleAlignWithIcon:{
    paddingLeft:calcWidth(30)
  },
  title: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    marginLeft: calcWidth(-30)
  },
  backButton: {
    paddingHorizontal: calcWidth(16),  
  },
  rightContainer: {
    flexGrow:1,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    marginVertical: calcHeight(10)
  },
  rightText:{
    ...EnCodeSans({
      size:'body',
      weight:'regular'
    }),
    color:primaryBlack,
    marginHorizontal:calcWidth(16)
  }
});
export default styles;
