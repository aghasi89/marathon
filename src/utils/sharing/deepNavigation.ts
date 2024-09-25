import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import keys from '../../services/Keys';
import { setMarathonApiAuthorizationHeader } from '../../services/api/mainInstance';
import { setMarathonApiFeedHeader } from '../../services/api/feedInstance';
import { setMarathonFinansicalApiAuthorizationHeader } from '../../services/api/finansicalInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  changeProfileInfo,
  getPersonInfoByUsername,
  getProfileInfo,
} from '../../store/actions/profile-action';
import { getData } from '../local_storage';
import { setIsLogin, setToken } from '../../store/actions/registration-action';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '../../store/selectors/registration-selector';
import { setMarathonNotificationsApiAuthorizationHeader } from '../../services/api/notificationsInstance';

const globalConfigs = {
  baseDomen: 'marathon.me/',
};

const navigate = (
  url: string,
  navigation: NativeStackNavigationProp<any>,
  dispatch: any,
) => {
  let [_, link] = url?.split(globalConfigs.baseDomen);
  if (link) {
    if (link.startsWith('http')) {
      link = link.split('.me/')[1];
    }
    const path = link.startsWith('api') ? link : link.slice(2);
    navigate(path, navigation, dispatch);
    if (path.startsWith('api')) {
      fetch(keys.BASE_URL + path).then(
        res => {
          if (res.status === 200) {
            navigate(res.url, navigation, dispatch);
          }
        },
        error => {
          console.log(error);
        },
      );
    } else {
      try {
        const search = path.split('?')[1] ? path.split('?')[1] : path;
        console.log(search, "searchhhhh");

        if (search.startsWith('/feed/')) {
          const [_, __, type, id] = path.split('/');
          if (type.split('-').length > 1) {
            navigation.navigate('ABOUT_FEED', { id, type: type.split('-')[1] });
          } else if (type == 'combination') {
            navigation.navigate('ABOUT_FEED', { id, type: 'article' });
          } else {
            navigation.navigate('ABOUT_FEED', { id, type: 'feed' });
          }
        } else if (path.startsWith('/training/')) {
          const [_, type, id] = path.split('/');
          navigation.navigate('ABOUT_FEED', { id, type: 'feed' });
        } else if (search.startsWith('token')) {
          console.log("1212121212121");

          const parts = search.split('&');
          const data: any = {};
          parts.forEach(part => {
            const [key, value] = part.split('=');
            data[key] = value;
          });
          const tokenActivity = data.token;
          if (data.register && data.register == 'coach') {
            dispatch(setToken(tokenActivity, true));
            dispatch(setIsLogin(true));
          } else {
            const emailActivity = data.verificated_email;
            if (tokenActivity && emailActivity) {
              dispatch(setToken(tokenActivity, false, emailActivity));
              dispatch(setIsLogin(true));
            } else {
              const [_, type, token] = path.split('/');
              dispatch(setToken(token.split('=')[1], false));
              dispatch(setIsLogin(true));
            }
          }
        } else if (search.startsWith('/profile/')) {
          const [_, type, username] = path.split('/');
          dispatch(
            getPersonInfoByUsername(username, () => {
              navigation.navigate('USER_PROFILE');
            }),
          );
        } else {
          let urlParams = JSON.parse(
            '{"' +
            decodeURI(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}',
          );
          if (urlParams.status == 'succeed') {
            setMarathonApiAuthorizationHeader(urlParams.token);
            setMarathonApiFeedHeader(urlParams.token);
            setMarathonFinansicalApiAuthorizationHeader(urlParams.token);
            setMarathonNotificationsApiAuthorizationHeader(urlParams.token)
            AsyncStorage.setItem(
              'accessToken',
              JSON.stringify(urlParams.token),
            );
            dispatch(
              getProfileInfo(user => {
                getData('selectedRegion').then(region => {
                  if (region && user) {
                    const payload = {
                      ...user,
                      geolocation: region.name
                    };
                    dispatch(changeProfileInfo(user.id, payload, () => { }));
                  }
                });
              }),
            );
          }
        }
      } catch (error) { }
    }
  }
};
export default (
  url: string,
  navigation: NativeStackNavigationProp<any>,
  dispatch: any,
) => {
  navigate(url, navigation, dispatch);
};
