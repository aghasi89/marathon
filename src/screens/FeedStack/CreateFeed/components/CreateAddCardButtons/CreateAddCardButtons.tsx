import {View, Pressable, ViewStyle} from 'react-native';
import Icons from "../,./../../../../../assets/icons/svg";
import styles from './CreateAddCardButtons.style'

type Props = {
  onPress:(type:'text'|'video'|'image')=>void;
  containerStyle?:ViewStyle|ViewStyle[]
};

const CreateAddCardButtons: React.VFC<Props> = ({onPress,containerStyle}) => {
  return(
  <View style={[styles.container,containerStyle]}>
    <Pressable onPress ={()=>onPress('text')} style={styles.iconContainer}>
      <Icons.TextIcon {...styles.icon}/>
    </Pressable>
    <Pressable onPress ={()=>onPress('image')} style={styles.iconContainer}>
      <Icons.ImageIcon {...styles.icon}/>
    </Pressable>
    <Pressable onPress ={()=>onPress('video')} style={styles.iconContainer}>
      <Icons.VideocamIcon {...styles.icon}/>
    </Pressable>
  </View>
)};

export default CreateAddCardButtons;
