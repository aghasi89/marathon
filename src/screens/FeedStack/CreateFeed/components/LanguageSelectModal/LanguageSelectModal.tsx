import * as React from 'react';
import { View, Text, FlatList, Image, Pressable} from 'react-native';
import Toaster from '../../../../../components/toester/Toester';
import Icons from '../../../../../assets/icons/svg';
import {ILanguageItem} from '../../../../../types/types';
import {calcHeight} from '../../../../../assets/dimensions';
import styles from './LanguageSelectModal.style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (id: ILanguageItem) => void;
  languageList?: ILanguageItem[];
  selected?: number|null;
};

const LanguageSelectModal: React.VFC<Props> = ({
  isVisible,
  onClose,
  onSelect,
  languageList,
  selected,
}) => {
  return (
    <Toaster
      height={calcHeight(400)}
      onClose={onClose}
      isVisible={isVisible}
      contentAlign='stretch'
      Screen={
        <View style={styles.container}>
        <FlatList
          data={languageList}
          keyExtractor={item => item.id?.toString()}
          style={styles.listContainer}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => onSelect(item)}
              style={styles.rowContainer}>
              <View style={styles.flagContainer}>
                {item.flag ? (
                  <Image source={{uri: item.flag}} style={styles.flag} />
                ) : (
                  <Icons.FlagIcon {...styles.altImage} />
                )}
              </View>
              <Text
                style={
                  selected === item.id ? styles.selectedText : styles.text
                }>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        </View>
      }
    />
    
  );
};
export default LanguageSelectModal;
