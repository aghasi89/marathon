import React, { useCallback, useContext } from 'react';
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';
import { profileSelector } from '../../store/selectors/profile-selector';
import Icons from '../../assets/icons/svg/index';
import { downloadMediaFromBunny } from '../../utils/bunny.net';
import { setProfileInfo } from '../../store/actions/profile-action';
import { primaryBlack } from '../../assets/styles/colors.styles';
import {
  deleteFirebasePushToken,
  setIsLogin,
} from '../../store/actions/registration-action';
import { storeData } from '../../utils/local_storage';
import UnreadMessageContext from '../../screens/ChatStack/UnreadCountContext';
import { setShowSelectedRegionPage } from '../../store/actions/administrative-action';
import AnalyticService from '../../utils/analytics/AnalyticService';
import { chatClient } from '../../services/chatConfig';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { setMarathonApiAuthorizationHeader } from '../../services/api/mainInstance';
import styles from './DrawerContent.styles';

interface IProps {
  navigation: any;
  descriptors: any;
  state: any;
}

const DrawerContent: React.FC<IProps> = props => {
  const { navigation, descriptors, state } = props;
  const { t } = useTranslation();
  const user = useSelector(profileSelector);
  const dispatch = useDispatch();
  const { resetUnreadCount } = useContext(UnreadMessageContext);

  const deleteFirebaseToken = async () => {
    const token = await messaging().getToken();
    const payload = {
      token: token,
      user: user?.id ?? 0,
    };
    user && dispatch(deleteFirebasePushToken(payload));
  };

  const goToHome = useCallback(() => {
    dispatch(setIsLogin(true));
  }, []);

  const handlerClickSupport = useCallback(async (type: string) => {
    switch (type) {
      case 'support':
        navigation.navigate('SUPPORT_SCREEN', { url: 'https://marathon.me/support', isLoading: true });
        break;
      case 'privacy':
        navigation.navigate('PRIVACY_POLICY');
        break;
      case 'terms':
        navigation.navigate('TERMS');
        break;
      default:
        break;
    }
  }, []);

  const navigateUserPage = useCallback(async () => {
    navigation.navigate('PROFILE_NAVIGATION_STACK');
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <TouchableOpacity
          onPress={navigateUserPage}
          style={styles.userInfoBlock}>
          {user?.image ? (
            <Image
              source={{
                uri: downloadMediaFromBunny({
                  public_key: user?.image,
                  mediaType: 'image',
                  imageDir: 'profile',
                  userDir: user.id,
                })?.url,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Icons.ProfileTab
              fill={primaryBlack}
              width={calcWidth(48)}
              height={calcHeight(48)}
            />
          )}
          <Text numberOfLines={1} style={styles.title}>
            {user?.user?.first_name + ' ' + user?.user?.last_name}
          </Text>
        </TouchableOpacity>
      ) : (
        <Pressable onPress={goToHome}>
          <Text style={styles.loginLable}>{t('login')}</Text>
        </Pressable>
      )}
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainer}
        {...props}>
        <View>
          <DrawerItemList
            state={state}
            navigation={navigation}
            descriptors={descriptors}
          />
          {
            user && <>
              {user && user.role_mode == 'coach' && (
                <Pressable
                  style={styles.drawerItem}
                  onPress={() => {
                    navigation.navigate('FINANSICAL_NAVIGATION_STACK');
                  }}>
                  <Icons.Payment fill={primaryBlack} />
                  <Text numberOfLines={1} style={styles.drawerLabel}>
                    {t('paymentsMethods')}
                  </Text>
                </Pressable>
              )}
              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  navigation.navigate('MY_CREATIONS_NAVIGATION_STACK');
                }}>
                <Icons.Creations fill={primaryBlack} />
                <Text numberOfLines={1} style={styles.drawerLabel}>
                  {t('myCreations')}
                </Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  navigation.navigate('MY_PURCHASES_NAVIGATION_STACK');
                }}>
                <Icons.Purchases fill={primaryBlack} />
                <Text numberOfLines={1} style={styles.drawerLabel}>
                  {t('myPurchases')}
                </Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  navigation.navigate('SETTINGS');
                }}>
                <Icons.Settings fill={primaryBlack} />
                <Text numberOfLines={1} style={styles.drawerLabel}>
                  {t('settings')}
                </Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => {
                  dispatch(setShowSelectedRegionPage(true));
                }}>
                <Icons.Region fill={primaryBlack} />
                <Text numberOfLines={1} style={styles.drawerLabel}>
                  {t('region')}
                </Text>
              </Pressable>
              <Pressable style={styles.drawerItem} onPress={() => handlerClickSupport('support')}>
                <Icons.SupportIcon fill={primaryBlack} />
                <Text numberOfLines={1} style={styles.drawerLabel}>
                  {t('support')}
                </Text>
              </Pressable>
            </>
          }
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.drawerItem} onPress={() => handlerClickSupport('terms')}>
            <Text numberOfLines={1} style={styles.label}>
              {t('terms')}
            </Text>
          </Pressable>
          <Pressable style={styles.drawerItem} onPress={() => handlerClickSupport('privacy')}>
            <Text numberOfLines={1} style={styles.label}>
              {t('privacy')}
            </Text>
          </Pressable>
        </View>
        <View>
          {
            user &&
            <Pressable style={styles.drawerItem} onPress={() => {
              setMarathonApiAuthorizationHeader(null);
              dispatch(setProfileInfo(undefined));
              storeData('isNew', 'no');
              storeData('accessToken', undefined);
              navigation.closeDrawer();
              resetUnreadCount();
              deleteFirebaseToken();
              chatClient.disconnectUser();
              AnalyticService.userLogout(user.id);
            }}>
              <Icons.LogOut width={calcWidth(24)} height={calcHeight(24)} fill={primaryBlack} />
              <Text numberOfLines={1} style={styles.drawerLabel}>
                {t('logOut')}
              </Text>
            </Pressable>
          }
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
export default DrawerContent;
