import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../../navigation/SearchNavigation';
import {
  searchFiltersSelector,
  searchSelectedBucketsSelector,
} from '../../../store/selectors/search-selector';
import {
  FilterGenderEnum,
  IFilterFacetsKeysType,
  ISelectedBuckets,
} from '../../../types/feedFilterTypes';
import {
  getCoachesFilters,
  getFilters,
  setFilters,
  setSelectedBuckets,
} from '../../../store/actions/search-action';

type Props = NativeStackScreenProps<NavigationParamList, 'FILTERS_SCREEN'>;
enum PackageFilter {
  upcoming = 'finished',
  finished = 'upcoming',
}
export default () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const filtersListData = useSelector(searchFiltersSelector);
  const selectedBuckets = useSelector(searchSelectedBucketsSelector);
  const { type } = route?.params;
  const backIconePressHandle = useCallback(() => {
    navigation.goBack();
  }, []);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const localData = ['all', 'upcoming', 'finished'];
  const genderLocalDate = ['all', 'male', 'female'];

  useEffect(() => {
    if (type == 'coaches') {
      dispatch(getCoachesFilters())
    } else {
      dispatch(getFilters(type));
    }
    return () => {
      dispatch(setFilters([]));
    };
  }, [type]);

  useEffect(() => {
    if (selectedBuckets) {
      if (selectedBuckets.upcoming?.length) {
        setSelectedFilter('upcoming');
      } else if (selectedBuckets.finished?.length) {
        setSelectedFilter('finished');
      }
      if (selectedBuckets.gender) {
        setSelectedGender(Number(selectedBuckets.gender[0] ?? 0));
      }
    }
  }, []);
  const handleSelectCategory = useCallback(
    (selected?: IFilterFacetsKeysType) => {
      if (selected)
        navigation.navigate('SELECT_FILTERS_SCREEN', { type: selected });
    },
    [],
  );
  const datePickerButtonPressHandle = useCallback(() => {
    setIsPickerOpen(true);
  }, []);
  const datePickerCancelHandle = useCallback(() => {
    setIsPickerOpen(false);
  }, []);
  const datePickerConfirmHandle = useCallback(
    (date: any) => {
      dispatch(
        setSelectedBuckets({
          ...selectedBuckets,
          date: [{ key: date, title: moment(date).format('DD MMMM YYYY') }],
        }),
      );
      setIsPickerOpen(false);
    },
    [selectedBuckets],
  );
  const packageFilterSelectHandle = useCallback(
    (lable: string) => {
      let newBuckets: ISelectedBuckets = { ...selectedBuckets };
      switch (lable) {
        case 'all':
          newBuckets = {
            ...newBuckets,
            finished: [],
            upcoming: [],
          };
          break;
        case 'upcoming':
        case 'finished':
          newBuckets = {
            ...newBuckets,
            [lable]: [{ key: lable, title: t(lable) }],
            [PackageFilter[lable]]: [],
          };
          break;
        default:
          break;
      }
      setSelectedFilter(lable);
      dispatch(setSelectedBuckets(newBuckets));
    },
    [selectedBuckets],
  );
  const genderSelectHandle = useCallback(
    (index: number) => {
      let newBuckets: ISelectedBuckets = { ...selectedBuckets };
      switch (index) {
        case 0:
          newBuckets = {
            ...newBuckets,
            gender: [],
          };
          break;
        default:
          newBuckets = {
            ...newBuckets,
            gender: [{ title: FilterGenderEnum[index], key: index.toString() }],
          };
          break;
      }
      setSelectedGender(index);
      dispatch(setSelectedBuckets(newBuckets));
    },
    [selectedBuckets],
  );
  return {
    t,
    backIconePressHandle,
    handleSelectCategory,
    datePickerCancelHandle,
    datePickerConfirmHandle,
    datePickerButtonPressHandle,
    packageFilterSelectHandle,
    genderSelectHandle,
    filtersListData,
    selectedBuckets,
    isPickerOpen,
    type,
    localData,
    selectedFilter,
    genderLocalDate,
    selectedGender,
  };
};
