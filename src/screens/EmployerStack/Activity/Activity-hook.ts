import {useCallback} from 'react';
export default navigation => {
  const days = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
      isToDoExist: {
        toDo1: {
          exist: true,
        },
        toDo2: {
          exist: true,
        },
        toDo3: {
          ended: true,
        },
      },
    },
    {
      isToDoExist: {
        toDo1: {
          ended: true,
        },
        toDo2: {
          ended: true,
        },
        toDo3: {
          ended: true,
        },
      },
    },
    {},
    {
      isToDoExist: {
        toDo1: {
          ended: true,
        },
        toDo2: {
          ended: true,
        },
      },
    },
    {},
  ];
  const dayIndex = 13;
  const onChartIconPress= useCallback(()=>{
    navigation.navigate('ActivityCharts')
  },[navigation])
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return {
    leftIconPress,
    days,
    dayIndex,
    onChartIconPress
  };
};
