import { useCallback, useState } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainNavigationParamList } from '../../navigation/MainNavigation';

type Props = NativeStackScreenProps<MainNavigationParamList, 'SUPPORT_SCREEN'>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { url, isLoading } = route.params;
  const [loaging, setLoading] = useState<boolean>(false);  

  const onMessage = useCallback(({ nativeEvent }: WebViewMessageEvent) => {
    switch (nativeEvent.data) {
      case 'close':
        navigation.goBack();
        break;
      case 'ready':
        setLoading(false);
        break;
      default:
        break;
    }
  }, []);

  return {
    loaging,
    onMessage,
    url
  };
};
