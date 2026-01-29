# Clime - 날씨

현재 위치 기반 날씨와 상세 예보를 한눈에 보는 웹 앱입니다.

## 프로젝트 실행 방법

### 요구 사항

- Node.js 18+
- npm (또는 pnpm / yarn)

### 실행 절차

```bash
# 1. 저장소 클론 후 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 VITE_OWM_API_KEY, VITE_KAKAO_REST_API_KEY 에 API 키 입력

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 로 접속합니다.

### 환경 변수

| 변수                      | 설명                                           |
| ------------------------- | ---------------------------------------------- |
| `VITE_OWM_API_KEY`        | OpenWeatherMap API 키 (현재 날씨·5일 예보)     |
| `VITE_KAKAO_REST_API_KEY` | Kakao REST API 키 (주소 검색, 좌표→행정구역명) |

- [OpenWeatherMap API](https://openweathermap.org/api) 에서 키 발급
- [Kakao 개발자 콘솔](https://developers.kakao.com/) 에서 REST API 키 확인

## 구현한 기능

### 홈

- **현재 위치 날씨**: Geolocation API로 좌표 획득 → OpenWeatherMap 현재 날씨 표시. 권한 거부·타임아웃 시 서울 좌표로 폴백, 토스트 안내.
- **날씨 카드**: 현재 기온, 당일 최저/최고, 날씨 설명. 카드 클릭 시 해당 좌표의 상세 페이지로 이동.
- **즐겨찾기**: localStorage 기반. 즐겨찾기 목록을 캐러셀로 표시, 별명 수정·삭제 가능. 상세 페이지 Hero 영역에서 즐겨찾기 추가/해제.
- **현재 날짜·시간**: 로컬 기준 표시.

### 상세 페이지 (`/detail?lat=&lon=`)

- **Hero**: Kakao 좌표→행정구역 API로 지역명 표시, 현재 기온·날씨 설명·체감/최고/최저, 날씨 아이콘. 즐겨찾기 버튼.
- **상세 날씨**: 바람(풍속·풍향), 습도, 가시거리, 일출·일몰, 강수 등 카드 형태.
- **오늘 시간대별 기온**: 당일 3시간 단위 예보를 Recharts 라인 차트로 표시.
- **주간 예보**: 내일부터 4일, 일별 오전/오후 아이콘·최저/최고 기온.
- **로딩**: Suspense + ForecastSkeleton. 현재 날씨·예보는 TanStack Query로 캐시·폴백(keepPreviousData) 처리.

### 지역 검색

- **검색 UI**: 헤더 검색 버튼 → 모달 형태. 행정구역(korea_districts.json) 기반 필터 검색, 검색어 하이라이트.
- **선택 시**: Kakao 주소 검색 API로 해당 주소 좌표 조회 → `/detail?lat=&lon=` 으로 이동. 실패 시 토스트 안내.

### 공통·UX

- **다크 모드**: next-themes, 시스템/라이트/다크 전환. 헤더 토글, 레이아웃·SearchLocation 등 시맨틱 색상으로 대응.
- **에러 처리**: ErrorBoundary + ErrorFallback(재시도 버튼). API 404·에러 시 토스트 및 fallback 메시지.
- **반응형**: 모바일·데스크톱 레이아웃 및 검색 모달 높이 조정.

## 기술적 의사결정 및 이유

| 의사결정                                                    | 이유                                                                                                                                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Feature-Sliced Design(FSD) 유사 구조**                    | `entities`(날씨·위치·즐겨찾기), `features`(표시·검색·즐겨찾기 UI), `shared`(훅·UI·유틸) 로 역할을 나누어 기능 단위로 확장·유지보수하기 위함.                                                                                    |
| **TanStack Query**                                          | 날씨·예보·지역명 등 서버/API 데이터의 캐시·로딩·에러·리페치를 일관되게 다루고, keepPreviousData로 좌표 변경 시 이전 데이터를 fallback으로 보여주기 위함.                                                                        |
| **상세 데이터 `{ location, weather, forecast }` 단일 구조** | 상세 페이지에서 useCurrentWeather·useForecast·useRegionName 을 여러 컴포넌트에서 반복 호출하지 않고, 한 훅(useDetailPageData)으로 모아 타입(DetailPageData)으로 계약을 명확히 하고, 자식은 props만 받아 렌더링하도록 하기 위함. |
| **OpenWeatherMap + Kakao Local API**                        | 날씨·예보는 OWM, 주소 검색·좌표→행정구역명은 Kakao를 사용해 국내 주소·행정구역 표기에 맞추기 위함.                                                                                                                              |
| **next-themes**                                             | 라이트/다크/시스템 전환을 안정적으로 처리하고, CSS 변수(.dark)와 연동하기 위함.                                                                                                                                                 |
| **즐겨찾기 localStorage**                                   | 별도 백엔드 없이 클라이언트에서 바로 저장·목록 표시가 가능하고, 동일 기기에서만 유지되면 충분한 요구사항에 맞추기 위함.                                                                                                         |
| **Recharts·Embla Carousel**                                 | 시간대별 기온은 라인 차트, 즐겨찾기 목록은 터치·스와이프 친화적인 캐러셀로 UX를 맞추기 위함.                                                                                                                                    |
| **Vite**                                                    | 빠른 HMR·ESM 기반 빌드, `import.meta.env` 로 클라이언트용 환경 변수만 노출하기 위함.                                                                                                                                            |

## 사용한 기술 스택

### 코어

- **React 19** — UI 라이브러리
- **TypeScript** — 정적 타입
- **Vite 7** — 빌드·개발 서버
- **React Router 7** — 라우팅

### 데이터·상태

- **TanStack Query** — 서버/API 상태(날씨·예보·지역명) 캐시·로딩·에러
- **localStorage** — 즐겨찾기 저장 (entities/favorite)

### 스타일·테마

- **Tailwind CSS 4** — 유틸리티 CSS, `@theme`·CSS 변수
- **next-themes** — 다크 모드 전환
- **Radix UI** (Dialog, Slot) — 접근성 있는 다이얼로그·컴포지션
- **class-variance-authority (cva)** · **tailwind-merge** · **clsx** — 컴포넌트 variant·className 조합

### UI·차트

- **Recharts** — 오늘 시간대별 기온 라인 차트
- **embla-carousel-react** — 즐겨찾기 목록 캐러셀
- **lucide-react** — 아이콘
- **sonner** — 토스트 알림

### 외부 API

- **OpenWeatherMap** — 현재 날씨, 5일/3시간 예보
- **Kakao Local API** — 주소 검색(kakaoAddress), 좌표→행정구역(kakaoCoord2Region)

### 개발 도구

- **ESLint** · **Prettier** — 린트·포맷
- **TypeScript** — strict 모드
- **TanStack Query Devtools** — 개발 시 쿼리 상태 확인
