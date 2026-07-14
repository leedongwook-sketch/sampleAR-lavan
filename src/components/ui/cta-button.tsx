import { Sparkles } from "lucide-react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CtaVariant = "experience" | "explore";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** experience: 그라데이션 강조(체험 시작하기) · explore: 아웃라인(둘러보기) */
  variant?: CtaVariant;
  /** 라벨 앞 아이콘 직접 지정 (미지정 시 variant 기본 아이콘 사용) */
  icon?: ReactNode;
  /** 기본 아이콘 노출 여부 */
  showIcon?: boolean;
}

const variantStyle: Record<CtaVariant, CSSProperties> = {
  experience: {
    background: "linear-gradient(135deg, #7c3aed, #9d5cf5)",
    color: "#fff",
    fontFamily: "var(--font-sans-kr)",
    fontWeight: 500,
    fontSize: "0.9rem",
    letterSpacing: "0.05em",
    boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.4)",
  },
  explore: {
    border: "1px solid rgba(184,146,240,0.35)",
    color: "#c084fc",
    fontFamily: "var(--font-sans-kr)",
    fontWeight: 400,
    fontSize: "0.9rem",
    letterSpacing: "0.05em",
    background: "rgba(124,58,237,0.07)",
  },
};

const variantClass: Record<CtaVariant, string> = {
  experience: "hover:-translate-y-0.5",
  explore: "hover:bg-[rgba(124,58,237,0.2)]",
};

/**
 * 라벤더 테마 공통 CTA 버튼.
 * 인트로에서 사용하던 '체험 시작하기'(experience) · '둘러보기'(explore) 디자인을
 * 프로젝트 전역에서 재사용하기 위한 프레젠테이션 프리미티브.
 */
export function CtaButton({
  variant = "experience",
  icon,
  showIcon = true,
  className,
  children,
  ...props
}: CtaButtonProps) {
  const defaultIcon =
    variant === "experience" ? <Sparkles size={15} /> : null;
  const renderedIcon = icon ?? (showIcon ? defaultIcon : null);

  return (
    <button
      type="button"
      className={cn(
        "px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300",
        variantClass[variant],
        className,
      )}
      style={variantStyle[variant]}
      {...props}
    >
      {renderedIcon}
      {children}
    </button>
  );
}
