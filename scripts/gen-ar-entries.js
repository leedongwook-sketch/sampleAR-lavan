// 8thWall AR 빌드(public/ar/index.html)를 경로 기반 정적 진입점으로 복제한다.
//   public/ar/<content>/index.html  (map, imgtarget, arPhoto)
// 각 복제본에는 <base href="<basePath>/ar/"> 를 주입해, 페이지 URL 은 /ar/<content>/ 로
// 유지하면서 에셋(bundle.js, external/, image-targets/, assets/)은 /ar/ 에서 로드되게 한다.
// → 빌드의 content.ts 가 경로에서 content 를 읽고(정적 호스팅에서 rewrite 없이 동작).
//
// 사용:  node scripts/gen-ar-entries.js
//   basePath 는 NEXT_PUBLIC_BASE_PATH 로 주입 (프로젝트 페이지면 "/<repo>").
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const arDir = path.join(root, "public", "ar");
const srcHtml = path.join(arDir, "index.html");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const contents = ["map", "imgtarget", "arPhoto"];

const html = fs.readFileSync(srcHtml, "utf8");
const baseTag = `<base href="${basePath}/ar/">`;

if (!html.includes("<head>")) {
  console.error("index.html 에 <head> 가 없어 base 주입 실패");
  process.exit(1);
}
// <head> 바로 뒤에 <base> 주입 (기존에 있으면 교체)
const injected = html
  .replace(/<base[^>]*>/i, "")
  .replace("<head>", `<head>${baseTag}`);

for (const c of contents) {
  const dir = path.join(arDir, c);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), injected);
  console.log(`wrote public/ar/${c}/index.html  (base=${basePath}/ar/)`);
}
console.log("done");
