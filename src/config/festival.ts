import type { MessageKey } from "@/features/i18n";

/**
 * 축제소개 페이지의 반복 콘텐츠 레지스트리.
 * 문구는 i18n 키로만 참조하고(다국어), 표시 데이터는 이 파일에서 관리한다.
 */

/** ③ 축제 개요 표 행 */
export interface OverviewRow {
  key: string;
  labelKey: MessageKey;
  valueKey: MessageKey;
}

export const OVERVIEW_ROWS: readonly OverviewRow[] = [
  { key: "period", labelKey: "festival.ovPeriodLabel", valueKey: "festival.ovPeriod" },
  { key: "place", labelKey: "festival.ovPlaceLabel", valueKey: "festival.ovPlace" },
  { key: "hours", labelKey: "festival.ovHoursLabel", valueKey: "festival.ovHours" },
  { key: "fee", labelKey: "festival.ovFeeLabel", valueKey: "festival.ovFee" },
  { key: "host", labelKey: "festival.ovHostLabel", valueKey: "festival.ovHost" },
] as const;

/** ⑤ 즐길 거리 카테고리 카드 */
export interface EnjoyCategory {
  key: string;
  emoji: string;
  titleKey: MessageKey;
  descKey: MessageKey;
  /** 앱 연동 강조 카드 여부 */
  featured?: boolean;
}

export const ENJOY_CATEGORIES: readonly EnjoyCategory[] = [
  { key: "perf", emoji: "🎶", titleKey: "festival.enjoyPerfTitle", descKey: "festival.enjoyPerfDesc" },
  { key: "exp", emoji: "🌿", titleKey: "festival.enjoyExpTitle", descKey: "festival.enjoyExpDesc" },
  { key: "ar", emoji: "📱", titleKey: "festival.enjoyArTitle", descKey: "festival.enjoyArDesc", featured: true },
  { key: "spot", emoji: "🚠", titleKey: "festival.enjoySpotTitle", descKey: "festival.enjoySpotDesc" },
] as const;

/** ⑦ 포토존 & 추천 코스 */
export interface PhotoSpot {
  key: string;
  nameKey: MessageKey;
  descKey: MessageKey;
  image: string;
}

export const PHOTO_SPOTS: readonly PhotoSpot[] = [
  {
    key: "field",
    nameKey: "festival.photo1Name",
    descKey: "festival.photo1Desc",
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&h=600&fit=crop&auto=format",
  },
  {
    key: "overlook",
    nameKey: "festival.photo2Name",
    descKey: "festival.photo2Desc",
    image:
      "https://images.unsplash.com/photo-1445510491599-c391e8046a68?w=800&h=600&fit=crop&auto=format",
  },
  {
    key: "heart",
    nameKey: "festival.photo3Name",
    descKey: "festival.photo3Desc",
    image:
      "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=800&h=600&fit=crop&auto=format",
  },
] as const;
