"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { DetailPageLayout } from "@/components/common/detail-page-layout";
import { useI18n } from "@/features/i18n";
import { useStamps } from "@/features/stamp/use-stamps";
import { arHref } from "@/constants";
import { STAMP_SPOTS, type StampSpot } from "@/config/stamp-tour";

const serif = "var(--font-serif-kr)";
const sans = "var(--font-sans-kr)";

/** 노드 간 세로 간격(px) 및 좌우 레인 x 좌표(%) */
const ROW_H = 128;
const LANES = ["34%", "66%"] as const;

/** 스팟 순번 → 배치 좌표 */
function nodePoint(index: number) {
  return {
    x: LANES[index % 2],
    y: index * ROW_H + ROW_H / 2,
  };
}

export default function StampTourPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { isDone } = useStamps();

  const spots = STAMP_SPOTS;
  const pathHeight = spots.length * ROW_H;

  // AR 컨텐츠(정적 하위 앱)는 전체 페이지 이동, Next 라우트(퀴즈 등)는 SPA 이동.
  const handleSpotClick = (spot: StampSpot) => {
    if (spot.arContent) {
      window.location.assign(arHref(spot.arContent));
    } else if (spot.href) {
      router.push(spot.href);
    }
  };

  return (
    <DetailPageLayout titleKey="menu.stampTour">
      <div className="flex flex-col items-center gap-8">
        <p
          className="text-center"
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "rgba(208,190,255,0.6)",
          }}
        >
          {t("stamp.subtitle")}
        </p>

        {/* 길(경로) — 점선으로 이어진 지그재그 스탬프 코스 */}
        <div
          className="relative w-full max-w-sm"
          style={{ height: pathHeight }}
        >
          {/* 점선 연결선 */}
          <svg
            className="absolute inset-0 h-full w-full"
            width="100%"
            height={pathHeight}
            aria-hidden
          >
            {spots.slice(1).map((spot, i) => {
              const a = nodePoint(i);
              const b = nodePoint(i + 1);
              return (
                <line
                  key={spot.key}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(184,146,240,0.45)"
                  strokeWidth={2}
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* 원형 스탬프 버튼 */}
          {spots.map((spot, i) => {
            const { x, y } = nodePoint(i);
            const isLeftLane = i % 2 === 0;
            const done = isDone(spot.key);
            const Icon = spot.icon;
            return (
              <motion.div
                key={spot.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {done ? (
                  /* 완료 스탬프 — 클릭 이벤트 없음 (비인터랙티브) */
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #9d5cf5)",
                      border: "1px solid rgba(233,213,255,0.6)",
                      boxShadow: "0 0 34px rgba(124,58,237,0.55)",
                    }}
                    aria-label={t("stamp.done")}
                  >
                    <Icon size={30} color="#f0ebff" strokeWidth={1.75} />
                    {/* 완료 체크 배지 */}
                    <span
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        background: "#22c55e",
                        boxShadow: "0 0 12px rgba(34,197,94,0.7)",
                      }}
                    >
                      <Check size={14} color="#fff" strokeWidth={3} />
                    </span>
                  </div>
                ) : (
                  /* 미완료 — 클릭 가능한 글래스 버튼 */
                  <button
                    type="button"
                    onClick={() => handleSpotClick(spot)}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(22,16,42,0.6)",
                      border: "1px solid rgba(184,146,240,0.3)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(184,146,240,0.6)";
                      e.currentTarget.style.background = "rgba(35,24,69,0.9)";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(184,146,240,0.3)";
                      e.currentTarget.style.background = "rgba(22,16,42,0.6)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={30} color="#d8b4fe" strokeWidth={1.75} />
                    {/* 순번 배지 */}
                    <span
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #9d5cf5)",
                        color: "#fff",
                        fontFamily: sans,
                        fontWeight: 600,
                        boxShadow: "0 0 12px rgba(124,58,237,0.6)",
                      }}
                    >
                      {spot.no}
                    </span>
                  </button>
                )}

                {/* 라벨 — 안쪽(중앙) 방향으로 배치 */}
                <span
                  className={`absolute top-1/2 flex -translate-y-1/2 flex-col whitespace-nowrap ${
                    isLeftLane ? "left-full ml-3 items-start" : "right-full mr-3 items-end"
                  }`}
                >
                  <span
                    style={{
                      fontFamily: serif,
                      fontWeight: 500,
                      fontSize: "0.92rem",
                      color: "#f0ebff",
                    }}
                  >
                    {t(spot.labelKey)}
                  </span>
                  {done && (
                    <span
                      className="mt-0.5 inline-flex items-center gap-1"
                      style={{
                        fontFamily: sans,
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        color: "#86efac",
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                      {t("stamp.done")}
                    </span>
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DetailPageLayout>
  );
}
