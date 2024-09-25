import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import Icons from '../../assets/icons/svg/index';
import {primaryWhite} from '../../assets/styles/colors.styles';
import {IGaleryImages} from '../../types/types';
import styles from './MultiSelectImages.style';

type Props = {
  list: Array<IGaleryImages>;
  onDelete: (value: IGaleryImages) => void;
  onPlay: (value: IGaleryImages) => void;
};

const MultiSelectSelectedImages: React.FC<Props> = ({
  list,
  onDelete,
  onPlay,
}) => {
  return (
    <View style={styles.containerSelected}>
      {list.map((element: IGaleryImages, index: number) => {
        return (
          <View key={index} style={styles.elementConteiner}>
            <View style={styles.headerButtonsConteiner}>
              {(element.format === 'video/mp4' && (
                <TouchableOpacity
                  style={styles.playButtonConteiner}
                  onPress={() => {
                    onPlay(element);
                  }}>
                  <View style={styles.playIcone}>
                    <Icons.PlayIcon fill={primaryWhite} />
                  </View>
                </TouchableOpacity>
              )) || <View />}
              <TouchableOpacity
                style={styles.closeButtonConteiner}
                onPress={() => {
                  onDelete(element);
                }}>
                <View style={styles.closeIcone}>
                  <Icons.Close fill={primaryWhite} />
                </View>
              </TouchableOpacity>
            </View>
            <Image source={{uri: element.image}} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};
export default MultiSelectSelectedImages;
