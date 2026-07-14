"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants";
import { useI18n, type MessageKey } from "@/features/i18n";
import { LavenderBackground } from "@/components/common/lavender-background";
import { CtaButton } from "@/components/ui/cta-button";
import {
  ENJOY_CATEGORIES,
  OVERVIEW_ROWS,
  PHOTO_SPOTS,
} from "@/config/festival";

/** 스크롤 진입 시 아래→위로 떠오르는 공통 등장 래퍼 */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const cardStyle: CSSProperties = {
  background: "rgba(22,16,42,0.8)",
  border: "1px solid rgba(184,146,240,0.12)",
  backdropFilter: "blur(12px)",
};

const serif = "var(--font-serif-kr)";
const sans = "var(--font-sans-kr)";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="h-px w-8"
        style={{ background: "rgba(192,132,252,0.5)" }}
      />
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: "clamp(1.3rem, 4.5vw, 1.8rem)",
          color: "#f0ebff",
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

export default function FestivalPage() {
  const router = useRouter();
  const { t } = useI18n();

  const chip = (icon: ReactNode, text: string) => (
    <div
      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
      style={{
        background: "rgba(35,24,69,0.7)",
        border: "1px solid rgba(184,146,240,0.2)",
        color: "rgba(208,190,255,0.75)",
        fontSize: "0.72rem",
        fontFamily: sans,
        fontWeight: 300,
        letterSpacing: "0.04em",
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ color: "#c084fc" }}>{icon}</span>
      {text}
    </div>
  );

  return (
    <LavenderBackground centerContent={false}>
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-24 pt-28 pb-20">
        {/* ① 히어로 */}
        <header className="flex flex-col items-center text-center">
          <Reveal className="flex items-center gap-2 mb-6">
            <span className="h-px w-10" style={{ background: "rgba(192,132,252,0.4)" }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "#c084fc", fontFamily: sans, fontWeight: 300 }}
            >
              {t("festival.heroOverline")}
            </span>
            <span className="h-px w-10" style={{ background: "rgba(192,132,252,0.4)" }} />
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mb-1 leading-none"
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 12vw, 5rem)",
                color: "#f0ebff",
                textShadow:
                  "0 0 60px rgba(192,132,252,0.4), 0 0 120px rgba(124,58,237,0.2)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("intro.titleLine1")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <h1
              className="mb-6"
              style={{
                fontFamily: serif,
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 8vw, 3.4rem)",
                color: "#d8b4fe",
                textShadow: "0 0 40px rgba(192,132,252,0.5)",
                letterSpacing: "0.06em",
              }}
            >
              {t("intro.titleLine2")}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              className="mb-7"
              style={{
                fontFamily: sans,
                fontWeight: 300,
                fontSize: "clamp(0.85rem, 2.4vw, 1rem)",
                color: "rgba(208,190,255,0.7)",
                letterSpacing: "0.02em",
              }}
            >
              {t("festival.heroTagline")}
            </p>
          </Reveal>
          <Reveal delay={0.4} className="flex flex-wrap items-center justify-center gap-3">
            {chip(<Calendar size={12} />, t("festival.infoDate"))}
            {chip(<MapPin size={12} />, t("festival.infoPlace"))}
          </Reveal>
        </header>

        {/* ② 한 줄 서사 */}
        <Reveal className="text-center">
          <p
            style={{
              fontFamily: serif,
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 4vw, 1.6rem)",
              color: "rgba(208,190,255,0.7)",
              lineHeight: 1.6,
            }}
          >
            {t("festival.narrativeLead")}
            <br />
            <span style={{ color: "#e9d5ff", fontWeight: 600 }}>
              {t("festival.narrativeHighlight")}
            </span>
          </p>
        </Reveal>

        {/* ③ 축제 개요 */}
        <section>
          <Reveal>
            <SectionTitle>{t("festival.overviewTitle")}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={cardStyle}>
              {OVERVIEW_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex items-start gap-4 text-sm"
                  style={{ fontFamily: sans }}
                >
                  <span
                    className="shrink-0 w-20"
                    style={{ color: "#c084fc", fontWeight: 500 }}
                  >
                    {t(row.labelKey)}
                  </span>
                  <span style={{ color: "rgba(208,190,255,0.85)", fontWeight: 300 }}>
                    {t(row.valueKey)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ④ 무릉별 이야기 */}
        <section>
          <Reveal>
            <SectionTitle>{t("festival.storyTitle")}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 mb-5">
            {(
              [
                { label: "festival.storyThenLabel", body: "festival.storyThen", dim: true },
                { label: "festival.storyNowLabel", body: "festival.storyNow", dim: false },
              ] as { label: MessageKey; body: MessageKey; dim: boolean }[]
            ).map((item, i) => (
              <Reveal key={item.label} delay={i * 0.12}>
                <div
                  className="rounded-2xl p-5 h-full flex flex-col gap-2"
                  style={{
                    ...cardStyle,
                    border: item.dim
                      ? "1px solid rgba(120,120,140,0.18)"
                      : "1px solid rgba(184,146,240,0.35)",
                    background: item.dim
                      ? "rgba(18,18,24,0.75)"
                      : "rgba(35,24,69,0.85)",
                  }}
                >
                  <span
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{
                      color: item.dim ? "rgba(160,160,180,0.7)" : "#c084fc",
                      fontFamily: sans,
                    }}
                  >
                    {t(item.label)}
                  </span>
                  <span
                    style={{
                      fontFamily: serif,
                      fontSize: "0.98rem",
                      color: item.dim ? "rgba(200,200,210,0.85)" : "#e9d5ff",
                      lineHeight: 1.45,
                    }}
                  >
                    {t(item.body)}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p
              style={{
                fontFamily: sans,
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "rgba(208,190,255,0.6)",
                lineHeight: 1.8,
              }}
            >
              {t("festival.storyBody")}
            </p>
          </Reveal>
        </section>

        {/* ⑤ 즐길 거리 */}
        <section>
          <Reveal>
            <SectionTitle>{t("festival.enjoyTitle")}</SectionTitle>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENJOY_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.key} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-5 h-full flex flex-col gap-2"
                  style={{
                    ...cardStyle,
                    border: cat.featured
                      ? "1px solid rgba(184,146,240,0.45)"
                      : (cardStyle.border as string),
                    boxShadow: cat.featured
                      ? "0 0 30px rgba(124,58,237,0.25)"
                      : undefined,
                  }}
                >
                  <div className="text-2xl">{cat.emoji}</div>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 500,
                      color: "#e9d5ff",
                      fontSize: "1rem",
                    }}
                  >
                    {t(cat.titleKey)}
                  </h3>
                  <p
                    style={{
                      fontFamily: sans,
                      fontWeight: 300,
                      color: "rgba(208,190,255,0.55)",
                      fontSize: "0.82rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {t(cat.descKey)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ⑥ AR 체험 하이라이트 */}
        <Reveal>
          <div
            className="rounded-3xl p-8 flex flex-col items-center text-center gap-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(35,24,69,0.85))",
              border: "1px solid rgba(184,146,240,0.3)",
              boxShadow: "0 0 50px rgba(124,58,237,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(184,146,240,0.2)",
                border: "1px solid rgba(184,146,240,0.5)",
              }}
            >
              <Sparkles size={22} color="#e9d5ff" />
            </div>
            <h2
              style={{
                fontFamily: serif,
                fontWeight: 600,
                fontSize: "clamp(1.3rem, 5vw, 1.9rem)",
                color: "#f0ebff",
                textShadow: "0 0 30px rgba(192,132,252,0.4)",
              }}
            >
              {t("festival.arTitle")}
            </h2>
            <p
              className="max-w-md"
              style={{
                fontFamily: sans,
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "rgba(208,190,255,0.75)",
                lineHeight: 1.8,
              }}
            >
              {t("festival.arBody")}
            </p>
            <CtaButton
              variant="experience"
              className="mt-2"
              onClick={() => router.push(ROUTES.stampTour)}
            >
              {t("festival.arCta")}
            </CtaButton>
          </div>
        </Reveal>

        {/* ⑦ 포토존 & 추천 코스 */}
        <section>
          <Reveal>
            <SectionTitle>{t("festival.photoTitle")}</SectionTitle>
          </Reveal>
          <div className="flex flex-col gap-4">
            {PHOTO_SPOTS.map((spot, i) => (
              <Reveal key={spot.key} delay={i * 0.1}>
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ height: "180px", ...cardStyle }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={spot.image}
                    alt={t(spot.nameKey)}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,8,20,0.9) 0%, rgba(11,8,20,0.1) 60%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3
                      style={{
                        fontFamily: serif,
                        fontWeight: 600,
                        color: "#f0ebff",
                        fontSize: "1.05rem",
                        textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                      }}
                    >
                      {t(spot.nameKey)}
                    </h3>
                    <p
                      style={{
                        fontFamily: sans,
                        fontWeight: 300,
                        color: "rgba(208,190,255,0.8)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {t(spot.descKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ⑧ 오시는 길 */}
        <section>
          <Reveal>
            <SectionTitle>{t("festival.wayTitle")}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={cardStyle}>
              <p
                style={{
                  fontFamily: sans,
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "rgba(208,190,255,0.7)",
                  lineHeight: 1.8,
                }}
              >
                {t("festival.wayBody")}
              </p>
              <CtaButton
                variant="explore"
                icon={<MapPin size={14} />}
                className="self-start"
                onClick={() => router.push(ROUTES.location)}
              >
                {t("festival.wayCta")}
              </CtaButton>
            </div>
          </Reveal>
        </section>

        {/* ⑨ 하단 CTA */}
        <Reveal className="flex flex-col items-center text-center gap-5">
          <p
            style={{
              fontFamily: serif,
              fontWeight: 300,
              fontSize: "clamp(1rem, 3.5vw, 1.3rem)",
              color: "rgba(208,190,255,0.7)",
            }}
          >
            {t("festival.ctaTitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <CtaButton
              variant="experience"
              onClick={() => router.push(ROUTES.stampTour)}
            >
              {t("festival.ctaPrimary")}
            </CtaButton>
            <CtaButton
              variant="explore"
              onClick={() => router.push(ROUTES.main)}
            >
              {t("common.backToMain")}
            </CtaButton>
          </div>
          <p
            className="mt-2"
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: "0.7rem",
              color: "rgba(144,128,184,0.5)",
            }}
          >
            {t("festival.noticeData")}
          </p>
        </Reveal>
      </div>
    </LavenderBackground>
  );
}
