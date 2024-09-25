import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../../ProfileStack/components/Header/Header';
import styles from './Paymant.style'
import hook from './Paymant-hook'

interface IProps {
  data: any,
  handleBack: () => void
}

const Paymant: React.FC<IProps> = (props) => {
  const { data, handleBack } = props
  const {
    onMessage,
    selectedFeed,
    feedList,
    user,
    loader
  } = hook(data, handleBack)

  const conversePaymentMethod = useMemo(() => {
    return data.type == "converse" ? <View style={styles.webView}>
      {
        !data.hideHeader && <View style={styles.header}>
          <Header title="" goBack={handleBack} />
        </View>
      }
      <WebView
        onMessage={onMessage}
        style={styles.webView}
        source={{
          uri: data.message ? data.message.formUrl : data.url
        }}
      />
    </View> : <></>;
  }, [data, selectedFeed, feedList, user]);

  if (loader) return <ActivityIndicator style={styles.loader} size={'large'} />
  return (
    <View style={styles.container}>
      {conversePaymentMethod}
    </View>
  )
}
export default Paymant