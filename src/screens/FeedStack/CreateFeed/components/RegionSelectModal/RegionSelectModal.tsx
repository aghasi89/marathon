import * as React from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import Toaster from '../../../../../components/toester/Toester';
import Icons from '../../../../../assets/icons/svg';
import {IRegion} from '../../../../../types/types';
import {calcHeight} from '../../../../../assets/dimensions';
import styles from './RegionSelectModal.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (id: IRegion) => void;
  regionsList?: IRegion[];
  selected?: number;
};

const RegionsSelectModal: React.VFC<Props> = ({
  isVisible,
  onClose,
  onSelect,
  regionsList,
  selected,
}) => {
  return (
    <Toaster
      height={calcHeight(400)}
      onClose={onClose}
      isVisible={isVisible}
      contentAlign="stretch"
      Screen={
        <View style={styles.container}>
          <FlatList
            data={regionsList}
            keyExtractor={item => item.id?.toString()}
            style={styles.listContainer}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => onSelect(item)}
                style={styles.rowContainer}>
                <View style={styles.flagContainer}>
                  {item.image ? (
                    <Image source={{uri: item.image}} style={styles.flag} />
                  ) : (
                    <Icons.FlagIcon {...styles.altImage} />
                  )}
                </View>
                <Text
                  style={
                    selected === item.id ? styles.selectedText : styles.text
                  }>
                  {item.title_en}
                </Text>
              </Pressable>
            )}
          />
        </View>
      }
    />
  );
};
export default RegionsSelectModal;
