import {View, Text, ViewStyle} from 'react-native';
import styles from './SectionTitle.style'

type Props = {
  title: string;
  containerStyle?:ViewStyle|ViewStyle[]
};

const SectionTitle: React.VFC<Props> = ({title,containerStyle}) => {
  return(
  <View style={[styles.container,containerStyle]}>
    <View style={styles.line}/>
    <Text style={styles.text}>{title}</Text>
    <View style={styles.line}/>
  </View>
)};

export default SectionTitle;
