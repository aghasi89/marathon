import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icons from '../../assets/icons/svg/index'
import styles from './tabPhotoProgress.style'
type Props = {
    isSelected:string;
    setSelected:(value:string)=>void
}
const TabPhotoProgress:React.FC <Props> = ({
    isSelected,
    setSelected
})=>{
  return (
    <View style={styles.conteiner}>
        <View style={styles.contentContainer}>
              <TouchableOpacity  onPress={() =>setSelected('all')}>
                    {isSelected==='all'?<Icons.Menu {...styles.categoryIcons} />:
                    <Icons.Menu_disable {...styles.categoryIcons} />}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() =>setSelected('front')}>
                    {isSelected==='front'?<Icons.MenuFront {...styles.categoryIcons} />:
                    <Icons.MenuFront_disable {...styles.categoryIcons} />}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() =>setSelected('back')}>
                    {isSelected==='back'?<Icons.MenuBack {...styles.categoryIcons} />:
                    <Icons.MenuBack_disable {...styles.categoryIcons} />}
              </TouchableOpacity>
              <TouchableOpacity  onPress={() =>setSelected('side')}>
                    {isSelected==='side'?<Icons.MenuSide {...styles.categoryIcons} />:
                    <Icons.MenuSide_disable {...styles.categoryIcons} />}
              </TouchableOpacity>
        </View>
    </View>
  )
}
 
export default TabPhotoProgress