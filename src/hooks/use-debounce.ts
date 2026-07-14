"use client";

import { useEffect, useState } from "react";

/**
 * 값의 변경을 지정한 시간만큼 지연시켜 반환한다.
 * 검색 입력 등 빈번한 변경을 디바운스할 때 사용한다. (커스텀 훅 예시)
 *
 * @example
 * const debouncedQuery = useDebounce(query, 300);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
