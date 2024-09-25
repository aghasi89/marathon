import {useCallback, useState} from 'react';

export default navigation => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const waterCups = [
    {isFull: true},
    {isFull: false},
    {isFull: false},
    {isFull: false},
  ];
const nutritionPressHandler = useCallback(()=>{
  navigation.navigate('Nutrition')
},[navigation])
const activityPressHandler = useCallback(()=>{
  navigation.navigate('Activity')
},[navigation])
const measurementsPressHandler = useCallback(()=>{
  navigation.navigate('Measurements')
},[navigation])
  return {
    isSelected,
    setIsSelected,
    days,
    dayIndex,
    waterCups,
    isOpen,
    setIsOpen,
    nutritionPressHandler,
    activityPressHandler,
    measurementsPressHandler,
  };
};
