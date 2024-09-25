import { StyleSheet } from "react-native";
import { lightPeriwinkles, primaryBlue } from "../../assets/styles/colors.styles";
import { calcHeight, calcWidth } from "../../assets/dimensions";

const styles = StyleSheet.create({ 
    container: { 
      alignItems:'center'
    }, 
    progressBackgroundContainer:{
      height: calcHeight(10), 
      backgroundColor:lightPeriwinkles, 
      borderRadius:calcHeight(10),  
      width:calcWidth(250)
    },
    bar: { 
      height: calcHeight(10), 
      backgroundColor: primaryBlue, 
      borderRadius: calcHeight(10), 
    }, 
  }); 
  export default styles