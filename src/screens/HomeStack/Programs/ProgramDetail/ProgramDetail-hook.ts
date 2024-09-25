import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {programDetailSelector} from '../../../../store/selectors/programs-selector';

export default () => {
  const programDetail = useSelector(programDetailSelector);
  const [sheetIndex, setSheetIndex] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState<boolean>(false);
  const route = useRoute<any>();

  return {
    programDetail,
    sheetIndex,
    setSheetIndex,
    index,
    setIndex,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
  };
};
