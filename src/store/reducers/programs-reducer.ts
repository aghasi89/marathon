import {ITag} from '../../types/types';
import {ProgramTypes} from '../costants';
import {IActivity} from './activity-reducer';
import {IDayPlan} from './dayPlan-reducer';
import {IExecise} from './execises-reducer';
import {IFood} from './food-reducer';
import {IMeal} from './meal-reducer';
import {IRecipe} from './recipe-reducer';
import {IWorkout} from './workout-reducer';

export interface IProgram {
  id: number;
  title: string;
  imageUrl: string;
  count: string;
  amount?: string;
  time: string;
  saleType?: string;
  type: string;
}
export interface IFilterPrograme {
  id: number;
  title: string;
}
export interface IList {
  id: number;
  title: string;
}
export interface IWeekDayList {
  id: number;
  type: ToDoTypes;
  isActive?: boolean;
  title: string;
}
export interface IProgramWorkouts {
  exercises: Array<IExecise>;
  workouts: Array<IWorkout>;
}
export interface IWorkouts {
  activities: Array<IActivity>;
  workouts: Array<IProgramWorkouts>;
}
export interface IEdit {
  text: string;
}

export interface IFile {
  fileName: string;
  fileType: string;
}

export interface INutrition {
  recipes: Array<IRecipe>;
  foods: Array<IFood>;
  meals: Array<IMeal>;
  dayPlans: Array<IDayPlan>;
}

export interface IProgramDay {
  id?: number;
  nutritions: Array<INutrition>;
  workouts: IWorkouts;
  edits: Array<IEdit>;
  files: Array<IFile>;
  rest: boolean;
}

export interface IProgramDetail {
  imageUrl: string;
  title: string;
  description: string;
  list: Array<IList>;
}
interface IInitialState {
  programsList: Array<IProgram>;
  filterList: Array<IFilterPrograme>;
  programSelectedFilterList: Array<IFilterPrograme>;
  tagList: Array<ITag>;
  selectedTagList: Array<ITag>;
  programDetail: IProgramDetail;
  programDays: Array<IProgramDay>;
}
enum ToDoTypes {
  eat,
  play,
  edit,
  file,
  rest,
}
export const initialState: IInitialState = {
  programsList: [
    {
      id: 0,
      title: '1 Program name ',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '30 day',
      time: 'Lose weight',
      type: 'Gain muscle',
    },
    {
      id: 1,
      title: '2 Program name',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '30 day',
      time: 'Lose weight',
      type: 'Gain muscle',
    },
    {
      id: 2,
      title: '3 Program name',
      imageUrl:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      count: '30 day',
      time: 'Lose weight',
      type: 'Gain muscle',
    },
  ],
  filterList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  programSelectedFilterList: [],
  tagList: [
    {id: 0, title: 'Abs'},
    {id: 1, title: 'Quadriceps'},
    {id: 2, title: 'Chaest'},
    {id: 3, title: 'Back'},
    {id: 4, title: 'Calves'},
    {id: 5, title: 'Forearms'},
    {id: 6, title: 'Triceps'},
    {id: 7, title: 'Shoulders'},
  ],
  selectedTagList: [],
  programDetail: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'Stretching and Pilates',

    list: [
      {title: 'Home Workout', id: 0},
      {title: 'Low-carb Diet', id: 1},
      {title: 'Home Workout', id: 2},
    ],
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised.',
  },
  programDays: [
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [
        {
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
        },
      ],
      files: [
        {fileName: 'File Name', fileType: 'PDF'},
        {fileName: 'File Name', fileType: 'JPG'},
      ],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
    {
      nutritions: [],
      workouts: {activities: [], workouts: []},
      edits: [],
      files: [],
      rest: false,
    },
  ],
};

const programeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProgramTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        programSelectedFilterList: action.payload,
      };
    case ProgramTypes.SET_SELECTED_TAGS:
      return {
        ...state,
        selectedTagList: action.payload,
      };
    case ProgramTypes.SET_DAY:
      return {
        ...state,
        programDays: action.payload,
      };

    default:
      return state;
  }
};
export default programeReducer;
