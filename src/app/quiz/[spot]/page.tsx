import { QUIZZES } from "@/config/quiz";
import QuizView from "./quiz-view";

/**
 * 정적 export 를 위해 퀴즈 스팟을 빌드 타임에 미리 생성한다.
 * QUIZZES 에 등록된 key 만 정적 페이지로 만들어진다(그 외는 dynamicParams=false 로 404).
 */
export function generateStaticParams() {
  return Object.keys(QUIZZES).map((spot) => ({ spot }));
}

export const dynamicParams = false;

export default function QuizPage() {
  return <QuizView />;
}
