import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet, { ActionSheetRef, SheetManager, SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { primaryBlack, primaryBlue, red } from '../../assets/styles/colors.styles';
import { getGeneratedMessage, setGeneratedMessage } from '../../store/actions/profile-action';
import { generatedMessageSelector } from '../../store/selectors/profile-selector';
import Icons from '../../assets/icons/svg/index'
import { useAppContext } from '../../screens/ChatStack/AppContext';
import { calcWidth } from '../../assets/dimensions';
import styles from './chatGptSheet.style';

const ChatGptSheet = ({ sheetId, payload }: SheetProps<{ data: string }>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const generatedMessage = useSelector(generatedMessageSelector)
  const { channel } = useAppContext();
  const [value, setValue] = useState<string>("")
  const dispatch = useDispatch()
  const attemptCount = useRef(1)
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [autoFocus, setAutoFocus] = useState<boolean>(false)
  const handlePressReload = useCallback(() => {
    dispatch(setGeneratedMessage(undefined))
    attemptCount.current++;
    dispatch(getGeneratedMessage(attemptCount.current))
  }, [attemptCount])

  const handleEditPress = useCallback(() => {
    setIsEditable(true)
    setValue(generatedMessage)
    setAutoFocus(true)
  }, [generatedMessage])

  const closeOpenAiModal = useCallback(() => {
    setIsEditable(false)
    dispatch(setGeneratedMessage(undefined))
  }, [])

  const sendGeneratedMessage = useCallback(async () => {
    await channel?.sendMessage({
      text: value ? value : generatedMessage
    });
    SheetManager.hide('chatGptSheet')
  }, [channel, value, generatedMessage])

  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <View style={[styles.header, { marginLeft: calcWidth(16) }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePressReload}>
            <Icons.Reload fill={primaryBlack} {...styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditPress}>
            <Icons.EditChat fill={primaryBlack} {...styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={closeOpenAiModal}>
            <Icons.DeleteChat fill={red} {...styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={sendGeneratedMessage}>
          <Icons.SendComment fill={primaryBlue} {...styles.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        <View>
          <View
            style={styles.listItem}>
            <View
            />
            {!isEditable ? (
              generatedMessage ? (
                <Text>{generatedMessage}</Text>
              ) : (
                <ActivityIndicator size={30} />
              )
            ) : (
              <TextInput
                autoFocus={autoFocus}
                value={value}
                onChangeText={text => {
                  setValue(text);
                }}
                multiline
              />
            )}
          </View>
        </View>
      </ScrollView>
    </ActionSheet>
  );
};
export default ChatGptSheet;
