export interface IActivity {
  id: number;
  title: string;
  imageUrl: string;
}

export interface IActivityDetail {
  imageUrl: string;
  title: string;
  time: string;
  distance: string;
}
interface IInitialState {
  activityList: Array<IActivity>;
  activityDetail: IActivityDetail;
}
export const initialState: IInitialState = {
  activityList: [
    {
      id: 0,
      title: 'Running',
      imageUrl:
        'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png',
    },
    {
      id: 1,
      title: 'Biking',
      imageUrl:
        'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png',
    },
    {
      id: 2,
      title: 'Basketball',
      imageUrl:
        'https://www.pngfind.com/pngs/m/238-2382437_basketball-silhouette-vector-at-getdrawings-basketball-player-icon.png',
    },
    {
      id: 3,
      title: 'Yoga',
      imageUrl:
        'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png',
    },
    {
      id: 4,
      title: 'Dancing',
      imageUrl:
        'https://www.pngfind.com/pngs/m/238-2382437_basketball-silhouette-vector-at-getdrawings-basketball-player-icon.png',
    },
    {
      id: 5,
      title: 'Tennis',
      imageUrl:
        'https://www.pikpng.com/pngl/m/189-1896274_basketball-icon-png-icon-png-basketball-football-transparent.png',
    },
    {
      id: 6,
      title: 'Surfing',
      imageUrl:
        'https://www.pngfind.com/pngs/m/238-2382437_basketball-silhouette-vector-at-getdrawings-basketball-player-icon.png',
    },
  ],

  activityDetail: {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    title: 'Running',
    time: '02:15',
    distance: '0',
  },
};
const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default activityReducer;
