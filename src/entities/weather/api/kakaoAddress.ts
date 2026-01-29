const KAKAO_ADDRESS_BASE =
  'https://dapi.kakao.com/v2/local/search/address.json';

export interface KakaoAddressResponse {
  meta: { total_count: number; pageable_count: number; is_end: boolean };
  documents: Array<{ address_name: string; x: string; y: string }>;
}

/**
 * 행정구역(주소) 문자열로 좌표 조회 (Kakao Local API - 주소 검색)
 * GET https://dapi.kakao.com/v2/local/search/address.json?query=...
 * - Authorization: KakaoAK ${REST_API_KEY}
 */
export async function fetchCoordsByKakaoAddress(
  addressQuery: string,
): Promise<{ lat: number; lon: number; address_name: string }[]> {
  const query = addressQuery.trim();
  if (!query) return [];

  const url = new URL(KAKAO_ADDRESS_BASE);
  url.searchParams.set('query', query);

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
    throw new Error('주소 검색에 실패했습니다.');
  }

  const data = (await response.json()) as KakaoAddressResponse;
  const documents = data?.documents ?? [];

  return documents.map((doc) => ({
    lat: Number.parseFloat(doc.y),
    lon: Number.parseFloat(doc.x),
    address_name: doc.address_name ?? '',
  }));
}
