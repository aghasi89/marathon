import { StyleSheet } from 'react-native'
import { calcHeight, calcWidth } from '../../assets/dimensions'

const styles = StyleSheet.create({
  container:{
    width:calcWidth(400),
    paddingTop:calcHeight(3)
  },
})

export default styles
