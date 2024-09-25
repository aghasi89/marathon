import {useReducer} from 'react';
import { IInviteGroup } from '../../../../../store/reducers/marathons-reducer';
import {IAction, IUser} from '../../../../../types/types';

interface IinitialState {
  submitedClients: Array<IUser>;
  submitedLeads: Array<IUser>;
  submitedGroups: Array<IInviteGroup>;
  submitedGroupMembers: Array<IUser>;
}

export default () => {
  const initialState = {
    submitedClients: [],
    submitedLeads: [],
    submitedGroups: [],
    submitedGroupMembers: [],
  };

  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_ADD_CLIENT':
        return {...state, submitedClients: action.payload};
      case 'SET_ADD_LEAD':
        return {...state, submitedLeads: action.payload};
      case 'SET_ADD_GROUP':
        return {...state, submitedGroups: action.payload};
      case 'SET_ADD_GROUP_MEMBER':
        return {...state, submitedGroupMembers: action.payload};

      default:
        throw new Error();
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);

  return {
    state,
    dispatchState,
  };
};
