import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  searchFiltersSelector,
  searchSelectedBucketsSelector,
} from '../../../store/selectors/search-selector';
import {NavigationParamList} from '../../../navigation/SearchNavigation';
import {ISelectedBucket,IStoreFacetsData} from '../../../types/feedFilterTypes';
import {useTranslation} from 'react-i18next';
import {
  setSelectedBuckets,
} from '../../../store/actions/search-action';
import { profileSelector } from '../../../store/selectors/profile-selector';

type Props = NativeStackScreenProps<
  NavigationParamList,
  'SELECT_FILTERS_SCREEN'
>;
export default () => {
  const {t} = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector);
  const searchFilters = useSelector(searchFiltersSelector);
  const selectedBuckets = useSelector(searchSelectedBucketsSelector);
  const [facets, setFacets] = useState<IStoreFacetsData | undefined>();
  const {type} = route.params;

  useEffect(() => {
    initFacets();
    const unsubscribe = navigation.addListener('blur', setSelectedFacets);
    return unsubscribe;
  }, [selectedBuckets, searchFilters, facets]);

  const initFacets = useCallback(() => {
    if (!facets) {
      let selectedFacet: IStoreFacetsData | undefined = searchFilters.find(
        el => el.key === type,
      );
      if (selectedBuckets && searchFilters) {
        selectedFacet = {
          ...selectedFacet,
          buckets: selectedFacet?.buckets?.map(el => ({
            ...el,
            isSelected:
              (selectedBuckets[type] || []).findIndex(
                item => el.key === item.key,
              ) > -1,
          })),
        };
      }
      setFacets(selectedFacet);
    }
  }, [selectedBuckets, searchFilters, facets]);
  const setSelectedFacets = useCallback(() => {
    let selectedBucketsList: ISelectedBucket[] | undefined = facets?.buckets
      ?.filter(el => el.isSelected)
    dispatch(
      setSelectedBuckets({
        ...selectedBuckets,
        [type]: selectedBucketsList || [],
      }),
    );
  }, [facets, selectedBuckets]);
  const backIconePressHandle = useCallback(() => {
    navigation.goBack();
  }, []);
  const handleSelect = useCallback((itemKey: string) => {
    setFacets(prev => {
      const newBucketsList = [...(prev?.buckets || [])];
      const index = newBucketsList.findIndex(el => el.key == itemKey);
      if (index < 0) return prev;
      newBucketsList[index].isSelected = !newBucketsList[index].isSelected;
      return {...prev, buckets: newBucketsList};
    });
  }, []);
  return {handleSelect, t, backIconePressHandle, facets, type};
};
