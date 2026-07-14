/**
 * 지원 언어(locale) 정의.
 * 상태 기반 i18n 의 단일 진실 공급원(SSOT).
 */

export type Locale = "ko" | "en" | "ja" | "zh";

export interface LocaleOption {
  code: Locale;
  /** 해당 언어로 표기한 이름 (언어 선택 UI 노출용) */
  label: string;
}

export const LOCALES: readonly LocaleOption[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
] as const;

export const DEFAULT_LOCALE: Locale = "ko";
