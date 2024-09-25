import {useCallback} from 'react';
import {INote} from '../../../types/types';

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
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const notes: Array<INote> = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    },
  ];

  return {
    days,
    dayIndex,
    leftIconPress,
    notes,
  };
};
