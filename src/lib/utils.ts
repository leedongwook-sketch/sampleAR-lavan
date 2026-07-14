import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 병합 헬퍼.
 * 조건부 클래스(clsx)와 충돌 클래스 정리(tailwind-merge)를 함께 처리한다.
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-blue-500", "px-4") // -> "py-1 bg-blue-500 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
