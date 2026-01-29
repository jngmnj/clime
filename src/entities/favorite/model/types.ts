/**
 * 즐겨찾기 한 개 항목.
 * - id: 고유 식별 (추가 시 생성, React key 및 수정 시 대상 지정)
 * - lat, lon: 좌표 (상세 페이지 링크 및 중복 판별)
 * - regionName: 추가 당시 Kakao 행정구역명 (표시 기본값)
 * - nickname: 사용자 지정 별칭 (null이면 regionName 사용)
 */
export interface FavoriteLocation {
  id: string;
  lat: number;
  lon: number;
  regionName: string | null;
  nickname: string | null;
}

/** localStorage 키 */
export const FAVORITES_STORAGE_KEY = 'clime-favorites';

/** 즐겨찾기 최대 개수 */
export const FAVORITES_MAX_COUNT = 6;

/** 별칭 최대 길이 */
export const NICKNAME_MAX_LENGTH = 20;
