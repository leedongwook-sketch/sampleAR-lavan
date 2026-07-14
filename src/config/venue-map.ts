import type { MessageKey } from "@/features/i18n";

/**
 * 행사장지도 데이터 — 2026 무릉별유천지 라벤더 축제 배치도 기반.
 * 지도 이미지(public/img/venue/venue-map.png)의 번호 마커와 목록 번호가 대응한다.
 * 시설명은 콘텐츠 데이터라 한국어로 보관하고, 카테고리/섹션 라벨은 i18n 을 사용한다.
 */

export type VenueCategory = "info" | "activity" | "attraction";

export interface VenueFacility {
  /** 지도 마커 번호 */
  no: number;
  /** 시설명 */
  name: string;
  /** 부가 설명 */
  desc?: string;
  /** 카테고리 */
  category: VenueCategory;
}

/** 카테고리 표시 정보 (라벨 i18n 키 + 색상) */
export const VENUE_CATEGORIES: Record<
  VenueCategory,
  { labelKey: MessageKey; color: string }
> = {
  info: { labelKey: "venueMap.catInfo", color: "#38bdf8" },
  activity: { labelKey: "venueMap.catActivity", color: "#fb923c" },
  attraction: { labelKey: "venueMap.catAttraction", color: "#c084fc" },
};

export const VENUE_FACILITIES: readonly VenueFacility[] = [
  // 안내·휴게시설
  { no: 1, name: "방문자센터", desc: "안내데스크·매점·물품보관함", category: "info" },
  { no: 2, name: "쇄석장", desc: "복합문화공간·전망카페·매표소", category: "info" },
  { no: 3, name: "별마루쉼터", desc: "먹거리존·휴게공간", category: "info" },
  // 체험시설
  { no: 4, name: "짚라인코스터", category: "activity" },
  { no: 5, name: "플라이코스터 집라인", category: "activity" },
  { no: 6, name: "오프로드 루지", category: "activity" },
  { no: 7, name: "스카이글라이더", category: "activity" },
  { no: 8, name: "수상레저", desc: "전동보트·수상레저 쉼터", category: "activity" },
  { no: 9, name: "수상레저", category: "activity" },
  { no: 10, name: "꿈오름 놀이터", desc: "어린이 놀이시설", category: "activity" },
  { no: 19, name: "구름오름", category: "activity" },
  // 관람시설·전망
  { no: 13, name: "쇄석장광장", desc: "행사부스", category: "attraction" },
  { no: 14, name: "채석장비 전시", category: "attraction" },
  { no: 15, name: "어린왕자 벽화", category: "attraction" },
  { no: 16, name: "하늘보라정원", desc: "라벤더정원", category: "attraction" },
  { no: 17, name: "바람숨돌", desc: "행사부스", category: "attraction" },
  { no: 18, name: "미로정원", desc: "행사부스", category: "attraction" },
  { no: 20, name: "무릉별솔", desc: "행사부스", category: "attraction" },
  { no: 21, name: "무릉정원", desc: "휴식 공간", category: "attraction" },
  { no: 22, name: "호수보라정원", desc: "라벤더정원", category: "attraction" },
  { no: 23, name: "별담원", category: "attraction" },
  { no: 6.1, name: "루지전망대", category: "attraction" },
  { no: 24, name: "두미르전망대", category: "attraction" },
] as const;

/** 추천 코스 (마커 번호 순서) */
export interface VenueCourse {
  /** 코스명 */
  name: string;
  /** 대상/부가 설명 */
  tag?: string;
  /** 방문 순서(마커 번호) */
  route: readonly number[];
}

export const VENUE_COURSES: readonly VenueCourse[] = [
  { name: "별유천지 꽃길 코스", route: [16, 17, 18, 19, 21, 22, 23] },
  { name: "별유천지 한눈에 코스", route: [6, 23, 22, 21, 20, 8, 16, 13] },
  { name: "몽글몽글 꿈오름 코스", tag: "어린이 대상", route: [16, 19, 10, 11, 12] },
] as const;
