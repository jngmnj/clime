import type { NormalizedDistrict } from './types';

const DEFAULT_MAX_RESULTS = 20;

/**
 * 검색어로 행정구역 목록 필터링
 * - searchKey에 검색어가 포함된 항목 반환
 * - 공백/대소문자 무시
 */
export function filterDistrictsByQuery(
  districts: NormalizedDistrict[],
  query: string,
  maxResults: number = DEFAULT_MAX_RESULTS,
): NormalizedDistrict[] {
  const q = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!q) return [];

  const matched: NormalizedDistrict[] = [];
  for (const d of districts) {
    const key = d.searchKey.replace(/\s+/g, '');
    if (key.includes(q)) {
      matched.push(d);
      if (matched.length >= maxResults) break;
    }
  }
  return matched;
}
