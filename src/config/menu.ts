import { ROUTES } from "@/constants";
import type { MessageKey } from "@/features/i18n";

/**
 * 메인 메뉴 레지스트리.
 * 메뉴 추가/순서 변경/노출 토글은 이 배열만 수정하면 된다.
 */
export interface MenuItem {
  /** 고유 식별자 (React key, 아이콘 매핑에 사용) */
  key: string;
  /** i18n 메시지 키 (메뉴 라벨) */
  labelKey: MessageKey;
  /** i18n 메시지 키 (메뉴 설명) */
  descKey: MessageKey;
  /** 이동 경로 (ROUTES 참조) */
  path: string;
  /** 노출 여부 */
  enabled: boolean;
}

export const MENU_ITEMS: readonly MenuItem[] = [
  {
    key: "festival",
    labelKey: "menu.festival",
    descKey: "menu.festivalDesc",
    path: ROUTES.festival,
    enabled: true,
  },
  {
    key: "location",
    labelKey: "menu.location",
    descKey: "menu.locationDesc",
    path: ROUTES.location,
    enabled: true,
  },
  {
    key: "venueMap",
    labelKey: "menu.venueMap",
    descKey: "menu.venueMapDesc",
    path: ROUTES.venueMap,
    enabled: true,
  },
  {
    key: "stampTour",
    labelKey: "menu.stampTour",
    descKey: "menu.stampTourDesc",
    path: ROUTES.stampTour,
    enabled: true,
  },
  {
    key: "language",
    labelKey: "menu.language",
    descKey: "menu.languageDesc",
    path: ROUTES.language,
    enabled: true,
  },
] as const;
