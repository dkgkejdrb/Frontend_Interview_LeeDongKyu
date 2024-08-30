// 첫 렌더링 시에 실행되지 않고, 배열 안에 state가 변화할 때만 실행하는 커스텀 훅

import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line
  }, deps);
};

export default useDidMountEffect;