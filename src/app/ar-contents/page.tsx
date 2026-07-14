"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants";
import { env } from "@/lib/env";
import { useI18n } from "@/features/i18n";
import { AR_CONTENTS, type ArContentType } from "@/config/ar-contents";

/**
 * AR 컨텐츠 페이지 (8thWall 연동 예정).
 *
 * 현재는 기본 골격만 제공한다.
 * - `env.eighthWallUrl` 이 설정되면 해당 8thWall 경험을 iframe 으로 임베드한다.
 *   (실제 연동 시: 카메라 권한이 필요하므로 HTTPS 환경 + allow 속성 필수)
 * - 미설정 시 연동 대기(placeholder) 상태를 보여준다.
 * - 지도 / 게임 / 포토 등 컨텐츠 종류는 `AR_CONTENTS` 레지스트리로 관리한다.
 *
 * NOTE: 아직 메뉴(MENU_ITEMS)에 노출하지 않는다. 직접 경로(/ar-contents)로만 접근.
 */
export default function ArContentsPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [selected, setSelected] = useState<ArContentType | null>(null);

  const arUrl = env.eighthWallUrl
    ? `${env.eighthWallUrl}${selected ? `?type=${selected}` : ""}`
    : "";

  return (
    <main className="fixed inset-0 flex flex-col bg-black text-white">
      {/* 상단 바 */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => router.push(ROUTES.main)}
          className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-2 text-sm backdrop-blur"
          aria-label={t("common.backToMain")}
        >
          <ArrowLeft size={16} />
          {t("common.backToMain")}
        </button>
        <span className="rounded-full bg-black/40 px-3 py-2 text-sm backdrop-blur">
          {t("ar.title")}
          {selected ? ` · ${t(AR_CONTENTS.find((c) => c.type === selected)!.labelKey)}` : ""}
        </span>
      </header>

      {/* AR 스테이지 (8thWall 마운트 영역) */}
      <div className="relative flex-1">
        {arUrl ? (
          // TODO(8thWall): iframe 대신 8thWall Web SDK 스크립트 직접 로드 방식으로 교체 가능.
          <iframe
            title={t("ar.title")}
            src={arUrl}
            className="h-full w-full border-0"
            allow="camera; microphone; gyroscope; accelerometer; magnetometer; xr-spatial-tracking; autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="text-4xl">📷</span>
            <p className="text-sm text-white/60">{t("ar.placeholder")}</p>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/50">
              {t("ar.notReady")}
            </span>
          </div>
        )}
      </div>

      {/* 컨텐츠 종류 선택 (지도 / 게임 / 포토 ...) */}
      <nav className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-2 px-4 py-5">
        <span className="text-xs text-white/50">{t("ar.selectHint")}</span>
        <div className="flex items-center gap-2">
          {AR_CONTENTS.map((content) => {
            const active = selected === content.type;
            return (
              <button
                key={content.type}
                type="button"
                onClick={() => setSelected(content.type)}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-3 text-xs backdrop-blur transition-colors ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-black/40 text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{content.emoji}</span>
                {t(content.labelKey)}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
