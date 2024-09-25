import React from 'react';
import {
  View,
  Image,
  ViewStyle,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import Icons from '../../../../../../assets/icons/svg/index';
import {useTranslation} from 'react-i18next';
import InputComponent from '../../../../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import styles from './groupeChatInfo.style';

type Props = {
  onSelectImage: () => void;
  imageUrl?: string | undefined;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
  onChangeText?: (text: string) => void;
  inputValue?: string;
  isAssistant?: boolean;
};

const GroupeChatInfo: React.FC<Props> = (props: Props) => {
  const {t} = useTranslation();
  const {
    onSelectImage,
    imageUrl,
    customStyles,
    onChangeText,
    inputValue,
    isAssistant,
  } = props;
  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      {isAssistant ? (
        <Icons.AssistantInChannel width="75" height="75"/>
      ) : (
        <TouchableOpacity onPress={onSelectImage}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.userAvatar} />
          ) : (
            <Icons.GroupChatAvatar />
          )}
        </TouchableOpacity>
      )}

      <View style={styles.userInfo}>
        <Text style={styles.title}>
          {isAssistant ? t('assistantName') : t('groupName')}
        </Text>
        <InputComponent
          onChange={onChangeText}
          value={inputValue}
          placeholder={t('groupName') ?? ''}
          containerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
        />
      </View>
    </View>
  );
};
export default GroupeChatInfo;
