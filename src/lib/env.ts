/**
 * 환경 변수 접근 지점.
 * 모든 환경 변수는 이곳을 통해 읽어 타입 안정성과 검증을 보장한다.
 * 시크릿(API 키, 토큰 등)은 절대 코드에 하드코딩하지 말고
 * 환경 변수 또는 시크릿 관리 솔루션을 통해 주입받는다.
 */

function required(key: string, value: string | undefined): string {
  if (value === undefined || value === "") {
    throw new Error(`환경 변수 ${key} 가 설정되지 않았습니다.`);
  }
  return value;
}

export const env = {
  // 클라이언트에 노출되는 값은 NEXT_PUBLIC_ 접두사를 사용한다.
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  nodeEnv: process.env.NODE_ENV ?? "development",
  /**
   * 8thWall 로 배포된 AR 경험의 임베드 URL.
   * 미설정 시 AR 컨텐츠 페이지는 연동 대기(placeholder) 상태로 표시된다.
   */
  eighthWallUrl: process.env.NEXT_PUBLIC_8THWALL_URL ?? "",
  /**
   * 카카오맵 JavaScript 키 (카카오 개발자 콘솔 > 앱 > JavaScript 키).
   * 미설정 시 위치 페이지 지도는 placeholder 프레임으로 대체된다.
   * 사용 도메인(예: http://localhost:3000)을 콘솔의 플랫폼>Web 에 등록해야 한다.
   */
  kakaoMapKey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? "",
} as const;

// required() 는 서버 전용 필수 시크릿 검증 시 사용한다.
export { required };
