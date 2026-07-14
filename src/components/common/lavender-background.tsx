"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { ROUTES } from "@/constants";
import { useI18n } from "@/features/i18n";

const LAVENDER_BG =
  "https://images.unsplash.com/photo-1712178420520-f308934a4e8d?w=1920&h=1080&fit=crop&auto=format";

const PARTICLE_COLORS = [
  "#c084fc",
  "#a855f7",
  "#d8b4fe",
  "#e9d5ff",
  "#f0abfc",
  "#ddd6fe",
];

/**
 * index 기반 결정론적 의사난수 (0~1).
 * SSR/CSR 결과를 동일하게 만들어 hydration 불일치를 막는다.
 */
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Particle({ index }: { index: number }) {
  const { size, x, delay, duration, color, driftX, riseY } = useMemo(() => {
    return {
      size: seeded(index, 1) * 4 + 2,
      x: seeded(index, 2) * 100,
      delay: seeded(index, 3) * 8,
      duration: 6 + seeded(index, 4) * 8,
      color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      driftX: (seeded(index, 5) - 0.5) * 120,
      riseY: -(seeded(index, 6) * 400 + 300),
    };
  }, [index]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10px",
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        opacity: 0,
      }}
      animate={{
        y: [0, riseY],
        x: [0, driftX],
        opacity: [0, 0.8, 0.6, 0],
        scale: [0.5, 1, 0.8, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

interface LavenderBackgroundProps {
  /** 중앙 z-10 영역에 렌더할 페이지 콘텐츠 */
  children?: ReactNode;
  /** 상단 내비게이션(브랜드 + 언어) 노출 여부 */
  showNav?: boolean;
  /** 하단 SCROLL 인디케이터 노출 여부 */
  showScrollIndicator?: boolean;
  /**
   * 콘텐츠 수직 정렬.
   * true(기본): 화면 중앙 정렬(메인/인트로). false: 상단 정렬(스크롤형 페이지).
   */
  centerContent?: boolean;
}

/**
 * 라벤더 테마 공통 배경 셸.
 * 배경 이미지 · 그라데이션 오버레이 · 파티클 · (선택) 내비/스크롤 인디케이터를 제공하고
 * children 을 중앙 레이어에 배치한다. 인트로를 비롯한 모든 페이지의 베이스로 사용한다.
 */
export function LavenderBackground({
  children,
  showNav = true,
  showScrollIndicator = false,
  centerContent = true,
}: LavenderBackgroundProps) {
  const router = useRouter();
  const { t } = useI18n();

  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  // 파티클은 장식용이며 motion 의 SSR 스타일 직렬화가 클라이언트와 달라
  // hydration 불일치를 일으킨다. useSyncExternalStore 로 서버에서는 false,
  // 클라이언트에서만 true 를 반환해 마운트 이후에만 렌더한다.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div
      className="relative w-full min-h-full flex-1 flex flex-col overflow-x-hidden"
      style={{ background: "#0b0814", fontFamily: "var(--font-sans-kr)" }}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          src={LAVENDER_BG}
          alt={t("intro.infoLocation")}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </div>

      {/* 그라데이션 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,8,20,0.75) 0%, rgba(11,8,20,0.25) 40%, rgba(30,10,50,0.4) 70%, rgba(11,8,20,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      {/* 파티클 (클라이언트 마운트 후에만 렌더) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particles.map((i) => <Particle key={i} index={i} />)}
      </div>

      {/* 상단 내비게이션 */}
      {showNav && (
        <motion.nav
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 py-6 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={() => router.push(ROUTES.main)}
            className="flex items-center gap-2"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(184,146,240,0.2)",
                border: "1px solid rgba(184,146,240,0.4)",
              }}
            >
              <Sparkles size={14} color="#c084fc" />
            </div>
            <span
              className="text-sm tracking-wider"
              style={{
                color: "#c084fc",
                fontFamily: "var(--font-serif-kr)",
                fontWeight: 400,
              }}
            >
              {t("intro.titleLine1")}
            </span>
          </button>
          <button
            type="button"
            onClick={() => router.push(ROUTES.language)}
            className="text-xs px-4 py-2 rounded-full transition-all duration-300"
            style={{
              border: "1px solid rgba(184,146,240,0.4)",
              color: "#c084fc",
              background: "rgba(124,58,237,0.1)",
              fontFamily: "var(--font-sans-kr)",
            }}
          >
            {t("menu.language")}
          </button>
        </motion.nav>
      )}

      {/* 콘텐츠 영역 */}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center px-6 w-full ${
          centerContent ? "justify-center" : "justify-start"
        }`}
      >
        {children}
      </div>

      {/* 스크롤 인디케이터 */}
      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          <span
            className="text-xs tracking-widest"
            style={{
              color: "rgba(192,132,252,0.4)",
              fontFamily: "var(--font-sans-kr)",
              fontSize: "0.6rem",
            }}
          >
            {t("intro.scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} color="rgba(192,132,252,0.4)" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
