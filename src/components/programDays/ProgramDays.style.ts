import {StyleSheet} from 'react-native';
import {green, primaryBlack, primaryBlue,primaryWhite} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {calcHeight, calcWidth} from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    paddingVertical: calcHeight(3),
  },
  dayContainer:{
    flexDirection:'column',
    alignItems:'center',
  },
  dayTitle: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'legal',
    }),
  },
  day: {
    ...EnCodeSans({
      weight: 'medium',
      size: 'headline',
    }),
  },
  itemContainer: {
    backgroundColor: primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    width: calcWidth(45),
    height: calcHeight(67),
    marginHorizontal: calcWidth(6),
  },
  selectedItem: {
    ...borderStyle({size: 35, type: 'default'}),
    backgroundColor: primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: calcWidth(45),
    height: calcHeight(67),
    marginHorizontal: calcWidth(6),
  },
  dotsContainer:{
    flexDirection:'row',
    width: calcWidth(45),
    alignItems:'center',
    justifyContent:'center',
    marginBottom:calcHeight(6),
    height:calcHeight(18),   
  },
  toDoGreenBorder:{
    height:calcHeight(10),
    width:calcWidth(10),
    borderWidth:calcWidth(2),
    borderRadius:calcWidth(5),
    borderColor:green,
    marginRight:calcWidth(4)
  },
  toDoGreenBackground:{
    height:calcHeight(10),
    width:calcWidth(10),
    borderWidth:calcWidth(2),
    borderRadius:calcWidth(5),
    backgroundColor:green,
    borderColor:green,
    marginRight:calcWidth(4)
  },
  toDoBlueBorder:{
    height:calcHeight(10),
    width:calcWidth(10),
    borderWidth:calcWidth(2),
    borderRadius:calcWidth(5),
    borderColor:primaryBlue,
    marginRight:calcWidth(4)
  },
  toDoBlueBackground:{
    height:calcHeight(10),
    width:calcWidth(10),
    borderWidth:calcWidth(2),
    borderRadius:calcWidth(5),
    borderColor:primaryBlue,
    backgroundColor:primaryBlue,
    marginRight:calcWidth(4)
  },
  toDoPlusIcon:{
    height:calcHeight(10),
    width:calcWidth(10),
    borderRadius:calcWidth(5),
    backgroundColor:primaryBlack,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default styles;
