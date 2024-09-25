import React, {useCallback, useRef, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import { Album } from '@react-native-camera-roll/camera-roll';
import AlbumListItem from '../uploadbutton/components/AlbumListItem/AlbumListItem';
import styles from './albumsSheet.style';

type Props = {
    data: any,
    handleAlbumPress: (albumName: string) => void;
};

const AlbumsSheet = ({sheetId, payload}: SheetProps<Props>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
if(!payload) return <></>
// const handleAlbumPress =(albumName:string)=>{
//   actionSheetRef.current?.hide({
//     data:albumName
//   })
// }
  return (
    <ActionSheet
      safeAreaInsets={{bottom: 0, top: 0, left: 0, right: 0}}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      //   onClose={() => {
      //     payload?.onSave(selectedBodyParts)
      //   }}
      defaultOverlayOpacity={0.3}>
      <ScrollView
        {...scrollHandlers}
        nestedScrollEnabled
        style={styles.scrollview}>
        <View style={styles.listContainer}>
          {payload?.data?.map((item: Album, index: number) => {
            return <AlbumListItem key={"albumList2" + index} item={item} onPress={payload.handleAlbumPress} />
          })}
        </View>
      </ScrollView>
    </ActionSheet>
  );
};
export default AlbumsSheet;
