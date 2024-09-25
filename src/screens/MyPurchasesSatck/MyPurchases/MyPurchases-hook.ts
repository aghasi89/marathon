import {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import transformeSelectedItemsListDataToMyCreationsListData from '../../../utils/dataTransformHelpers/transformSelectedListToMyCreation';
import {
  feedsListCountSelector,
  myPurchasesSelector,
  profileSelector,
} from '../../../store/selectors/profile-selector';
import {getMyPurchases} from '../../../store/actions/profile-action';
import {currencyTypesSelector} from '../../../store/selectors/finansical-selector';
import {NavigationParamList} from '../../../navigation/MyPurchasesNavigation';

type Props = NativeStackScreenProps<NavigationParamList, 'MY_PURCHASES'>;

type selectedTabType = {
  index?: number;
  name: string;
  params: {
    type?: string[];
  };
};

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const myPurchases = useSelector(myPurchasesSelector);
  const currencyList = useSelector(currencyTypesSelector);
  const user = useSelector(profileSelector);
  const feedsCount = useSelector(feedsListCountSelector);
  const [selectedTab, setSelectedTab] = useState<selectedTabType>({
    name: 'live',
    index: 0,
    params: {
      type: [
        'upcoming_lives',
        'finished_lives',
        'upcoming_packages',
        'inprogress_packages',
        'finished_packages',
        'inprogress_lives',
      ],
    },
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [selectedSecondTab, setSelectedSecondTab] = useState<
    'upcoming' | 'finished' | 'inprogress'
  >('upcoming');

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(
      getMyPurchases({params: selectedTab.params, page}, () => {
        setLoading(false);
        setIsPaginationLoading(false);
      }),
    );
  }, [selectedTab]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        getMyPurchases({params: selectedTab.params, page}, () => {
          setIsPaginationLoading(false);
        }),
      );
    }
  }, [page]);

  const tabSelectHandle = useCallback((selected?: number) => {
    setPage(1);
    setLoading(true);
    switch (selected) {
      case 0:
        setSelectedSecondTab('upcoming');
        setSelectedTab({
          index: selected,
          name: 'live',
          params: {type: ['upcoming_lives']},
        });
        break;
      case 1:
        setSelectedSecondTab('upcoming');
        setSelectedTab({
          index: selected,
          name: 'package',
          params: {type: ['upcoming_packages']},
        });
        break;
      default:
        setSelectedTab({
          index: selected,
          name: 'feed',
          params: {
            type: [
              'upcoming_lives',
              'finished_lives',
              'upcoming_packages',
              'inprogress_packages',
              'finished_packages',
              'inprogress_lives',
            ],
          },
        });
        break;
    }
  }, []);

  const onPageEndReachedHandle = useCallback(
    ({distanceFromEnd}: {distanceFromEnd: number}) => {
      if (distanceFromEnd < 150 && page * 10 < feedsCount) {
        setPage(page + 1);
        setIsPaginationLoading(true);
      }
    },
    [page, feedsCount],
  );

  const onSearchInputValueChange = () => {};

  const handleTabPress = useCallback(
    (selected: 'upcoming' | 'finished' | 'inprogress') => {
      setSelectedSecondTab(selected);
      var newObj = {...selectedTab};
      newObj.params.type = [`${selected}_${selectedTab.name}s`];
      setSelectedTab(newObj);
    },
    [selectedTab],
  );
  const feedCardData = useMemo(() => {
    return transformeSelectedItemsListDataToMyCreationsListData(t,myPurchases,currencyList);
  }, [myPurchases]);

  const cardPressHandle = useCallback((id:number)=>{
      //@ts-ignore
      navigation.navigate('ABOUT_FEED', {id, type: 'feed'});
  },[selectedTab.index])
  return {
    t,
    goBack,
    selectedTab,
    tabSelectHandle,
    loading,
    isPaginationLoading,
    onPageEndReachedHandle,
    feedCardData,
    onSearchInputValueChange,
    selectedSecondTab,
    handleTabPress,
    cardPressHandle
  };
};
