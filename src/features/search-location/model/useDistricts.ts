import { useMemo } from 'react';

import districtsJson from '@/assets/korea_districts.json';
import {
  filterDistrictsByQuery,
  normalizeDistricts,
  type NormalizedDistrict,
} from '@/entities/location';

const rawDistricts = districtsJson as string[];
const normalized = normalizeDistricts(rawDistricts);

/**
 * 검색어로 행정구역 필터링 (메모이제이션)
 * - 무한 스크롤을 위해 전체 결과를 반환하고, 화면에서는 일부만 잘라서 사용
 */
export function useFilteredDistricts(query: string): NormalizedDistrict[] {
  return useMemo(() => {
    // maxResults를 생략해서 모든 매칭 결과 반환
    return filterDistrictsByQuery(normalized, query, Number.POSITIVE_INFINITY);
  }, [query]);
}
