import {useReducer} from 'react';
import {IAction} from '../../../../types/types';

export interface IFollower {
  id: number;
  name: string;
  imageUrl: string;
}

interface IinitialState {
  followers: Array<IFollower>;
  following: Array<IFollower>;
}

export default () => {
  const initialState = {
    followers: [
      {
        id: 0,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 1,
        name: 'Keiran',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 2,
        name: 'Theo Albert',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 3,
        name: 'Sama Denis',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 4,
        name: 'Anabel',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 5,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 6,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 7,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    ],
    following: [
      {
        id: 3,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 6,
        name: 'Keiran',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 10,
        name: 'Theo Albert',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 11,
        name: 'Sama Denis',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 12,
        name: 'Anabel',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 13,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 14,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 15,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
      {
        id: 16,
        name: 'Barbara Smith',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      },
    ],
  };
  function reducer(state: IinitialState, action: IAction) {
    switch (action.type) {
      case 'SET_FOLOWINGS':
        return {...state, following: action.payload};
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
