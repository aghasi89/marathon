import { useCallback, } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationParamList } from '../../../../navigation/ChatNavigation';

type Props = NativeStackScreenProps<NavigationParamList, "CHANNELLIST">;

export default () => {
    const { t } = useTranslation();
    const navigation = useNavigation<Props['navigation']>();

    const handlerGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return {
        t,
        handlerGoBack,
    };
};