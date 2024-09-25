import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icons from '../../../../../../assets/icons/svg/index';
import {useAppContext} from '../../../../AppContext';
import {styles} from './LiveAttachement.style';

export interface IProps {
  callText: string;
  type: string;
  liveStatus: 'isStarted' | 'isEnded';
  handlerOpenLiveStream: () => void
}

export const LiveAttachement = (props: IProps) => {
  const {callText, type, liveStatus, handlerOpenLiveStream} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {messageId} = useAppContext();
  if (type !== 'livestream') {
    return null;
  }
  const handleJoinButtonPress = () => {
    //@ts-ignore
    // navigation.navigate('LIVESTREAM');
    handlerOpenLiveStream()
  };
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.circle}>
          <Icons.Live {...styles.footerIcon} />
        </View>
        <Text style={styles.title}>{callText}</Text>
      </View>
      {liveStatus === 'isStarted' ? (
        <TouchableOpacity
          key={messageId}
          disabled={false}
          style={styles.button}
          onPress={handleJoinButtonPress}>
          <Text style={styles.joinText}>{t(`join`)}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
