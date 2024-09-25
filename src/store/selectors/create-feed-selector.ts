import {ICreateFeed} from '../../types/types';

export const createFeedStateSelector = (state: {
  createFeedReducer: ICreateFeed;
}) => state.createFeedReducer;
