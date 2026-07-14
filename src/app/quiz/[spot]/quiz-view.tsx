"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import { ROUTES } from "@/constants";
import { useI18n } from "@/features/i18n";
import { LavenderBackground } from "@/components/common/lavender-background";
import { CtaButton } from "@/components/ui/cta-button";
import { QUIZZES } from "@/config/quiz";
import { completeStamp, useStamps } from "@/features/stamp/use-stamps";

const serif = "var(--font-serif-kr)";
const sans = "var(--font-sans-kr)";

export default function QuizPage() {
  const router = useRouter();
  const { t } = useI18n();
  const params = useParams<{ spot: string }>();
  const quiz = QUIZZES[params.spot];
  const { isDone } = useStamps();

  const total = quiz?.questions.length ?? 0;

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = quiz?.questions[index];
  const answered = picked !== null;
  const isLast = index === total - 1;

  // 이미 완료한 스탬프면 메인으로 이동.
  // 단, 이번 세션에서 방금 완료해 결과 화면을 보는 경우(finished)는 제외.
  const alreadyDone = Boolean(quiz) && isDone(params.spot) && !finished;

  useEffect(() => {
    if (alreadyDone) router.replace(ROUTES.main);
  }, [alreadyDone, router]);

  const goStampTour = () => router.push(ROUTES.stampTour);

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const pick = (i: number) => {
    if (answered || !current) return;
    setPicked(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      // 전 문항 정답 시 스탬프 완료 저장 (localStorage)
      if (score === total) completeStamp(params.spot);
      setFinished(true);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  };

  // 존재하지 않는 퀴즈 spot 방어
  if (!quiz) {
    return (
      <LavenderBackground>
        <div className="flex flex-col items-center gap-6 text-center">
          <p style={{ fontFamily: sans, color: "rgba(208,190,255,0.7)" }}>
            {t("ar.notReady")}
          </p>
          <CtaButton variant="explore" icon={<ArrowLeft size={14} />} onClick={goStampTour}>
            {t("quiz.backToTour")}
          </CtaButton>
        </div>
      </LavenderBackground>
    );
  }

  // 이미 완료 → 메인으로 이동하는 동안 퀴즈가 잠깐 노출되지 않도록 빈 배경만 렌더
  if (alreadyDone) {
    return <LavenderBackground />;
  }

  return (
    <LavenderBackground centerContent={false}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-24 pb-16">
        {/* 헤더 */}
        <header className="flex flex-col items-center gap-2 text-center">
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "#c084fc", fontFamily: sans, fontWeight: 300 }}
          >
            {t("menu.stampTour")}
          </span>
          <h1
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
              color: "#f0ebff",
              textShadow: "0 0 40px rgba(192,132,252,0.4)",
            }}
          >
            {quiz.title}
          </h1>
        </header>

        {finished ? (
          <QuizResult
            score={score}
            total={total}
            onRetry={restart}
            onBack={goStampTour}
          />
        ) : (
          current && (
            <>
              {/* 진행 표시 */}
              <div className="flex items-center justify-center gap-2">
                {quiz.questions.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 24 : 10,
                      background:
                        i < index
                          ? "#a855f7"
                          : i === index
                            ? "#d8b4fe"
                            : "rgba(184,146,240,0.25)",
                    }}
                  />
                ))}
              </div>

              {/* 문항 */}
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5"
              >
                <p
                  className="text-center"
                  style={{
                    fontFamily: serif,
                    fontWeight: 500,
                    fontSize: "1.15rem",
                    color: "#f0ebff",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#c084fc" }}>Q{index + 1}. </span>
                  {current.question}
                </p>

                {/* 보기 */}
                <div className="flex flex-col gap-3">
                  {current.options.map((opt, i) => {
                    const isAnswer = i === current.answer;
                    const isPicked = i === picked;
                    // 채점 후 색상: 정답=초록, 내가고른오답=빨강, 나머지=기본
                    let border = "rgba(184,146,240,0.2)";
                    let bg = "rgba(22,16,42,0.6)";
                    let mark: React.ReactNode = null;
                    if (answered) {
                      if (isAnswer) {
                        border = "rgba(134,239,172,0.55)";
                        bg = "rgba(134,239,172,0.12)";
                        mark = <Check size={16} color="#86efac" />;
                      } else if (isPicked) {
                        border = "rgba(248,113,113,0.55)";
                        bg = "rgba(248,113,113,0.12)";
                        mark = <X size={16} color="#f87171" />;
                      }
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => pick(i)}
                        disabled={answered}
                        className="flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all duration-200"
                        style={{
                          background: bg,
                          border: `1px solid ${border}`,
                          backdropFilter: "blur(12px)",
                          cursor: answered ? "default" : "pointer",
                        }}
                      >
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs"
                          style={{
                            background: "rgba(124,58,237,0.18)",
                            border: "1px solid rgba(184,146,240,0.3)",
                            color: "#d8b4fe",
                            fontFamily: sans,
                            fontWeight: 500,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="flex-1"
                          style={{
                            fontFamily: sans,
                            fontWeight: 300,
                            fontSize: "0.95rem",
                            color: "rgba(240,235,255,0.9)",
                          }}
                        >
                          {opt}
                        </span>
                        {mark}
                      </button>
                    );
                  })}
                </div>

                {/* 정답/오답 피드백 + 다음 */}
                {answered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4"
                  >
                    <p
                      className="text-center"
                      style={{
                        fontFamily: sans,
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: picked === current.answer ? "#86efac" : "#f0abfc",
                      }}
                    >
                      {picked === current.answer
                        ? t("quiz.correct")
                        : `${t("quiz.wrong")} · ${t("quiz.answerPrefix")}: ${
                            current.options[current.answer]
                          }`}
                    </p>
                    <CtaButton variant="experience" showIcon={false} onClick={next}>
                      {isLast ? t("quiz.seeResult") : t("quiz.next")}
                    </CtaButton>
                  </motion.div>
                )}
              </motion.div>
            </>
          )
        )}
      </div>
    </LavenderBackground>
  );
}

function QuizResult({
  score,
  total,
  onRetry,
  onBack,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const allCorrect = score === total;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-6 rounded-3xl p-8 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(35,24,69,0.85))",
        border: "1px solid rgba(184,146,240,0.3)",
        boxShadow: "0 0 50px rgba(124,58,237,0.25)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="text-5xl">{allCorrect ? "🏆" : "🌿"}</div>
      <h2
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "#f0ebff",
          textShadow: "0 0 30px rgba(192,132,252,0.4)",
        }}
      >
        {t("quiz.resultTitle")}
      </h2>
      <p style={{ fontFamily: sans, color: "rgba(208,190,255,0.85)" }}>
        <span
          style={{
            fontFamily: serif,
            fontWeight: 700,
            fontSize: "2rem",
            color: "#e9d5ff",
          }}
        >
          {score}
        </span>
        <span style={{ color: "rgba(208,190,255,0.6)" }}> / {total} </span>
        {t("quiz.scoreSuffix")}
      </p>
      <div className="flex w-full flex-col gap-3">
        <CtaButton variant="experience" icon={<RotateCcw size={15} />} onClick={onRetry}>
          {t("quiz.retry")}
        </CtaButton>
        <CtaButton
          variant="explore"
          icon={<ArrowLeft size={14} />}
          onClick={onBack}
        >
          {t("quiz.backToTour")}
        </CtaButton>
      </div>
    </motion.div>
  );
}
