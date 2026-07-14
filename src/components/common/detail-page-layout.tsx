"use client";

import type { ReactNode } from "react";
import { useI18n, type MessageKey } from "@/features/i18n";
import { LavenderBackground } from "./lavender-background";
import { BackToMainButton } from "./back-to-main-button";

interface DetailPageLayoutProps {
  /** 페이지 제목 i18n 키 */
  titleKey: MessageKey | string;
  children: ReactNode;
}

/**
 * 상세(서브) 페이지 공통 레이아웃.
 * 축제소개/메인과 동일한 라벤더 배경 셸 + 제목 + 본문 + 하단 메인 복귀 버튼.
 */
export function DetailPageLayout({ titleKey, children }: DetailPageLayoutProps) {
  const { t } = useI18n();

  return (
    <LavenderBackground centerContent={false}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pt-28 pb-20">
        <h1
          className="text-center"
          style={{
            fontFamily: "var(--font-serif-kr)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
            color: "#f0ebff",
            textShadow: "0 0 40px rgba(192,132,252,0.4)",
            letterSpacing: "0.04em",
          }}
        >
          {t(titleKey)}
        </h1>
        <div className="flex-1">{children}</div>
        <div className="flex justify-center pt-4">
          <BackToMainButton />
        </div>
      </div>
    </LavenderBackground>
  );
}
