/**
 * 퀴즈 컨텐츠 레지스트리.
 * 스탬프 스팟(key)별로 4지선다 퀴즈 세트를 보관한다.
 * 문항·보기는 콘텐츠 데이터라 여기에 직접 두고, UI 문구(정답/다음 등)는 i18n 을 사용한다.
 */
export interface QuizQuestion {
  /** 질문 */
  question: string;
  /** 보기 4개 */
  options: readonly string[];
  /** 정답 보기 인덱스 (0~3) */
  answer: number;
}

export interface QuizSet {
  /** 퀴즈 제목 */
  title: string;
  /** 퀴즈 소개 */
  description: string;
  /** 문항 목록 */
  questions: readonly QuizQuestion[];
}

export const QUIZZES: Record<string, QuizSet> = {
  // 청옥호 — 무릉별유천지의 에메랄드빛 호수
  cheongok: {
    title: "청옥호 퀴즈",
    description: "청옥호를 둘러보고 정보를 찾아 4문제를 풀어보세요.",
    questions: [
      {
        question: "청옥호가 만들어지기 전, 이곳은 원래 무엇을 하던 곳일까요?",
        options: [
          "석회석을 캐던 채석장",
          "소금을 만들던 염전",
          "물고기를 기르던 양식장",
          "벼를 재배하던 논",
        ],
        answer: 0,
      },
      {
        question: "청옥호의 수심은 약 몇 m일까요?",
        options: ["약 5m", "약 30m", "약 100m", "약 300m"],
        answer: 1,
      },
      {
        question: "청옥호의 에메랄드빛 물은 어디에서 온 것일까요?",
        options: [
          "바닷물이 흘러든 것",
          "빗물만 모인 것",
          "금곡계곡의 용출수",
          "수돗물을 채운 것",
        ],
        answer: 2,
      },
      {
        question: "청옥호와 함께 무릉별유천지에 있는 또 다른 호수의 이름은?",
        options: ["경포호", "백록담", "천지", "금곡호"],
        answer: 3,
      },
    ],
  },

  // 라벤더 정원 — 무릉별유천지의 보랏빛 라벤더밭
  lavender: {
    title: "라벤더 정원 퀴즈",
    description: "라벤더 정원을 둘러보고 정보를 찾아 4문제를 풀어보세요.",
    questions: [
      {
        question: "라벤더 꽃은 주로 어떤 색을 띨까요?",
        options: ["노란색", "보라색", "붉은색", "하늘색"],
        answer: 1,
      },
      {
        question: "무릉별 라벤더가 활짝 피어 축제가 열리는 계절은?",
        options: ["초봄", "초여름", "늦가을", "한겨울"],
        answer: 1,
      },
      {
        question: "라벤더 향은 예로부터 어떤 효과로 잘 알려져 있을까요?",
        options: [
          "심신 안정·수면에 도움",
          "충치 예방",
          "시력 회복",
          "머리카락 성장",
        ],
        answer: 0,
      },
      {
        question: "라벤더로 만들 수 있는 대표적인 제품이 아닌 것은?",
        options: ["아로마 오일", "향초", "포푸리(방향제)", "고무 타이어"],
        answer: 3,
      },
    ],
  },
};
