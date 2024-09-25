import { StyleSheet } from 'react-native';
import { inputBorder, primaryBlack } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  header:{
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold'
    }), 
    color:primaryBlack,
    marginBottom:17,
    textAlign:"center"
  },

  contentContainer: {
    flexDirection: "row"
  },
  circleContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  colorContainer:{
    height:48,
    width:48,
    marginHorizontal:3,
    alignItems:"center",
    justifyContent:"center",
    opacity:1,
  },
  selectedColorContainer:{
    borderWidth:1,
    borderColor:inputBorder,
    borderRadius:24,
 
  }

});
export default styles;
