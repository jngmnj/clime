/** 행정구역 정규화 타입 (korea_districts.json 파싱 결과) */
export interface NormalizedDistrict {
  /** 원본 전체 경로 (예: "서울특별시-종로구-청운동") */
  fullName: string;
  /** 검색/표시용 경로 (공백 제거, 통일) */
  searchKey: string;
  /** 경로 깊이: 1=시도, 2=시군구, 3=동/면, 4=리 등 */
  depth: number;
  /** 경로를 "-"로 나눈 부분 (예: ["서울특별시", "종로구", "청운동"]) */
  parts: string[];
}
