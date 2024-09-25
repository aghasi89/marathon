import {useCallback, useRef} from 'react';

export default () => {
  const scrollViewRef = useRef<any>();
  const scrollToButton = useCallback(
    (index: number) => {
      if (scrollViewRef.current) {
        if (index === 3) {
          scrollViewRef.current.scrollToEnd({animated: true});
        } else {
          scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
        }
      }
    },
    [scrollViewRef],
  );
  return {scrollViewRef, scrollToButton};
};
