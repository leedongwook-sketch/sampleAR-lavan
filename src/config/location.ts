import type { MessageKey } from "@/features/i18n";

/**
 * 위치(location) 페이지 데이터.
 * 주소·전화 등 고유 정보는 데이터로 보관하고, 라벨/요금 표기는 i18n 키로 참조한다.
 *
 * 지도 좌표(lat/lng)는 이 파일에서 수동으로 관리한다.
 * 정확한 값은 카카오맵/지도에서 해당 위치를 찍어 확인 후 아래 숫자만 교체하면 된다.
 */

/** 행사장소 안내 */
export const VENUE = {
  /** 장소 (주소/구역) */
  place: "강원특별자치도 동해시 삼화로 380",
  /** 문의 전화 */
  phone: "033-532-9550",
  /** 지도 기본 중심 좌표 */
  lat: 37.4687540891893,
  lng: 129.033648171156,
} as const;

export type ParkingFee = "free" | "paid";

export interface ParkingLot {
  /** 표시 순번 */
  no: number;
  /** 주차장 명칭 */
  name: string;
  /** 위치/주소 설명 (표시용) */
  address: string;
  /** 요금 구분 */
  fee: ParkingFee;
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
  /** 추가 안내(i18n 키) — 예: 축제기간 중 무료 */
  noteKey?: MessageKey;
}

export const PARKING_LOTS: readonly ParkingLot[] = [
  {
    no: 1,
    name: "제1주차장 (방문자센터)",
    address: "강원특별자치도 동해시 삼화로 380",
    fee: "paid",
    lat: 37.4687540891893,
    lng: 129.033648171156,
    noteKey: "location.parkingFestivalFree",
  },
  {
    no: 2,
    name: "제3주차장",
    address: "방문자센터 건너편",
    fee: "free",
    lat: 37.4856,
    lng: 129.0660,
  },
  {
    no: 3,
    name: "제4주차장",
    address: "동해시 삼화동 659 오선녀탕 주차장",
    fee: "free",
    lat: 37.4687581695859,
    lng: 129.037279850464,
  },
  {
    no: 4,
    name: "제5주차장",
    address: "동해시 삼화동 654",
    fee: "free",
    lat: 37.4688416835478,
    lng: 129.038193429666,
  },
  {
    no: 5,
    name: "무릉계곡 공영주차장",
    address: "동해시 삼화동 858-3",
    fee: "paid",
    lat: 37.4635648159576,
    lng: 129.022589856273,
  },
] as const;
