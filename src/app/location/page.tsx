"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Script from "next/script";
import { MapPin, Phone } from "lucide-react";
import { DetailPageLayout } from "@/components/common/detail-page-layout";
import { env } from "@/lib/env";
import { useI18n } from "@/features/i18n";
import { PARKING_LOTS, VENUE, type ParkingLot } from "@/config/location";

const serif = "var(--font-serif-kr)";
const sans = "var(--font-sans-kr)";

const cardStyle: CSSProperties = {
  background: "rgba(22,16,42,0.8)",
  border: "1px solid rgba(184,146,240,0.12)",
  backdropFilter: "blur(12px)",
};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8" style={{ background: "rgba(192,132,252,0.5)" }} />
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: "clamp(1.2rem, 4.5vw, 1.6rem)",
          color: "#f0ebff",
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

export default function LocationPage() {
  const { t } = useI18n();
  const hasKey = Boolean(env.kakaoMapKey);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("@/types/kakao").KakaoMap | null>(null);
  const [selectedNo, setSelectedNo] = useState<number | null>(null);
  const [mapFailed, setMapFailed] = useState(false);

  // 카카오맵 초기화: 행사장소를 기본 중심으로, config 의 좌표에 마커 표시
  const initMap = useCallback(() => {
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    kakao.maps.load(() => {
      if (!containerRef.current || mapRef.current) return;
      const map = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(VENUE.lat, VENUE.lng),
        level: 5,
      });
      mapRef.current = map;

      // 행사장소 + 주차장 마커 (config/location.ts 의 좌표 사용)
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(VENUE.lat, VENUE.lng),
        map,
      });
      PARKING_LOTS.forEach((lot) => {
        new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lot.lat, lot.lng),
          map,
        });
      });
    });
  }, []);

  // 재방문 등으로 SDK 가 이미 로드된 경우에도 초기화되도록 보장
  useEffect(() => {
    if (hasKey) initMap();
  }, [hasKey, initMap]);

  // 주차장 클릭 → 해당 위치로 지도 포커싱
  const focusLot = useCallback((lot: ParkingLot) => {
    setSelectedNo(lot.no);
    const map = mapRef.current;
    if (!map || !window.kakao?.maps) return;
    const pos = new window.kakao.maps.LatLng(lot.lat, lot.lng);
    map.panTo(pos);
    map.setLevel(3);
  }, []);

  return (
    <DetailPageLayout titleKey="menu.location">
      {hasKey && (
        <Script
          id="kakao-map-sdk"
          strategy="afterInteractive"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoMapKey}&autoload=false`}
          onLoad={initMap}
          onError={() => setMapFailed(true)}
        />
      )}

      <div className="flex flex-col gap-12">
        {/* 지도 */}
        {hasKey && !mapFailed ? (
          <div
            ref={containerRef}
            className="w-full overflow-hidden rounded-2xl"
            style={{
              aspectRatio: "4 / 3",
              border: "1px solid rgba(184,146,240,0.25)",
            }}
          />
        ) : (
          // 카카오 키 미설정 또는 로드 실패 시 placeholder
          <div
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl"
            style={{
              aspectRatio: "4 / 3",
              border: "1px dashed rgba(184,146,240,0.35)",
              background:
                "linear-gradient(135deg, rgba(35,24,69,0.6), rgba(22,16,42,0.6))",
              backdropFilter: "blur(8px)",
            }}
          >
            <MapPin size={32} color="rgba(192,132,252,0.6)" />
            <span
              className="max-w-xs px-6 text-center"
              style={{
                fontFamily: sans,
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "rgba(208,190,255,0.55)",
                letterSpacing: "0.05em",
                lineHeight: 1.6,
              }}
            >
              {mapFailed ? t("location.mapError") : t("location.mapPlaceholder")}
            </span>
          </div>
        )}

        {/* 행사장소 안내 */}
        <section>
          <SectionTitle>{t("location.venueTitle")}</SectionTitle>
          <div className="flex flex-col gap-3 rounded-2xl p-6" style={cardStyle}>
            <div className="flex items-start gap-4 text-sm" style={{ fontFamily: sans }}>
              <span className="w-12 shrink-0" style={{ color: "#c084fc", fontWeight: 500 }}>
                {t("location.placeLabel")}
              </span>
              <span style={{ color: "rgba(208,190,255,0.85)", fontWeight: 300 }}>
                {VENUE.place}
              </span>
            </div>
            <div className="flex items-start gap-4 text-sm" style={{ fontFamily: sans }}>
              <span className="w-12 shrink-0" style={{ color: "#c084fc", fontWeight: 500 }}>
                {t("location.phoneLabel")}
              </span>
              <a
                href={`tel:${VENUE.phone.replace(/-/g, "")}`}
                className="inline-flex items-center gap-1.5 transition-colors"
                style={{ color: "rgba(208,190,255,0.85)", fontWeight: 300 }}
              >
                <Phone size={13} color="#c084fc" />
                {VENUE.phone}
              </a>
            </div>
          </div>
        </section>

        {/* 주차장 안내 */}
        <section>
          <SectionTitle>{t("location.parkingTitle")}</SectionTitle>
          <div className="flex flex-col gap-3">
            {PARKING_LOTS.map((lot) => {
              const isPaid = lot.fee === "paid";
              const isSelected = selectedNo === lot.no;
              return (
                <button
                  key={lot.no}
                  type="button"
                  onClick={() => focusLot(lot)}
                  className="flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    ...cardStyle,
                    border: isSelected
                      ? "1px solid rgba(184,146,240,0.5)"
                      : (cardStyle.border as string),
                    background: isSelected
                      ? "rgba(35,24,69,0.9)"
                      : (cardStyle.background as string),
                    boxShadow: isSelected
                      ? "0 0 30px rgba(124,58,237,0.25)"
                      : undefined,
                  }}
                >
                  {/* 순번 배지 */}
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm"
                    style={{
                      background: "rgba(124,58,237,0.18)",
                      border: "1px solid rgba(184,146,240,0.3)",
                      color: "#d8b4fe",
                      fontFamily: sans,
                      fontWeight: 500,
                    }}
                  >
                    {lot.no}
                  </span>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontFamily: serif,
                          fontWeight: 500,
                          fontSize: "0.98rem",
                          color: "#f0ebff",
                        }}
                      >
                        {lot.name}
                      </span>
                      {/* 요금 칩 */}
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.65rem]"
                        style={{
                          fontFamily: sans,
                          fontWeight: 400,
                          color: isPaid ? "#f0abfc" : "#a7f3d0",
                          background: isPaid
                            ? "rgba(240,171,252,0.12)"
                            : "rgba(167,243,208,0.12)",
                          border: `1px solid ${
                            isPaid ? "rgba(240,171,252,0.3)" : "rgba(167,243,208,0.3)"
                          }`,
                        }}
                      >
                        {isPaid ? t("location.feePaid") : t("location.feeFree")}
                      </span>
                    </div>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        fontFamily: sans,
                        fontWeight: 300,
                        fontSize: "0.8rem",
                        color: "rgba(208,190,255,0.6)",
                        lineHeight: 1.6,
                      }}
                    >
                      <MapPin size={12} color="rgba(192,132,252,0.6)" />
                      {lot.address}
                    </span>
                    {lot.noteKey && (
                      <span
                        style={{
                          fontFamily: sans,
                          fontWeight: 400,
                          fontSize: "0.74rem",
                          color: "#c084fc",
                        }}
                      >
                        ※ {t(lot.noteKey)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </DetailPageLayout>
  );
}
