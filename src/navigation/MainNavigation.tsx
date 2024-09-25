import React, {useEffect} from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import FinansicalNavigationStack from './FinansicalNavigation';
import SelectWorkoutTypeScreen from '../screens/FeedStack/CreateFeed/SelectWorkoutTypeScreen/SelectWorkoutTypeScreen';
import CreateWalletScreen from '../screens/FinansicalStack/CreateWalletScreen/CreateWalletScreen';
import ChannelScreen from '../screens/ChatStack/Chat/Channel/ChannelScreen';
import ThreadScreen from '../screens/ChatStack/Chat/Thread/Thread';
import LiveStream from '../screens/ChatStack/Chat/LiveStream/LiveStream';
import CreateFeed from '../screens/FeedStack/CreateFeed/CreateFeed';
import ChangeEmailScreen from '../screens/ProfileStack/ChangeEmail/ChangeEmail';
import ChangePasswordScreen from '../screens/ProfileStack/ChangePassword/ChangePassword';
import AboutFeed from '../screens/FeedStack/Feed/AboutFeed/AboutFeed';
import {IFeedTypes, IWorkoutType} from '../types/types';
import CreateExercise from '../screens/ExercisesStack/CreateExercise/CreateExercise';
import ChannelFromPack from '../screens/ChatStack/Chat/ChannelFromPack/ChannelFromPack';
import WatchTheWorkout from '../screens/FeedStack/Feed/WatchTheWorkout/WatchTheWorkout';
import {getPersonInfo} from '../store/actions/profile-action';
import TabNavigation from './TabNavigation';
import ExerciseNavigationStack from './ExerciseNavigation';
import MembersList from '../screens/FeedStack/Feed/MembersList/MembersList';
import MemberDetails from '../screens/FeedStack/Feed/MemberDetails/MemberDetails';
import CoachQuestionsAnswers from '../screens/FeedStack/Feed/CoachQuestionsAnswers/CoachQuestionsAnswers';
import Settings from '../screens/Settings/Settings';
import CreateFeedScreen from '../screens/CreateFeed/CreateFeed';
import MyCreationsNavigationStack from './MyCreationsNavigation';
import MyPurchasesNavigationStack from './MyPurchasesNavigation';
import ExerciseDetailPage from '../screens/ExercisesStack/ExerciseDetailPage/ExerciseDetailPage';
import NoPermissions from '../screens/NoPermissions/NoPermissions';
import {profileSelector} from '../store/selectors/profile-selector';
import Support from '../screens/Support/Support';
import EditWalletScreen from '../screens/FinansicalStack/EditWalletScreen/EditWalletScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import Terms from '../screens/Terms/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy/PrivacyPolicy';
import AssistantScreen from '../screens/ChatStack/Chat/AssistantChannel/AssistantScreen';
import EditAssistantScreen from '../screens/ChatStack/Chat/AssistantChannel/components/AssistantEdit/AssistantEdit';

export type MainNavigationParamList = {
  TAB_NAVIGATION_STACK: undefined;
  FINANSICAL_NAVIGATION_STACK: undefined;
  EXERCISE_NAVIGATION_STACK: undefined;
  SELECT_REGION: undefined;
  CREATE_WALLET: undefined;
  EDIT_WALLET: {
    id: number;
  };
  CHANNEL: {
    channelId?: string;
    type?: string;
  };
  ASSISTANT: {
    assistantId?: number;
  };
  EDIT_ASSISTANT: {
    assistantId: number,
    assistantTitle: string
  };
  THREADSCREEN: undefined;
  LIVESTREAM: undefined;
  CREATE_FEED: {
    type?: IFeedTypes;
    workoutType?: IWorkoutType;
    channelId?: string;
    isEditing?: boolean;
  };
  CHANGE_PASSWORD: {
    type: string;
  };
  CHANGE_EMAIL: undefined;
  ABOUT_FEED: {
    id?: number;
    type?: IFeedTypes;
    action?: string;
  };
  WORKOUT_TYPE_SELECT: {
    type?: IFeedTypes;
    channelId?: string;
  };
  CREATE_EXERCISE: undefined;
  CHANNELFROMPACK: {
    newgroup?: true;
    newchannel?: true;
    isNewCreating?: true;
  };
  WATCH_WORKOUT?:
    | {
        id: number;
      }
    | undefined;
  JOINED_MEMBERS_LIST: {
    id?: number;
    action?: 'likesList' | 'joinedMembers';
  };
  JOINED_MEMBER_DETAILS: {
    memberId?: number;
  };
  ANSWER_COACH_QUESTIONS: {
    id?: number;
  };
  SETTINGS: undefined;
  CREATED_FEED_NAVIGATION: undefined;
  MY_CREATIONS_NAVIGATION_STACK: undefined;
  MY_PURCHASES_NAVIGATION_STACK: undefined;
  EXERCISE_DETAIL_PAGE: {
    id: number;
  };
  COACH_INFO_PAGE: undefined;
  SUPPORT_SCREEN: {
    url: string;
    isLoading: boolean;
  };
  TERMS: undefined;
  PRIVACY_POLICY: undefined;
  NOTIFICATIONS: undefined;
};
type Props = NativeStackScreenProps<MainNavigationParamList, 'CHANNEL'>;
const MainStack = createStackNavigator<MainNavigationParamList>();

const MainNavigationStack: React.FunctionComponent = () => {
  const navigation = useNavigation<Props['navigation']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const initBackgroundNotifications = async () => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage?.data?.channel) {
        const channelById = JSON.parse(remoteMessage?.data?.channel);
        const {id, type} = channelById;
        navigation.navigate('CHANNEL', {channelId: id, type});
      } else if (remoteMessage?.data?.route === 'feed') {
        navigation.navigate('ABOUT_FEED', {
          id: parseInt(remoteMessage?.data?.feedId),
          //@ts-ignore
          type: 'feed',
        });
      } else if (remoteMessage?.data?.route === 'user') {
        dispatch(
          getPersonInfo(parseInt(remoteMessage?.data?.user_id ?? ''), () => {
            //@ts-ignore
            navigation.navigate('USER_PROFILE');
          }),
        );
      } else if (remoteMessage?.data?.route === 'subscribers') {
        navigation.navigate('ABOUT_FEED', {
          id: parseInt(remoteMessage?.data?.feedId),
          //@ts-ignore
          type: 'feed',
        });
      }
    });
  };
  const openFromQuitState = async () => {
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage?.data?.channel) {
          const channelById = JSON.parse(remoteMessage?.data?.channel);
          const {id, type} = channelById;
          navigation.navigate('CHANNEL', {channelId: id, type});
        } else if (remoteMessage?.data?.route === 'user') {
          dispatch(
            getPersonInfo(parseInt(remoteMessage?.data?.user_id ?? ''), () => {
              //@ts-ignore
              navigation.navigate('USER_PROFILE');
            }),
          );
        } else if (remoteMessage?.data?.route === 'subscribers') {
          navigation.navigate('ABOUT_FEED', {
            id: parseInt(remoteMessage?.data?.feedId),
            //@ts-ignore
            type: 'feed',
          });
        } else if (remoteMessage?.data?.route === 'feed') {
          navigation.navigate('ABOUT_FEED', {
            id: parseInt(remoteMessage?.data?.feedId),
            //@ts-ignore
            type: 'feed',
          });
        } else if (remoteMessage?.data?.route === 'channel') {
          navigation.navigate('CHANNEL', {
            channelId: remoteMessage.data.channel_id,
            //type
          });
        }
      })
      .catch(err => {
        console.log('errerr', err);
      });
  };

  useEffect(() => {
    initBackgroundNotifications();
    openFromQuitState();
  }, [user]);

  const verticalAnimation: StackNavigationOptions = {
    gestureDirection: 'vertical',
    cardStyle: {backgroundColor: 'transparent'},
    cardStyleInterpolator: ({
      current,
      layouts,
    }: any): {cardStyle: {transform: {translateY: any}[]}} => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
    presentation: 'transparentModal',
  };
  const horizontalAnimation: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    cardStyle: {backgroundColor: 'transparent'},
    cardStyleInterpolator: ({
      current,
      layouts,
    }: any): {cardStyle: {transform: {translateX: any}[]}} => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
    presentation: 'transparentModal',
  };

  return (
    <MainStack.Navigator initialRouteName="TAB_NAVIGATION_STACK">
      <MainStack.Screen
        name="TAB_NAVIGATION_STACK"
        options={{headerShown: false, freezeOnBlur: true}}
        component={TabNavigation}
      />
      <MainStack.Screen
        name="FINANSICAL_NAVIGATION_STACK"
        options={{headerShown: false}}
        component={FinansicalNavigationStack}
      />
      <MainStack.Screen
        name="SETTINGS"
        options={{headerShown: false}}
        component={Settings}
      />
      <MainStack.Screen
        name="MY_CREATIONS_NAVIGATION_STACK"
        options={{headerShown: false, animationEnabled: false}}
        component={MyCreationsNavigationStack}
      />
      <MainStack.Screen
        name="MY_PURCHASES_NAVIGATION_STACK"
        options={{headerShown: false, animationEnabled: false}}
        component={MyPurchasesNavigationStack}
      />
      <MainStack.Screen
        name="EXERCISE_NAVIGATION_STACK"
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
        component={ExerciseNavigationStack}
      />
      <MainStack.Group screenOptions={verticalAnimation}>
        <MainStack.Screen
          name="CREATE_WALLET"
          component={CreateWalletScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EDIT_WALLET"
          component={EditWalletScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="THREADSCREEN"
          component={ThreadScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="LIVESTREAM"
          component={LiveStream}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="CREATE_FEED"
          component={CreateFeed}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="CHANGE_PASSWORD"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="CHANGE_EMAIL"
          component={ChangeEmailScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="WORKOUT_TYPE_SELECT"
          component={SelectWorkoutTypeScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="WATCH_WORKOUT"
          component={WatchTheWorkout}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="CREATE_EXERCISE"
          component={CreateExercise}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="CHANNELFROMPACK"
          component={ChannelFromPack}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name={'CREATED_FEED_NAVIGATION'}
          component={CreateFeedScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name={'SUPPORT_SCREEN'}
          component={Support}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true,
          }}
        />
        <MainStack.Screen
          name={'TERMS'}
          component={Terms}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name={'PRIVACY_POLICY'}
          component={PrivacyPolicy}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      </MainStack.Group>
      <MainStack.Group screenOptions={horizontalAnimation}>
        <MainStack.Screen
          name="ABOUT_FEED"
          component={AboutFeed}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true, // add for IOS swipe to back
          }}
        />
        <MainStack.Screen
          name="NOTIFICATIONS"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true, // add for IOS swipe to back
          }}
        />
        <MainStack.Screen
          name="COACH_INFO_PAGE"
          component={NoPermissions}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: true, // add for IOS swipe to back
          }}
        />
        <MainStack.Screen
          name="EXERCISE_DETAIL_PAGE"
          component={ExerciseDetailPage}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="CHANNEL"
          component={ChannelScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ASSISTANT"
          component={AssistantScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EDIT_ASSISTANT"
          component={EditAssistantScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="JOINED_MEMBERS_LIST"
          component={MembersList}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="JOINED_MEMBER_DETAILS"
          component={MemberDetails}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
        <MainStack.Screen
          name="ANSWER_COACH_QUESTIONS"
          component={CoachQuestionsAnswers}
          options={{
            headerShown: false,
            animationEnabled: false,
          }}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainNavigationStack;
