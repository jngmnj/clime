const KAKAO_COORD2REGION_BASE =
  'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json';

export interface KakaoCoord2RegionDocument {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name?: string;
  code: string;
  x: number;
  y: number;
}

export interface KakaoCoord2RegionResponse {
  meta: { total_count: number };
  documents: KakaoCoord2RegionDocument[];
}

/**
 * 좌표로 행정구역명 조회 (Kakao Local API - 좌표→행정구역)
 * GET https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x={lon}&y={lat}
 */
export async function fetchRegionByCoords(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  const url = new URL(KAKAO_COORD2REGION_BASE);
  url.searchParams.set('x', String(longitude));
  url.searchParams.set('y', String(latitude));

  const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY ?? '';
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Kakao API 키가 유효하지 않습니다.');
    }
    return null;
  }

  const data = (await response.json()) as KakaoCoord2RegionResponse;
  const documents = data?.documents ?? [];
  const first = documents[0];
  return first?.address_name ?? null;
}
