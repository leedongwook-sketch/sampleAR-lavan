This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 프로젝트 구조

```
src/
├── app/                # App Router (라우팅, 레이아웃, 페이지, route handler)
├── components/
│   ├── ui/             # 재사용 UI 프리미티브 (Button, Input 등) — 도메인 무관
│   └── common/         # 헤더/푸터 등 앱 전반에서 쓰는 공통 컴포넌트
├── features/           # 도메인/기능 단위 모듈 (각 기능별 컴포넌트·훅·타입을 응집)
├── hooks/              # 전역 재사용 커스텀 훅
├── lib/                # 라이브러리 설정·헬퍼 (utils.ts, env.ts 등)
├── services/           # API 호출 레이어 (api-client + 도메인별 서비스)
├── store/              # 전역 상태 관리 (Zustand/Jotai/Redux 등)
├── types/              # 전역 공통 타입 정의
├── constants/          # 전역 상수 (라우트, 설정값 등)
└── styles/             # 전역 스타일 (globals.css 는 app/ 에 위치)
```

> 경로 별칭: `@/*` → `src/*` (예: `import { cn } from "@/lib/utils"`)

### 레이어링 원칙
- **`features/`** 가 비즈니스 로직의 중심이다. 한 기능에만 쓰이는 컴포넌트/훅/타입은 해당 feature 안에 둔다.
- **`components/ui/`** 는 순수 프레젠테이션 컴포넌트로, 비즈니스 로직을 담지 않는다.
- 데이터 접근은 항상 **`services/`** 의 `apiClient` 를 통한다. 컴포넌트에서 직접 `fetch` 하지 않는다.
- 환경 변수는 **`lib/env.ts`** 를 통해서만 읽는다. 시크릿은 코드에 하드코딩하지 않는다.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
