"use client";

import { useSyncExternalStore } from "react";

/**
 * 스탬프 획득 상태를 localStorage 에 영속화한다.
 * 저장 형식: { [스팟key]: 완료시각(ISO 문자열) }
 *   예) {"cheongok":"2026-07-12T10:30:00.000Z"}
 * useSyncExternalStore 로 구독해 새로고침·탭 간에도 유지되며 hydration 불일치가 없다.
 *
 * 구버전(문자열 배열 ["cheongok", ...])도 읽어들일 수 있으며,
 * 이 경우 시각을 알 수 없으므로 null 로 취급하고, 다음 저장 시 객체 형식으로 이전된다.
 */
export type StampMap = Readonly<Record<string, string | null>>;

const STORAGE_KEY = "samplear.stamps";
const EMPTY: StampMap = {};

// getSnapshot 이 매번 같은 참조를 반환하도록 캐시한다(무한 렌더 방지).
let cachedRaw: string | null = null;
let cachedValue: StampMap = EMPTY;

function readStamps(): StampMap {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as unknown) : {};
    if (Array.isArray(parsed)) {
      // 구버전(배열) 호환: 시각 미상 → null
      const map: Record<string, string | null> = {};
      for (const key of parsed) if (typeof key === "string") map[key] = null;
      cachedValue = map;
    } else if (parsed && typeof parsed === "object") {
      cachedValue = parsed as StampMap;
    } else {
      cachedValue = EMPTY;
    }
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  // 다른 탭에서의 변경도 반영
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function emit() {
  listeners.forEach((l) => l());
}

/** 스팟을 완료 처리하고 완료 시각과 함께 저장한다. (이미 완료면 무시) */
export function completeStamp(key: string) {
  if (typeof window === "undefined") return;
  const current = readStamps();
  if (key in current) return;
  const next: Record<string, string | null> = {
    ...current,
    [key]: new Date().toISOString(),
  };
  const rawNext = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, rawNext);
  // 캐시 즉시 갱신 → getSnapshot 이 새 참조 반환
  cachedRaw = rawNext;
  cachedValue = next;
  emit();
}

/** 저장된 스탬프 전체 초기화 (개발/테스트용) */
export function resetStamps() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  cachedRaw = null;
  cachedValue = EMPTY;
  emit();
}

export function useStamps() {
  const stamps = useSyncExternalStore(subscribe, readStamps, () => EMPTY);
  return {
    /** 전체 스탬프 맵 { key: 완료시각ISO | null } */
    stamps,
    /** 완료한 스팟 key 목록 */
    completedKeys: Object.keys(stamps),
    /** 완료 여부 */
    isDone: (key: string) => key in stamps,
    /** 완료 시각(ISO). 미완료거나 구버전 데이터면 null */
    completedAt: (key: string) => stamps[key] ?? null,
    completeStamp,
    resetStamps,
  };
}
