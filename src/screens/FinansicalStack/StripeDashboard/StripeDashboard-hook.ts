import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../../navigation/FinansicalNavigation';

type Props = NativeStackScreenProps<NavigationParamList, 'STRIPE_DASHBOARD'>;
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { url } = route.params;

  const goBack = () => {
    navigation.goBack()
  }

  return {
    url,
    goBack,
  };
};
