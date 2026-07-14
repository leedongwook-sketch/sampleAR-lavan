"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants";
import { CtaButton } from "@/components/ui/cta-button";
import { useI18n } from "@/features/i18n";

/** 메인 메뉴로 복귀하는 공통 버튼. 상세 페이지 하단에서 재사용한다. */
export function BackToMainButton() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <CtaButton
      variant="explore"
      icon={<ArrowLeft size={14} />}
      onClick={() => router.push(ROUTES.main)}
    >
      {t("common.backToMain")}
    </CtaButton>
  );
}
