import type { ComponentType } from "react";
import {
  Camera,
  DoorOpen,
  Flower2,
  Telescope,
  Waves,
  Wind,
  type LucideProps,
} from "lucide-react";
import type { MessageKey } from "@/features/i18n";
import type { ArContentKey } from "@/constants";

/**
 * 스탬프 투어 스팟 레지스트리.
 * 6개 스팟이 길(경로)처럼 위→아래로 이어진다. 스팟 추가/순서 변경은 이 배열만 수정한다.
 * 아이콘은 메인메뉴와 동일하게 lucide 라인 아이콘을 사용한다.
 */
export interface StampSpot {
  /** 고유 식별자 (React key, 이벤트 분기, 퀴즈 경로) */
  key: string;
  /** 표시 순번 (1부터) */
  no: number;
  /** 스팟 아이콘 (lucide 컴포넌트) */
  icon: ComponentType<LucideProps>;
  /** i18n 라벨 키 */
  labelKey: MessageKey;
  /** 클릭 시 이동할 Next 라우트 경로(퀴즈 등). 미지정이면 이벤트 없음. */
  href?: string;
  /** 클릭 시 이동할 8thWall AR 정적 컨텐츠. href 보다 우선하며 전체 페이지 이동한다. */
  arContent?: ArContentKey;
}

export const STAMP_SPOTS: readonly StampSpot[] = [
  // 입구 · 라벤더 · 청옥호 — 모두 이미지타겟 AR(/ar/imgtarget)로 진입.
  // 비추는 타겟이미지에 따라 목적지가 갈린다:
  //   target1 → 영상 후 스탬프투어 / target2 → 라벤더 퀴즈 / target3 → 청옥호 퀴즈
  { key: "gate", no: 1, icon: DoorOpen, labelKey: "stamp.spotGate", arContent: "imgtarget" },
  { key: "lavender", no: 2, icon: Flower2, labelKey: "stamp.spotLavender", arContent: "imgtarget" },
  { key: "cheongok", no: 3, icon: Waves, labelKey: "stamp.spotLake", arContent: "imgtarget" },
  { key: "overlook", no: 4, icon: Telescope, labelKey: "stamp.spotOverlook", arContent: "imgtarget" },
  { key: "glider", no: 5, icon: Wind, labelKey: "stamp.spotGlider", arContent: "imgtarget" },
  // 포토존 — 이미지타겟 경유 없이 AR 포토(/ar/arPhoto)로 바로 진입
  { key: "photo", no: 6, icon: Camera, labelKey: "stamp.spotPhoto", arContent: "arPhoto" },
] as const;
