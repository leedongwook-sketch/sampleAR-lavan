/**
 * 카카오맵 JavaScript SDK 최소 타입 선언.
 * 위치 페이지에서 사용하는 API 만 좁게 선언한다. (전체 타입은 @types/kakaomaps 미사용)
 */

export interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

export interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  panTo(latlng: KakaoLatLng): void;
  setLevel(level: number): void;
}

export interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
  setPosition(latlng: KakaoLatLng): void;
}

export interface KakaoMaps {
  load(callback: () => void): void;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: { position: KakaoLatLng; map?: KakaoMap }) => KakaoMarker;
}

declare global {
  interface Window {
    kakao: { maps: KakaoMaps };
  }
}
