import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChannelMemberResponse } from 'stream-chat';
import ActionSheet, { ActionSheetRef, SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import Icons from '../../assets/icons/svg/index';
import { StreamChatGenerics, useAppContext } from '../../screens/ChatStack/AppContext';
import styles from './ShowMembersSheet.style';

const ShowMembersSheet = ({ sheetId }: SheetProps<any>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const { channel } = useAppContext();
  const { t } = useTranslation();
  const [newmembers, setnewMembers] = useState<
    ChannelMemberResponse<StreamChatGenerics>[]
  >([]);

  useEffect(() => {
    if (channel) {
      channel.queryMembers({}).then(response => {
        setnewMembers(response?.members);
      });
    }
  }, [channel]);

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
      <ScrollView {...scrollHandlers} style={styles.scrollview}>
        {
          newmembers.map((data: any) => {
            return <View
              style={styles.rowFront}>
              <View style={styles.info}>
                {data.user.image ? (
                  <Image
                    source={{
                      uri: data.user.image,
                    }}
                    style={styles.userAvatar}
                    resizeMode="contain"
                  />
                ) : (
                  <Icons.UserIcon {...styles.userAvatar} />
                )}
                <Text style={styles.name}>{data.user.name}</Text>
              </View>

              {data.role === 'owner' && (
                <Text style={styles.name}>{t(`admin`)}</Text>
              )}
            </View>
          })
        }

      </ScrollView>
    </ActionSheet>
  );
};
export default ShowMembersSheet;
