import {ICreateFeed} from '../../types/types';

export const createExerciseStateSelector = (state: {
    createExerciseReducer: ICreateFeed;
}) => state.createExerciseReducer;
