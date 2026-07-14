"use client";

import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ChevronRight,
  Globe,
  Map,
  MapPin,
  Stamp,
  Ticket,
  type LucideProps,
} from "lucide-react";
import { LavenderBackground } from "@/components/common/lavender-background";
import { MENU_ITEMS } from "@/config/menu";
import { useI18n } from "@/features/i18n";

/** 메뉴 key → 아이콘 매핑 */
const MENU_ICONS: Record<string, ComponentType<LucideProps>> = {
  festival: Ticket,
  location: MapPin,
  venueMap: Map,
  stampTour: Stamp,
  language: Globe,
};

export default function MainPage() {
  const router = useRouter();
  const { t } = useI18n();

  const items = MENU_ITEMS.filter((item) => item.enabled);

  return (
    <LavenderBackground>
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* 헤더 */}
        <motion.header
          className="flex flex-col items-center text-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#c084fc", fontFamily: "var(--font-sans-kr)", fontWeight: 300 }}
          >
            {t("intro.titleLine1")} · {t("intro.titleLine2")}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif-kr)",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
              color: "#f0ebff",
              textShadow: "0 0 40px rgba(192,132,252,0.4)",
              letterSpacing: "0.04em",
            }}
          >
            {t("main.title")}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans-kr)",
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "rgba(208,190,255,0.6)",
            }}
          >
            {t("main.subtitle")}
          </p>
        </motion.header>

        {/* 메뉴 리스트 카드 */}
        <nav className="flex flex-col gap-3">
          {items.map((item, i) => {
            const Icon = MENU_ICONS[item.key] ?? Ticket;
            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => router.push(item.path)}
                className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-[background-color,border-color,box-shadow] duration-300"
                style={{
                  background: "rgba(22,16,42,0.6)",
                  border: "1px solid rgba(184,146,240,0.15)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(184,146,240,0.45)";
                  e.currentTarget.style.background = "rgba(35,24,69,0.85)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(184,146,240,0.15)";
                  e.currentTarget.style.background = "rgba(22,16,42,0.6)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* 아이콘 */}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.18)",
                    border: "1px solid rgba(184,146,240,0.3)",
                  }}
                >
                  <Icon size={20} color="#d8b4fe" />
                </span>

                {/* 텍스트 */}
                <span className="flex flex-1 flex-col gap-0.5">
                  <span
                    style={{
                      fontFamily: "var(--font-serif-kr)",
                      fontWeight: 500,
                      fontSize: "1.05rem",
                      color: "#f0ebff",
                    }}
                  >
                    {t(item.labelKey)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans-kr)",
                      fontWeight: 300,
                      fontSize: "0.78rem",
                      color: "rgba(208,190,255,0.55)",
                    }}
                  >
                    {t(item.descKey)}
                  </span>
                </span>

                {/* 화살표 */}
                <ChevronRight
                  size={18}
                  color="rgba(192,132,252,0.5)"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            );
          })}
        </nav>
      </div>
    </LavenderBackground>
  );
}
