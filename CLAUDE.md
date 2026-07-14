# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **중요:** 이 프로젝트는 Next.js 16 + React 19 + Tailwind CSS 4 를 사용한다. 이 메이저 버전들은 학습 데이터와 API·관례가 다를 수 있다. 코드 작성 전 `node_modules/next/dist/docs/01-app/` 의 관련 가이드를 확인한다.

## Commands

```bash
npm run dev      # 개발 서버 (Turbopack, http://localhost:3000)
npm run build    # 프로덕션 빌드 (빌드 중 tsc 타입체크 수행)
npm run start    # 빌드 결과물 실행
npm run lint     # ESLint
npx tsc --noEmit # 타입체크만 단독 실행
```

테스트 러너는 아직 설정되어 있지 않다.

## Architecture

`src/` 하위를 레이어로 분리한 구조다. 경로 별칭은 `@/*` → `src/*` (예: `@/lib/utils`, `@/services/api-client`). 전체 디렉터리 맵과 각 폴더 설명은 README.md "프로젝트 구조" 참고.

핵심 레이어링 규칙 (위반 시 구조가 무너진다):

- **데이터 접근은 반드시 `src/services/` 의 `apiClient` 를 통한다.** 컴포넌트·훅에서 직접 `fetch` 하지 않는다. 도메인별 호출은 `services/<domain>.ts` 로 추가하고 `apiClient` 를 재사용한다. 에러는 `ApiError`(status·body 포함)로 던져진다.
- **환경 변수는 `src/lib/env.ts` 를 통해서만 읽는다.** `process.env` 직접 접근 금지. 클라이언트 노출 값은 `NEXT_PUBLIC_` 접두사를 쓰고, 서버 전용 필수 시크릿은 `required()` 로 검증한다.
- **`components/ui/` 는 도메인 무관 프레젠테이션 프리미티브** (Button 등) — 비즈니스 로직 금지. Tailwind 클래스는 `@/lib/utils` 의 `cn()` 으로 병합한다.
- **`features/` 가 비즈니스 로직의 중심.** 한 기능에만 쓰이는 컴포넌트·훅·타입은 전역 폴더가 아니라 해당 feature 안에 응집시킨다. 전역으로 공유될 때만 `components/`·`hooks/`·`types/` 로 올린다.

## Conventions

- App Router 사용. 라우팅·레이아웃·페이지·route handler 는 모두 `src/app/`.
- 폰트는 `next/font/google` 의 Geist 를 CSS 변수(`--font-geist-sans`/`--font-geist-mono`)로 주입, `layout.tsx` 에서 적용.
- Tailwind 4 의 CSS 우선 설정: 테마 토큰은 `src/app/globals.css` 의 `@theme inline` 블록에서 정의한다 (별도 `tailwind.config` 파일 없음).
- 클라이언트 컴포넌트/훅은 파일 상단에 `"use client"` 선언. ESLint 의 `react-hooks/set-state-in-effect` 규칙이 활성화되어 있어 effect 내 동기 setState 는 경고된다.
