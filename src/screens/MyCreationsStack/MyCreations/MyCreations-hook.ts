import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NavigationParamList} from '../../../navigation/MyCreationsNavigation';
import {
  feedsListCountSelector,
  feedsSelector,
  myCreationsByStatusSelector,
  profileSelector,
} from '../../../store/selectors/profile-selector';
import {
  getFeeds,
  getMyCreatedFeedsByStatusAction,
} from '../../../store/actions/profile-action';
import {myExercisesListSelector} from '../../../store/selectors/feed-selector';
import {getMyExercisesList} from '../../../store/actions/feed-action';
import {currencyTypesSelector} from '../../../store/selectors/finansical-selector';
import transformFeedListDataToMyCreationsListData from '../../../utils/dataTransformHelpers/transformFeedListToMyCreation';
import transformExerciseListDataToMyCreationsListData from '../../../utils/dataTransformHelpers/transformExerciseListToMyCreation';
import {getData} from '../../../utils/local_storage';
import transformeSelectedItemsListDataToMyCreationsListData from '../../../utils/dataTransformHelpers/transformSelectedListToMyCreation';

type Props = NativeStackScreenProps<NavigationParamList, 'MY_CREATIONS'>;

type selectedTabType = {
  index?: number;
  name: string;
  params: string|undefined
};

export default () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const feedList = useSelector(feedsSelector);
  const execisesList = useSelector(myExercisesListSelector);
  const myCreationsByStatus = useSelector(myCreationsByStatusSelector)
  const currencyList = useSelector(currencyTypesSelector);
  const user = useSelector(profileSelector);
  const feedsCount = useSelector(feedsListCountSelector);
  const [selectedTab, setSelectedTab] = useState<selectedTabType>({
    name: user?.role_mode!=='coach'?'recipe':'live',
    index: user?.role_mode!=='coach'?1:0,
    params: undefined,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [geo, setGeo] = useState<string>();
  const [selectedSecondTab, setSelectedSecondTab] = useState<
    'upcoming' | 'finished' | 'inprogress'
  >();
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getData('selectedRegion').then(region => {
      if (region) {
        setGeo(region.name);
      } else {
        setGeo('AM');
      }
    });
  }, []);

  useEffect(() => {
    if (user && geo) {
      if (selectedTab.index == 5) {
        dispatch(
          getMyExercisesList(() => {
            setLoading(false);
            setIsPaginationLoading(false);
          }),
        );
      } else {
        if (!selectedTab.params) {
          dispatch(
            getFeeds(
              {
                filterBy: selectedTab.name,
                id: user.id.toString(),
                page: page,
                geo,
                params: selectedTab.params,
                showPrivate:true
              },
              () => {
                setLoading(false);
                setIsPaginationLoading(false);
              },
            ),
          );
        } else {
          dispatch(
            getMyCreatedFeedsByStatusAction(
              {
                filterBy: selectedTab.params,
                id: user.id.toString(),
              },
              () => {
                setLoading(false);
                setIsPaginationLoading(false);
              },
            ),
          );
        }
      }
    }
  }, [selectedTab, user, geo]);

  useEffect(() => {
    if (user && geo) {
      if (page > 1 && selectedTab.index != 5) {
        dispatch(
          getFeeds(
            {
              filterBy: selectedTab.name,
              id: user.id.toString(),
              page: page,
              geo,
              params: selectedTab.params,
              showPrivate:true
            },
            () => {
              setIsPaginationLoading(false);
            },
          ),
        );
      }
    }
  }, [page, user, geo]);

  const tabSelectHandle = useCallback((selected?: number) => {
    setPage(1);
    setLoading(true);
    switch (selected) {
      case 0:
        setSelectedTab({
          index: selected,
          name: 'live',
          params: undefined,
        });
        break;
      case 1:
        setSelectedTab({
          index: selected,
          name: 'recipe',
          params: undefined,
        });
        break;
      case 2:
        setSelectedTab({
          index: selected,
          name: 'article',
          params: undefined,
        });
        break;
      case 3:
        setSelectedTab({
          index: selected,
          name: 'package',
          params: undefined,
        });
        break;
      case 4:
        setSelectedTab({
          index: selected,
          name: 'workout',
          params: undefined,
        });
        break;
      case 5:
        setSelectedTab({
          index: selected,
          name: 'exercise',
          params: undefined,
        });
        break;
      default:
        setSelectedTab({
          index: selected,
          name: 'feed',
          params: undefined,
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

  const createPublicationButtonPressHandle = useCallback((type: string) => {
    if (type !== 'exercise') {
      //@ts-ignore
      navigation.navigate( type !== 'workout' ? 'CREATE_FEED' : 'WORKOUT_TYPE_SELECT',
        {type},
      );
    } else {
      //@ts-ignore
      navigation.navigate('CREATE_EXERCISE');
    }
  }, []);

  const onSearchInputValueChange = () => {};

  const handleTabPress = useCallback(
    (selected: 'upcoming' | 'finished' | 'inprogress') => {
      setSelectedSecondTab(selected);
      setSelectedTab(curr=>({...curr,params: `${selected}_${curr.name}s`}));     
    },
    [selectedTab],
  );

  const cardData = useMemo(() => {
    if (selectedTab.index === 5) {
      return transformExerciseListDataToMyCreationsListData(t, execisesList);
    } else if((selectedTab.index===0||selectedTab.index===3)&&!!selectedTab.params){
      return transformeSelectedItemsListDataToMyCreationsListData(t,myCreationsByStatus,currencyList)
    }else {
      return transformFeedListDataToMyCreationsListData(t, feedList,currencyList,user);
    }
  }, [execisesList, feedList, selectedTab,myCreationsByStatus,user]);
  const cardPressHandle = useCallback((id:number)=>{
    if (selectedTab.index!==5) {
      //@ts-ignore
      navigation.navigate('ABOUT_FEED', {id, type: 'feed'});
    }else{
      //@ts-ignore
      navigation.navigate('EXERCISE_DETAIL_PAGE', {id })
    }
  },[selectedTab.index])
  return {
    t,
    goBack,
    selectedTab,
    tabSelectHandle,
    loading,
    isPaginationLoading,
    onPageEndReachedHandle,
    createPublicationButtonPressHandle,
    onSearchInputValueChange,
    selectedSecondTab,
    handleTabPress,
    cardData,
    user,
    cardPressHandle
  };
};
