/**
 * 전역에서 공유되는 공통 타입 정의.
 * 특정 도메인에 한정된 타입은 해당 feature 폴더 내에 두는 것을 권장한다.
 */

/** 페이지네이션 응답 공통 형태 */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** API 공통 에러 응답 형태 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
}

/** 비동기 상태 관리용 공통 타입 */
export type AsyncStatus = "idle" | "loading" | "success" | "error";
