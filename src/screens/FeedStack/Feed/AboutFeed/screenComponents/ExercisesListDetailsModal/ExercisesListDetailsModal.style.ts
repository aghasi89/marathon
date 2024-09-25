import {Platform, StyleSheet} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
  robinEggBlue,
} from '../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: calcHeight(24),
    marginTop: calcHeight(24),
  },
  titleContainer: {
    paddingHorizontal: calcWidth(16),
    marginTop: calcHeight(16),
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlack,
  },
  chipsContainer: {
    paddingVertical: calcHeight(24),
  },
  chipItem: {
    borderWidth: calcWidth(1),
    borderColor: robinEggBlue,
  },
  descriptionContainer: {},
  sectionTitles: {
    paddingHorizontal: calcWidth(16),
    marginBottom: calcHeight(16),
    marginTop: calcHeight(10),
  },
  padding: {
    paddingHorizontal: calcWidth(16),
  },
  modalContent: {
    backgroundColor: primaryWhite,
    height: '90%',
  },
  equipmentContainer: {
    marginTop: calcHeight(24),
    marginBottom:calcHeight(50)
  },
  equipmentTitleContainer: {
    alignItems: 'center',
  },
  equipmentTitle: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection:'row',
    bottom:Platform.OS == 'android' ? 0 : calcHeight(20),
    width: '100%',
    zIndex:2,
    backgroundColor:primaryWhite,
    paddingVertical:calcHeight(5),
    paddingHorizontal:calcWidth(24),
    justifyContent:'space-between',
    alignItems:'center'
  },
  saveButton: {
    height:calcHeight(40),
    width:calcWidth(40),
    borderRadius: calcHeight(12),
    backgroundColor: primaryBlue,
    alignItems:'center',
    justifyContent:'center'
  },
 arrowIconsStyle:{
  height:calcHeight(15),
  width:calcWidth(17),
  fill:primaryWhite
 },
 indexInfoText:{
  ...EnCodeSans({
    size:'form-field',
    weight:'bold'
  }),
  color:primaryBlack
 }
});
export default styles;
