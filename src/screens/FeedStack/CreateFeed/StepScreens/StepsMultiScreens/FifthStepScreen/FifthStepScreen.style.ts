import { Platform, StyleSheet } from 'react-native';
import { lightPeriwinkle, primaryBlack, primaryWhite } from '../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../assets/dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      scrollContainer:{
      backgroundColor:primaryWhite,
      marginTop:Platform.OS==="ios"? calcHeight(10):0, 
      },
      progressBarContainer:{
        marginTop:calcHeight(16)
      },
      imageStyle: {
        width: '100%',
        height: calcHeight(400),
      },
      likesBarContainer:{
        borderBottomWidth:calcHeight(1),
        borderBottomColor:lightPeriwinkle
      },
      titleContainer:{
        paddingHorizontal:calcWidth(20),
        marginVertical:calcHeight(17)
      },
      titleText:{
        ...EnCodeSans({
          size:'form-field',
          weight:'bold'
        }),
        color:primaryBlack
      },
      liveAndPackageInfoContainer:{
        marginHorizontal:calcWidth(16),
      },
      buttonsGroupContainer:{
        marginVertical:calcHeight(24)
      },
      hashtagsContainer:{
        paddingHorizontal:calcWidth(12),    
      },
      descriptionContainer:{
        paddingVertical:calcHeight(8),
        paddingHorizontal:calcWidth(20)
      },
      descriptionText:{
        ...EnCodeSans({
          size:'body',
          weight:'regular'
        }),
        color:primaryBlack
      },
      inputContainer:{
        paddingHorizontal:calcWidth(10)
      },
      inputStyle:{
        marginVertical:calcHeight(22),
        borderWidth:calcWidth(1),
        borderRadius:calcWidth(50),
        borderColor:lightPeriwinkle
      },
      commentItemContainer:{
      paddingHorizontal:calcWidth(16)
      },
      closeIconContainer: {
        position: 'absolute',
        right: 20,
        top: 45,
        alignItems: 'flex-end',
        height: calcHeight(30),
        width: calcWidth(30),
        zIndex: 3,
        justifyContent:'flex-end'
      },
      closeIcon: {
        height: calcHeight(20),
        width: calcWidth(20)
      }, 
      hashtags:{
        paddingHorizontal:calcWidth(15)
      }
});

export default styles