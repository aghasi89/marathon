import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { deleteFeed, getFeedByIdAction, hideFeed, setFeedListAction } from '../../../../store/actions/feed-action';
import { feedsListCountSelector, feedsSelector, profileSelector } from '../../../../store/selectors/profile-selector';
import { FeedListFilterTypes, IFeedCardData, IFeedListItem, IFeedTypes, IRequestStatusType } from '../../../../types/types';
import transformFeedListData from '../../../../utils/dataTransformHelpers/transformFeedListData';
import { getFeeds, setFeeds } from '../../../../store/actions/profile-action';
import { NavigationParamList } from '../../../../navigation/ProfileNavigation';
import { currencyTypesSelector } from '../../../../store/selectors/finansical-selector';
import { setError } from '../../../../store/actions/administrative-action';

type selectedTabType = {
  index?: number;
  name: FeedListFilterTypes;
};

type Props = NativeStackScreenProps<NavigationParamList, 'PROFILE'>;
export default (props: any) => {
  const { user } = props
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const myInfo = useSelector(profileSelector)
  const feedList = useSelector(feedsSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const feedsCount = useSelector(feedsListCountSelector);
  const dispatch = useDispatch();
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<selectedTabType>({
    name: 'feed',
    index: 0
  });
  const [actionSheetVisibility, setActionSheetVisibility] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFeedId, setSelectedFeedId] = useState<number | undefined>(
    undefined,
  );
  const [selectedFeedTyped, setSelectedFeedType] = useState<IFeedTypes>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user)
      dispatch(
        getFeeds({ filterBy: selectedTab.name, id: user.id, page: page }, () => {
          setLoading(false);
          setIsPaginationLoading(false)
        }),
      );
  }, [selectedTab, user]);

  useEffect(() => {
    if (user)
      if (page > 1) {
        dispatch(getFeeds({ filterBy: selectedTab.name, id: user.id, page: page }, () => {
          setIsPaginationLoading(false)
        }));
      }
  }, [page, user]);

  const searchIconPressHandle = useCallback(() => {
    console.log('searchIconPressHandle');
  }, [])

  const tabSelectHandle = useCallback((selected?: number) => {
    setPage(1);
    setLoading(true);
    switch (selected) {
      case 0:
        setSelectedTab({
          index: selected,
          name: 'feed',
        });
        break;
      case 1:
        setSelectedTab({
          index: selected,
          name: 'live',
        });
        break;
      case 2:
        setSelectedTab({
          index: selected,
          name: 'workout',
        });
        break;
      case 3:
        setSelectedTab({
          index: selected,
          name: 'recipe',
        });
        break;
      case 4:
        setSelectedTab({
          index: selected,
          name: 'article',
        });
        break;
      case 5:
        setSelectedTab({
          index: selected,
          name: 'package',
        });
        break;
      default:
        setSelectedTab({
          index: selected,
          name: 'feed',
        });
        break;
    }
  }, []);
  const onPageEndReachedHandle = useCallback(
    ({ distanceFromEnd }: { distanceFromEnd: number }) => {
      if (distanceFromEnd < 150 && page * 10 < feedsCount) {
        setPage(page + 1);
        setIsPaginationLoading(true)
      }
    },
    [page, feedsCount],
  );

  const feedCardData = useMemo(() => {
    return transformFeedListData(t, feedList, currencyList, user, myInfo);
  }, [feedList, user, currencyList, myInfo]);

  const actionSheetCloseHandle = useCallback(() => {
    setSelectedFeedId(undefined);
    setActionSheetVisibility(false);
  }, []);

  const hidePressHandle = useCallback(() => {
    if (feedList) {
      const newList: IFeedListItem[] = [...feedList];
      const index = newList.findIndex(el => el.id === selectedFeedId);
      const payload =
      {
        feed: selectedFeedId?.toString(),
        user: user?.id.toString()
      }
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
    }
    setActionSheetVisibility(false);
  }, [selectedFeedId, feedList]);

  const reportPressHandle = useCallback(() => {
    console.log('report feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const canclePressHandle = useCallback(() => {
    setActionSheetVisibility(false);
  }, []);
  const sharePressHandle = useCallback(() => {
    console.log('share feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const blockPressHandle = useCallback(() => {
    console.log('block feed id:', selectedFeedId);
    setActionSheetVisibility(false);
  }, [selectedFeedId]);
  const deletePressHandle = useCallback(() => {
    if (selectedFeedId && feedList) {
      const newList: IFeedListItem[] = [...feedList];
      const index = newList.findIndex(el => el.id === selectedFeedId);
      dispatch(
        deleteFeed(selectedFeedId, (status: IRequestStatusType) => {
          if (status === 'success') {
            newList.splice(index, 1);
            dispatch(setFeeds(newList));
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
  }, [selectedFeedId, feedList]);
  const handleThreeDots = (item: IFeedCardData) => {
    setSelectedFeedId(item.id);
    setSelectedFeedType(item.type);
    setActionSheetVisibility(true);
  };
  const editPressHandle = useCallback(() => {
    if (selectedFeedId && selectedFeedTyped && feedList) {
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
  }, [selectedFeedId, selectedFeedTyped, feedList]);

  return {
    searchIconPressHandle,
    tabSelectHandle,
    selectedTab,
    onPageEndReachedHandle,
    actionSheetCloseHandle,
    actionSheetVisibility,
    loading,
    feedCardData,
    user,
    handleThreeDots,
    t,
    hidePressHandle,
    reportPressHandle,
    canclePressHandle,
    deletePressHandle,
    editPressHandle,
    sharePressHandle,
    blockPressHandle,
    isPaginationLoading
  };
};
