"use client";

import { DetailPageLayout } from "@/components/common/detail-page-layout";
import { CtaButton } from "@/components/ui/cta-button";
import { LOCALES, useI18n } from "@/features/i18n";

export default function LanguagePage() {
  const { locale, setLocale } = useI18n();

  return (
    <DetailPageLayout titleKey="menu.language">
      <div className="mx-auto flex max-w-md flex-col gap-3">
        {LOCALES.map((option) => (
          <CtaButton
            key={option.code}
            variant={option.code === locale ? "experience" : "explore"}
            showIcon={false}
            className="w-full"
            onClick={() => setLocale(option.code)}
          >
            {option.label}
            {option.code === locale ? " ✓" : ""}
          </CtaButton>
        ))}
      </div>
    </DetailPageLayout>
  );
}
