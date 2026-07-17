"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { AlertTriangle, ZoomIn, ZoomOut } from "lucide-react";
import { BASE_PATH } from "@/constants";
import { DetailPageLayout } from "@/components/common/detail-page-layout";
import { useI18n } from "@/features/i18n";
import {
  VENUE_CATEGORIES,
  VENUE_COURSES,
  VENUE_FACILITIES,
  type VenueCategory,
} from "@/config/venue-map";

const serif = "var(--font-serif-kr)";
const sans = "var(--font-sans-kr)";

const cardStyle: CSSProperties = {
  background: "rgba(22,16,42,0.8)",
  border: "1px solid rgba(184,146,240,0.12)",
  backdropFilter: "blur(12px)",
};

type Filter = "all" | VenueCategory;
const FILTERS: readonly Filter[] = ["all", "info", "activity", "attraction"];
const FILTER_LABEL: Record<Filter, string> = {
  all: "venueMap.catAll",
  info: "venueMap.catInfo",
  activity: "venueMap.catActivity",
  attraction: "venueMap.catAttraction",
};

export default function VenueMapPage() {
  const { t } = useI18n();
  const [zoomed, setZoomed] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const facilities = useMemo(
    () =>
      VENUE_FACILITIES.filter((f) => filter === "all" || f.category === filter)
        .slice()
        .sort((a, b) => a.no - b.no),
    [filter],
  );

  return (
    <DetailPageLayout titleKey="menu.venueMap">
      <div className="flex flex-col gap-8">
        {/* 지도 (실제 배치도 이미지, 확대/스크롤 가능) */}
        <div className="flex flex-col gap-2">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(184,146,240,0.25)" }}
          >
            {/* 스크롤 영역 */}
            <div className="w-full overflow-auto" style={{ maxHeight: "70vh" }}>
              <div style={{ width: zoomed ? "220%" : "100%" }}>
                <Image
                  src={`${BASE_PATH}/img/venue/venue-map.png`}
                  alt={t("menu.venueMap")}
                  width={1185}
                  height={495}
                  className="h-auto w-full select-none"
                  priority
                />
              </div>
            </div>

            {/* 확대 토글 (지도 위 고정) */}
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? t("venueMap.zoomReset") : t("venueMap.zoom")}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-2 text-xs"
              style={{
                background: "rgba(11,8,20,0.75)",
                border: "1px solid rgba(184,146,240,0.4)",
                color: "#e9d5ff",
                fontFamily: sans,
                backdropFilter: "blur(8px)",
              }}
            >
              {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
              {zoomed ? t("venueMap.zoomReset") : t("venueMap.zoom")}
            </button>
          </div>
          <p
            className="text-center"
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: "0.74rem",
              color: "rgba(208,190,255,0.55)",
            }}
          >
            {t("venueMap.mapCaption")}
          </p>
        </div>

        {/* 시설 안내 (카테고리 필터 + 목록) */}
        <section>
          <SectionTitle>{t("venueMap.facilitiesTitle")}</SectionTitle>

          {/* 필터 탭 */}
          <div className="mb-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              const color =
                f === "all" ? "#d8b4fe" : VENUE_CATEGORIES[f].color;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="rounded-full px-4 py-1.5 text-xs transition-all duration-200"
                  style={{
                    fontFamily: sans,
                    fontWeight: 500,
                    color: active ? "#0b0814" : "rgba(208,190,255,0.8)",
                    background: active ? color : "rgba(35,24,69,0.6)",
                    border: `1px solid ${active ? color : "rgba(184,146,240,0.25)"}`,
                  }}
                >
                  {t(FILTER_LABEL[f])}
                </button>
              );
            })}
          </div>

          {/* 시설 목록 */}
          <div className="flex flex-col gap-2.5">
            {facilities.map((f) => {
              const color = VENUE_CATEGORIES[f.category].color;
              return (
                <div
                  key={f.no}
                  className="flex items-center gap-3 rounded-2xl p-3.5"
                  style={cardStyle}
                >
                  {/* 번호 배지 (카테고리 색) */}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                    style={{
                      background: `${color}22`,
                      border: `1px solid ${color}`,
                      color,
                      fontFamily: sans,
                      fontWeight: 700,
                    }}
                  >
                    {Number.isInteger(f.no) ? f.no : "6"}
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span
                      style={{
                        fontFamily: serif,
                        fontWeight: 500,
                        fontSize: "0.98rem",
                        color: "#f0ebff",
                      }}
                    >
                      {f.name}
                    </span>
                    {f.desc && (
                      <span
                        style={{
                          fontFamily: sans,
                          fontWeight: 300,
                          fontSize: "0.78rem",
                          color: "rgba(208,190,255,0.6)",
                        }}
                      >
                        {f.desc}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 추천 코스 */}
        <section>
          <SectionTitle>{t("venueMap.coursesTitle")}</SectionTitle>
          <div className="flex flex-col gap-3">
            {VENUE_COURSES.map((course, i) => (
              <div key={course.name} className="rounded-2xl p-5" style={cardStyle}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #9d5cf5)",
                      color: "#fff",
                      fontFamily: sans,
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#f0ebff",
                    }}
                  >
                    {course.name}
                  </span>
                  {course.tag && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[0.65rem]"
                      style={{
                        fontFamily: sans,
                        color: "#c084fc",
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(184,146,240,0.3)",
                      }}
                    >
                      {course.tag}
                    </span>
                  )}
                </div>
                {/* 코스 순서 (번호 칩) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {course.route.map((no, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                        style={{
                          background: "rgba(35,24,69,0.9)",
                          border: "1px solid rgba(184,146,240,0.4)",
                          color: "#e9d5ff",
                          fontFamily: sans,
                          fontWeight: 600,
                        }}
                      >
                        {no}
                      </span>
                      {idx < course.route.length - 1 && (
                        <span style={{ color: "rgba(192,132,252,0.5)" }}>›</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 긴급구조 안내 */}
        <div
          className="flex items-start gap-3 rounded-2xl p-5"
          style={{
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.3)",
          }}
        >
          <AlertTriangle size={20} color="#f87171" className="mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <span
              style={{
                fontFamily: serif,
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#fca5a5",
              }}
            >
              {t("venueMap.emergencyTitle")}
            </span>
            <span
              style={{
                fontFamily: sans,
                fontWeight: 300,
                fontSize: "0.8rem",
                color: "rgba(208,190,255,0.75)",
                lineHeight: 1.7,
              }}
            >
              {t("venueMap.emergencyDesc")}
            </span>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8" style={{ background: "rgba(192,132,252,0.5)" }} />
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 4.5vw, 1.6rem)",
          color: "#f0ebff",
        }}
      >
        {children}
      </h2>
    </div>
  );
}
