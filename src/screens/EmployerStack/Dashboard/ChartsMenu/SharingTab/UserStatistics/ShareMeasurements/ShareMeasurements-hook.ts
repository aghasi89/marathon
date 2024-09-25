import {useCallback, useState} from 'react';

export default () => {
  const [indexTab, setIndexTab] = useState<number>(0);
  const data = [72.5, 71.0, 72.0, 70.0, 69.5, 69.0, 69.5, 70];
  const dates = [
    '14 March',
    '14 March',
    '14 March',
    '10 March',
    '9 March',
    '9 March',
    '9 March',
    '9 March',
  ];
  const dailyMeasure = [
    {
      date: '18 March',
      bodyParts: [
        {
          name: 'Neck',
          measure: '35.0',
        },
        {
          name: 'Abdomen',
          measure: '35.0',
        },
        {
          name: 'Hip',
          measure: '35.0',
        },
        {
          name: 'Waist',
          measure: '35.0',
        },
      ],
    },
    {
      date: '17 March',
      bodyParts: [
        {
          name: 'Neck',
          measure: '35.0',
        },
        {
          name: 'Abdomen',
          measure: '35.0',
        },
        {
          name: 'Hip',
          measure: '35.0',
        },
        {
          name: 'Waist',
          measure: '35.0',
        },
      ],
    },
  ];

  return {
    indexTab,
    setIndexTab,
    data,
    dates,
    dailyMeasure,
  };
};
