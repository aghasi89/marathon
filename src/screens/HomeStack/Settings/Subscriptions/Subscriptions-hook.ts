import {useCallback, useState} from 'react';
import SubscriptionsReducer, {IFollower} from './Subscriptions-reducer';

export default navigation => {
  const {state, dispatchState} = SubscriptionsReducer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const checkIsFollowing = (id: number) => {
    let folow = state.following.find(item => item.id == id);
    if (folow) {
      return true;
    }
    return false;
  };

  const addFollowing = (following: IFollower) => {
    if (!checkIsFollowing(following.id)) {
      dispatchState({
        type: 'SET_FOLOWINGS',
        payload: [...state.following, following],
      });
    } else {
      let array = [...state.following];
      const findIndex = array.findIndex(element => {
        return element.id == following.id;
      });
      array.splice(findIndex, 1);
      dispatchState({type: 'SET_FOLOWINGS', payload: array});
    }
  };

  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    dispatchState,
    leftIconPress,
    isOpen,
    setIsOpen,
    index,
    setIndex,
    checkIsFollowing,
    addFollowing,
  };
};
