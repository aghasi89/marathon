import {useState, useCallback} from 'react';

export default navigation => {
  const [isExist, setIsExist] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
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
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const bodyParts = [
    {name: 'Neck', measure: '35.0', date: '14 March'},
    {name: 'Bust', measure: '35.0', date: '14 March'},
    {name: 'Abdomen', measure: '35.0', date: '14 March'},
    {name: 'Biceps L', measure: '35.0', date: '10 March'},
    {name: 'Thigh L', measure: '35.0', date: '9 March'},
    {name: 'Calf L', measure: '35.0', date: '9 March'},
    {name: 'Shoulder', measure: '35.0', date: '9 March'},
    {name: 'Waist', measure: '35.0', date: '9 March'},
    {name: 'Hip', measure: '35.0', date: '9 March'},
    {name: 'Biceps R', measure: '35.0', date: '14 March'},
    {name: 'Thigh R', measure: '35.0', date: '14 March'},
    {name: 'Calf R', measure: '35.0', date: '14 March'},
  ];

  const leftPart = bodyParts.filter((item, index) => {
    return index < 6;
  });
  const rightPart = bodyParts.filter((item, index) => {
    return index > 5;
  });

  return {
    leftIconPress,
    isExist,
    days,
    dayIndex,
    index,
    setIndex,
    bodyParts,
    leftPart,
    rightPart,
  };
};
