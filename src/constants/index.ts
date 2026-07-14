/**
 * 앱 전역 상수.
 * 매직 넘버/문자열을 한곳에서 관리한다.
 */

export const APP_NAME = "sampleAR";

/** 라우트 경로 상수 — 하드코딩된 문자열 대신 사용한다. */
export const ROUTES = {
  home: "/",
  intro: "/intro",
  main: "/main",
  festival: "/festival",
  location: "/location",
  stampTour: "/stamp-tour",
  language: "/language",
  venueMap: "/venue-map",
  /** 8thWall 연동 AR 컨텐츠 페이지 (지도/게임/포토 등). 아직 메뉴에 노출하지 않는다. */
  arContents: "/ar-contents",
} as const;

/** GitHub Pages 프로젝트 페이지 서브경로 (루트면 ""). 빌드 시 env 로 주입. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * 8thWall AR 빌드는 public/ar/ 에 정적 배치되고, 경로 `/ar/<content>/` 로 진입한다.
 * public/ar/<content>/index.html 이 <base href> 로 에셋을 /ar/ 에서 로드하며,
 * 빌드의 content.ts 가 경로에서 content 를 읽어 분기한다. (정적 호스팅, rewrite 불필요)
 * AR 은 Next 라우트가 아닌 정적 하위 앱이므로 전체 페이지 이동(window.location)으로 진입한다.
 */
export const AR_CONTENT_KEYS = ["map", "imgtarget", "arPhoto"] as const;
export type ArContentKey = (typeof AR_CONTENT_KEYS)[number];

/**
 * AR 컨텐츠 진입 URL(정적 파일). 예: arHref("map") → "<basePath>/ar/map/index.html"
 * 디렉터리 인덱스(/ar/map/)는 dev 서버가 자동 서빙하지 않으므로 index.html 을 명시한다.
 * (content.ts 는 경로의 'map' 세그먼트를 그대로 읽어 분기)
 */
export function arHref(content: ArContentKey) {
  return `${BASE_PATH}/ar/${content}/index.html`;
}

/** 스탬프 스팟 퀴즈 경로 (스팟 key 기반). 예: quizPath("cheongok") → "/quiz/cheongok" */
export function quizPath(spot: string) {
  return `/quiz/${spot}`;
}

/** 페이지네이션 기본값 */
export const DEFAULT_PAGE_SIZE = 20;
