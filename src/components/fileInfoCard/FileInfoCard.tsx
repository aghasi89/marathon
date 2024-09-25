import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import Icons from '../../assets/icons/svg/index';
import styles from './FileInfoCard.styles';
import {primaryBlack} from '../../assets/styles/colors.styles';
interface Props {
  fileName: string;
  fileType: string;
  onClose?: () => void;
  image?: string;
}

const FileInfoCard: React.FC<Props> = ({
  fileName,
  fileType,
  onClose,
  image,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image style={styles.image} source={{uri: image}} />
        ) : (
          <Icons.Image fill={'#647F9A'} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.fileNameText} numberOfLines={1}>
          {fileName}
        </Text>
        <Text style={styles.fileTypeText}>{fileType}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icons.Close fill={primaryBlack} width={14} height={14} />
      </TouchableOpacity>
    </View>
  );
};
export default FileInfoCard;
