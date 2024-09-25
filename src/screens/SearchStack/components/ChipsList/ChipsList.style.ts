import { StyleSheet } from "react-native";
import { calcWidth } from "../../../../assets/dimensions";

const styles = StyleSheet.create({
    container:{
        paddingLeft:calcWidth(16)
    },
    chipItem:{
        marginRight:calcWidth(16)
    }
})
export default styles