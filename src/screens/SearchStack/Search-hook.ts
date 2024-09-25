import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import {
  searchFilteredListSelector,
  searchFilteredUsersListSelector,
  searchFiltersSelector,
  searchNextPageSelector,
  searchRecomendedListSelector,
  searchSelectedBucketsSelector,
  searchedFeedListSelector,
} from '../../store/selectors/search-selector';
import {
  getCoachesFilters,
  getCoachesFiltersResultsAction,
  getFilteredListAction,
  getFilters,
  getRecomendedList,
  getSearchResultsAction,
  setFilteredListAction,
  setFilteredUsersListAction,
  setFilters,
  setSearchResultsAction,
  setSelectedBuckets,
} from '../../store/actions/search-action';
import {
  IFilterFacetsKeysType,
  ISelectedBucket,
} from '../../types/feedFilterTypes';
import transformFeedListDataToMyCreationsListData from '../../utils/dataTransformHelpers/transformFeedListToMyCreation';
import transformeSelectedItemsListDataToMyCreationsListData from '../../utils/dataTransformHelpers/transformSelectedListToMyCreation';
import { locationsListSelector } from '../../store/selectors/administrative-selector';
import { feedListActiveFilterSelector } from '../../store/selectors/feed-selector';
import { currencyTypesSelector } from '../../store/selectors/finansical-selector';
import { setFeedListActiveFilterAction } from '../../store/actions/feed-action';
import { getLocationAction } from '../../store/actions/administrative-action';
import { profileSelector } from '../../store/selectors/profile-selector';
import { followUser, getPersonInfo } from '../../store/actions/profile-action';
import { NavigationParamList } from '../../navigation/SearchNavigation';
import {
  FeedListFilterTypes,
  IMyCreationsCardData,
  IUser,
} from '../../types/types';
import { debounce } from '../../utils/debounce';
import { downloadMediaFromBunny } from '../../utils/bunny.net';
import { getCheckCoachesFollow } from '../../store/actions/followers-action';
import { checkCoachFollowSelector } from '../../store/selectors/follower-selector';

type Props = NativeStackScreenProps<NavigationParamList, 'SEARCH'>;
interface ISelectedTab {
  index: number;
  name: FeedListFilterTypes;
}

export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchFilters = useSelector(searchFiltersSelector);
  const recomendedList = useSelector(searchRecomendedListSelector);
  const searchedFeedList = useSelector(searchedFeedListSelector);
  const filteredList = useSelector(searchFilteredListSelector);
  const filteredUsersList = useSelector(searchFilteredUsersListSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const selectedBuckets = useSelector(searchSelectedBucketsSelector);
  const hesNextPage = useSelector(searchNextPageSelector);
  const feedListSelectedTub = useSelector(feedListActiveFilterSelector);
  const amIFollowList = useSelector(checkCoachFollowSelector);
  const user = useSelector(profileSelector);
  const regions = useSelector(locationsListSelector);
  const inputRef = useRef<TextInput | null>(null);
  const tabsListRef = useRef<FlatList<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [emptyListValue, setEmptyListValue] = useState<
    'inputTextToStartSearching' | 'noResultsFound'
  >('inputTextToStartSearching');
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>({
    index: 0,
    name: 'feed',
  });
  const tabs = [
    {
      index: 1,
      name: 'live',
    },
    {
      index: 2,
      name: 'coaches',
    },
    {
      index: 3,
      name: 'workout',
    },
    {
      index: 4,
      name: 'recipe',
    },
    {
      index: 5,
      name: 'article',
    },
    {
      index: 6,
      name: 'package',
    }
  ]
  useEffect(() => {
    if (selectedTab.name) {
      if (selectedTab.name == 'coaches') {
        dispatch(getCoachesFilters())
      } else {
        dispatch(getFilters(selectedTab.name));
      }
      return () => {
        dispatch(setFilters([]));
      };
    }
  }, [selectedTab]);

  useEffect(() => {
    if (user?.location && searchFilters.length > 0) {
      const regions = searchFilters.find(el => el.key === "region");
      const myRegion = regions?.buckets?.find(el => el.key === user.geolocation);
      if (myRegion) {
        setLoading(true);
        myRegion.isSelected = true;
        const payload = {
          region: [myRegion]
        };
        dispatch(setSelectedBuckets(payload));
        setLoading(false);
      }
    }
  }, [searchFilters, user]);
  useEffect(() => {
    if (
      feedListSelectedTub &&
      feedListSelectedTub.name !== 'feed' &&
      tabsListRef.current
    ) {
      setSelectedTab({
        ...feedListSelectedTub,
        index: feedListSelectedTub.index + 1,
      });
      setTimeout(() => {
        tabsListRef.current?.scrollToIndex({
          animated: true,
          index: feedListSelectedTub.index + 1,
        });
      }, 700);
      dispatch(setFeedListActiveFilterAction({ index: 0, name: 'feed' }));
    }
  }, [feedListSelectedTub]);

  useEffect(() => {
    navigation.addListener('blur', clearListHandle);
    return clearListHandle;
  }, []);
  useEffect(getFilteredListHandle, [selectedTab, selectedBuckets, searchValue]);
  const selectedFiltersData: ISelectedBucket[] = useMemo(() => {
    const newBuckets = { ...selectedBuckets };
    let newList: ISelectedBucket[] = [];
    Object.values(newBuckets ?? {}).forEach(el => {
      newList = [...newList, ...el];
    });
    return newList;
  }, [selectedBuckets]);
  function getFilteredListHandle() {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!filteredList.length) {
        getFilteredList();
      }
    });
    getFilteredList();
    return unsubscribe;
  }
  const getFilteredList = useCallback(() => {
    if (selectedTab.name !== 'feed' && !searchValue) {
      setLoading(true);
      if (selectedTab.name == 'coaches') {
        dispatch(
          getCoachesFiltersResultsAction(page, selectedBuckets, () => {
            setLoading(false);
          }),
        );
      } else {
        dispatch(
          getFilteredListAction(selectedTab.name, page, selectedBuckets, () => {
            setLoading(false);
          }),
        );
      }
    } else if (selectedTab.name === 'feed' && !searchValue) {
      dispatch(getRecomendedList());
    }
  }, [selectedTab.name, page, selectedBuckets, searchValue]);
  const clearListHandle = useCallback(() => {
    dispatch(setSearchResultsAction([]));
    dispatch(setFilteredListAction([]));
    dispatch(setFilteredUsersListAction([]));
    setPage(1);
  }, []);
  const backIconPressHandle = useCallback(() => {
    navigation.goBack();
  }, []);

  const tabSelectHandle = useCallback((index?: number) => {
    dispatch(setSelectedBuckets({}));
    clearListHandle();
    setPage(1);
    handleBlurInput(index);
    setSearchValue('');
    switch (index) {
      case 0:
        setSelectedTab({
          index,
          name: 'feed',
        });
        break;
      case 1:
        setSelectedTab({
          index,
          name: 'live',
        });
        break;
      case 2:
        setSelectedTab({
          index,
          name: 'coaches',
        });
        break;
      case 3:
        setSelectedTab({
          index,
          name: 'workout',
        });
        break;
      case 4:
        setSelectedTab({
          index,
          name: 'recipe',
        });
        break;
      case 5:
        setSelectedTab({
          index,
          name: 'article',
        });
        break;
      case 6:
        setSelectedTab({
          index,
          name: 'package',
        });
        break;
    }
  }, []);
  const searchValueChangeHandle = useCallback(
    (text: string) => {
      setSearchValue(text);
      if (text.length) {
        setLoading(true);
        clearListHandle();
        dispatch(setSelectedBuckets({}));
        debounceSearch(text, selectedTab.name);
      } else {
        setEmptyListValue('inputTextToStartSearching');
      }
    },
    [selectedTab.name],
  );
  const handleFocuseInput = useCallback(() => {
    if (selectedTab.name !== 'coaches' && selectedTab.name !== 'feed') {
      tabSelectHandle(0), setSearchValue('');
    }
  }, [selectedTab.name]);
  const handleBlurInput = useCallback(
    (index?: number) => {
      if (index !== 0 && index !== 2) {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    },
    [inputRef.current],
  );
  const debounceSearch = debounce(
    (value: string, selectedType: FeedListFilterTypes) => {
      dispatch(
        getSearchResultsAction(value, selectedType, status => {
          if (status === 'success') {
            setEmptyListValue('noResultsFound');
            setLoading(false);
          }
        }),
      );
    },
    1000,
  );
  const serchResultsList = useMemo(() => {
    let newList: IMyCreationsCardData[] | undefined = [];
    let usersList: IUser[] | undefined = [];
    let sortData: any = {};
    let renderSortedData: { title: string; feed: IMyCreationsCardData[] }[] = [];
    switch (selectedTab.name) {
      case 'feed':
        if (!searchValue.length) {
          for (const key in recomendedList) {
            const element = recomendedList[key];
            const newElement =
              transformeSelectedItemsListDataToMyCreationsListData(
                t,
                element,
                currencyList,
              );
            renderSortedData.push({ title: key, feed: newElement ?? [] });
          }
        } else {
          newList = transformFeedListDataToMyCreationsListData(
            t,
            searchedFeedList,
            currencyList,
          );
          newList?.forEach(el => {
            sortData[el.type ?? 'coaches'] = [
              ...(sortData[el.type] ?? []),
              { ...el },
            ];
          });
        }
        if (sortData['coaches']?.length) {
          sortData['coaches'] = sortData['coaches'].map((user: IUser) => {
            const userRegion = regions?.find(
              el => el.place_id === user?.location,
            );
            if (!userRegion && user?.location) {
              dispatch(getLocationAction(user?.location));
            }
            return {
              ...user,
              image:
                downloadMediaFromBunny({
                  public_key: user?.image || '',
                  mediaType: 'image',
                  userDir: user?.id,
                  imageDir: 'profile',
                })?.url ?? '',
              //@ts-ignore
              language: user?.language?.language?.map(el => ({ language: el })),
              location: userRegion?.formatted_address || t('unknown'),
              //@ts-ignores
              speciality: user?.speciality?.speciality?.map(el => ({
                speciality: el,
              })),
            };
          });
        }
        for (const key in sortData) {
          renderSortedData.push({ title: key, feed: sortData[key] });
        }
        break;
      case 'coaches':
        usersList = filteredUsersList.map(user => {
          return {
            ...user,
            image:
              downloadMediaFromBunny({
                public_key: user?.image || '',
                mediaType: 'image',
                userDir: user?.id,
                imageDir: 'profile',
              })?.url ?? '',
            //@ts-ignore
            language: user?.language?.language?.map(el => ({ language: el })),
          };
        });
        break;
      default:
        if (filteredList)
          newList = transformeSelectedItemsListDataToMyCreationsListData(
            t,
            filteredList,
            currencyList,
          );
        break;
    }
    return {
      defaultList: newList,
      sortedList: renderSortedData,
      coachesList: usersList,
    };
  }, [
    selectedTab,
    searchedFeedList,
    currencyList,
    user,
    filteredList,
    filteredUsersList,
    recomendedList,
    regions,
  ]);

  useEffect(() => {
    if (serchResultsList.coachesList) {
      let coachesId: number[] = [];
      serchResultsList.coachesList.map((item: IUser) => {
        coachesId.push(item.id)
      });
      if (coachesId.length > 0) {
        dispatch(getCheckCoachesFollow({
          coaches: coachesId
        }))
      }
    };
  }, [serchResultsList]);

  const cardPressHandle = useCallback((item?: any, type?: string) => {
    if (type !== 'coaches') {
      if (item && item.type !== 'basic')
        //@ts-ignore
        navigation.navigate('ABOUT_FEED', {
          id: item.id || item.feed.id,
          type: 'feed',
        });
    } else {
      dispatch(
        getPersonInfo(item.id, () => {
          navigation.navigate('USER_PROFILE');
        }),
      );
    }
  }, []);
  const filterButtonPressHandle = useCallback(() => {
    navigation.navigate('FILTERS_SCREEN', { type: selectedTab.name });
  }, [selectedTab]);
  const handleRemoveFilter = useCallback(
    (item: ISelectedBucket) => {
      const selecteds = { ...selectedBuckets };
      for (const key in selectedBuckets) {
        const categoryList = [
          ...(selectedBuckets[key as IFilterFacetsKeysType] || []),
        ];
        const index = categoryList.findIndex(el => el.key === item.key);
        if (index > -1) categoryList.splice(index, 1);
        selecteds[key as IFilterFacetsKeysType] = categoryList;
      }
      dispatch(setSelectedBuckets(selecteds));
    },
    [selectedBuckets],
  );
  const onEndReachedHandle = useCallback(
    ({ distanceFromEnd }: { distanceFromEnd: number }) => {
      if (distanceFromEnd < 100 && hesNextPage) {
        setPage(page => {
          if (selectedTab.name == 'coaches') {
            dispatch(
              getCoachesFiltersResultsAction(page, selectedBuckets, () => {
                setLoading(false);
              }),
            );
          } else {
            dispatch(
              getFilteredListAction(selectedTab.name, page + 1, selectedBuckets),
            );
          }
          return page + 1;
        });
      }
    },
    [selectedTab.name, selectedBuckets, hesNextPage],
  );
  const handleUnfollow = useCallback((id: number) => {
    setLoading(true);
    dispatch(
      followUser(id, () => {
        if (selectedTab.name == 'coaches') {
          dispatch(
            getCoachesFiltersResultsAction(page, selectedBuckets, () => {
              setLoading(false);
            }),
          );
        } else {
          dispatch(
            getFilteredListAction(selectedTab.name, page, selectedBuckets, () => {
              setLoading(false);
            }),
          );
        }
      }),
    );
  }, [page, selectedBuckets, selectedTab]);

  return {
    serchResultsList,
    searchValue,
    loading,
    selectedTab,
    emptyListValue,
    selectedFiltersData,
    inputRef,
    tabsListRef,
    t,
    searchValueChangeHandle,
    backIconPressHandle,
    tabSelectHandle,
    cardPressHandle,
    filterButtonPressHandle,
    handleRemoveFilter,
    onEndReachedHandle,
    handleFocuseInput,
    handleUnfollow,
    amIFollowList,
    tabs
  };
};
