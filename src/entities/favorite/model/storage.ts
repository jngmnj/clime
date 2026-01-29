import type { FavoriteLocation } from './types';
import {
  FAVORITES_MAX_COUNT,
  FAVORITES_STORAGE_KEY,
  NICKNAME_MAX_LENGTH,
} from './types';

function loadFromStorage(): FavoriteLocation[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidFavoriteItem);
  } catch {
    return [];
  }
}

function isValidFavoriteItem(item: unknown): item is FavoriteLocation {
  if (!item || typeof item !== 'object') return false;
  const o = item as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.lat === 'number' &&
    typeof o.lon === 'number' &&
    (o.regionName === null || typeof o.regionName === 'string') &&
    (o.nickname === null || typeof o.nickname === 'string')
  );
}

function saveToStorage(items: FavoriteLocation[]): void {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded 등 무시
  }
}

/** 표시 이름: nickname이 있으면 nickname, 없으면 regionName, 둘 다 없으면 '이름 없음' */
export function getDisplayName(fav: FavoriteLocation): string {
  const name = (fav.nickname ?? fav.regionName ?? '').trim();
  return name || '이름 없음';
}

/** 별칭 입력값 검증: trim 후 길이 0~NICKNAME_MAX_LENGTH */
export function validateNickname(value: string): {
  valid: boolean;
  trimmed: string;
  error?: string;
} {
  const trimmed = value.trim();
  if (trimmed.length > NICKNAME_MAX_LENGTH) {
    return {
      valid: false,
      trimmed,
      error: `별칭은 ${NICKNAME_MAX_LENGTH}자 이내로 입력해 주세요.`,
    };
  }
  return { valid: true, trimmed };
}

/** 좌표가 같은지 판별 (소수 4자리까지 비교) */
const COORD_EPS = 1e-4;
export function isSameCoords(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): boolean {
  return Math.abs(lat1 - lat2) < COORD_EPS && Math.abs(lon1 - lon2) < COORD_EPS;
}

export const favoritesStorage = {
  load: loadFromStorage,
  save: saveToStorage,
  maxCount: FAVORITES_MAX_COUNT,
  nicknameMaxLength: NICKNAME_MAX_LENGTH,
};
