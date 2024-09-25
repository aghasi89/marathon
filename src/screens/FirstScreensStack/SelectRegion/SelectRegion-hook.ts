import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCountry } from "react-native-localize";
import { SheetManager } from 'react-native-actions-sheet';
import AnalyticService from '../../../utils/analytics/AnalyticService';
import { getData, storeData } from '../../../utils/local_storage';
import { setShowSelectedLanguagePage, setShowSelectedRegionPage } from '../../../store/actions/administrative-action';
import { setFeedListAction } from '../../../store/actions/feed-action';
import { changeProfileInfo, getProfileInfo, getRegions } from '../../../store/actions/profile-action';
import { profileSelector, regionsSelector } from '../../../store/selectors/profile-selector';
import { IRegion } from '../../../types/types';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(profileSelector)
  const regionsList = useSelector(regionsSelector)
  const [selectedRegion, setSelectedRegion] = useState<IRegion | undefined>(undefined)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    dispatch(getRegions())
    getData('isNew').then(isNew => {
      if (isNew == 'no') {
        setShowHeader(true);
      }
    });
  }, [])

  useEffect(() => {
    getData('selectedRegion').then(region => {
      if (region) {
        setSelectedRegion(region)
      } else {
        if (regionsList) {
          if (getCountry() && regionsList?.filter((item) => item.name == getCountry()).length > 0) {
            return setSelectedRegion(regionsList?.filter((item) => item.name == getCountry())[0])
          } else {
            return setSelectedRegion(regionsList?.filter(el => el.id == 1)[0])
          }
        }
      }
    });
  }, [regionsList, getCountry])

  const handleSave = useCallback(() => {
    getData('selectedRegion').then(region => {
      if (!region) {
        storeData('selectedRegion', selectedRegion)
        closeSelectRegionModal()
        dispatch(setShowSelectedLanguagePage(true))
      } else {
        if (region && user) {
          const payload = {
            ...user,
            "geolocation": region.name
          }
          dispatch(changeProfileInfo(user.id, payload, () => {
            dispatch(getProfileInfo())
          }))
        }
        storeData('selectedRegion', selectedRegion)
        closeSelectRegionModal()
      }
      selectedRegion && AnalyticService.regionChange(selectedRegion?.name)
      dispatch(setFeedListAction([]))
    });
  }, [selectedRegion, user])

  const regionSelectHandle = useCallback(
    (region: IRegion) => {
      setSelectedRegion(region)
      SheetManager.hide('regionsSheet')
    },
    [],
  );

  const regionSelectButtonPressHandle = useCallback(() => {
    SheetManager.show('regionsSheet', {
      payload: {
        data: regionsList,
        onSelect: regionSelectHandle,
        selected: selectedRegion?.id
      },
    })
  }, [regionsList, regionSelectHandle, selectedRegion]);

  const closeSelectRegionModal = useCallback(() => {
    dispatch(setShowSelectedRegionPage(false))
  }, [])

  return {
    t,
    handleSave,
    selectedRegion,
    regionSelectButtonPressHandle,
    showHeader,
    closeSelectRegionModal
  };
};
