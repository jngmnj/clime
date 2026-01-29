import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from '@/entities/weather/model/types';

/**
 * 상세 페이지에서 쓰는 "위치" 정보.
 * - lat, lon: 좌표 (쿼리/지도 등에 사용)
 * - regionName: Kakao coord2regioncode로 얻은 행정구역명 (표시용)
 */
export interface DetailLocation {
  lat: number;
  lon: number;
  regionName: string | null;
}

/**
 * 상세 페이지 한 번에 넘기기 위한 통합 데이터.
 *
 * 왜 이렇게 정리하는가?
 * - 상세 페이지는 (위치, 현재날씨, 예보) 세 가지를 한 묶음으로 쓰는데,
 *   훅/API가 따로 있어서 컴포넌트마다 useCurrentWeather, useForecast, useRegionName 을
 *   반복 호출하고 있었다.
 * - 한 곳에서만 데이터를 모아두고, 타입 하나로 "상세에 필요한 전부"를 정의하면
 *   1) 데이터 계약이 명확해지고 (이 페이지는 DetailPageData 만 받으면 됨)
 *   2) 자식은 props 로만 받아서 표시만 하면 되고 (중복 요청/훅 제거)
 *   3) 테스트·스토리북에서 한 객체만 넣어주면 되고
 *   4) 나중에 캐시/리페치 정책을 바꿀 때도 한 훅만 수정하면 된다.
 *
 * 어떻게 쓰는 게 좋은지
 * - 상세 페이지 최상위(DetailContent)에서만 useDetailPageData(lat, lon) 로
 *   { location, weather, forecast } 를 받고, 섹션별로 location / weather / forecast
 *   만 잘라서 넘긴다.
 * - Hero, Detail, Chart, NextDays 등은 "데이터를 가져오는 훅"을 쓰지 않고,
 *   부모가 준 location / weather / forecast (또는 그 일부) 만 받아서 렌더링한다.
 */
export interface DetailPageData {
  location: DetailLocation;
  weather: CurrentWeatherResponse;
  forecast: ForecastResponse;
}
