import {Dispatch, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteGroup} from '../../../../store/actions/marathon-action';
import {marathonsListSelector} from '../../../../store/selectors/marathons-selector';
import {IMarathons} from '../../../../types/types';

export default function groupHook({searchText, navigation}) {
  const dispatch = useDispatch<Dispatch<any>>();
  const marathonsList = useSelector(marathonsListSelector);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();
  const search = useCallback(
    (searchItem: IMarathons) => {
      return (
        searchText.toLowerCase() ===
          searchItem.name
            .slice(0, searchText.length)
            .toString()
            .toLowerCase() || searchText === ''
      );
    },
    [searchText],
  );
  const onEdit = useCallback(() => {
    setIsOpenedEditSheet(false);
  }, []);
  const onDelete = useCallback(() => {
    if (selectedId) {
      dispatch(deleteGroup(selectedId));
      setSelectedId(undefined);
      setIsOpenedEditSheet(false);
    }
  }, [selectedId]);
  const onBookmark = useCallback(() => {
    setIsOpenedEditSheet(false);
  }, []);
  const createMarathon = useCallback(() => {
    navigation.navigate('CreateGroupMarathon', {isNew: true});
  }, [navigation]);
  const closeToester = useCallback(() => {
    setIsOpenedEditSheet(false);
  }, []);
  const navigateMarathonDetail = useCallback(
    id => {
      navigation.navigate('MarathonDetail', {id: id});
    },
    [navigation],
  );
  return {
    search,
    onEdit,
    onDelete,
    onBookmark,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    marathonsList,
    createMarathon,
    closeToester,
    navigateMarathonDetail,
    dispatch,
    selectedId,
    setSelectedId,
  };
}
