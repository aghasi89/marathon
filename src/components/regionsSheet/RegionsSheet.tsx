import React, { useRef } from 'react';
import { Pressable, ScrollView, View, Image, Text } from 'react-native';
import ActionSheet, { ActionSheetRef, SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { IRegion } from '../../types/types';
import Icons from '../../assets/icons/svg';
import styles from './RegionsSheet.style';

const RegionsSheet = ({ sheetId, payload }: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);

  return (
    <ActionSheet
      safeAreaInsets={styles.mainContainer}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      defaultOverlayOpacity={0.3}>
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        {
          payload.data.map((item: IRegion) => {
            return <Pressable
              onPress={() => payload.onSelect(item)}
              style={styles.rowContainer}>
              <View style={styles.flagContainer}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.flag} />
                ) : (
                  <Icons.FlagIcon {...styles.altImage} />
                )}
              </View>
              <Text
                style={
                  payload.selected === item.id ? styles.selectedText : styles.text
                }>
                {item.title_en}
              </Text>
            </Pressable>
          })
        }
      </ScrollView>
    </ActionSheet>
  );
};
export default RegionsSheet;