import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import{TouchableOpacity, View,Text,ScrollView} from 'react-native'
import Icons from'../../../../../assets/icons/svg/index'
import { primaryBlack } from '../../../../../assets/styles/colors.styles'
import OutLineButton from '../../../../../components/buttons/outline/OutLineButton'
import PlusButton from '../../../../../components/plusButton/plusButton'
import SharingUserCard from '../../../../../components/sharingUserCard/SharingUserCard'
import Toaster from '../../../../../components/toester/Toester'
import { calcHeight } from '../../../../../assets/dimensions'
import { EmployerNavigationParamList } from '../../..'
import hook from './SharingTab-hook'
import styles from './SharingTab.style'

type Props = NativeStackScreenProps<EmployerNavigationParamList,'ChartsMenu'>

const SharingTab:React.FC=()=> {
    const navigation= useNavigation<Props['navigation']>()
    const {
        onCategorySelect,
        categories,
        userList,
        isEditeOpen,
        onUserEditeIconPress,
        onUserEditeSheetClose,
        isSharingMenuOpen,
        onPlusButtonPress,
        onSharingMenuClose,
        selectedUser,
        createNewShareRequest,
        onEditSharingPress,
        onSharingUserPress
    } = hook(navigation)

  return (
   <View style={styles.sharingTabContainer}>
        <View style={styles.categoriesMenuContainer}>
            <View style={styles.categoriesContainer}>
          {categories.map((category,index)=>{ 
          return(
          <TouchableOpacity key={index} style={styles.categoryTouchConteiner} onPress={()=>{onCategorySelect(index)}}>
                <Text style={category.isSelected? styles.textActive:styles.text}>{category.name}</Text>
          </TouchableOpacity>
        )})}
            </View>
        </View>
        <View style={styles.contentConteiner}>
            <ScrollView style={styles.usersListContainer} >
                {userList.map((user,index)=>{
                    return(
                        <SharingUserCard 
                        containerStyle={styles.userCardContainer}
                        key={index} 
                        name={user.name} 
                        period={user.period} 
                        userImage={user.image} 
                        onRightIconPress={()=>onUserEditeIconPress(user.id)}
                        onPress={onSharingUserPress}
                        />
                    )})
                }
                <View style={styles.invitationTitleContainer}>
                    <Text style={styles.invitationText}>Invitation</Text>
                </View>
                {userList.map((user,index)=>{
                    return(
                        <SharingUserCard 
                        containerStyle={styles.userCardContainer}
                        key={index} 
                        name={user.name} 
                        period={user.period} 
                        userImage={user.image} 
                        onRightIconPress={()=>onUserEditeIconPress(user.id)}
                        />
                    )})
                }
            </ScrollView>
        </View>
        <View style={styles.plussButton}>
            <PlusButton onPress={onPlusButtonPress}/>
        </View>
       <Toaster 
        isVisible={isEditeOpen}
        onClose={onUserEditeSheetClose}
        height={calcHeight(260)}
        Screen={
            <View style={styles.toasterContainer}>
                <View style={styles.periodSelectContainer}>
                    <Text style={styles.text}>Sharing Progress Period</Text>
                    <Text style={styles.textActive}>{selectedUser?.period.start} - {selectedUser?.period.end} </Text>
                </View>
                    <OutLineButton 
                        style={styles.buttonStyle} 
                        onPress={onEditSharingPress} 
                        title='Edit Sharing' 
                        Icon={<Icons.Edit fill={primaryBlack} {...styles.iconsStyle}/>
                    }/>
                    <OutLineButton 
                    style={styles.buttonStyle} 
                    onPress={()=>{}} 
                    title='Remove Sharing' 
                    Icon={<Icons.DeleteBlackIcon fill={primaryBlack} {...styles.iconsStyle}/>
                    }/>
            </View>
        }
       />   
       <Toaster
        height={calcHeight(165)}
        isVisible={isSharingMenuOpen}
        onClose={onSharingMenuClose}
        Screen={
            <View style={styles.sharingToasterContainer}>
                <OutLineButton
                    style={styles.buttonStyle} 
                    onPress={createNewShareRequest} 
                    title='Request sharing' 
                    Icon={<Icons.Share fill={primaryBlack} {...styles.iconsStyle}/>
                    }
                />
                <OutLineButton
                    style={styles.buttonStyle} 
                    onPress={()=>{}} 
                    title='Shar with' 
                    Icon={<Icons.Share fill={primaryBlack} {...styles.iconsStyle}/>
                    }
                 />
        </View>
       }
       />          
   </View>
  )
}

export default SharingTab
