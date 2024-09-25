import {useState, useCallback} from 'react';
import {IFile} from '../../../types/types';

export default navigation => {
  const [isOpenEditSheet, setIsOpenEditSheet] = useState<boolean>(false);
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

  const files: Array<IFile> = [
    {fileName: 'File Name', fileType: 'PDF', image: ''},
    {fileName: 'File Name', fileType: 'Jpg', image: ''},
    {fileName: 'File Name', fileType: 'Jpg', image: ''},
  ];

  return {
    leftIconPress,
    days,
    dayIndex,
    isOpenEditSheet,
    setIsOpenEditSheet,
    files,
  };
};
