import type { MessageKey } from "@/features/i18n";

/**
 * AR 컨텐츠 종류 레지스트리.
 * 8thWall 연동 시 type 별로 서로 다른 AR 경험(씬/프로젝트)을 로드한다.
 * 새 컨텐츠 종류는 이 배열에 추가한다.
 */
export type ArContentType = "map" | "game" | "photo";

export interface ArContentDef {
  type: ArContentType;
  emoji: string;
  /** i18n 라벨 키 */
  labelKey: MessageKey;
}

export const AR_CONTENTS: readonly ArContentDef[] = [
  { type: "map", emoji: "🗺️", labelKey: "ar.typeMap" },
  { type: "game", emoji: "🎮", labelKey: "ar.typeGame" },
  { type: "photo", emoji: "📸", labelKey: "ar.typePhoto" },
] as const;
