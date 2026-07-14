"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import { ROUTES } from "@/constants";
import { useI18n } from "@/features/i18n";
import { LavenderBackground } from "@/components/common/lavender-background";

/** 마지막 요소 등장 후 메인으로 넘어가기 전 여운 (ms) */
const SETTLE_DELAY_MS = 1000;

// 위 → 아래 순서로 등장시키기 위한 애니메이션 지연(초)
const DELAY = {
  badge: 0.9,
  title1: 0.9,
  title2: 0.9,
  description: 1.2,
  info: 1.5,
} as const;

const RISE = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
} as const;

export default function IntroPage() {
  const router = useRouter();
  const { t } = useI18n();
  const navigatedRef = useRef(false);

  // 마지막(정보칩) 등장이 끝나면 자연스럽게 메인으로 이동한다.
  const goMainWhenReady = () => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    setTimeout(() => router.replace(ROUTES.main), SETTLE_DELAY_MS);
  };

  return (
    <LavenderBackground showNav={false}>
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* 오버라인 배지 */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={RISE.initial}
          animate={RISE.animate}
          transition={{ duration: 1.3, delay: DELAY.badge, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-12" style={{ background: "rgba(192,132,252,0.4)" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              color: "#c084fc",
              fontFamily: "var(--font-sans-kr)",
              fontWeight: 300,
            }}
          >
            {t("intro.overline")}
          </span>
          <div className="h-px w-12" style={{ background: "rgba(192,132,252,0.4)" }} />
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.h1
          className="mb-2 leading-none"
          initial={RISE.initial}
          animate={RISE.animate}
          transition={{ duration: 1.4, delay: DELAY.title1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-serif-kr)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 10vw, 8rem)",
            color: "#f0ebff",
            textShadow:
              "0 0 60px rgba(192,132,252,0.4), 0 0 120px rgba(124,58,237,0.2)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {t("intro.titleLine1")}
        </motion.h1>
        <motion.h1
          className="mb-8"
          initial={RISE.initial}
          animate={RISE.animate}
          transition={{ duration: 1.4, delay: DELAY.title2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-serif-kr)",
            fontWeight: 300,
            fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
            color: "#d8b4fe",
            textShadow: "0 0 40px rgba(192,132,252,0.5)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
        >
          {t("intro.titleLine2")}
        </motion.h1>

        {/* 설명 */}
        <motion.p
          className="mb-10 max-w-lg leading-relaxed"
          initial={RISE.initial}
          animate={RISE.animate}
          transition={{ duration: 1.3, delay: DELAY.description, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-sans-kr)",
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 2vw, 1rem)",
            color: "rgba(208,190,255,0.7)",
            letterSpacing: "0.02em",
            whiteSpace: "pre-line",
          }}
        >
          {t("intro.description")}
        </motion.p>

        {/* 정보 칩 (마지막 등장 → 완료 시 메인 이동) */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={RISE.initial}
          animate={RISE.animate}
          transition={{ duration: 1.3, delay: DELAY.info, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={goMainWhenReady}
        >
          {[
            { icon: <Calendar size={12} />, text: t("intro.infoDate") },
            { icon: <MapPin size={12} />, text: t("intro.infoLocation") },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(35,24,69,0.7)",
                border: "1px solid rgba(184,146,240,0.2)",
                color: "rgba(208,190,255,0.75)",
                fontSize: "0.72rem",
                fontFamily: "var(--font-sans-kr)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: "#c084fc" }}>{icon}</span>
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </LavenderBackground>
  );
}
