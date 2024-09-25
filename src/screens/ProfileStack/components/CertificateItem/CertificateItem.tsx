import * as React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  Text,
} from 'react-native';
import keys from '../../../../services/Keys';
import Icons from '../../../../assets/icons/svg';
import { calcWidth } from '../../../../assets/dimensions';
import styles from './CertificateItem.style';

interface IProps {
  item: any,
  handleShowMenu: () => void
}

const CertificateItem: React.FC<IProps> = (props) => {
  const { item, handleShowMenu } = props
  const windowSize = Dimensions.get('screen');
  const cardItemWidth = (windowSize.width - (2 + 1) * calcWidth(16)) / 2;

  return (
    <Pressable onLongPress={handleShowMenu} style={[styles.container, {
      maxWidth: cardItemWidth,
      minWidth: cardItemWidth,
      justifyContent: item.file_type.includes('image') ? "flex-start" : "center",
      alignItems: item.file_type.includes('image') ? "flex-start" : "center"
    }]}>
      {item.file_type.includes('image') ? <Image style={styles.imageStyle} source={{ uri: `${keys.API_URL}${item.file}` }} />
        : <Icons.PdfIcon />}
      <Text style={styles.description}>{item.description}</Text>
    </Pressable >
  );
};

export default CertificateItem;
