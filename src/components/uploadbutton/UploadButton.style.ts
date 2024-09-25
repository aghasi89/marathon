import {Platform, StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {lightPeriwinkles, primaryBlack, primaryBlue, primaryWhite, robinEggBlue, workoutBlue} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  text: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    letterSpacing: 0.27,
    color: primaryBlack,
    marginLeft: 13,
  },
  button: {
    height: calcHeight(50),
    width: calcWidth(270),
  },
  textStyle: {
    marginLeft: calcWidth(10),
  },
  cropperContainer:{
    flexGrow:1,
    backgroundColor:workoutBlue,
    alignItems:'center',
    justifyContent:'center'
  },
  imageConfigsContainer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  galleryContainer: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    flexWrap:'wrap',
    backgroundColor: primaryWhite,
    // justifyContent:'space-between',
  },
  empty:{
    width:calcWidth(3)
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:"100%",
    alignItems:'center',
    marginTop: Platform.OS == 'ios' ? calcHeight(50) : 0,
    marginBottom:calcHeight(8)
  },
  backIconTouchContainer:{
    width:calcWidth(50),
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:calcWidth(16),
    height:'100%'
  },
  listContainer:{
    justifyContent:'space-between'
  },
  headerTitle:{
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
    color:primaryBlack
  },
  saveButtonTouch:{
    paddingRight:calcWidth(16)
  },
  saveButtonText:{
    ...EnCodeSans({
      size:'body',
      weight:'bold'
    }),
    
  },
  imageConfigsEmptyView:{
    height:calcHeight(54),
  },
  sizeConfigIconBorder:{
    height:calcHeight(30),
    width:calcWidth(30),
    borderRadius:calcHeight(5),
    alignItems:'center',
    justifyContent:'center',
    borderWidth:calcWidth(1),
    borderColor:robinEggBlue
  },
  sizeConfigIconBorderSelected:{
    height:calcHeight(30),
    width:calcWidth(30),
    borderRadius:calcHeight(5),
    alignItems:'center',
    justifyContent:'center',
    borderWidth:calcWidth(1),
    borderColor:primaryBlue,
    backgroundColor:primaryBlue
  },
  sizeConfigIcon:{
    borderRadius:calcHeight(3),
    backgroundColor:robinEggBlue
  },
  sizeConfigIconSelected:{
    borderRadius:calcHeight(3),
    backgroundColor:primaryWhite
  },
  square:{
    height:calcHeight(18),
    width:calcWidth(18)
  },
  horizontalRectangle:{
    height:calcHeight(12),
    width:calcWidth(20)
  },
 verticalRectangle:{
    height:calcHeight(20),
    width:calcWidth(12)
  },
  imageSizeSelectTouch:{
    width:calcWidth(38),
    height:calcHeight(54),
    alignItems:'center',
    justifyContent:'center'
  },
  videoTouchContainer:{
    height:'100%',
    width:'100%',
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',    
  },
  playIconContainer:{
    height:calcHeight(80),
    width:calcWidth(80),
    borderRadius:calcHeight(40),
    backgroundColor:robinEggBlue,
    alignItems:'center',
    justifyContent:'center'
  },
  playIcon:{
    height:calcHeight(50),
    width:calcWidth(50),
    fill:primaryWhite,
    marginLeft:calcWidth(10)
  },
  emptyViewForDefaultCropper:{
    height:calcHeight(10),
    width:'100%',
    backgroundColor:primaryWhite
  },
  openAlbumsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: calcWidth(10),
    width: calcWidth(130)
  },
  openAlbumsText: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: calcWidth(5),
    color: "black",
    marginBottom: calcHeight(5)
  },
  arrowDown: {
    marginTop: calcHeight(10)
  }
});
export default styles;