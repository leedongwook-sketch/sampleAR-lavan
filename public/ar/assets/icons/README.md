# 마커 아이콘 이미지 폴더

여기에 마커에 표시할 아이콘 이미지를 넣으세요.

- 권장 포맷: `.png`(투명 배경) 또는 `.jpg`
- 권장 크기: 정사각형(예: 128×128, 256×256)
- 빌드 시 `dist/assets/icons/` 로 복사됩니다.

## 사용법
`src/geo-targets.ts` 의 각 항목 `icon` 에 경로를 지정하세요 (leading slash 없이):

```ts
{name: 'Target 1', latitude: 37.48, longitude: 127.01, icon: 'assets/icons/starbucks.png'}
```

예: `src/assets/icons/starbucks.png` 파일을 넣었다면 → `icon: 'assets/icons/starbucks.png'`
