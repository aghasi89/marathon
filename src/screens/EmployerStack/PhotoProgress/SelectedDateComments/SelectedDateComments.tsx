import React from 'react'
import { View,TouchableOpacity,Text, TextInput, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icons from "../../../../assets/icons/svg/index";
import { primaryBlack, primaryGrey } from '../../../../assets/styles/colors.styles'
import { EmployerNavigationParamList } from '../..'
import hook from './SelectedDateComments-hook';
import styles from './SelectedDateComments.style';

type Props= NativeStackScreenProps<EmployerNavigationParamList,'SelectedDateComments'>

const  SelectedDateComments:React.FC=()=> {
    const navigation= useNavigation<Props['navigation']>()
    const {
      leftIconPress,
      selectedDay,
      checkComentUser,
      onAddComment,
      newComment,
      onSendCommentIconPress
    }= hook(navigation)
  return (
     <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerLeftIcon} onPress={leftIconPress}>
                <Icons.ArrowIcon fill={primaryBlack} />
            </TouchableOpacity> 
            <Text style={styles.headerDateText}>{selectedDay?.date}</Text>
        </View>
        <ScrollView style= {styles.commentsContainer}>
          {selectedDay?.comments?.map((comment,index)=>{
            if (checkComentUser(comment.userId)) {
              return(
                <View key={index} style={styles.rowCntainer}>
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentText}>{comment?.title}</Text>
                  </View>
                </View>)
            }else{
              return(
                <View key={index} style={styles.rowCntainer1}>
                  <View style={styles.commentContainer1}>
                    <Text style={styles.commentText1}>{comment?.title}</Text>
                  </View>
                </View>)
            }
          })
          }
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
               <TextInput style={styles.input} placeholder='Add a comment ...'  onChangeText={onAddComment} value={newComment}/>
                 <TouchableOpacity style={styles.inputSendIconTouch} onPress={onSendCommentIconPress}>
                        <Icons.SendComment fill={primaryGrey} {...styles.sendIconStyle}/>
                 </TouchableOpacity> 
            </View> 
        </View>  
  </View>
  )
}

export default SelectedDateComments