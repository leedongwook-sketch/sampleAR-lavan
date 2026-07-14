import type { NextConfig } from "next";

// GitHub Pages 프로젝트 페이지(user.github.io/<repo>/)면 basePath 가 필요하다.
// 루트(커스텀 도메인 / user.github.io)면 빈 값.
// 배포 시: NEXT_PUBLIC_BASE_PATH=/<repo> npm run build
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // 정적 export (GitHub Pages 등 정적 호스팅용) → out/ 생성.
  output: "export",
  // 정적 호스팅은 서버 이미지 최적화가 없으므로 원본 그대로 사용.
  images: { unoptimized: true },
  // 정적 호스팅에서 /quiz/cheongok → /quiz/cheongok/index.html 로 안전하게 서빙.
  trailingSlash: true,
  // 프로젝트 페이지 서브경로 대응 (env 로 주입).
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // 개발 모드에서 LAN IP(실기기)로 접속 시 /_next 개발 리소스 접근 허용.
  allowedDevOrigins: ["192.168.45.125"],
};

export default nextConfig;
