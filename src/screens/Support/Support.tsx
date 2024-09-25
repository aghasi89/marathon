import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';
import { primaryBlue } from '../../assets/styles/colors.styles';
import hook from './Support.hook';
import styles from './Support.style';

const Support: React.FC = () => {
  const { loaging, onMessage, url } = hook();

  return (
    <View style={styles.container}>
      <View style={styles.webView}>
        {loaging && (
          <ActivityIndicator
            size={'large'}
            color={primaryBlue}
            style={styles.activityContainer}
          />
        )}
        <WebView
          onMessage={onMessage}
          style={styles.webView}
          source={{
            uri: url,
          }}
        />
      </View>
    </View>
  );
};
export default Support;
