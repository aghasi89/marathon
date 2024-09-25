import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../ProfileStack/components/Header/Header';
import StripeDashboardHook from './StripeDashboard-hook'
import styles from './StripeDashboard.style';

const StripeDashboard: React.FC = () => {
  const { url, goBack } = StripeDashboardHook()

  return (
    <View style={styles.container}>
      <View style={styles.webView}>
        <Header
          goBack={goBack}
          title={``}
        />
        <WebView
          style={styles.webView}
          source={{
            uri: url,
          }}
        />
      </View>
    </View>
  );
};
export default StripeDashboard;
