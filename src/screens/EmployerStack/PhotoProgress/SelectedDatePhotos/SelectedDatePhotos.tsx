import React ,{ useMemo} from 'react'
import { View,TouchableOpacity,Text,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icons from "../../../../assets/icons/svg/index"
import { primaryBlack } from '../../../../assets/styles/colors.styles'
import { EmployerNavigationParamList } from '../..'
import hook from './SelectedDatePhotos-hook'
import styles from './SelectedDatePhotos.style'

type Props= NativeStackScreenProps<EmployerNavigationParamList,'SelectedDatePhotos'>

const  SelectedDatePhotos:React.FC=()=> {
    const navigation= useNavigation<Props['navigation']>()
    const {
        leftIconPress,
        selectedCategory,
        onCategorySelect,
        selectedDay,
        onDateArrowsPress,
        onCommentIconPress
    }= hook(navigation)
    const categories = [
        {
          name:'front',
          icon:selectedCategory==='front'?<Icons.MenuFront {...styles.categoryIcons} />:
          <Icons.MenuFront_disable {...styles.categoryIcons} />,
        },
        {
          name:'back',
          icon:selectedCategory==='back'?<Icons.MenuBack {...styles.categoryIcons} />:
          <Icons.MenuBack_disable {...styles.categoryIcons} />,
        },
        {
          name:'side',
          icon:selectedCategory==='side'?<Icons.MenuSide {...styles.categoryIcons} />:
          <Icons.MenuSide_disable {...styles.categoryIcons} />,
        },
      ];
    const renderImage= useMemo(()=>{{
        if ( selectedDay?.images&&selectedDay.images[selectedCategory]) {
         return (
            <Image style={styles.image} source={{uri:selectedDay.images[selectedCategory]}}/>
          )
        }else{
            if (selectedCategory==='front') {
                return <Icons.PhotoProgressFront {...styles.photoProgressDefaultImage}/>
            }else if(selectedCategory==='back'){
                return <Icons.PhotoProgressBack  {...styles.photoProgressDefaultImage}/>
            }else{
                return<Icons.PhotoProgressSide  {...styles.photoProgressDefaultImage}/>
            }
        }
       }},[selectedDay,selectedCategory])
      
  return (
   <View style={styles.container}>
    <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerLeftIcon} onPress={leftIconPress}>
            <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity> 
        <View style={styles.categoryIconsConteyner}>
        {categories.map((category,index)=>{
                return (
                <TouchableOpacity 
                    onPress={()=>onCategorySelect(category.name)}
                    key={index}>
                    {category.icon}
                </TouchableOpacity>
            )})
        }
        </View>
        <Icons.EllipsisIcon fill={primaryBlack} onPress={()=>{}}/>
    </View>
        <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
                {renderImage}
            </View>
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.commentIconContainer}></View>
            <View style={styles.dateContainer}>
                <View style={styles.date}>
                    <TouchableOpacity 
                        style={styles.dateArrowTouchLeft}
                        onPress={()=>onDateArrowsPress('previos')}>
                        <Text style={styles.dateArrow}>{`<`}</Text>
                    </TouchableOpacity>
                    <Text style={styles.dateText}>{selectedDay?.date}</Text>
                    <TouchableOpacity 
                        style={styles.dateArrowTouchRight}
                        onPress={()=>onDateArrowsPress('next')}>
                        <Text style={styles.dateArrow}>{`>`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.commentIconContainer}> 
             
                <TouchableOpacity
                style={styles.commentIconTouch}
                onPress={onCommentIconPress}>
                <Icons.Comment fill={primaryBlack} {...styles.commentIcone}/>
                <Text style={styles.commentsCount}>{selectedDay?.comments?selectedDay.comments.length:''}</Text>
                </TouchableOpacity>
               
            </View>
        </View>
   </View>
  )
}

export default SelectedDatePhotos