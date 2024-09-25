import {Album} from '@react-native-camera-roll/camera-roll';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../../../assets/icons/svg';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import styles from './AlbumListItem.style';

type Props = {
  item: Album;
  onPress: (albumName: string) => void;
};

const AlbumListItem: React.FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item.title)}>
      <View style={styles.iconContainer}>
        <Icons.AlbumIcon width={calcWidth(80)} height={calcHeight(80)}/>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumListItem;
