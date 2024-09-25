import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Main from './src/screens';
import store from './src/store/store';
import { AppProvider } from './src/screens/ChatStack/AppContext';
import EditerKeyboardProvider from './src/providers/EditerKeyboardProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import './src/locale/i18n';
import './src/sheets';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);


  return (
    <AppProvider>
      <EditerKeyboardProvider>
        <Provider store={store}>
          {Platform.OS == 'ios' ? (
            <>
              <View
                style={[
                  styles.appBar,
                  {
                    backgroundColor: 'white',
                  },
                ]}
              />
            </>
          ) : (
            <StatusBar backgroundColor={'white'} barStyle={'light-content'} />
          )}

          <StripeProvider
            publishableKey="pk_test_51HTu1ULqnJn12yNlQeorbFmUNijf2fyhhJryjcEs5VwNDB4IUw34ZMLdUGPVDb0ndmVw9Xf9QltZ4CK7LTDyGW5u006qn5aUii"
            urlScheme="me.marathon.app"
            merchantIdentifier="merchant.com.marathon"
          >
            <Main />
          </StripeProvider>
        </Provider>
      </EditerKeyboardProvider>
    </AppProvider>
  );
};
export default App;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    height: APPBAR_HEIGHT,
  },
});
