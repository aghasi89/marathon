import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Animated, Linking, Platform, PermissionsAndroid, Alert, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { currencyTypesSelector } from '../../../store/selectors/finansical-selector';
import { getCurrencyTypes } from '../../../store/actions/finansical-action';
import {
  deleteFeed,
  getFeedByIdAction,
  getFeedListAction,
  getFeedListMoreItemsAction,
  getReportCategoryList,
  hideFeed,
  postReport,
  setFeedListAction,
  setFeedListActiveFilterAction,
  setSelectedFeedAction,
} from '../../../store/actions/feed-action';
import { profileSelector } from '../../../store/selectors/profile-selector';
import {
  coachesListSelector,
  feedListActiveFilterSelector,
  feedListSelector,
  feedsCountSelector,
  reportCategoryListSelector,
} from '../../../store/selectors/feed-selector';
import { setError } from '../../../store/actions/administrative-action';
import {
  IFeedCardData,
  IFeedListItem,
  IFeedTypes,
  IRequestStatusType,
} from '../../../types/types';
import { NavigationParamList } from '../../../navigation/FeedNavigation';
import transformFeedListData from '../../../utils/dataTransformHelpers/transformFeedListData';
import { getData } from '../../../utils/local_storage';
import {
  feedButtonClickCount,
  showSelectedLanguageSelector,
  showSelectedRegionSelector,
} from '../../../store/selectors/administrative-selector';
import deepNavigation from '../../../utils/sharing/deepNavigation';
import { getUnseenNotificationsCount } from '../../../store/actions/notifications-action';

type Props = NativeStackScreenProps<NavigationParamList, 'DRAWER_FEED'>;
const { diffClamp } = Animated;
const headerHeight = 58 * 2;

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const { t } = useTranslation();
  const listSelector = useSelector(feedListSelector);
  const coachesList = useSelector(coachesListSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const feedsCount = useSelector(feedsCountSelector);
  const showSelectedLanguage = useSelector(showSelectedLanguageSelector);
  const showSelectedRegion = useSelector(showSelectedRegionSelector);
  const selectedTab = useSelector(feedListActiveFilterSelector);
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const translateYNumber = useRef();
  const ref = useRef<Animated.FlatList>(null);
  const scrollY = useRef(new Animated.Value(0));
  const viewabilityConfigCallbackPairs = useRef<any>([
    { onViewableItemsChanged },
  ]);
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const [actionSheetVisibility, setActionSheetVisibility] =
    useState<boolean>(false);
  const [createPublicationValue, setCreatePublicationValue] =
    useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFeedId, setSelectedFeedId] = useState<number | undefined>(
    undefined,
  );
  const [creatorId, setCreatorId] = useState<number>();
  const [selectedFeedTyped, setSelectedFeedType] = useState<IFeedTypes>();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | undefined>(-1);
  const [feedList, setFeedList] = useState<Array<IFeedListItem>>([]);
  const delay = useRef<any>(null);
  const [reportModalVisible, setReportModalVisible] = useState<boolean>(false);
  const reportCategories = useSelector(reportCategoryListSelector)
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const [reportValue, setReportValue] = useState("")
  const [reportCategory, setReportCategory] = useState(1)
  const buttonClickedCount = useSelector(feedButtonClickCount);

  useEffect(() => {
    if (buttonClickedCount === 1) {
      //@ts-ignore
      ref?.current?.scrollToOffset({ offset: 0, animated: true });
    } else if (buttonClickedCount === 2) {
      refreshingHandle()
    }
  }, [buttonClickedCount])
  useEffect(() => {
    dispatch(getReportCategoryList())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (user)
        dispatch(getUnseenNotificationsCount(user.id));
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android" && user) {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if (!response) {
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS', {
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>", err);
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    dispatch(getCurrencyTypes());
    requestNotificationPermission()
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(setSelectedFeedAction(undefined));
      setFeedList(listSelector);
    });
    const unsubscribeAutoplay = navigation.addListener('blur', () => {
      setActiveVideo(undefined);
      setFeedList([]);
    });
    return () => {
      unsubscribe();
      unsubscribeAutoplay();
      setActiveVideo(undefined);
      setFeedList([]);
    };
  }, [listSelector]);

  useEffect(() => {
    if (!!!listSelector?.length) {
      setLoading(true);
      getData('selectedRegion').then(region => {
        if (region) {
          dispatch(
            getFeedListAction({ filterBy: selectedTab.name, page, geo: region.name }, () => {
              setLoading(false);
              setIsPaginationLoading(false);
            }),
          );
        }
      });
    } else {

      setFeedList(listSelector);
    }

  }, [selectedTab, listSelector, user]);  

  useEffect(() => {
    if (page > 1) {
      getData('selectedRegion').then(region => {
        if (region) {
          dispatch(
            getFeedListMoreItemsAction(
              { filterBy: selectedTab.name, page, geo: region.name },
              () => {
                setIsPaginationLoading(false);
              },
            ),
          );
        }
      })
    }
  }, [page]);
  useEffect(() => {
    Linking.getInitialURL().then(r => {
      r && deepNavigation(r, navigation, dispatch);
    });
    Linking.addEventListener('url', ({ url }) => {
      deepNavigation(url, navigation, dispatch);
    });
  }, []);

  const searchIconPressHandle = useCallback(() => {
    console.log('searchIconPressHandle');
  }, []);

  const tabSelectHandle = useCallback((selected?: number) => {
    switch (selected) {
      case 0:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'live',
          }),
        );
        break;
      case 1:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'coaches',
          }),
        );
        break;
      case 2:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'workout',
          }),
        );
        break;
      case 3:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'recipe',
          }),
        );
        break;
      case 4:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'article',
          }),
        );
        break;
      case 5:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'package',
          }),
        );
        break;
      default:
        dispatch(
          setFeedListActiveFilterAction({
            index: selected,
            name: 'feed',
          }),
        );
        break;
    }
  }, []);
  const onPageEndReachedHandle = useCallback(
    ({ distanceFromEnd }: { distanceFromEnd: number }) => {
      if (
        distanceFromEnd < 150 &&
        page * 10 < feedsCount &&
        !isPaginationLoading &&
        (!!listSelector.length || !!coachesList.length)
      ) {        
        setPage(page + 1);
        setIsPaginationLoading(true);
      }
    },
    [page, feedsCount, isPaginationLoading, listSelector, coachesList],
  );
  const feedCardData = useMemo(() => {
    switch (selectedTab.name) {
      case 'feed':
        return transformFeedListData(t, feedList, currencyList, user);
      default:
        break
    }
  }, [feedList, selectedTab.name, coachesList, user]);
  const repotModalCloseHandle = useCallback(() => {
    setReportModalVisible(false)
    setSelectedStepIndex(1)
    setReportValue("")
    setReportCategory(1)
  }, [])

  const actionSheetCloseHandle = useCallback(() => {
    setSelectedFeedId(undefined);
    setActionSheetVisibility(false);
  }, []);
  const hidePressHandle = useCallback(() => {
    const newList: IFeedListItem[] = [...feedList];
    const index = newList.findIndex(el => el.id === selectedFeedId);
    const payload = {
      feed: selectedFeedId?.toString(),
      user: user?.id.toString(),
    };
    dispatch(
      hideFeed(payload, (status: IRequestStatusType) => {
        if (status === 'success') {
          newList.splice(index, 1);
          dispatch(setFeedListAction(newList));
        } else {
          dispatch(
            setError({
              title: t('error'),
              text: t('somethingWentWrong'),
              buttonTitle: t('ok'),
            }),
          );
        }
      }),
    );
    setActionSheetVisibility(false);
  }, [selectedFeedId]);

  const reportPressHandle = useCallback(() => {
    setActionSheetVisibility(false);
    setReportModalVisible(true)
  }, [selectedFeedId,]);

  const selectReportType = useCallback((item: any) => {
    setReportCategory(item.id)
    if (selectedFeedId) {
      if (item.name === "Other") {
        setSelectedStepIndex(2)
      } else {
        const payload = {
          "feed": selectedFeedId?.toString(),
          "report_category": reportCategory,
          "text": reportValue ? reportValue : "-",
          "user": user?.id
        }
        //@ts-ignore
        dispatch(postReport(payload, () => {
          setSelectedStepIndex(3)
        }))
      }
    }
  }, [selectedStepIndex, reportValue, reportCategory, selectedFeedId])
  const reportHandler = useCallback(() => {
    const payload = {
      "feed": selectedFeedId?.toString(),
      "report_category": reportCategory,
      "text": reportValue ? reportValue : "",
      "user": user?.id
    }
    //@ts-ignore
    dispatch(postReport(payload, () => {
      setSelectedStepIndex(3)
    }))
  }, [reportCategory, reportValue, selectedFeedId])
  const saveHandler = useCallback(() => {
    setReportModalVisible(false)
    setSelectedStepIndex(1)
    setReportValue("")
    setReportCategory(1)
  }, [])
  const backIconPressHandle = useCallback(() => {
    setSelectedStepIndex(1)
  }, [selectedStepIndex])
  const canclePressHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);
  const editPressHandle = useCallback(() => {
    if (selectedFeedId && selectedFeedTyped) {
      dispatch(
        getFeedByIdAction({
          id: selectedFeedId,
          type: selectedFeedTyped == 'basic' ? 'basic' : 'feed',
        }),
      );
      const selected = feedList.find(item => item?.id === selectedFeedId);
      //@ts-ignore
      navigation.navigate('CREATE_FEED', {
        type: selectedFeedTyped,
        isEditing: true,
        workoutType:
          selected && !!selected[selectedFeedTyped]?.trainings?.length
            ? 'manyVideos'
            : 'singleVideo',
      });
    }
    setActionSheetVisibility(false);
  }, [selectedFeedId, selectedFeedTyped]);
  const sharePressHandle = useCallback(() => {
    console.log('share feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const blockPressHandle = useCallback(() => {
    console.log('block feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const deletePressHandle = useCallback(() => {
    if (selectedFeedId) {
      const newList: IFeedListItem[] = [...feedList];
      const index = newList.findIndex(el => el.id === selectedFeedId);
      dispatch(
        deleteFeed(selectedFeedId, (status: IRequestStatusType) => {
          if (status === 'success') {
            newList.splice(index, 1);
            dispatch(setFeedListAction(newList));
            setActionSheetVisibility(false);
          } else {
            dispatch(
              setError({
                title: t('error'),
                text: t('somethingWentWrong'),
                buttonTitle: t('ok'),
              }),
            );
            setActionSheetVisibility(false);
          }
        }),
      );
    }
  }, [selectedFeedId]);
  const handleThreeDots = (item: IFeedCardData) => {
    setCreatorId(item.creatorId);
    setSelectedFeedId(item.id);
    setSelectedFeedType(item.type);
    setActionSheetVisibility(true);
  };
  const createPublicationInputChangeHandle = useCallback((text: string) => {
    setCreatePublicationValue(text);
  }, []);
  const createPublicationButtonPressHandle = useCallback((type: IFeedTypes) => {
    //@ts-ignore
    navigation.navigate(type !== 'workout' ? 'CREATE_FEED' : 'WORKOUT_TYPE_SELECT',
      { type },
    );
  }, []);
  const refreshingHandle = useCallback(() => {
    setLoading(true);
    dispatch(setFeedListAction([]));
    getData('selectedRegion').then(region => {
      if (region) {
        dispatch(
          getFeedListAction({ filterBy: selectedTab.name, page: 1, geo: region.name }, () => {
            setPage(1);
            setRefreshing(false);
            setLoading(false);
          }),
        );
      }
    })
  }, [selectedTab]);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const getCloser = (value: any, checkOne: any, checkTwo: any) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo)
      ? checkOne
      : checkTwo;

  const handleSnap = ({ nativeEvent }: any) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        //@ts-ignore
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
              -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };
  function onViewableItemsChanged({
    viewableItems,
  }: {
    viewableItems: { index: number; item: IFeedCardData }[];
  }) {
    if (delay.current) {
      clearTimeout(delay.current);
    }
    delay.current = setTimeout(() => {
      setActiveVideo(viewableItems[1]?.item.id);
    }, 500);
  }

  return {
    searchIconPressHandle,
    tabSelectHandle,
    selectedTab,
    onPageEndReachedHandle,
    actionSheetCloseHandle,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    actionSheetVisibility,
    loading,
    feedCardData,
    user,
    handleThreeDots,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    createPublicationInputChangeHandle,
    createPublicationButtonPressHandle,
    createPublicationValue,
    t,
    navigation,
    refreshing,
    refreshingHandle,
    creatorId,
    handleSnap,
    handleScroll,
    ref,
    headerHeight,
    translateY,
    isPaginationLoading,
    viewabilityConfigCallbackPairs,
    activeVideo,
    reportModalVisible,
    repotModalCloseHandle,
    reportCategories,
    selectReportType,
    selectedStepIndex,
    reportValue,
    reportCategory,
    backIconPressHandle,
    setReportValue,
    reportHandler,
    saveHandler,
  };
};
