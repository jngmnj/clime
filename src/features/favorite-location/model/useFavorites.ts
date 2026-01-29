import { useCallback, useSyncExternalStore } from 'react';

import type { FavoriteLocation } from '@/entities/favorite';
import {
  favoritesStorage,
  getDisplayName,
  isSameCoords,
  validateNickname,
} from '@/entities/favorite';

let listeners: Set<() => void> = new Set();
/** useSyncExternalStore는 동일 데이터일 때 동일 참조를 반환해야 함. 매번 load()하면 새 배열이라 무한 리렌더 발생. */
let cachedSnapshot: FavoriteLocation[] | null = null;

function getSnapshot(): FavoriteLocation[] {
  const next = favoritesStorage.load();
  if (
    cachedSnapshot === null ||
    cachedSnapshot.length !== next.length ||
    next.some(
      (item, i) =>
        cachedSnapshot![i]?.id !== item.id ||
        cachedSnapshot![i]?.nickname !== item.nickname,
    )
  ) {
    cachedSnapshot = next;
  }
  return cachedSnapshot;
}

function notifyListeners(): void {
  // 알림 전에 캐시를 최신 데이터로 갱신해, getSnapshot()이 호출될 때 갱신된 list가 반환되도록 함
  cachedSnapshot = favoritesStorage.load();
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const storageHandler = () => {
    cachedSnapshot = null;
    callback();
  };
  window.addEventListener('storage', storageHandler);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', storageHandler);
  };
}

function saveAndNotify(items: FavoriteLocation[]): void {
  favoritesStorage.save(items);
  notifyListeners();
}

/**
 * 즐겨찾기 목록을 localStorage와 동기화하는 훅.
 * - list: 현재 목록 (최대 6개)
 * - add: 추가 (최대 개수 초과 시 실패)
 * - remove: id로 삭제
 * - updateNickname: id로 별칭 수정 (검증 후 저장)
 * - isFavorite(lat, lon): 해당 좌표가 즐겨찾기에 있는지
 * - getFavoriteByCoords(lat, lon): 해당 좌표의 즐겨찾기 항목
 */
export function useFavorites() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const add = useCallback(
    (lat: number, lon: number, regionName: string | null): boolean => {
      const current = favoritesStorage.load();
      if (current.some((f) => isSameCoords(f.lat, f.lon, lat, lon))) {
        return false; // 이미 있음
      }
      if (current.length >= favoritesStorage.maxCount) {
        return false; // 최대 개수
      }
      const id = crypto.randomUUID();
      const next: FavoriteLocation = {
        id,
        lat,
        lon,
        regionName,
        nickname: null,
      };
      saveAndNotify([...current, next]);
      return true;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    const current = favoritesStorage.load();
    saveAndNotify(current.filter((f) => f.id !== id));
  }, []);

  const updateNickname = useCallback(
    (id: string, rawValue: string): { success: boolean; error?: string } => {
      const { valid, trimmed, error } = validateNickname(rawValue);
      if (!valid) return { success: false, error };
      const current = favoritesStorage.load();
      const index = current.findIndex((f) => f.id === id);
      if (index === -1)
        return { success: false, error: '항목을 찾을 수 없습니다.' };
      const next = [...current];
      next[index] = { ...next[index], nickname: trimmed || null };
      saveAndNotify(next);
      return { success: true };
    },
    [],
  );

  const isFavorite = useCallback(
    (lat: number, lon: number) =>
      list.some((f) => isSameCoords(f.lat, f.lon, lat, lon)),
    [list],
  );

  const getFavoriteByCoords = useCallback(
    (lat: number, lon: number): FavoriteLocation | undefined =>
      list.find((f) => isSameCoords(f.lat, f.lon, lat, lon)),
    [list],
  );

  return {
    list,
    add,
    remove,
    updateNickname,
    isFavorite,
    getFavoriteByCoords,
    getDisplayName,
    maxCount: favoritesStorage.maxCount,
    nicknameMaxLength: favoritesStorage.nicknameMaxLength,
    validateNickname,
  };
}
