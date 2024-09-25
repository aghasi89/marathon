import { StyleSheet } from 'react-native';
import { borderGrey, primaryBlack } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';


const styles = StyleSheet.create({
  dropdown: {
    // height: 50,
    // width: 166,
    width:"100%",
    borderRadius: 22,
    borderWidth:1,
    borderColor:borderGrey,
    paddingHorizontal:15
  },
  imageStyle: {
    width: 24,
    height: 24,
   
  },
  selectedTextStyle: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'semibold'
    }),
    color:primaryBlack,
    marginLeft:15
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default styles;
