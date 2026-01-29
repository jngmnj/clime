import type { NormalizedDistrict } from './types';

const SEP = '-';

/**
 * 행정구역 원본 문자열 배열을 정규화된 객체 배열로 변환
 */
export function normalizeDistricts(raw: string[]): NormalizedDistrict[] {
  return raw.map((fullName) => {
    const trimmed = fullName.trim();
    const parts = trimmed ? trimmed.split(SEP).map((p) => p.trim()) : [];
    const searchKey = parts.join(SEP).toLowerCase();
    const depth = parts.length;
    return {
      fullName: trimmed,
      searchKey,
      depth,
      parts,
    };
  });
}
