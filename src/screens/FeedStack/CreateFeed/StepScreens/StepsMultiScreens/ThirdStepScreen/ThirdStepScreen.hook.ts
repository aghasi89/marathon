import {useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedStateSelector } from '../../../../../../store/selectors/create-feed-selector';
import { setCommunicationAction } from '../../../../../../store/actions/createFeed-action';
import { selectedFeedSelector } from '../../../../../../store/selectors/feed-selector';

export default () => {
  const state= useSelector(createFeedStateSelector)
  const selectedFeed = useSelector(selectedFeedSelector);
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const communicateSelectHandle = useCallback((type: 'channel' | 'group') => {
    dispatch(setCommunicationAction(type))
  }, [])
  return {
    t,
    state,
    communicateSelectHandle,
    selectedFeed
  }
}